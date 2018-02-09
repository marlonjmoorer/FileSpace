from . import BaseModel
from shared import  db
from werkzeug.security import  generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship
class UserModel(BaseModel):
    __tablename__ = 'Users'
    id = db.Column("id",db.Integer, primary_key=True)
    email = db.Column(db.String(200), unique=False, nullable=True)
    password= db.Column(db.String(200), unique=False, nullable=True)
   # user = relationship("Profile", back_populates="Users")

    def set_password(self, password):
        self.password= generate_password_hash(password)


    def check_password(self, password):
        return check_password_hash(self.password, password)

    @staticmethod
    def getByEmail(email):
        return  UserModel.query.filter_by(email=email).first()

