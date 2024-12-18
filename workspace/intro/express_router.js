import express from "express";
import {parse} from "url";
const app = express();
const port = 8000;

app.listen(port,()=>{
    console.log(`server Start:  ${port} port` )
})

const newProduct = (req,res)=>{
    res.set({"Content-Type" : "text/html; charset=utf-8"})
    const query = parse(req.url, true).query;

    res.end(
        `
            <h1>신상품 소개</h1>
            <ul>
                <li>${query.new1}</h1>
                <li>${query.new2}</h1>
            </ul>
        `
    )
}
const hotProduct = (req,res)=>{
    res.set({"Content-Type" : "text/html; charset=utf-8"})
    const query = parse(req.url, true).query;

    res.end(
        `
            <h1>신상품 소개</h1>
            <ul>
                <li>${query.hot1}</h1>
                <li>${query.hot2}</h1>
            </ul>
        `
    )
}
const notFound = (req,res)=>{
    res.setHeader({"Content-Type" : "text/html; charset=utf-8"})
    res.statusCode = 404;
    res.end(" <h1>경로를 찾을 수 없습니다.</h1>")
}

app.get("/new", newProduct)
app.get("/hot", hotProduct)
app.get("*", notFound)