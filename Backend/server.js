const express = require('express');
const mysql = require('mysql');
const app = express();
const cors=require("cors");
app.use(express.json());
// Set up MySQL connection
const con = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "123456789",
   database: "chatdb"
});
app.use(cors());
// Serve your React app
// app.use(express.static("build"));
// app.get('/addPost', (req, res) => {
//    const userPost = "www.google.com";
//    // req.body.userPost;
//    // Insert the userPost into your MySQL database here
 
//    // Respond with the saved post (you can also send an ID or timestamp for reference)
//    res.send({ userPost });
//  });

// Define API routes to fetch and update data 
app.post('/post', (req, res) => {
   console.log(req.body.url);
   const url=req.body.url.post;
   const uid=req.body.uid;
   const caption=req.body.caption;
   console.log(caption)
   con.query("INSERT INTO posts(uid,url,caption) VALUES(?,?,?)",[uid,url,caption], (err, result) => {
      if (err) throw err;
      res.send(result);
   });
}); 
app.get('/displayPost', (req, res) => {
   const uid=req.query.uid;
   console.log(req);
   console.log("uid is from server.js",uid)
   con.query("SELECT url FROM posts where uid=?",[uid], (err, result) => {
      if (err) throw err;
      res.send(result);
   });
});

// app.get('/post', (req, res) => {
//    con.query("DELETE FROM posts url where url=?","good", (err, result) => {
//       if (err) throw err;
//       res.send(result);
//    });
// });
// app.post('/posts',(req,res) =>{
//    const url=req.body.url;
//    con.query("INSERT INTO posts (url) VALUES(?)", [url],
//    (err,result)=>{
//       if(result){
//          res.send(result);
//       }else {
//          res.send({message:"SELECT COMPATIBLE IMAGE"})
//       }
//    })
// })
app.get('/',(req,res) =>{
   con.query("SELECT * FROM posts",
   (err,result)=>{
      if (err) throw err;
      res.send(result);
   })
})

// Add more routes for updates, inserts, and deletes

app.listen(3001, () => {
   console.log("Server is running on port 3001");
   con.connect(function(err) {
      if (err) throw err;
      console.log("Connected to MySQL database");
   });
});