from helper import has_won, get_best_move
from game import Game

'''
TESTS
'''

def test_has_won():
    board1 = [
        ["X", "O", "X"],
        ["O", "X", "X"],
        ["O", "X", "O"],
    ]
    board2 = [
        ["X", "O", "X"],
        ["O", "X", "X"],
        ["X", "X", "O"],
    ]
    board3 = [
        ["X", "O", "X"],
        ["O", "O", "X"],
        ["O", "O", "O"],
    ]    
    assert has_won(board1) == [False, None]
    assert has_won(board2) == [True, "X"]
    assert has_won(board3) == [True, "O"]

def test_get_best_move():
    WIN = 1
    DRAW = 0
    LOSE = -1

    board1 = [
        ["X", None, None],
        [None, None, None],
        [None, None, None],
    ]
    board2 = [
        [None, "O", "X"],
        ["O", "X", "X"],
        ["O", "X", "O"],
    ]
    board3 = [
        ["X", "O", None],
        ["O", "O", None],
        ["X", None, "X"],
    ]
    g = Game()
    assert get_best_move(board1, "O", g.win_map) == (DRAW, [1, 1])
    assert get_best_move(board2, "O", g.win_map) == (WIN, [0, 0])
    assert get_best_move(board3, "X", g.win_map) == (WIN, [2, 1])
