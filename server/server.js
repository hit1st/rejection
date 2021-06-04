import path from 'path';
// import { createServer } from 'http';
import express from 'express';

const app = express();
const PORT = 8081;

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../pages/index.html')));

app.use(express.static(path.join(__dirname, '../pages/')));
app.use(express.static(path.join(__dirname, '../public/')));

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
