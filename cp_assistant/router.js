var express = require("express");
var bodyParser = require('body-parser')
var router = express.Router();
const mysql = require('mysql');


var router = express()

// parse application/x-www-form-urlencoded 
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 
router.use(bodyParser.json())





// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'iut_cp_assistant'
// });

// pool.getConnection((err,connection)=> {
// if(err)throw err;
// console.log('Connected as ID '+connection.threadId);
// })

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'iut_cp_assistant'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql connected....');

});


const  credential = {
    ID : 123,
    password : "admin123"
}

// login user
// router.post('/login', (req, res)=>{
//     const sql = `select password from user_table where id='${req.body.student_ID}'`;
//     let query = db.query(sql, (err, rows) => {
//         if (err) throw err;

//         //res.send(results);
//         // res.render("doctors", {
//         //     title: "Doctor",
//         //     data: results,
//         // })

//         console.log('The data from user table: \n', rows);
// });


router.post('/login', (req, res)=>{
    const sql = `select password from user_table where id='${req.body.student_ID}'`;
    let query = db.query(sql, (err, rows) => {
        if (err) throw err;

        //res.send(results);
        // res.render("doctors", {
        //     title: "Doctor",
        //     data: results,
        // })
        if(rows.length==0)
            res.end("User do not exist");
        if(req.body.password!=rows[0].password)
            res.end("Wrong Password");
        console.log('The data from user table: \n', rows);
        res.render('base_logout');
    });
})



// route for dashboard
router.get('/base_logout', (req, res) => {
   
        res.render('base_logout')
})

router.get('/signup', (req, res) => {
   
    res.render('signup')
})

router.get('/logout', (req, res) => {
   
    res.render('base')
})

router.get('/homelogin', (req, res) => {
   
    res.render('login')
})

router.get('/aftersignup', (req, res) => {
   
    res.render('base')
})

router.get('/profile', (req, res) => {
   
    res.render('profile')
})

//

router.post('/signup_with_Data', (req, res) => {

    console.log('Input:: name='+JSON.stringify(req.body.studentID)+' age='+ JSON.stringify(req.body.cpassword) +' city='+ req.body.cf_handle + ' dep=' + req.body.atcoder_username);
    console.log(req.body);
    if(req.body.password.length<8)
        res.end("Password must be 8 chars long");

    if(req.body.password!=req.body.cpassword)
        res.end("Passwords do not match");

    const sql = `INSERT INTO user_table (id, password, handle_codeforces, handle_atcoder, handle_vjudge) VALUES ('${req.body.studentID}', '${req.body.cpassword}', '${req.body.cf_handle}', '${req.body.atcoder_username}','${req.body.vjudge_username}')`;
    let query = db.query(sql, (err, rows) => {
        if (err) throw err;

        //res.send(results);
        // res.render("doctors", {
        //     title: "Doctor",
        //     data: results,
        // })

        console.log('The data from user table: \n', rows);

    });
  
    res.render('base_logout')
})

router.get('/all', (req, res) => {
    let sql = `select * from user_table`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        //res.send(results);
        // res.render("doctors", {
        //     title: "Doctor",
        //     data: results,
        // })

    });
    //res.render("doctors", {});
})


module.exports = router;