import os
import codecs
import secrets
import csv
from collections import Counter
import flask
from flask_mail import Message
from flask import Flask, render_template, url_for, flash, redirect, request, abort, send_file, session
from shopping_site.forms import LoginForm
from shopping_site.models import User, Items, Shopping_carts
from shopping_site import app, db, bcrypt, login_manager
from flask_login import login_user, current_user, login_required
import flask_cors
from flask_cors import CORS



@app.route("/", methods=['GET', 'POST'])
def home():

    return
@app.route("/about")
def about():

    return

@app.route("/product-add")
def product_add():

    return

@app.route("/coffee", methods=['GET', 'POST'])
def coffee():
    coffee_image = './images/coffee.png'
    coffees = flask.jsonify({"coffee_list": [{'id':1, 'name':'coffee1', 'flavor':'flavor1', 'image':coffee_image},
                                             {'id':2, 'name':'coffee2', 'flavor':'flavor2', 'image':coffee_image}]})
    coffees.headers.add('Access-Control-Allow-Origin', '*')
    return coffees

@app.route("/shopping", methods=['GET', 'POST'])
def shopping():
    search = request.get_json()
    shopping_items = Items.query.all()
    payload = []
    for item in shopping_items:
        package = {}
        package['id'] = item.id
        package['item_name'] = item.item_name
        package['popularity'] = item.popularity
        package['tag'] = item.tag
        package['texture'] = item.texture
        package['roast_style'] = item.roast_style
        package['taste'] = item.taste
        package['cost'] = item.cost
        payload.append(package)
    items = flask.jsonify({"items": payload})
    items.headers.add('Access-Control-Allow-Origin', '*')
    return items

@app.route("/add_item_to_cart", methods=['GET', 'POST'])
@flask_cors.cross_origin()
def add_item_to_cart():
    if current_user.is_authenticated:
        item_id = request.get_json()
        item = Items.query.filter_by(id=item_id)
        user_id = current_user.id
        print(user_id)
        user = User.query.filter_by(id=user_id)
        if db.session.query(Shopping_carts.user_shopping_id).filter_by(user.shopping_id).first() is not None:
            cart = Shopping_carts.query.filter_by(user_shopping_id=user.shopping_id)
            cart.items.append(item)
            db.session.commit()
        else:
            new_cart = Shopping_carts(user_shopping_id=user.shopping_id, items=[])
            new_cart.items.append(item)
            db.session.commit()
        items = flask.jsonify({"items": 'worked'})
        return items
    else:
        print('is not authenticated')
        items = flask.jsonify({"items": 'worked'})
        return items

# @app.route("/shopping_cart", methods=['GET', 'POST'])
# @flask_cors.cross_origin()
# @login_required
# def shopping_cart():
#     user_id = current_user.id
#     user = User.query.filter_by(id=user_id)
#     cart = Shopping_carts.query.filter_by(user_shopping_id=user.shopping_id)

@app.route("/shopping_cart_icon", methods=['GET', 'POST'])
@flask_cors.cross_origin()
def shopping_cart():
    if current_user.is_authenticated:
        user_id = current_user.id
        user = User.query.filter_by(id=user_id)
        cart = Shopping_carts.query.filter_by(user_shopping_id=user.shopping_id)
        cart_number = flask.jsonify({"cart_amount": len(cart.items)})
        return cart_number
    else:
        cart_number = flask.jsonify({"cart_amount": '0'})
        return cart_number

@app.route("/login", methods=['GET', 'POST'])
@flask_cors.cross_origin()
def login():
    did_login = False
    credentials = request.get_json()
    user = User.query.filter_by(username=credentials['username']).first()
    if user and bcrypt.check_password_hash(user.password, credentials['password']):
        login_user(user)
        did_login = True
        print('login successful')

    else:
        did_login = False
        print('login failed')

    payload = flask.jsonify({'login': did_login})
    return payload

@app.route("/isLogin", methods=['GET', 'POST'])
@flask_cors.cross_origin()
def isLogin():
    if current_user.is_authenticated:
        user_id = current_user.id
        user = User.query.filter_by(id=user_id)
        if session.get(user.username):
            items = flask.jsonify({"isLogin": True})
            return items
        else:
            items = flask.jsonify({"payload": False})
            return items
    else:
        items = flask.jsonify({"payload": False})
        return items
