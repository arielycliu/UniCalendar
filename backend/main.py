from config import app, db
from flask import request, jsonify
from models import Task, Subtask, Tag

# CREATE
@app.route("/create/task", methods=["POST"])
def create_task():
    name = request.json.get("name")
    description = request.json.get("description")
    type = request.json.get("type")
    tags = request.json.get("tags", [])
    grade_weight = request.json.get("grade_weight")
    grade_achieved = request.json.get("grade_achieved")
    course_code = request.json.get("course_code")
    status = request.json.get("status")
    time_start = request.json.get("time_start")
    time_end = request.json.get("time_end")

    # Checks
    if not name or not type:
        return (jsonify({"message": "You must indicate name of task and task type"}), 400)
    if not status:
        status = "TODO"
    if type not in ["Assignment", "Test"]:
        return (jsonify({"message": "Invalid task type"}), 400)

    new_task = Task(name=name, description=description, type=type, grade_weight=grade_weight, grade_achieved=grade_achieved, course_code=course_code, status=status, time_start=time_start, time_end=time_end,
    tags=[])

    for tag_value in tags:
        tag = Tag.query.filter_by(tag_value=tag_value).first()
        if not tag:  # if tag does not exist yet, add it
            tag = Tag(tag_value=tag_value)
        new_task.tags.append(tag)

    try:
        db.session.add(new_task)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}, 500)
    return jsonify({"message": "Task successfully created", "task": {"id": new_task.id, "name": new_task.name}}), 201

@app.route("/create/subtask", methods=["POST"])
def create_subtask():
    name = request.json.get("name")
    description = request.json.get("description")
    status = request.json.get("status")
    time_start = request.json.get("time_start")
    time_end = request.json.get("time_end")
    parent_task_id = request.json.get("parent_task_id")

    # Checks
    if not name or not parent_task_id:
        return (jsonify({"message": "You must indicate name of subtask and parent task ID"}), 400)
    if not status:
        status = "TODO"

    new_subtask = Subtask(name=name, description=description, status=status, time_start=time_start, time_end=time_end,
    parent_task_id=parent_task_id)
    try:
        db.session.add(new_subtask)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}, 500)
    return jsonify({"message": "Subtask successfully created", "subtask": {"id": new_subtask.id, "name": new_subtask.name}}), 201

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
        return jsonify({"message": "Task not found"}), 404
    json_task = task.to_json()
    return jsonify(json_task)

@app.route("/read/subtask/<int:subtask_id>", methods=["GET"])
def read_subtask(subtask_id):
    subtask = Subtask.query.get(subtask_id)
    if not subtask:
        return jsonify({"message": "Subtask not found"}), 404
    json_subtask = subtask.to_json()
    return jsonify(json_subtask)

# UPDATE

# DELETE

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)