const express = require('express')
const request = require('request')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
app.set("view engine", "ejs")
app.get("/", (req, res)=>{
    res.render("homepage.ejs")
})

 app.get("/result", (req, res)=>{
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}=${req.query.movieName}`
    request(url, function (error, response, body){
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body)
            // res.send("Succes")
            res.render("resultspage.ejs", {movieData: data})
            // console.log(data)
        }else{
            res.send("Error hai bhai")
        }
    })
})
app.get("/result/:id", (req, res)=>{
    // console.log(req.params)
    const url = `http://www.omdbapi.com/?apikey=4373016a&i=${req.params.id}`
    request(url, function (error, response, body){
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body)
            // res.send("Succes")
            res.render("movieInfo.ejs", {movieData: data})
            // console.log(data)
        }else{
            res.send("Error hai bhai")
        }
    })
})


 app.get("*", (req, res)=>{
    res.send("INVALID ROUTE!")
}) 



 app.listen(process.env.PORT, ()=>{
     console.log('SERVER STARTED')
 })
