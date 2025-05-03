import cors from 'cors';
import express from 'express';
import http from 'http';

const app = express();

app.use(express.json());
app.use(express.urlencoded({}));
app.use(cors({ origin: '*' }));

const server = http.createServer(app);

server.listen(3000);
