const express = require('express');
const groceryRouter = require('./routes/groceries');
const marketRouter = require('./routes/markets');
const authRouter = require('./routes/auth');
const db = require('./database');
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
app.use('/api/auth',authRouter);

app.use((req,res,next) => {
    if(req.session.user) next();
    else res.send(401);
});

app.use('/api/groceries',groceryRouter);
app.use('/api/market',marketRouter);


app.listen(PORT, () => console.log(`Port ${PORT}!`));

