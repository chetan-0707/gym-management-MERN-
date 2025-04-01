const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/gym_backend')
    .then(() => console.log('DB Connection Successful!!')).catch(err => {
        console.log(err);
    })