import json
from flask import Blueprint, request
import re


user_api= Blueprint('user', __name__)

email_regex='^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$'

@user_api.route("/signup", methods=['POST'])
def signup():
    from .models.UserModel import UserModel

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
        return json.dumps({"errors":errorMessages}),500

    else:
        newUser=UserModel()
        newUser.email=email
        newUser.password=password
        if newUser.save():
          return json.dumps({"success":True})



