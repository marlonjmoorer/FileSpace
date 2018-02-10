from shared import  db
from . import  BaseModel
from werkzeug.security import  generate_password_hash, check_password_hash
from sqlalchemy import Integer, ForeignKey, String, Column
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

class ProfileModel(BaseModel):
    __tablename__ = 'Profile'
    id = db.Column("id", db.Integer, primary_key=True)
    host = db.Column(db.String(200), unique=False, nullable=False)
    port = db.Column(db.String(4), unique=False, nullable=True)
    username= db.Column(db.String(200), unique=False, nullable=True)
    password = db.Column(db.String(200), unique=False, nullable=True)
    name=db.Column(db.String(200), unique=True, nullable=False)
    userId= db.Column(db.Integer,ForeignKey("Users.id"))


    def __init__(self,name,host,port,username,password):
        self.name=name
        self.host=host
        self.port=port or 22
        self.username=username
        self.password=password

    @staticmethod
    def getById(id):
        return ProfileModel.query.filter_by(id=id).first()
    @staticmethod
    def getProfilesForUser(userId):
        return ProfileModel.query.filter_by(userId=userId).all()