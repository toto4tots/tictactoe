
from flask import Flask, jsonify, request
from game import Game
from helper import is_valid, get_best_move, has_won
from flask_cors import CORS
#TODO Add proper errors

def create_app():
    app = Flask(__name__)
    CORS(app)
    game = Game()

    @app.route('/board', methods=['POST'])
    def update_board():
        if not game.finished:
            body = request.get_json()
            x, y = body['move']
            if is_valid(x) and is_valid(y) and game.board[x][y] == None:
                game.board[x][y] = "X"
                player2 = get_best_move(game.board, "O", game.win_map)[1]
                if player2:
                    game.board[player2[0]][player2[1]] = "O"
                
                status = has_won(game.board)
                if status[0]:
                    if status[1] == "O":
                        game.finished = True
                        return jsonify({
                            'success': True,
                            'gameFinished': True,
                            'player2': [player2[0], player2[1]]
                        })
                    else:
                        # something weird happened
                        return jsonify({
                            'success': False
                        })
                # draw
                elif all(c is not None for row in game.board for c in row):
                    game.finished = True
                    return jsonify({
                        'success': True,
                        'gameFinished': True,
                        'player2': None
                    })

                # The game has not finished
                # Both players' moves were updated successfully
                return jsonify({
                    'success': True,
                    'gameFinished': False,
                    'player2': [player2[0], player2[1]]
                })
            return jsonify({
                'success': False
            })
        else:
            # game is finished
            # do nothing
            return jsonify({
                'success': True
            })            

    @app.route('/reset', methods=['POST'])
    def reset_board():
        game.finished = False
        game.board = [
            [None, None, None],
            [None, None, None],
            [None, None, None],
        ]
        return jsonify({
            'success': True
        })
    
    return app


