from index import  db

class UserModel(db.Model):
    __tablename__ = 'Users'
    id = db.Column("id",db.Integer, primary_key=True)
    email = db.Column(db.String(200), unique=False, nullable=True)
    password= db.Column(db.String(200), unique=False, nullable=True)

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
            return True
        except Exception as e:

            return False
    @staticmethod
    def getByEmail(email):
        return  UserModel.query.filter_by(email=email).first()