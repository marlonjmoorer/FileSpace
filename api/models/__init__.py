from shared import  db

from collections import OrderedDict



class BaseModel(db.Model):
    __abstract__ = True
    def save(self):

            db.session.add(self)
            db.session.commit()
            return True



    def getById(self,id):
        return self.query.filter_by(id=id).first()