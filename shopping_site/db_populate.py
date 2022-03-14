from shopping_site import app, db, bcrypt
from shopping_site.models import User, Items
import csv

file = open('items.csv')

csvreader = csv.reader(file)

def generate_list():
    items_list = []

    for row in csvreader:
        items_list.append(row)
    return items_list

def addItem(item_name, popularity, tag, texture, roast_style, taste, cost):
    item = Items(item_name=item_name, popularity=popularity, tag=tag,
                 texture=texture, roast_style=roast_style, taste=taste, cost=cost)
    db.session.add(item)
    db.session.commit()



def populate_database(items_list):
    for item in items_list:
        addItem(item[0], item[1], item[2], item[3], item[4], item[5], item[6])

populate_database(generate_list())


def addUser(shopping_id, username, password, name):
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User(shopping_id=shopping_id, username=username, password=hashed_password, name=name)
    db.session.add(user)
    db.session.commit()

#addUser(1,'Dmandls2','password','Daniel')