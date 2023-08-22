from flask import Flask, render_template, request, redirect, session

from flask_app.models.cart import Cart
from flask_app.models.user import User
from flask_app.models.product import Product
from flask_app.models.review import Review
from flask_app import app

@app.route('/carts/add_product', methods=['POST'])
def add_product_to_cart():
    data = request.form
    Cart.add_to_cart(data)
    return redirect(f'/products/view/{data["product_id"]}')


@app.route('/carts/view/<int:user_id>')
def view_cart(user_id):
    if 'user_id' in session:
        cart = Cart.view_cart_by_user_id(user_id)
        return render_template('cart_view.html', cart=cart)
    return redirect('/')