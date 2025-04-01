const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
require('dotenv').config()
const cors = require('cors');

const PORT = process.env.PORT;

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials:true
}))

app.use(cookieParser());
app.use(express.json());
require('./DBConn/db');

const GymRoutes = require('./Routes/gym');
const MembershipRoutes = require('./Routes/membership');
const MemberRoutes = require('./Routes/member');

app.use('/auth', GymRoutes);
app.use('/plans', MembershipRoutes);
app.use('/members', MemberRoutes);

// app.get('/', (req, res) => {
//     res.send({ "message": "Congrates your server is running on port 4000 successfully" })
// })

app.listen(PORT, () => {
    console.log('Server is running on port 4000');
})