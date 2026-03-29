# chatBot

chatBot is a real-time chat application built with Node.js, Express, and Socket.IO. It lets multiple users join a room and exchange messages instantly with a simple, responsive interface. The project includes a server for socket connections and static frontend pages for joining and chatting. Message and user utilities help manage room membership and broadcast updates clearly.

To run locally: install dependencies with `npm install`, then start the app using `npm start` (or your configured dev script). Open the shown localhost URL in multiple browser tabs to test real-time communication. This project is a good starting point for learning websockets and event-driven apps.

## Deploy on Render

1. Push your latest code to GitHub.
2. Sign in to Render and click **New +** -> **Web Service**.
3. Connect your GitHub account and select this repository.
4. Configure:
	- Runtime: **Node**
	- Build Command: `npm install`
	- Start Command: `npm start`
5. Keep environment variables empty unless you add custom secrets later.
6. Click **Create Web Service** and wait for deployment.
7. Open the Render URL to use the live chat app.