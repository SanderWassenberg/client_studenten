const express = require('express');

const app = express();
const port = 3000;
const cors = require('cors')
app.use(cors());
app.use(express.json());

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hallo wereld!");
});


app.post('/form', (req, res) => {

    const naam = req.body.naam;
    const email = req.body.email;
    res.json({ naam: naam, email: email });
});

app.listen(port, () => console.log(`Data API listening on port ${port}!`))
