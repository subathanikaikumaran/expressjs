const express = require('express');
const groceryRouter = require('./routes/groceries.js');
const marketRouter = require('./routes/markets.js');
const session = require('express-session')
const cookieParser = require('cookie-parser')


const app = express();
const PORT = 3003;

app.use(express.json());
app.use(express.urlencoded());

app.use(cookieParser())
app.use(session({
    secret:'ADJHASGDJHDGSHADSAJDSGAJ',
    resave:false,
    saveUninitialized:false,
}))

app.use((req,res,next) => {
    console.log(`${req.method} : ${req.url}`);
    next();
});

app.use('/api/groceries',groceryRouter);
app.use('/api/market',marketRouter);

app.listen(PORT, () => console.log(`Port ${PORT}!`));

