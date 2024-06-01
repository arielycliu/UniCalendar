import datetime
from config import db
from typing import Optional, List
from sqlalchemy import ARRAY, String, Integer, DateTime
from sqlalchemy.orm import Mapped, mapped_column

class Task(db.Model):
    __tablename__ = "task"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(String(4096))
    type: Mapped[str] = mapped_column(String(20), nullable=False)  # indicate whether assignment or test type
    tags: Mapped[List[str]] = mapped_column(ARRAY(String))  # subtypes enable finer task categories e.g, midterm, survey
    grade_weight: Mapped[int] = mapped_column(Integer)  # weight of task e.g, 5%
    course_code: Mapped[str] = mapped_column(String(50))
    status: Mapped[str] = mapped_column(String(20), nullable=False)  # status of task e.g, todo, doing, done, blocked
    time_start: Optional[datetime.datetime] = mapped_column(DateTime)
    time_end: Optional[datetime.datetime] = mapped_column(DateTime)  # must end after start date
    subtask_ids: Mapped[List[int]] = mapped_column(ARRAY(Integer))  # one task can link to multiple subtasks
