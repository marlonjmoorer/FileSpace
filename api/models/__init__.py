from shared import  db


class BaseModel(db.Model):
    __abstract__ = True
    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
            return True
        except Exception as e:

            return False


    def getById(self,id):
        return self.query.filter_by(id=id).first()