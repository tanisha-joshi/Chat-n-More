const express = require('express');
const mysql = require('mysql');
const app = express();
const cors=require("cors");
app.use(express.json());
const http = require('http').Server(app);
// Set up MySQL connection
const con = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "123456789",
   database: "chatdb"
});
app.use(cors());
const socketIO = require('socket.io')(http, {
   cors: {
       origin: "http://localhost:3002"
   }
});

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
   console.log(`⚡: ${socket.id} user just connected!`);
   socket.on('disconnect', () => {
     console.log('🔥: A user disconnected');
   });
   socket.on('message', (data) => {
      socketIO.emit('messageResponse', data);
    });
});

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
   const currentTimestamp = new Date().toString().slice(15,24);
    const newDate= new Date().toLocaleDateString('en-ZA');
    let date='';
    date+=(newDate+' '+currentTimestamp);
    console.log(date);
   // console.log(req.body.url);
   const url=req.body.url.post;
   const uid=req.body.uid;
   const caption=req.body.caption;
   // console.log(caption)
   con.query("INSERT INTO posts(uid,url,caption,created_at) VALUES(?,?,?,?)",[uid,url,caption,date], (err, result) => {
      if (err) throw err;
      res.send(result);
   });
}); 
app.post('/postMessage', (req, res) => {
   const currentTimestamp = new Date().toString().slice(15,24);
    const newDate= new Date().toLocaleDateString('en-ZA');
    let date='';
    date+=(newDate+' '+currentTimestamp);
    console.log(date);
   // console.log(req.body.url);
   const sender=req.body.sender;
   const receiver=req.body.receiver;
   const message=req.body.text;
   const message_id=req.body.message_id;
   const socket_id=req.body.socket_id;
   // console.log(caption)
   con.query("INSERT INTO messages(sender,receiver,text,message_id,socket_id,created_at) VALUES(?,?,?,?,?,?)",[sender,receiver,message,message_id,socket_id,date], (err, result) => {
      if (err) throw err;
      res.send(result);
   });
}); 
app.post('/insertComment', (req, res) => {
   const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
   // console.log(req.body.url);
   const time=req.body.created_at;
   const uid=req.body.uid;
   const message=req.body.message;
   console.log(time,uid,message);
   // console.log(caption)
   con.query("INSERT INTO comments(uid,created_at,comment) VALUES(?,?,?)",[uid,time,message], (err, result) => {
      if (err) throw err;
      res.send(result);
   });
}); 
app.post('/deletePost', (req, res) => {
   const time=req.body.created_at;
   const uid=req.body.uid;
   console.log(time,uid);
   // console.log(caption)
   con.query("Delete from posts where uid=? and created_at=?",[uid,time], (err, result) => {
      if (err) throw err;
      res.send(result); 
   });
}); 
app.post('/addLike', (req, res) => {
   const time=req.body.created_at;
   const uid=req.body.uid;
   console.log("came");
   // console.log(caption)
   con.query("insert into likes(uid,created_at) values(?,?)",[uid,time], (err, result) => {
      if (err) throw err;
      res.send(result); 
   });
}); 
app.post('/likes', (req, res) => {
   const time=req.body.created_at;
   const uid=req.body.uid;
   console.log("came");
   // console.log(caption)
   con.query("update posts set likes=likes+1 where created_at=?",[time], (err, result) => {
      if (err) throw err;
      res.send(result); 
   });
}); 
app.post('/unLike', (req, res) => {
   const time=req.body.created_at;
   const uid=req.body.uid;
   console.log("came");
   // console.log(caption)
   con.query("delete from likes where uid=? and created_at=?",[uid,time], (err, result) => {
      if (err) throw err;
      res.send(result); 
   });
}); 
app.post('/removeLike', (req, res) => {
   const time=req.body.created_at;
   const uid=req.body.uid;
   console.log("came");
   // console.log(caption)
   con.query("update posts set likes=greatest(likes-1,0) where  created_at=?",[time], (err, result) => {
      if (err) throw err;
      res.send(result); 
   });
});
app.post('/insertUser', (req, res) => {
   const uid=req.body.uid;
   const email=req.body.email;
   console.log("came");
   // console.log(caption)
   con.query("insert into users(uid,email) values(?,?)",[uid,email], (err, result) => {
      if (err) throw err;
      res.send(result); 
   });
}); 
app.get('/displayPost', (req, res) => {
   const uid=req.query.uid;
   // console.log(req);
   // console.log("uid is from server.js",uid)
   con.query("SELECT uid,created_at,url,caption,likes FROM posts where uid=?",[uid], (err, result) => {
      if (err) throw err;
      res.send(result);
   });
});
app.get('/getMessages', (req, res) => {
   const sender=req.query.sender;
   const receiver=req.query.receiver;
   // console.log(req);
   // console.log("uid is from server.js",uid)
   con.query("select text,sender,receiver,message_id,socket_id,created_at from messages where (sender=? and receiver=?)or(sender=? and receiver=?) order by created_at Asc ",[sender,receiver,receiver,sender], (err, result) => {
      if (err) throw err;
      res.send(result);
   });
});
app.get('/fetchUsers', (req, res) => {
   const uid=req.query.uid;
   // console.log(req);
   // console.log("uid is from server.js",uid)
   con.query("SELECT email from users where uid<>?",[uid], (err, result) => {
      if (err) throw err;
      res.send(result);
   });
});
app.get('/fetchLiked', (req, res) => {
   const uid=req.query.uid;
   const time=req.query.created_at;
   console.log(uid, "  and  ", time );
   // console.log(req);
   // console.log("uid is from server.js",uid)
   con.query("SELECT isTrue FROM likes where uid=? and created_at=?",[uid,time], (err, result) => {
      if (err) throw err;
      res.send(result);
   });
});
app.get('/comments', (req, res) => {
   console.log("clicked")
   const uid=req.query.uid;
   const time=(req.query.created_at);
   console.log(uid);
   console.log('time is',time);
   con.query("SELECT uid,comment FROM comments where uid=? and created_at=?",[uid,time], (err, result) => {
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
   const uid=req.query.uid;
   con.query(" SELECT posts.url,posts.uid,posts.caption,posts.created_at,posts.likes,ifnull(likes.uid,0) as isLiked FROM posts left join likes on posts.created_at=likes.created_at and likes.uid=?",[uid],
   (err,result)=>{
      if (err) throw err;
      res.send(result);
   })
})

// Add more routes for updates, inserts, and deletes
http.listen(3001, () => {
   console.log(`Server listening on 3001`);
 });
// app.listen(3001, () => {
//    console.log("Server is running on port 3001");
//    con.connect(function(err) {
//       if (err) throw err;
//       console.log("Connected to MySQL database");
//    });
// });