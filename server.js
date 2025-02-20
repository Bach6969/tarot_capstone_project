"use strict";

const express = require("express");
const app = express();
const path = require("path");
const port = 1776;

app.use("", express.static(path.join(__dirname, "./public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log("press CTRL + C to stop server");
})