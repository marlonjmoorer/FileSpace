import  os
from flask import Flask,send_from_directory
from flask_migrate import  Migrate
from shared import  db

app=Flask(__name__)
app.config.from_pyfile("settings.cfg")
app.secret_key = "super secret key"
db.init_app(app)


from api.models import UserModel,ProfileModel
migrate=Migrate(app,db)


@app.route("/")
def index():    
    return send_from_directory("./client","index.html",cache_timeout=-1)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if path and os.path.exists("./client/"+path):
        return send_from_directory("./client",path,cache_timeout=-1)
    else:
        return send_from_directory("./client","index.html",cache_timeout=-1)

@app.after_request
def add_header(response):
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    response.headers['Cache - Control']='no - cache, no - store'
    response.headers["Pragma"]= 'no - cache'
    return response


from api.user import user_api
from api.profile import profile_api

app.register_blueprint(user_api,url_prefix='/api/user')
app.register_blueprint(profile_api,url_prefix='/api/profile')





if __name__ == '__main__':

    app.run(debug=True,port=5000)