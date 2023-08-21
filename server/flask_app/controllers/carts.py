from flask import Flask, render_template, request, redirect, session

from flask_app.models.cart import Cart
from flask_app.models.user import User
from flask_app.models.product import Product
from flask_app.models.review import Review
from flask_app import app

@app.route('/carts/view/<int:user_id>')
def view_cart(user_id):
    if 'user_id' in session:
        cart = Cart.view_cart_by_user_id(user_id)
        return render_template('cart_view.html', cart=cart)
    return redirect('/')