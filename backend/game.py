
class Game:
    def __init__(self):
        self.board = [
            [None, None, None],
            [None, None, None],
            [None, None, None],
        ]

        self.finished = False

        # cache for get_best_move()
        self.win_map = {}
    