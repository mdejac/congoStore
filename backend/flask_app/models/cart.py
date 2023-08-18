from flask_app.config.mysqlconnection import connectToMySQL
from flask_app.models import user
from flask_app.models import product
from flask import flash, session

class Cart:
    db = 'congo_schema'

    def __init__(self, data):
        self.id = data['id']
        self.user_id = data['user_id']
        self.isPaid = data['isPaid']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.creator = None
        self.products = []