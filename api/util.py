from functools import wraps
from flask import  request,Response,g,session
from models.UserModel import  UserModel
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        userid = request.cookies.get('id')
        if "user " in session:
            return f(*args, **kwargs)

        validUser=UserModel().getById(int(userid))
        if validUser is None:
            return Response("Login Required"),403

        session["user"]=validUser
        return f(*args, **kwargs)
    return decorated_function