import express from "express";

const app = express();
const port = 8000;

app.listen(port,()=>{
    console.log(`server Start:  ${port} port` )
})
app.get("/", (req,res)=>{
    res.set({"Content-Type" : "text/html; charset=utf-8"})
    res.end("<h1>hello express</h1>")
}) 