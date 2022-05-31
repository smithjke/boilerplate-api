import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const { PORT } = process.env;

const app = express();

app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
