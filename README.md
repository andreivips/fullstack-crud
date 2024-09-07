# FullStack CRUD assessment

## Requirements

- CRUD backend and frontend applications
- Data entity should have 5 properties
    - `User` with properties: `name`, `age` (number), `email` (unique), `interests`, `address`
- Seed database with 300 records
- Add, modify and delete data via frontend:
    - Add/modify data window
        - should be modal
        - appears/closes animated
        - blocks main window scrolling
        - can be closed by presing on **X** button, `Esc` button or outside modal
    - Modify data modal window should have own shareable link that opens it
        - `http://localhost:3001/edit/USERID`
- Responsive design
- Tests

## Backend, REST API (ExpressJS, MongoDB)

- Setup
    - Set `PORT` in `.env` file (default 3000)
    - Set `MONGODB_URI` in `.env` file (MongoDB server url string)
    - Run `npm install` to install dependencies
    - Run `npm run seed` to seed users data into database (if required)
        - `User` model will have `testusers` collection in MongoDB
- Run `npm start` to run application server
    - Open in browser `localhost:3000` to check if app is working (set defined in `.env` port if changed)
- Run `npm run test` to test endpoints
    - runs on defined in `.env` > `MONGODB_URI` database (TODO: should be replaced with usage of `mongodb-memory-server`)

## Frontend, CRUD app (ReactJS, TailwindCSS, Vite)

- Setup
    - Set `API_URL` (backend app location) in `src/config.jsx` (default `http://localhost:3000/api`)
- Run `npm install` to install dependencies
- Run `npm start` to run application server
    - Open in browser `localhost:3001` to check if app is working
    - Change app port in `package.json` > `scripts` (if required)
- Run `npm run build` to build app
    - Run `npm run preview` to preview build
    - Deploy source code from `dist` directory to server
- Run `npm run test` to test app

## Notes

- MVP-like solution with basic architectural decisions and no extra libraries (like: UI, validation, storage)

## Screenshots

![Screenshot](/images/screenshot-1.png)

![Screenshot](/images/screenshot-2.png)

Backend tests

![Screenshot](/images/tests-backend.png)

Frontend tests

![Screenshot](/images/tests-frontend.png)




> Author: Andrei T. ( andreivinyl@gmail.com )