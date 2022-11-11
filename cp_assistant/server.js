const express = require('express');
const bodyparser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const mysql = require('mysql');

const app = express();
const path = require('path')
app.use(express.static(__dirname + '/public'));
const port = process.env.PORT || 3000;

const router = require('./router');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))

//app.set('view engine', 'ejs');
app.set('view engine', 'ejs');
// app.use(express.static('public'))

app.get('/', (req, res) =>{
    res.render('base', { title : "CP ASSISTANT"});
})

app.use('/route', router);

// app.get('/', (req, res) =>{
//     res.render('login', { title : "CP ASSISTANT"});
// })

app.use(session({
    secret: uuidv4(), //  '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    resave: false,
    saveUninitialized: true
}));

// app.get('/', (req, res) =>{
//     res.render('login', { title : "CP ASSISTANT"});
// })

const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'iut_cp_assistant'
});
    
pool.getConnection((err,connection)=> {
    if(err)throw err;
    console.log('Connected as ID '+connection.threadId);
})

exports.view = (req, res) => {
    // User the connection
    connection.query('SELECT * FROM user', (err, rows) => {
      // When done with the connection, release it
      if (!err) {
        let removedUser = req.query.removed;
        res.render('home', { rows, removedUser });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }
  

app.listen(port, ()=>{ console.log("Listening to the server on http://localhost:3000")});