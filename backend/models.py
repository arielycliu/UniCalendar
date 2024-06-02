import datetime
from config import db
from typing import Optional, List
from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

task_tags = db.Table (  # Association table for tasks to tags
    'task_tags',
    Column('task_id', Integer, ForeignKey('task.id')),
    Column('tag_id', Integer, ForeignKey('tag.id'))
)

class Task(db.Model):
    __tablename__ = "task"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(String(4096), nullable=True)
    type: Mapped[str] = mapped_column(String(20), nullable=False)  # indicate whether assignment or test type
    grade_weight = mapped_column(Float, nullable=True)  # weight of task e.g, 5%
    grade_achieved: Mapped[float] = mapped_column(Float, nullable=True)
    course_code: Mapped[str] = mapped_column(String(50), nullable=True)
    status: Mapped[str] = mapped_column(String(20), default='TODO')  # status of task e.g, todo, doing, done, blocked
    time_start: Mapped[str] = mapped_column(String(50), default=str(datetime.datetime.now()))
    time_end: Mapped[str] = mapped_column(String(50), nullable=True)  # must end after start date
    tags = db.relationship('Tag', secondary=task_tags, back_populates='tasks')  # subtypes enable finer task categories e.g, midterm, survey

class Subtask(db.Model):
    __tablename__ = "subtask"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(String(4096), nullable=True)
    # type must be identical to type of its task parent
    status: Mapped[str] = mapped_column(String(20), default='TODO')  # status is independent of its parents
    time_start: Mapped[str] = mapped_column(String(50), default=str(datetime.datetime.now()))
    time_end: Mapped[str] = mapped_column(String(50), nullable=True)
    parent_task_id: Mapped[int] = mapped_column(Integer, nullable=False)  # one task can link to multiple subtasks

class Tag(db.Model):
    __tablename__ = "tag"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    tag_value: Mapped[str] = mapped_column(String(50), nullable=False)
    tasks = db.relationship('Task', secondary=task_tags, back_populates='tags')