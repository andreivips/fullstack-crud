require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user-routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).json({ message: 'Working' });
})

app.use('/api/users', userRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

module.exports = app;
