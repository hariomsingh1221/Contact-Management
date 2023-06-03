const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();

const app = express();
connectDB();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use("/api/contacts", require('./routes/contactsRoutes'));
app.use("/api/users", require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Sever running at ${PORT}`);
});
