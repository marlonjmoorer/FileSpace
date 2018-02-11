from functools import wraps
from flask import  request,Response,g,session
from models.UserModel import  UserModel
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        userid = request.cookies.get('id')
        if "userId" in session:
            return f(*args, **kwargs)

        validUser=UserModel().getById(int(userid))
        if validUser is None:
            return Response("Login Required"),403

        session["userId"]=validUser.id
        return f(*args, **kwargs)
    return decorated_function


def format_bytes(bytes_num):
    sizes = ["B", "KB", "MB", "GB", "TB"]

    i = 0
    dblbyte = bytes_num

    while (i < len(sizes) and bytes_num >= 1024):
        dblbyte = bytes_num / 1024.0
        i = i + 1
        bytes_num = bytes_num / 1024

    return str(round(dblbyte, 2)) + " " + sizes[i]