from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass
db = SQLAlchemy(model_class=Base)  # create new db object

app = Flask(__name__)
CORS(app)  # enable cross origin requests

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///calendar.db"
db.init_app(app)