const express = require('express')
const cors = require("cors");
const { noteRouter } = require('./routes/note.route');
const { userRouter } = require('./routes/user.route');
const { connection } = require("./database/db")
const app= express();
const PORT = 5000
app.use(express.json());
app.use(cors())

app.get('/', (req,res)=>{
    res.send("api is working");
})

app.use('/user',userRouter);
app.use('/notes',noteRouter);

app.listen(PORT, async()=>{
    try{
        await connection
    }
    catch(error){
        console.log(error);
    }
    console.log(`listening on port ${PORT}`)
}) 