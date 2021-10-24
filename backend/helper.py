
def has_won_helper(moves):
    return (moves[0] == "O" or moves[0] == "X") and all(x == moves[0] for x in moves)

def has_won(board):
    for i in range(3):
        if has_won_helper([board[i][0], board[i][1], board[i][2]]):
            return [True, board[i][0]]
    for i in range(3):
        if has_won_helper([board[0][i], board[1][i], board[2][i]]):
            return [True, board[0][i]]

    # diagonals
    if has_won_helper([board[0][0], board[1][1], board[2][2]]):
        return [True, board[0][0]]

    if has_won_helper([board[0][2], board[1][1], board[2][0]]):
        return [True, board[0][2]]

    return [False, None]

def get_best_move(board):
    pass