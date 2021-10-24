
from flask import Flask, jsonify
from game import Game

def create_app():
    app = Flask(__name__)
    game = Game()

    @app.route('/board')
    def update_board():
        return jsonify({
            'success': True
        })

    @app.route('/reset')
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


