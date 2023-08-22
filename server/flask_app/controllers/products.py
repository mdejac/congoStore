from flask import Flask, render_template, request, redirect, session

from flask_app.models.user import User
from flask_app.models.product import Product
from flask_app import app

@app.route('/products')
def all_products():
    if 'user_id' in session:
        all_products = Product.get_all_products()
        all_products_in_electronics = Product.get_all_products_by_category('electronics')
        all_products_in_furniture = Product.get_all_products_by_category('furniture')
        all_products_in_back_to_school = Product.get_all_products_by_category('back to school')
        all_products_in_computers = Product.get_all_products_by_category('computers')
        return render_template("dashboard.html", all_products_in_electronics=all_products_in_electronics,
                                all_products_in_furniture=all_products_in_furniture, all_products_in_computers=all_products_in_computers,
                                all_products_in_back_to_school=all_products_in_back_to_school)
    return redirect('/')

@app.route('/products/create')
def create_product():
    if 'user_id' in session:
        return render_template("product_create.html")
    return redirect('/')

@app.route('/products/create', methods=['POST'])
def create_product_submit():
    if not Product.add_product(request.form):
        return redirect('/products/create')
    return redirect('/products')

@app.route('/products/view/<int:id>')
def view_product(id):
    if 'user_id' in session:
        product = Product.get_product_by_id(id)
        return render_template('product_view.html', product=product)
    return redirect('/')

@app.route('/products/search', methods=['POST'])
def view_search_results():
    if 'user_id' in session:
        search = request.form.get('search_term')
        product_category_search_results = Product.get_all_products_by_category(search)
        product_description_search_results = Product.get_all_products_by_description_like(search)
        product_name_search_results = Product.get_all_products_by_name(search)
        search_term=search
        return render_template('product_search.html', search_term=search_term, all_products_in_category=product_category_search_results,
                                all_products_in_description=product_description_search_results, all_products_in_name=product_name_search_results)
    return redirect('/')

@app.route('/products/delete/<int:id>')
def delete_product(id):
    if 'user_id' in session:
        product=Product.get_product_by_id(id)
        if session['user_id'] == product.creator.id:
            product.delete_product(id)
        return redirect('/users/profile')
    return redirect('/')

@app.route('/products/edit/<int:id>')
def edit_product(id):
    if 'user_id' in session:
        product=Product.get_product_by_id(id)
        if session['user_id'] == product.creator.id:
            return render_template('product_edit.html', product=product)
        return redirect('/products')
    return redirect('/')

@app.route('/products/edit', methods=['PUT', 'POST'])
def edit_product_submit():
    if Product.edit_product(request.form):
        return redirect('/users/profile')
    return redirect(f'/products/edit/{request.form["id"]}')