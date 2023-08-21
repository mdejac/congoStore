from flask import Flask, render_template, request, redirect, session, jsonify, Response, flash, json
from flask_app.models.cart import Cart
from flask_app import app
from flask_cors import CORS

CORS(app, resources={r"/api/carts/*": {"origins": "http://localhost:5173"}})

@app.route('/api/carts/add_product', methods=['POST'])
def add_product_to_cart_api():
    data = request.get_json()
    return Cart.add_to_cart_api(data)

@app.route('/api/carts/view/<int:user_id>')
def view_cart_api(user_id):
    return Cart.view_cart_by_user_id_api(user_id)

@app.route('/api/carts/edit', methods=['POST'])
def edit_cart_api():
    data = request.get_json()
    return Cart.edit_cart_api(data)