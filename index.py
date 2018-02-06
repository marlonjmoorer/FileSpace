from flask import Flask,render_template
from flask_sqlalchemy import  SQLAlchemy
app=Flask(__name__)




app.config.from_pyfile("settings.cfg")
db = SQLAlchemy(app)



@app.route("/")
def index():    
    return render_template("index.html")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return 'You want path: %s' % path



from api.user import user_api

app.register_blueprint(user_api,url_prefix='/api/user')





if __name__ == '__main__':

    app.run(debug=True,port=5000)