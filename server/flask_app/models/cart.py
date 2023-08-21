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
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.products_in_cart = []

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
        
        get_cart_query = """SELECT id FROM carts WHERE user_id = %(user_id)s AND isPaid = 'false';"""
        get_cart_result = connectToMySQL(cls.db).query_db(get_cart_query, data)
        if get_cart_result == ():
            create_cart_query = """INSERT INTO carts (user_id, isPaid) VALUES (%(user_id)s, %(isPaid)s);"""
            data['isPaid'] = 'false'
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
    def view_cart_by_id_api(cls, cart_id):
        data = {'cart_id': cart_id}
        query = """SELECT carts.*,
                   GROUP_CONCAT(products.id SEPARATOR ',') AS product_ids,
                   GROUP_CONCAT(products.user_id SEPARATOR ',') AS product_user_ids,
                   GROUP_CONCAT(products.name SEPARATOR ',') AS product_names,
                   GROUP_CONCAT(products.description SEPARATOR ',') AS product_descriptions,
                   GROUP_CONCAT(products.category SEPARATOR ',') AS product_categories,
                   GROUP_CONCAT(products.quantity SEPARATOR ',') AS product_quantities,
                   GROUP_CONCAT(products_in_carts.quantity_to_purchase SEPARATOR ',') AS product_quantities_in_cart,
                   GROUP_CONCAT(products.price SEPARATOR ',') AS product_prices,
                   GROUP_CONCAT(products.img_url SEPARATOR ',') AS product_img_urls,
                   GROUP_CONCAT(products.created_at SEPARATOR ',') AS product_created_ats,
                   GROUP_CONCAT(products.updated_at SEPARATOR ',') AS product_updated_ats
                   FROM carts
                   LEFT JOIN products_in_carts ON carts.id = products_in_carts.cart_id
                   LEFT JOIN products ON products_in_carts.product_id = products.id
                   WHERE carts.id = %(cart_id)s
                   GROUP BY carts.id;"""
        results = connectToMySQL(cls.db).query_db(query, data)
        if results == ():
            return {'message' : 'Request error', 'errors' : ['Cart does not exist']}

        cart = cls(results[0])
        product_ids = results[0]['product_ids'].split(',') if results[0]['product_ids'] else ''
        product_user_ids = results[0]['product_user_ids'].split(',') if results[0]['product_user_ids'] else ''
        product_names = results[0]['product_names'].split(',') if results[0]['product_names'] else ''
        product_descriptions = results[0]['product_descriptions'].split(',') if results[0]['product_descriptions'] else ''
        product_categories = results[0]['product_categories'].split(',') if results[0]['product_categories'] else ''
        product_quantities = results[0]['product_quantities'].split(',') if results[0]['product_quantities'] else ''
        product_quantities_in_cart = results[0]['product_quantities_in_cart'].split(',') if results[0]['product_quantities_in_cart'] else ''
        product_prices = results[0]['product_prices'].split(',') if results[0]['product_prices'] else ''
        product_img_urls = results[0]['product_img_urls'].split(',') if results[0]['product_img_urls'] else ''
        product_created_ats = results[0]['product_created_ats'].split(',') if results[0]['product_created_ats'] else ''
        product_updated_ats = results[0]['product_updated_ats'].split(',') if results[0]['product_updated_ats'] else ''
        
        for i in range(len(product_ids)):
            product_data = {
                'id': product_ids[i],
                'user_id': product_user_ids[i],
                'name': product_names[i],
                'description': product_descriptions[i],
                'category': product_categories[i],
                'quantity': product_quantities[i],
                'quantity_to_purchase': product_quantities_in_cart[i],
                'price': product_prices[i],
                'img_url': product_img_urls[i],
                'created_at': product_created_ats[i],
                'updated_at': product_updated_ats[i],
            }
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
    def checkout_cart_by_id_api(cls, cart_id):
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