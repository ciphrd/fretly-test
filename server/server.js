const express = require("express")
const port = 3100
const app = express()
const session = require("express-session")
const cors = require("cors")
const mongoose = require("mongoose")
const User = require("./models/users.model")
const bodyParser = require("body-parser")
const MongoStore = require("connect-mongo")(session)


mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/FretlyTestDb", {
  useNewUrlParser: true
})
const db = mongoose.connection

// handle mongo error 
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // connexion established
});

// session usage 
app.use(session({
  secret: "random-key-here",
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}))

// middlewares
// we want to allow CORS for this purpose
var whitelist = [
  'http://localhost:8081',
]
var corsOptions = {
  origin: function (origin, callback) {
      var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, originIsWhitelisted);
  },
  credentials: true
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

const routes = require("./routes/users.routes")
routes(app)

app.use(function (req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
})


app.listen(port, function () {
  console.log("REST API started on port "+port)
})
