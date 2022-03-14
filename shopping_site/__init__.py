from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_cors import CORS
from flask_session import Session

SQLALCHEMY_TRACK_MODIFICATIONS = False


app = Flask('__name__', template_folder='./shopping_site/static/templates', static_folder='./shopping_site/static')

app.config['SECRET_KEY'] = 'ccd452749ce4c581add2fb0f73537d59'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///shopping_site.db'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = 'filesystem'

db = SQLAlchemy(app)
CORS(app)
Session(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

from shopping_site import routes