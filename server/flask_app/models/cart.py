from flask_app.config.mysqlconnection import connectToMySQL
from flask_app.models import user
from flask_app.models import product
from flask import flash, session, jsonify

class Cart:
    db = 'congo_schema'

    def __init__(self, data):
        self.id = data['id']
        self.user_id = data['user_id']
        self.isPaid = data['isPaid']
        self.total = 0.00
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.products_in_cart = []

    @classmethod
    def add_to_cart(cls, data):
        data = {'user_id' : session['user_id'],
                'product_id': data['product_id'],
                'quantity_to_purchase' : data['quantity_to_purchase']
        }
        
        get_cart_query = """SELECT id FROM carts WHERE user_id = %(user_id)s AND isPaid = False;"""
        get_cart_result = connectToMySQL(cls.db).query_db(get_cart_query, data)
        if get_cart_result == ():
            create_cart_query = """INSERT INTO carts (user_id) VALUES (%(user_id)s);"""
            cart_id = connectToMySQL(cls.db).query_db(create_cart_query, data)
        else:
            cart_id = get_cart_result[0]['id']

        data['cart_id'] = cart_id
        product_in_cart_query = """SELECT * FROM products_in_carts WHERE cart_id = %(cart_id)s AND product_id = %(product_id)s;"""
        product_in_cart_result = connectToMySQL(cls.db).query_db(product_in_cart_query, data)
        if product_in_cart_result == () or product_in_cart_result == False:
            add_item_to_cart_query = """INSERT INTO products_in_carts (cart_id, product_id, quantity_to_purchase)
                                        VALUES (%(cart_id)s, %(product_id)s, %(quantity_to_purchase)s);"""
            connectToMySQL(cls.db).query_db(add_item_to_cart_query, data)
        else:
            data['quantity_to_purchase'] = int(data['quantity_to_purchase']) + int(product_in_cart_result[0]['quantity_to_purchase'])
            update_item_in_cart_quantity = """UPDATE products_in_carts SET
                                              quantity_to_purchase = %(quantity_to_purchase)s
                                              WHERE cart_id = %(cart_id)s AND product_id = %(product_id)s;"""
            connectToMySQL(cls.db).query_db(update_item_in_cart_quantity, data)
        return_cart_query = """SELECT * FROM carts WHERE id = %(cart_id)s;"""
        return_cart = connectToMySQL(cls.db).query_db(return_cart_query, {'cart_id' : cart_id})    
        
        return return_cart

    @classmethod
    def view_cart_by_user_id(cls, user_id):
        data = {'user_id': user_id}
        query = """SELECT carts.*,
                   GROUP_CONCAT(products.id SEPARATOR '^') AS product_ids,
                   GROUP_CONCAT(products.user_id SEPARATOR '^') AS product_user_ids,
                   GROUP_CONCAT(products.name SEPARATOR '^') AS product_names,
                   GROUP_CONCAT(products.description SEPARATOR '^') AS product_descriptions,
                   GROUP_CONCAT(products.category SEPARATOR '^') AS product_categories,
                   GROUP_CONCAT(products.quantity SEPARATOR '^') AS product_quantities,
                   GROUP_CONCAT(products_in_carts.quantity_to_purchase SEPARATOR '^') AS product_quantities_in_cart,
                   GROUP_CONCAT(products.price SEPARATOR '^') AS product_prices,
                   GROUP_CONCAT(products.img_url SEPARATOR '^') AS product_img_urls,
                   GROUP_CONCAT(products.created_at SEPARATOR '^') AS product_created_ats,
                   GROUP_CONCAT(products.updated_at SEPARATOR '^') AS product_updated_ats
                   FROM carts
                   LEFT JOIN products_in_carts ON carts.id = products_in_carts.cart_id
                   LEFT JOIN products ON products_in_carts.product_id = products.id
                   WHERE carts.user_id = %(user_id)s AND carts.isPaid = False
                   GROUP BY carts.id;"""
        results = connectToMySQL(cls.db).query_db(query, data)
        if results == ():
            return []

        cart = cls(results[0])
        product_ids = results[0]['product_ids'].split('^') if results[0]['product_ids'] else ''
        product_user_ids = results[0]['product_user_ids'].split('^') if results[0]['product_user_ids'] else ''
        product_names = results[0]['product_names'].split('^') if results[0]['product_names'] else ''
        product_descriptions = results[0]['product_descriptions'].split('^') if results[0]['product_descriptions'] else ''
        product_categories = results[0]['product_categories'].split('^') if results[0]['product_categories'] else ''
        product_quantities = results[0]['product_quantities'].split('^') if results[0]['product_quantities'] else ''
        product_quantities_in_cart = results[0]['product_quantities_in_cart'].split('^') if results[0]['product_quantities_in_cart'] else ''
        product_prices = results[0]['product_prices'].split('^') if results[0]['product_prices'] else ''
        product_img_urls = results[0]['product_img_urls'].split('^') if results[0]['product_img_urls'] else ''
        product_created_ats = results[0]['product_created_ats'].split('^') if results[0]['product_created_ats'] else ''
        product_updated_ats = results[0]['product_updated_ats'].split('^') if results[0]['product_updated_ats'] else ''
        
        for i in range(len(product_ids)):
            product_data = {
                'id': product_ids[i],
                'user_id': product_user_ids[i],
                'name': product_names[i],
                'description': product_descriptions[i],
                'category': product_categories[i],
                'quantity': int(product_quantities[i]),
                'quantity_to_purchase': int(product_quantities_in_cart[i]),
                'price': float(product_prices[i]),
                'img_url': product_img_urls[i],
                'created_at': product_created_ats[i],
                'updated_at': product_updated_ats[i],
            }
            cart.total = cart.total + product_data['quantity_to_purchase'] * product_data['price']
            cart.products_in_cart.append(product.Product(product_data))
               
        return cart
    
    @classmethod
    def get_all_paid_carts_by_user_id(cls, user_id):
        data = {'user_id': user_id}
        query = """SELECT carts.*,
                   GROUP_CONCAT(products.id SEPARATOR '^') AS product_ids,
                   GROUP_CONCAT(products.user_id SEPARATOR '^') AS product_user_ids,
                   GROUP_CONCAT(products.name SEPARATOR '^') AS product_names,
                   GROUP_CONCAT(products.description SEPARATOR '^') AS product_descriptions,
                   GROUP_CONCAT(products.category SEPARATOR '^') AS product_categories,
                   GROUP_CONCAT(products.quantity SEPARATOR '^') AS product_quantities,
                   GROUP_CONCAT(products_in_carts.quantity_to_purchase SEPARATOR '^') AS product_quantities_in_cart,
                   GROUP_CONCAT(products.price SEPARATOR '^') AS product_prices,
                   GROUP_CONCAT(products.img_url SEPARATOR '^') AS product_img_urls,
                   GROUP_CONCAT(products.created_at SEPARATOR '^') AS product_created_ats,
                   GROUP_CONCAT(products.updated_at SEPARATOR '^') AS product_updated_ats
                   FROM carts
                   LEFT JOIN products_in_carts ON carts.id = products_in_carts.cart_id
                   LEFT JOIN products ON products_in_carts.product_id = products.id
                   WHERE carts.user_id = %(user_id)s AND carts.isPaid = True
                   GROUP BY carts.id;"""
        results = connectToMySQL(cls.db).query_db(query, data)
        all_carts = []
        for result in results:
            one_cart = cls(result)
            product_ids = result['product_ids'].split('^') if result['product_ids'] else ''
            product_user_ids = result['product_user_ids'].split('^') if result['product_user_ids'] else ''
            product_names = result['product_names'].split('^') if result['product_names'] else ''
            product_descriptions = result['product_descriptions'].split('^') if result['product_descriptions'] else ''
            product_categories = result['product_categories'].split('^') if result['product_categories'] else ''
            product_quantities = result['product_quantities'].split('^') if result['product_quantities'] else ''
            product_quantities_in_cart = result['product_quantities_in_cart'].split('^') if result['product_quantities_in_cart'] else ''
            product_prices = result['product_prices'].split('^') if result['product_prices'] else ''
            product_img_urls = result['product_img_urls'].split('^') if result['product_img_urls'] else ''
            product_created_ats = result['product_created_ats'].split('^') if result['product_created_ats'] else ''
            product_updated_ats = result['product_updated_ats'].split('^') if result['product_updated_ats'] else ''
            
            for i in range(len(product_ids)):
                product_data = {
                    'id': product_ids[i],
                    'user_id': product_user_ids[i],
                    'name': product_names[i],
                    'description': product_descriptions[i],
                    'category': product_categories[i],
                    'quantity': int(product_quantities[i]),
                    'quantity_to_purchase': int(product_quantities_in_cart[i]),
                    'price': float(product_prices[i]),
                    'img_url': product_img_urls[i],
                    'created_at': product_created_ats[i],
                    'updated_at': product_updated_ats[i],
                }
                one_cart.total = one_cart.total + product_data['quantity_to_purchase'] * product_data['price']
                one_cart.products_in_cart.append(product.Product(product_data))

            all_carts.append(one_cart)
        return all_carts
    
    @classmethod
    def checkout_cart_for_user_id(cls,user_id):
        current_cart = Cart.view_cart_by_user_id(user_id)
        data = {
            'cart_id': current_cart.id
        }
        set_isPaid_query = """UPDATE carts SET
                            isPaid = True
                            WHERE id = %(cart_id)s;"""
        connectToMySQL(cls.db).query_db(set_isPaid_query, data)
    # API specific methods
    
    @classmethod
    def add_to_cart_api(cls, data):
        data = {'user_id' : data['user_id'],
                'product_id': data['product_id'],
                'quantity_to_purchase' : data['quantity_to_purchase']
        }

        if not user.User.isValid_user_id(data['user_id']):
            return {'message' : 'Request error', 'errors' : ['User does not exist']}
        
        if not product.Product.isValid_product_id(data['product_id']):
            return {'message' : 'Request error', 'errors' : ['Product does not exist']}
        
        get_cart_query = """SELECT id FROM carts WHERE user_id = %(user_id)s AND isPaid = False;"""
        get_cart_result = connectToMySQL(cls.db).query_db(get_cart_query, data)
        if get_cart_result == ():
            create_cart_query = """INSERT INTO carts (user_id) VALUES (%(user_id)s);"""
            cart_id = connectToMySQL(cls.db).query_db(create_cart_query, data)
        else:
            cart_id = get_cart_result[0]['id']

        data['cart_id'] = cart_id
        product_in_cart_query = """SELECT * FROM products_in_carts WHERE cart_id = %(cart_id)s AND product_id = %(product_id)s;"""
        product_in_cart_result = connectToMySQL(cls.db).query_db(product_in_cart_query, data)
        if product_in_cart_result == () or product_in_cart_result == False:
            add_item_to_cart_query = """INSERT INTO products_in_carts (cart_id, product_id, quantity_to_purchase)
                                        VALUES (%(cart_id)s, %(product_id)s, %(quantity_to_purchase)s);"""
            connectToMySQL(cls.db).query_db(add_item_to_cart_query, data)
        else:
            data['quantity_to_purchase'] = data['quantity_to_purchase'] + product_in_cart_result[0]['quantity_to_purchase']
            update_item_in_cart_quantity = """UPDATE products_in_carts SET
                                              quantity_to_purchase = %(quantity_to_purchase)s
                                              WHERE cart_id = %(cart_id)s AND product_id = %(product_id)s;"""
            connectToMySQL(cls.db).query_db(update_item_in_cart_quantity, data)
        return_cart_query = """SELECT * FROM carts WHERE id = %(cart_id)s;"""
        return_cart = connectToMySQL(cls.db).query_db(return_cart_query, {'cart_id' : cart_id})    
        
        return jsonify({'success' : True, 'cart_data' : return_cart})
    
    @classmethod
    def view_cart_by_user_id_api(cls, user_id):
        data = {'user_id': user_id}
        query = """SELECT carts.*,
                   GROUP_CONCAT(products.id SEPARATOR '^') AS product_ids,
                   GROUP_CONCAT(products.user_id SEPARATOR '^') AS product_user_ids,
                   GROUP_CONCAT(products.name SEPARATOR '^') AS product_names,
                   GROUP_CONCAT(products.description SEPARATOR '^') AS product_descriptions,
                   GROUP_CONCAT(products.category SEPARATOR '^') AS product_categories,
                   GROUP_CONCAT(products.quantity SEPARATOR '^') AS product_quantities,
                   GROUP_CONCAT(products_in_carts.quantity_to_purchase SEPARATOR '^') AS product_quantities_in_cart,
                   GROUP_CONCAT(products.price SEPARATOR '^') AS product_prices,
                   GROUP_CONCAT(products.img_url SEPARATOR '^') AS product_img_urls,
                   GROUP_CONCAT(products.created_at SEPARATOR '^') AS product_created_ats,
                   GROUP_CONCAT(products.updated_at SEPARATOR '^') AS product_updated_ats
                   FROM carts
                   LEFT JOIN products_in_carts ON carts.id = products_in_carts.cart_id
                   LEFT JOIN products ON products_in_carts.product_id = products.id
                   WHERE carts.user_id = %(user_id)s AND carts.isPaid = False
                   GROUP BY carts.id;"""
        results = connectToMySQL(cls.db).query_db(query, data)
        if results == ():
            return {'message' : 'Request error', 'errors' : ['Cart does not exist']}

        cart = cls(results[0])
        product_ids = results[0]['product_ids'].split('^') if results[0]['product_ids'] else ''
        product_user_ids = results[0]['product_user_ids'].split('^') if results[0]['product_user_ids'] else ''
        product_names = results[0]['product_names'].split('^') if results[0]['product_names'] else ''
        product_descriptions = results[0]['product_descriptions'].split('^') if results[0]['product_descriptions'] else ''
        product_categories = results[0]['product_categories'].split('^') if results[0]['product_categories'] else ''
        product_quantities = results[0]['product_quantities'].split('^') if results[0]['product_quantities'] else ''
        product_quantities_in_cart = results[0]['product_quantities_in_cart'].split('^') if results[0]['product_quantities_in_cart'] else ''
        product_prices = results[0]['product_prices'].split('^') if results[0]['product_prices'] else ''
        product_img_urls = results[0]['product_img_urls'].split('^') if results[0]['product_img_urls'] else ''
        product_created_ats = results[0]['product_created_ats'].split('^') if results[0]['product_created_ats'] else ''
        product_updated_ats = results[0]['product_updated_ats'].split('^') if results[0]['product_updated_ats'] else ''
        
        for i in range(len(product_ids)):
            product_data = {
                'id': product_ids[i],
                'user_id': product_user_ids[i],
                'name': product_names[i],
                'description': product_descriptions[i],
                'category': product_categories[i],
                'quantity': int(product_quantities[i]),
                'quantity_to_purchase': int(product_quantities_in_cart[i]),
                'price': float(product_prices[i]),
                'img_url': product_img_urls[i],
                'created_at': product_created_ats[i],
                'updated_at': product_updated_ats[i],
            }
            cart.total = cart.total + product_data['quantity_to_purchase'] * product_data['price']
            cart.products_in_cart.append(product.Product(product_data))
               
        return cls.serialize_cart(cart)
    
    @classmethod
    def edit_cart_api(cls, data):
        data = {
            "cart_id" : data['cart_id'],
            "product_id" : data['product_id'],
            "quantity_to_purchase" : data['quantity_to_purchase']
        }
        if not data['quantity_to_purchase'] == 0:
            update_item_in_cart_quantity = """UPDATE products_in_carts SET
                                            quantity_to_purchase = %(quantity_to_purchase)s
                                            WHERE cart_id = %(cart_id)s AND product_id = %(product_id)s;"""
            connectToMySQL(cls.db).query_db(update_item_in_cart_quantity, data)
        else:
            cls.remove_item_from_cart(data)
        return_cart_query = """SELECT * FROM carts WHERE id = %(cart_id)s;"""
        return_cart = connectToMySQL(cls.db).query_db(return_cart_query, {'cart_id' : data['cart_id']})    
        
        return jsonify({'success' : True, 'cart_data' : return_cart})

    @classmethod
    def empty_cart_api(cls, data):
        query = """DELETE FROM products_in_carts
                   WHERE cart_id = %(id)s;"""
        connectToMySQL(cls.db).query_db(query,{'id':data['cart_id']})

    @classmethod
    def remove_item_from_cart(cls, data):
        data = {
            "cart_id" : data['cart_id'],
            "product_id" : data['product_id']
        }
        query = """DELETE FROM products_in_carts
                   WHERE cart_id = %(cart_id)s AND product_id = %(product_id)s;"""
        connectToMySQL(cls.db).query_db(query, data)

    @classmethod
    def view_paid_carts_by_user_id_api(cls, user_id):
        pass

    @classmethod
    def checkout_cart_by_id_api(cls, user_id):
        pass

    @staticmethod
    def serialize_cart(cart):
        serialized_data = {
                'id': cart.id,
                'user_id': cart.user_id,
                'isPaid' : cart.isPaid,
                'created_at': cart.created_at,
                'updated_at': cart.updated_at,
                'products_in_cart': [product.Product.serialize_product_for_cart(this_product) for this_product in cart.products_in_cart]
        }
        return serialized_data