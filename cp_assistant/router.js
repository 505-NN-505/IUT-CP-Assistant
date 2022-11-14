var express = require("express");
var bodyParser = require('body-parser')
var router = express.Router();
const mysql = require('mysql');

let id_now = "-1";

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
        id_now = req.body.student_ID;
        console.log(id_now);
        // res.render('base_logout');

        res.render('base_logout' , {
            userID: id_now,
         });
    });
})


router.get('/profile', (req, res)=>{

    let cfHandle;
    let cfRating;
    let cfRank;
    let cfSolveCount;
    let atCoderHandle;
    let atCoderRating;
    let atCoderRank;
    let atCoderSolveCount;


    if(id_now=="-1")
        res.end("Need to login first");

    else{
    const sql = `select handle,rating,rank,solve_count from table_codeforces where id='${id_now}'`;
    let query = db.query(sql, (err, rows) => {
        if (err) throw err;

        //res.send(results);
        // res.render("doctors", {
        //     title: "Doctor",
        //     data: results,
        // })
        console.log('cf_rating: ', rows[0].rating);
        console.log('cf_rank: ', rows[0].rank);
        console.log('cf_solve_count: ', rows[0].solve_count);
        
        cfHandle = rows[0].handle;
        cfRating =  rows[0].rating;
        cfRank =  rows[0].rank;
        cfSolveCount = rows[0].solve_count;
    });

    const sql1 = `select handle,rating,rank,solve_count from table_atcoder where id='${id_now}'`;
    let query1 = db.query(sql1, (err, rows) => {
        if (err) throw err;

        //res.send(results);
        // res.render("doctors", {
        //     title: "Doctor",
        //     data: results,
        // })
        console.log('atcoder_rating: ', rows[0].rating);
        console.log('atcoder_rank: ', rows[0].rank);
        console.log('atcoder_solve_count: ', rows[0].solve_count);

        atCoderHandle = rows[0].handle;
        atCoderRating =  rows[0].rating;
        atCoderRank =  rows[0].rank;
        atCoderSolveCount = rows[0].solve_count;

        // res.render('base');
         res.render('profile' , {
            userID: id_now,
            cfHandle,
            cfRating,
            cfRank,
            cfSolveCount,
            atCoderHandle,
            atCoderRating,
            atCoderRank,
            atCoderSolveCount,
         });
        
    });
    }
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