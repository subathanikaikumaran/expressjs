const mongoose = require('mongoose');

// mongodb://username:password@localhost:27017/scs
mongoose.connect('mongodb://127.0.0.1:27017/stock_controll_sys')
.then(()=> console.log('Connected to DB'))
.catch((err)=> console.log(err));
