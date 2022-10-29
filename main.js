"use strict";
exports.__esModule = true;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var app = (0, express_1["default"])();
var port = process.env.PORT || 3001;
app.listen(port, function () {
    console.clear();
    console.log("[server]: Server is running at https://localhost:".concat(port));
});
