
from sqlalchemy import Column, Integer, String, Text, LargeBinary, SmallInteger, CheckConstraint, Boolean, text
from sqlalchemy.orm import declarative_base, registry
from .engine import new_engine, new_engine_without_table, DB_NAME
import os
import pandas as pd
import io, zipfile


Base:registry = declarative_base()

class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, autoincrement=True)
    admin = Column(Boolean, nullable=False, default=False)
    name = Column(String(50), nullable=False, unique=True)
    password = Column(LargeBinary(64), nullable=False)
    salt = Column(LargeBinary(16), nullable=False)

class Coverletter(Base):
    __tablename__ = "coverletter"
    id = Column(Integer, primary_key=True, autoincrement=True)
    userID = Column(Integer)
    title = Column(Text, nullable=False)
    subject = Column(Text, nullable=False)
    text = Column(Text, nullable=False)


class UniGrades(Base):
    __tablename__ = "uni_grades"
    id = Column(Integer, primary_key=True, autoincrement=True)
    semester = Column(SmallInteger, nullable=False)
    subject = Column(String(70), nullable=False)
    grade = Column(SmallInteger, nullable=False)

    __table_args__ = (
            CheckConstraint('grade BETWEEN 0 AND 15', name='check_grade_range'),
        )



class Resume(Base):
    __tablename__ = "resume"
    id = Column(Integer, primary_key=True, autoincrement=True)
    category = Column(String(70), nullable=False)
    title = Column(String(100), nullable=False)
    subtitle = Column(String(100))
    start = Column(String(10), nullable=False)
    end = Column(String(10))

    __table_args__ = (
        CheckConstraint("category in ('Schulbildung', 'Praktika')", name="check_category"),
    )


class Contact(Base):
    __tablename__ = "contact"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(30), nullable=False)
    value = Column(String(50), nullable=False)



class Backup:
    def __init__(self, engine=None):
        self.folder_path = "utils/database/backup"
        self.engine =  engine if engine else new_engine()
        if not os.path.exists(self.folder_path):
            raise FileNotFoundError(f"Folder not found | {self.folder_path}")
        
        self.files = filter(lambda x: x.endswith(".parquet"), os.listdir(self.folder_path))
        self.tables = map(lambda x: os.path.splitext(x)[0] , self.files)
         
    def load(self):
        with self.engine.begin() as con:
            for file in self.files:
                table = os.path.splitext(file)[0]
                con.execute(text(f"DELETE FROM {table}"))
                df = pd.read_parquet(os.path.join(self.folder_path, file))
                df.to_sql(table, con, index=False, if_exists="append")
                print(f"Loaded table: {table} ({len(df)} rows)")

    def toZip(self)->dict[str, io.BytesIO]:
        files = {}
        with self.engine.begin() as con:
            for table in self.tables:
                df = pd.read_sql_table(table, con)
                if table == "user":
                    df = df[df["admin"].map(lambda x: not x)]
                file = io.BytesIO()
                df.to_parquet(file)
                files[f"{table}.parquet"] = file

        zip_buffer = io.BytesIO()
        with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zip_file:
            for name, bio in files.items():
                bio:io.BytesIO; name:str
                bio.seek(0)
                zip_file.writestr(name, bio.read())
        zip_buffer.seek(0)
        return zip_buffer
    

def create_database():
    engine = new_engine_without_table()
    with engine.connect() as con:
        con.execute(text(f"DROP DATABASE IF EXISTS {DB_NAME}"))
        con.execute(text(f"CREATE DATABASE {DB_NAME}"))
    engine = new_engine()
    Base.metadata.create_all(engine)
    Backup(engine).load()
    


