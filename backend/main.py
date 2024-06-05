from config import app, db
from flask import request, jsonify
from models import Task, Subtask, Tag
from enums import status_codes, task_status, task_type

def parse_task_data_from_request():
    return {
        "name": request.json.get("name"),
        "description": request.json.get("description"),
        "type": request.json.get("type"),
        "grade_weight": request.json.get("grade_weight"),
        "grade_achieved": request.json.get("grade_achieved"),
        "course_code": request.json.get("course_code"),
        "status": request.json.get("status"),
        "time_start": request.json.get("time_start"),
        "time_end": request.json.get("time_end"),
    }, request.json.get("tags", [])

def parse_subtask_data_from_request():
    return {
        "name": request.json.get("name"),
        "description": request.json.get("description"),
        "status": request.json.get("status"),
        "time_start": request.json.get("time_start"),
        "time_end": request.json.get("time_end"),
        "parent_task_id": request.json.get("parent_task_id")
    }

# CREATE
@app.route("/create/task", methods=["POST"])
def create_task():
    task_data, tags = parse_task_data_from_request()

    # Checks
    if task_data["name"] is None or task_data["type"] is None:
        return (jsonify({"message": "You must indicate name of task and task type"}), status_codes.HTTP_400_Bad_Request.value)
    if not task_data["status"]:
        task_data["status"] = task_status.TODO.value
    if task_data["type"] not in set(type.value for type in task_type):
        return (jsonify({"message": "Invalid task type", "task_type": task_data["type"]}), status_codes.HTTP_400_Bad_Request.value)

    new_task = Task(**task_data, tags=[])

    for tag_value in tags:
        tag = Tag.query.filter_by(tag_value=tag_value).first()
        if not tag:  # if tag does not exist yet, add it
            tag = Tag(tag_value=tag_value)
        new_task.tags.append(tag)

    try:
        db.session.add(new_task)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}, status_codes.HTTP_500_Internal_Server_Error.value)
    return jsonify({"message": "Task successfully created", "task": {"id": new_task.id, "name": new_task.name}}), status_codes.HTTP_201_Created.value

@app.route("/create/subtask", methods=["POST"])
def create_subtask():
    subtask_data = parse_subtask_data_from_request()

    # Checks
    if not subtask_data["name"] or not subtask_data["parent_task_id"]:
        return (jsonify({"message": "You must indicate name of subtask and parent task ID"}), status_codes.HTTP_400_Bad_Request.value)
    if not subtask_data["status"]:
        subtask_data["status"] = task_status.TODO.value

    new_subtask = Subtask(**subtask_data)
    try:
        db.session.add(new_subtask)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}, status_codes.HTTP_500_Internal_Server_Error.value)
    return jsonify({"message": "Subtask successfully created", "subtask": {"id": new_subtask.id, "name": new_subtask.name}}), status_codes.HTTP_201_Created.value

# READ
@app.route("/read/list_tasks", methods=["GET"])
def list_tasks():
    tasks = Task.query.all()
    json_tasks = list(map(lambda x: x.to_json(), tasks))
    return jsonify({"tasks": json_tasks})

@app.route("/read/task/<int:task_id>", methods=["GET"])
def read_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"message": "Task not found"}), status_codes.HTTP_404_Not_Found.value
    json_task = task.to_json()
    return jsonify(json_task)

@app.route("/read/subtask/<int:subtask_id>", methods=["GET"])
def read_subtask(subtask_id):
    subtask = Subtask.query.get(subtask_id)
    if not subtask:
        return jsonify({"message": "Subtask not found"}), status_codes.HTTP_404_Not_Found.value
    json_subtask = subtask.to_json()
    return jsonify(json_subtask)

# UPDATE
@app.route("/update/task/<int:task_id>", methods=["PATCH"])
def update_task(task_id):
    task = Task.query.get(task_id)
    if not task:  # task does not exist in database
        return jsonify({"message": "Task not found"}), status_codes.HTTP_404_Not_Found.value
    
    task_data, new_tags = parse_task_data_from_request()

    if task.type != task_data["type"]: 
        return jsonify({
                    "message": "You cannot edit task type after creation.",
                    "original type": task.type,
                    "given type": task_data["type"]
                }), status_codes.HTTP_403_Forbidden.value
    if task_data["status"] is None: task_data["status"] = task.status
    
    for key, value in task_data.items():
        setattr(task, key, value)

    task.tags = []
    for tag_value in new_tags:
        tag = Tag.query.filter_by(tag_value=tag_value).first()
        if not tag:  # if tag does not exist yet, add it
            tag = Tag(tag_value=tag_value)
        task.tags.append(tag)

    db.session.commit()
    return jsonify({"message": "Task successfully updated", "task": {"id": task.id, "name": task.name}}), status_codes.HTTP_200_OK.value

@app.route("/update/subtask/<int:subtask_id>", methods=["PATCH"])
def update_subtask(subtask_id):
    subtask = Subtask.query.get(subtask_id)

    subtask_data = parse_subtask_data_from_request()

    if not subtask:
        return jsonify({"message": "Subtask not found"}), status_codes.HTTP_404_Not_Found.value
    if subtask.parent_task_id != subtask_data["parent_task_id"]: 
        return jsonify({
                    "message": "You cannot edit a which parent task a sub task belongs after creation.",
                    "original parent_task_id": subtask.parent_task_id,
                    "given parent_task_id": subtask_data["parent_task_id"]
                }), status_codes.HTTP_403_Forbidden.value
    if subtask_data["status"] is None: subtask_data["status"] = subtask.status

    for key, value in subtask_data.items():
        setattr(subtask, key, value)

    db.session.commit()
    return jsonify({"message": "Subtask successfully updated", "subtask": {"id": subtask.id, "name": subtask.name}}), status_codes.HTTP_200_OK.value

# DELETE
@app.route("/delete/task/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = Task.query.get(task_id)

    if not task:
        return jsonify({"message": "Task not found", "task_id": task_id}), status_codes.HTTP_404_Not_Found.value

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task successfully deleted from the database"}), status_codes.HTTP_200_OK.value

@app.route("/delete/subtask/<int:subtask_id>", methods=["DELETE"])
def delete_subtask(subtask_id):
    subtask = Subtask.query.get(subtask_id)

    if not subtask:
        return jsonify({"message": "Subtask not found", "subtask_id": subtask_id}), status_codes.HTTP_404_Not_Found.value

    db.session.delete(subtask)
    db.session.commit()

    return jsonify({"message": "Subtask successfully deleted from the database"}), status_codes.HTTP_200_OK.value

@app.route("/delete/tag/<int:tag_id>", methods=["DELETE"])
def delete_tag(tag_id):
    tag = Tag.query.get(tag_id)

    if not tag:
        return jsonify({"message": "Tag not found", "tag_id": tag_id}), status_codes.HTTP_404_Not_Found.value

    db.session.delete(tag)
    db.session.commit()

    return jsonify({"message": "Tag successfully deleted from the database"}), status_codes.HTTP_200_OK.value

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)