const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectLivereload = require("connect-livereload");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
const publicDirectory = path.join(__dirname, '../public');
liveReloadServer.watch(publicDirectory);

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });




const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(connectLivereload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(publicDirectory));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
// npm run watch