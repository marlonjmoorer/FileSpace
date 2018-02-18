import json
from flask import Blueprint, request, make_response,session,jsonify
import re
from .models.UserModel import UserModel

user_api= Blueprint('user', __name__)

email_regex='^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$'

@user_api.route("/signup", methods=['POST'])
def signup():
    errorMessages=[]
    form = request.form
    email= form["email"]
    password=form["password"]
    confirmPw=form["confirm_password"]
    if not email:
        errorMessages.append("Email is required")

    elif not re.match(email_regex, email):
        errorMessages.append("Email  has an invalid format");
    if not password:
        errorMessages.append("Password is required")
    elif len(password)<8:
        errorMessages.append("Password must be 8 characters or more")
    elif password!= confirmPw:
        errorMessages.append("Passwords must match")

    elif UserModel.getByEmail(email):
        errorMessages.append("User already exist")

    if errorMessages:
        return make_response((json.dumps(errorMessages))),500

    else:
        newUser=UserModel()
        newUser.email=email
        newUser.set_password(password)

        if newUser.save():
          return make_response((json.dumps("Signup Successful")))

@user_api.route("/login", methods=['POST'])
def login():
    id=request.cookies.get('id')
    errorMessages = []
    form = request.form
    email = form["email"]
    password = form["password"]

    user=UserModel.getByEmail(email)
    if not UserModel.getByEmail(email):
        errorMessages.append("User does not exist")
    elif not user.check_password(password):
        errorMessages.append("Invalid credentials")


    if not errorMessages:
       response= make_response(json.dumps({"success": True}))
       response.set_cookie("id",str(user.id))
       session["userId"]=user.id
       return response
    else:

        return  make_response(json.dumps(errorMessages), 500)

@user_api.route("/info")
def userInfo():
    userId = session["userId"]
    user=UserModel.getById(userId)

    if user:
        return jsonify({
            "username":user.email
        })



