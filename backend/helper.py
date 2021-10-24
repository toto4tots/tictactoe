
WIN = 1
DRAW = 0
LOSE = -1

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

def get_best_move(board, curr, win_map):
    state = (tuple(tuple(row) for row in board), curr)
    if state in win_map:
        return win_map[state]

    status = has_won(board)
    opp = "X" if curr == "O" else "O"
    if status[0]:
        if status[1] == curr:
            return (WIN, None)
        if status[1] == opp:
            return (LOSE, None)
    if all(c is not None for row in board for c in row):
        return (DRAW, None)
    
    best_result = -2 # for easier debugging
    best_pos = None
    for i in range(len(board)):
        for j in range(len(board)):
            if board[i][j] is None:
                copy = [x[:] for x in board]
                copy[i][j] = curr
                opp_result, _ = get_best_move(copy, opp, win_map)
                result = -opp_result
                if result > best_result:
                    best_result = result
                    best_pos = [i, j]
    
    # For caching
    win_map[state] = (best_result, best_pos)
    return (best_result, best_pos)


def is_valid(val):
    return val != None and val >= 0 and val < 3