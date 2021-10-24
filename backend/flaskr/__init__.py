
from flask import Flask, jsonify, request
from game import Game
from helper import is_valid

def create_app():
    app = Flask(__name__)
    game = Game()

    @app.route('/board', methods=['POST'])
    def update_board():
        body = request.get_json()
        x, y = body['move']
        if is_valid(x) and is_valid(y) and game.board[x][y] == None:
            game.board[x][y] = "X"
            return jsonify({
                'success': True
            })

        return jsonify({
            'success': False
        })

    @app.route('/reset', methods=['POST'])
    def reset_board():
        game.board = [
            [None, None, None],
            [None, None, None],
            [None, None, None],
        ]
        return jsonify({
            'success': True
        })
    
    return app


