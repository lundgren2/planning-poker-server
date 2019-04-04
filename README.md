# Planning poker server

## Features

- GraphQL: Apollo server w. Subscriptions
- Express + Cross-Origin Resource Sharing (CORS)
- Babel preset: @babel/preset-env
- MongoDB: Mongoose
- JWT + bcrypt

## Instructions

1. **Install and run**

```sh
# clone the repo
git clone https://github.com/lundgren2/planning-poker-server/

# go into folder
cd planning-poker-start

# install dependencies
yarn
```

2. **Run server**

```sh
yarn start
# nodemon --exec babel-node -r node_modules/dotenv/config src/index.js
```

## Tests

```sh
yarn test
```
