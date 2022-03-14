from shopping_site import db, login_manager
from datetime import datetime
from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    shopping_id = db.Column(db.Integer, nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    name = db.Column(db.String(20), nullable=False)




class Items(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String, unique=True, nullable=False)
    popularity = db.Column(db.Integer, nullable=False)
    tag = db.Column(db.String)
    texture = db.Column(db.String)
    roast_style = db.Column(db.String)
    taste = db.Column(db.String)
    cost = db.Column(db.Integer, nullable=False)

class Shopping_carts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_shopping_id = db.Column(db.Integer, nullable=False)
    items = db.Column(db.PickleType)

