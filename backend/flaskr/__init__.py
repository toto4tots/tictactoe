
from flask import Flask, jsonify, request, abort
from game import Game
from helper import is_valid, get_best_move, has_won
from flask_cors import CORS
from constants import DRAW_MESSAGE, LOST_MESSAGE, INVALID_MOVE

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
                            'player2': [player2[0], player2[1]],
                            'message': LOST_MESSAGE
                        })
                    else:
                        # something weird happened
                        abort(422)
                # draw
                elif all(c is not None for row in game.board for c in row):
                    game.finished = True
                    return jsonify({
                        'success': True,
                        'gameFinished': True,
                        'player2': None,
                        'message': DRAW_MESSAGE
                    })

                # The game has not finished
                # Both players' moves were updated successfully
                return jsonify({
                    'success': True,
                    'gameFinished': False,
                    'player2': [player2[0], player2[1]]
                })
            # invalid move
            abort(422, description=INVALID_MOVE)
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
    
    @app.errorhandler(422)
    def unprocessable(error):
        return jsonify({
            'error': 422,
            'message': error.description
        }), 422
    
    return app


