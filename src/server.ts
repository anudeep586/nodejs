import Koa = require('koa');
import Router = require('koa-router');
import logger = require('koa-logger');
import bodyparser = require('koa-bodyparser')
import { getAllFeeds, } from './controllers/feedController';

require("dotenv").config();

const port = process.env.PORT;

const app = new Koa();


const router = new Router();   

router.get("/feeds",getAllFeeds)

app.use(logger());
app.use(bodyparser());

app.use(router.routes());


app.listen(port);

console.log(` My koa server is up and listening on port ${port}`)

//mention what we are returing 
//naming convention 
// give ctx type

export default app;