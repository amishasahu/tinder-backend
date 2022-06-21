
// const cardSchema = mongoose.Schema({
//   name: String,
//   imgUrl: String,
// });

//  mongoose.model("cards", cardSchema);
// const app = express();
// const port = process.env.PORT || 8001;
// const connection_url =
//   "mongodb+srv://admin:Ge1wpGVTfQSb60pO@cluster0.vtefr.mongodb.net/tinderdb?retryWrites=true&w=majority";

// app.use(express.json());
// app.use(Cors());
// mongoose.connect(connection_url, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });
// app.get("/", (req, res) => {
//   res.status(200).send("Hello world");
// });

// app.post("/tinder/card", (req, res) => {
//   const dbCard = req.body;
//   Cards.create(dbCard, (err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(201).send(data);
//     }
//   });
// });

// app.get("/tinder/card", (req, res) => {
//   Cards.find((err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// });
// app.listen(port, () => console.log(`listening on localhost:${port}`));



import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from "cors";

// App Config
const app = express();
const port = process.env.PORT || 8001; // port app gonna listen
const connection_url = "mongodb+srv://admin:0tmKpW8UiN2VtLLj@cluster0.vtefr.mongodb.net/tinderdb?retryWrites=true&w=majority";
// Middlewares


app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(connection_url, {
  // pass in couple of parameters to our connection, make our connection smooth
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
// API Endpoints
// ## go root url, callback func
app.get("/", (req, res) => {
  res.status(200).send("HELLO WORLD!!!");
});

// add data to db, endpoint /tinder/card
app.post("/tinder/cards", (req, res) => {
  console.log(req.body)
  const dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// another endpoint (the same) which will download data from the db
// with this will be retrieving every single thing from the collection DB that we just created
app.get("/tinder/cards", (req, res) => {
     Cards.find((err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
});

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));