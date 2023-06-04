const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const passport = require('passport');

// Routes
const groceryRouter = require('./routes/groceries');
const marketRouter = require('./routes/markets');
const authRouter = require('./routes/auth');
const db = require('./database');



const app = express();
const PORT = 3003;
const memoryStore = new session.MemoryStore();

app.use(express.json());
app.use(express.urlencoded());

app.use(cookieParser())
app.use(session({
    secret:'ADJHASGDJHDGSHADSAJDSGAJ',
    resave:false,
    saveUninitialized:false,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/stock_controll_sys' })
}))

app.use((req,res,next) => {
    console.log(`${req.method} : ${req.url}`);
    next();
});

app.use(passport.initialize())
app.use(passport.session());

app.use('/api/auth',authRouter);

app.use((req,res,next) => {
    // if(req.session.user) next();
    console.log(req.user);
    if(req.user) next();
    else res.send(401);
});

app.use((req,res,next) => {
    console.log(memoryStore);
    next();
});

app.use('/api/groceries',groceryRouter);
app.use('/api/market',marketRouter);


app.listen(PORT, () => console.log(`Port ${PORT}!`));

