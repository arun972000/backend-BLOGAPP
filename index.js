import express, { json } from 'express';
import blogRoutes from './Routes/blogRoutes.js';
import DBclient from './DB Client/connect.js';


const app = express();


await DBclient()

app.use(json())
app.use("/api",blogRoutes)

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.send("blog api")
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));