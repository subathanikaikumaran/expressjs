const { Router } = require("express");
const router = Router();
const supermarkets = [
  {
    id: 1,
    store: "Food city",
    miles: 0.9,
  },
  {
    id: 2,
    store: "Keels",
    miles: 15,
  },
];

// router.get("", (req, res) => {
//   res.send(supermarkets);
// });

// get the supper market miles less than param - query params
router.get("", (req, res) => {
  const { miles } = req.query;
  const parsedMiles = parseInt(miles);
  if (!isNaN(parsedMiles)) {
    const filterdStore = supermarkets.filter((s) => s.miles <= parsedMiles);
    res.send(filterdStore);
  } else res.send(supermarkets);
});

module.exports = router;
