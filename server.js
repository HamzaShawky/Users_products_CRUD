// Imports
const express = require('express');
const cors = require('cors');
require('dotenv').config();


// Creaye Server
const server = express();

// PORT
const PORT = process.env.PORT ?? 4000;

// Middlewares
server.use(cors({
    origin: 'http://localhost:5000'
}));
server.use(express.json());
server.use(require('jsend').middleware);


// Routes
server.use("/api/users",require('./routes/user.route'))
server.use("/api/products",require('./routes/product.route'))

// Run Server
server.listen(PORT,function(error){
    if(error){
        console.log(error.message)
        return
    }

    console.log(`Server running @ localhost:${PORT}`);

})