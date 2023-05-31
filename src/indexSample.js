const express = require("express");
const app = express();
const PORT = 3003;
app.use(express.json());
app.use(express.urlencoded());
app.use((req,res,next) => {
    console.log(`${req.method} : ${req.url}`);
    next();
});


app.listen(PORT, () => console.log(`Port ${PORT}!`));

const groceriyList = [
    {
      item: "milk",
      quantity: 23,
    },
    {
      item: "soya",
      quantity: 3,
    },
    {
      item: "powder",
      quantity: 1,
    },
  ];

app.get("/groceries", (req, res) => {
  res.send(groceriyList);
});

app.get("/groceries/:item", (req, res) => {
    const { item } = req.params;
    const groceryItem = groceriyList.find((g)=>g.item === item);
    res.send(groceryItem);
  });

app.post("/groceries", (req, res) => {
    console.log(req.body);
    groceriyList.push(req.body);
    res.send(201);
  });
