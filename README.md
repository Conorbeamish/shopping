<h1 align="center">
Shopping List
</h1>
<p align="center">
MongoDB, Expressjs, React, Nodejs
</p>

## clone or download
```terminal
git clone https://github.com/Conorbeamish/shopping.git
```

The server is installed from the root directory, the client is installed from /client 
Both can be run concurrently from root directory, see below

## project structure
```terminal
LICENSE
package.json
   .env (to create .env, check [prepare your secret session])
client/
   package.json
...
```

# Usage

## Prerequisites
- [MongoDB](https://www.mongodb.com/)
- [Node](https://nodejs.org/en/download/) 
- [npm](https://nodejs.org/en/download/package-manager/)


## Client-side usage(PORT: 5173)
```terminal
cd client   // go to client folder
npm i       // npm install packages

// deployment for client app
npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
npm run start // this will run the files in docs
```

## Server-side usage(PORT: 5000)

### Prepare your secret

You need to add a SECRET_KEY in .env at root level to connect to MongoDB

### Start

```terminal
npm i       // npm install packages
npm run dev // run it locally and start both the server and the client     
```