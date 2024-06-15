# UniCalendar: minimalist calendar design for students 🖥️🖱️
---

Simple user interface to add, update, and delete tasks on a monthly calendar. Backend built using Flask and frontend built using React.

## 🔍 Features
- [ ] Add tasks to the calendar. Tasks show up as a colorful bar.
- [ ] Can also add floating tasks that are not time specified.
- [ ] Update or delete tasks after they have been created.

## 🛠️ Installation
1. Clone the repository
```
git clone [https://github.com/arielycliu/UniCalendar.git](https://github.com/arielycliu/UniCalendar.git)
cd UniCalendar
```
2. Open up the application in any VSCode or any IDE of your choice
3. `cd backend` then pip install the requirements --> can do `pip install requirements.txt` or individually install flask-cors, Flask, Flask-SQLAlchemy.
4. `cd frontend` then run `npm install` to set up React dependencies.
5. To run backend, `cd backend` then run `python main.py`
6. To run frontend, `cd frontend` then run frontend with `npm run dev`

## 🧰 Usage Instructions
1. Click the calendar to open the create task modal.
2. After creating the task, if you specified a start or end time it should appear as a purple bar in the calendar. If you did not specify any start or end time it will appear in the floating task table.
3. Click on the purple bar or the task entry in the floating task table to update or delete tasks.

### 🧪 Tests
WIP


