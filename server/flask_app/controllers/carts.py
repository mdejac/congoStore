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


@app.route('/carts/view')
def view_cart():
    if 'user_id' in session:
        cart = Cart.view_cart_by_user_id(session['user_id'])
        all_paid_carts = Cart.get_all_paid_carts_by_user_id(session['user_id'])
        return render_template('cart_view.html', cart=cart, all_paid_carts=all_paid_carts)
    return redirect('/')

@app.route('/carts/<int:cart_id>/product/<int:product_id>/remove')
def remove_product_from_cart(cart_id, product_id):
    if 'user_id' in session:
        Cart.remove_item_from_cart({'cart_id':cart_id, 'product_id':product_id})
        cart = Cart.view_cart_by_user_id(session['user_id'])
        return render_template('cart_view.html', cart=cart)
    return redirect('/')

@app.route('/carts/checkout')
def checkout_cart_submit():
    if 'user_id' in session:
        Cart.checkout_cart_for_user_id(session['user_id'])
        return redirect('/carts/view')
    return redirect('/')