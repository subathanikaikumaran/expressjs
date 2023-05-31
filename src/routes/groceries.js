const { Router } = require("express");

const router = Router();
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

router.get("/", (req, res) => {
  res.cookie("visited", true, {
    maxAge: 10000,
  });
  res.send(groceriyList);
});

router.get("/:item", (req, res) => {
  console.log(req.cookies);
  const { item } = req.params;
  const groceryItem = groceriyList.find((g) => g.item === item);
  res.send(groceryItem);
});

router.post("/", (req, res) => {
  console.log(req.body);
  groceriyList.push(req.body);
  res.send(201);
});

router.get("/shopping/cart", (req, res) => {
  const {cart}= req.session;
  console.log(cart);
  if(!cart){
    res.send('You have no cart session!');
      } else {
        res.send(cart);
      }
        
      
});

router.post("/shopping/cart/item", (req, res) => {
  const { item, quantity } = req.body;
  const cartItem = { item, quantity };
  const { cart } = req.session;
  if (cart) {
    req.session.cart.items.push(cartItem);
  } else {
    req.session.cart = {
      items: [cartItem],
    };
  }
  res.send(201);
});

module.exports = router;
