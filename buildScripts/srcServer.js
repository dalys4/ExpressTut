import express from 'express';
import path from 'path';
import open from 'open';
import chalk from 'chalk';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import middleware from 'webpack-dev-middleware';
import log4js from 'log4js';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

var logger = log4js.getLogger();
logger.level = 'trace';


app.use(middleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', function(req, res){
  //console.log(path.join(__dirname, '../src/index.html'));
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', function(req, res){
  //console.log(path.join(__dirname, 'users'));
  res.json([
    {"id": 1, "firstName":"Bob", "lastName":"Smith", "email":"bob@gmail.com" },
    {"id": 2, "firstName":"Tammy", "lastName":"Norton", "email":"tammy@gmail.com" },
    {"id": 3, "firstName":"Tina", "lastName":"Lee", "email":"tina@gmail.com" }
  ]);

});

app.listen(port, function(err){
  if(err){
    console.log(err);
  } else {
    open('http://localhost:' + port);

    logger.info(chalk.blue(`Server Listening on Port:${port}...`));

  }
});

