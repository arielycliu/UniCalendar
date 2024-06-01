from config import app, db
from flask import request, jsonify
from models import Task, SubTask

# CREATE
@app.route("/create_task", methods=["POST"])
def create_task():
    name = request.json.get("name")
    description = request.json.get("description")
    type = request.json.get("type")
    tags = request.json.get("tags")
    grade_weight = request.json.get("grade_weight")
    grade_achieved = request.json.get("grade_achieved")
    course_code = request.json.get("course_code")
    status = request.json.get("status")
    time_start = request.json.get("time_start")
    time_end = request.json.get("time_end")
    subtask_ids = request.json.get("subtask_ids")

    # Checks
    if not name or not type:
        return (jsonify({"message": "You must indicate name of task and task type"}), 400)
    if not status:
        status = "TODO"

    new_task = Task(name=name, description=description, type=type, tags=tags, grade_weight=grade_weight, grade_achieved=grade_achieved, course_code=course_code, status=status, time_start=time_start, time_end=time_end, subtask_ids=subtask_ids)
    try:
        db.session.add(new_task)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}, 500)
    return jsonify({"message": "Task successfully added"}, 201)

# READ

# UPDATE

# DELETE

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)