import dotenv from 'dotenv'
import express, {Application} from 'express'
import AuthRouter from './routes/auth'

import './database';
dotenv.config();

const app: Application = express();

app.use(express.json())
app.use('/auth', AuthRouter)

app.listen(4000)