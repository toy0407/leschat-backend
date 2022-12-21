const express = require('express');
const app = express();
const http = require('http')

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('<h1>Hello</h1>')
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})