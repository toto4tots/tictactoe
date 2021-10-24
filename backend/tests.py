from helper import has_won

'''
TESTS
'''
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

def test_has_won():
    assert has_won(board1) == [False, None]
    assert has_won(board2) == [True, "X"]
    assert has_won(board3) == [True, "O"]
