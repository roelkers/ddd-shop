import express from "express";
import keys from "./keys";
import router from './api/router'

// Express App Setup
import bodyParser from "body-parser";
import cors from "cors";

import pgClient from './pgClient'
const app = express();
app.use(cors());
app.use(bodyParser.json());


pgClient.on('error', () => console.log('Lost PG connection'));
app.listen(5000, async (err) => {

  app.use('/', router)
  console.log("established connection")
});
