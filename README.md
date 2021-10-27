# Tic-Tac-Toe
Basic Rules
   * The program should win or draw, but never lose.
   * The human player should make the first move.
   * The program should announce the result of the game before clearing the board for 
     another round of play.

## Getting Started
Both the frontend and backend must be running <br />
Frontend
```
cd frontend
npm install
npm start
```
Backend
```
cd backend
pip3 install requirements.txt
export FLASK_APP=flaskr
flask run
```
## Guarentee Win or Draw for P2
P1 = Player 1 <br />
P2 = Player 2

One of the features of this Tic-Tac-Toe game is that the program will never lose.
To make things easier to explain how this was done, let’s first look at a simpler scenario. Let’s say a move results in only two possibilities for the opponent. 
P1 makes move A and P2 has two possible moves b1 and b2. We can describe the situation as a tree like this
```
P1       A
      /     \ 
P2  b1       b2
```
Let's also say if P2 chooses b1 then P1 wins but if P2 chooses b2 P2 wins. 
So in this case, either player can win depending on what P2 chooses. However, let’s assume that a player will always choose the best option for themselves. P2 will always choose b2 here. This means that when P1 made move A, P1 has essentially "guaranteed" P2's win. We can apply the same logic to a tree that has more nesting
```
P1            A
           /     \ 
P2       b1       b2
        /  \     /  \
P1   c1    c2  c3    c4
```
In this case, it is unclear whether b1 or b2 will give a more favorable result to P2 without looking at the possibilities that P1 could make next (c1, c2, c3, c4). By looking at the leaves we can rewrite the tree
```
P1            A
           /     \ 
P2       b1       b2
        /  \     /  \
P1     L    W   D    W
W = Move where Player 2 wins
D = Move where it’s a draw
L = Move where Player 2 loses
```
So what does this imply about P1's potential moves? We can focus on each move subtree. 
```
P2       b2 
        /  \ 
P1     D    W  
```
For example, P2 can draw or win here depending on what P1 chooses. P1 would want the better option for themselves so P1 would pick to draw. Hence, we know that if P2 picks b2, the game will end in a draw. If we carry this same logic to b1, the tree would look like this
```
IN CONTEXT OF P2

P1            A
           /     \ 
P2        L       D
        /   \   /   \
P1     L     W D     W

```
We can further simplify the tree
```
P1       A 
       /   \ 
P2    L     D
```
Now it's more clear that P2 has two moves where one will result in a loss and another will result in a draw. Hence, in our current scenario, the best option for P2 would be to pick move b2 to get a draw. 
<br /> 
<br /> 
This is the basic idea that was used to find a move that would guarantee at least a draw. When the human player makes a move, the program looks at all the remaining options and finds the one that will eventually lead to the most favorable result. While there are usually more than two possible moves that the opponent can make in this game, the general concept remains the same.

## Testing
A small number of tests were written to test the game logic <br /> 
To run
```
cd backend
pytest tests.py
```