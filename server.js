const express = require("express");
const app = express();
require("dotenv").config();
require("./database");
const { deserializeUser } = require("./Middleware/deserializeUser");
const SessionRouter = require("./Session/session.router");
const PetRouter = require("./Pet/pet.router");
const LostPetRouter = require("./LostPet/lost.router");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/", SessionRouter);
app.use("/pets", PetRouter);
app.use("/lostPet", LostPetRouter);

app.listen(PORT, () => {
  console.log("App running on port ", PORT);
});
