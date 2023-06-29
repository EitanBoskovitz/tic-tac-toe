# tic-tac-toe

==== RUN INSTRUCTIONS ====
1. clone the project
2. cd into client folder and run npm start
3. cd into server folder and run node index.js
4. open browser with http://localhost:3000/
5. open another instance of browser but in incognito (so the browser doesnt use the same cookies)
6. you have two users (but can create as much as you wish)
6.1 first user: username: 1111 password: 1111
6.2 second user: username: 2222 password: 222
7. start selecting sqaures only when the two players are connected
8. each browser should select one square at a time
9. if a win condition is met, an alert will pop 

====  BASIC FLOW =====
1. a user is created and stored in a stream-chat channel
2. it is given a unique token and userID
3. if a user already exists, you can log in instead
4. the credentials of the user are stored in cookies
5. when a user is logged in, he can choose to enter a lobby with the username of another user
6. we query the username from the stream chat channel db
7. if a user is found, the component is then switched to the game
8. once a user selects a square, a post request is sent to check if the move was legal, and returns the board.
9. a stream chat event listener checks for the request and copies the move to the rival's board
10. a useEffect method is used each time the board changes, and a post request with the current board is sent to check if the game was won
11. if the game was own by a player, the method returns the winning player and the state: won
12. an alert is raised

==== KNOWN BUGS ====
do to lack of time, I have noticed but failed to fix 3 crucial bugs:
1. if you try to set your rival as yourself, the game crushs.
2. the game doesnt block the player, so if he tries to:
2.1 player X presses on more than 1 different squares, they will both be marked with X for player O but not for player X
2.2 player O presses on the X's that player X created after his first mark for each turn, and player O's mark will show where player X set his mark
3. you are still able to play after the game won alert pops

==== Entities and game structured ====
I've used React for frontend and node.js with express for backend, i mainly used the stream-chat library that fits the task very well. ive also used cookies, bcrypt, and uuid.

React: i used it to create the UI and front-end usage for the task, using this framework, i was able to quickly build components that would display both the login page and the game itself.

Node.js: I used node.js with express, to create a connection with the frontend. I wrote routes that would run the logic for the front-end requirement. usages included creating a user with encrypted ID and hashed password, checking if a user exists when he tries to log in, changing the state of the tic-tac-toe board, and checking for win conditions.

Stream-chat: youll find that stream chat was heavliy used during this task, I tried to find a library that i could use for storing users and letting them connect to the same page. while my semi unfamiliarity with the library costed me precious time during the task, i enjoyed lerning it and found that it really fits this tasks. the library has a client, which lets you connect to a stream-chat client. in the client, you can create a chat, and users that can connect to said chat. using those abilities, I was able to create two users, query for them so they could find each other, using the chat ability they were able to connect and with the event method their actions were able to be mirrored to each other.

Cookies: cookies were used to save the player's user data so I could use it for stream chat and differentiate between the users.

bcrypt and uuid: were used so users on the stream chat DB could have unique passwords and IDs