import express from 'express';
import cors from 'cors';
import analyticsApi from './endpoints';

const portNumber = 9000;

const app = express();

app.use(cors());
app.options('*', cors());

for (const [key, rep] of analyticsApi) {
  app.get('/' + key, rep);
}

app.listen(portNumber, () => {
  console.log('server ready! Port: ' + portNumber);
});