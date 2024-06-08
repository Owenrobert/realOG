const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');  // Import the MySQL connection pool

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory

app.get("/", async (req, res) => {
    try {
        const [teachers] = await pool.query('SELECT * FROM teachers');
        res.render("home", { data: teachers });
    } catch (err) {
        console.error("Error in GET /:", err);
        res.sendStatus(500);
    }
});

app.post("/add", async (req, res) => {
    const { firstName, lastName, subject, email } = req.body;
    try {
        await pool.query('INSERT INTO teachers (firstName, lastName, subject, email) VALUES (?, ?, ?, ?)', [firstName, lastName, subject, email]);
        const [teachers] = await pool.query('SELECT * FROM teachers');
        res.render("home", { data: teachers });
    } catch (err) {
        console.error("Error in POST /add:", err);
        res.sendStatus(500);
    }
});

app.post('/update', async (req, res) => {
    const { id, firstName, lastName, subject, email } = req.body;
    try {
        await pool.query('UPDATE teachers SET firstName = ?, lastName = ?, subject = ?, email = ? WHERE id = ?', [firstName, lastName, subject, email, id]);
        const [teachers] = await pool.query('SELECT * FROM teachers');
        res.render("home", { data: teachers });
    } catch (err) {
        console.error("Error in POST /update:", err);
        res.sendStatus(500);
    }
});

app.post('/delete', async (req, res) => {
    const { id } = req.body;
    try {
        await pool.query('DELETE FROM teachers WHERE id = ?', [id]);
        const [teachers] = await pool.query('SELECT * FROM teachers');
        res.render("home", { data: teachers });
    } catch (err) {
        console.error("Error in POST /delete:", err);
        res.sendStatus(500);
    }
});

app.listen(3000, () => {
    console.log("App is running on port 3000");
});
