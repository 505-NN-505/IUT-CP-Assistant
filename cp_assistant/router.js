var express = require("express");
var bodyParser = require('body-parser')
var router = express.Router();
const mysql = require('mysql');
const mysql2 = require('mysql2');

let {PythonShell} = require('python-shell');
const { addListener } = require("nodemon");

let id_now = "-1";
let name_now = "-1";
let points=0;

let msg =null ;

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

const db = mysql2.createConnection({
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

        //res.send(results);
        // res.render("doctors", {
        //     title: "Doctor",
        //     data: results,
        // })
        
        //console.log(rows[0].password);
       
        if(rows.length==0){
            // res.end("User do not exist");
            res.render('login' , {
                msg: 'User does not exist',
             });
        }
        
        else if(req.body.password!=rows[0].password){
            // res.end("Wrong Password");
            res.render('login' , {
                msg: 'Wrong Password!  Please enter the correct password.',
             });

        }
        else{
        console.log('The data from user table: \n', rows);
        id_now = req.body.student_ID;
        console.log(id_now);
        // res.render('base_logout');

        res.render('base_logout' , {
            userID: id_now,
         });
        }
    });
})


router.get('/profile', (req, res)=>{

    let cfHandle;
    let cfRating;
    let cfRank;
    let cfSolveCount;
    let cfHandleLink = "codeforces.com/profile/";

    let atCoderHandle;
    let atCoderRating;
    let atCoderRank;
    let atCoderSolveCount;
    let atcoderHandleLink = "atcoder.jp/users/";



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
        cfHandleLink  += rows[0].handle;

        console.log(cfHandleLink);
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
        atcoderHandleLink  += rows[0].handle;

        console.log(atcoderHandleLink);


         res.render('profile' , {
            userID: id_now,
            cfHandle,
            cfRating,
            cfRank,
            cfSolveCount,
            cfHandleLink,
            atCoderHandle,
            atCoderRating,
            atCoderRank,
            atCoderSolveCount,
            atcoderHandleLink,
         });
        
    });
    }
})



// route for dashboard
router.post('/base_logout', (req, res) => {
   
        res.render('base_logout')
})

router.get('/signup', (req, res) => {
   
    res.render('signup' , {
        msg: null
     });
})

router.get('/logout', (req, res) => {
   
    res.render('base')
})

// for now standing will show cf standing
router.get('/cfstanding', (req, res) => {
    

    const sql = `select rating,id, handle from table_codeforces order by rating desc`;
    let query = db.query(sql, (err, rows) => {
        if(err){
            throw err;
        }
        else{
            res.render('cfstanding',{
                title: 'CFStanding',
                sampleData:rows,
        });

        }
    
       });
})

router.get('/atcoderstanding', (req, res) => {
    

    const sql = `select rank,id, handle from table_atcoder order by rating desc`;
    let query = db.query(sql, (err, rows) => {
        if(err){
            throw err;
        }
        else{
            res.render('atcoderstanding',{
                title: 'AtCODERStanding',
                sampleData:rows,
        });

        }
    
       });
})

router.get('/from_profile', (req, res) => {
   
    res.render('base_logout' , {
        userID: id_now,
     });
})

router.get('/homelogin', (req, res) => {
   
    // res.render('login')
    res.render('login' , {
        msg: null
     });

})

router.get('/aftersignup', (req, res) => {
   
    res.render('base')
})

//

router.post('/signup_with_Data', (req, res) => {

    console.log('Input:: name='+JSON.stringify(req.body.studentID)+' age='+ JSON.stringify(req.body.cpassword) +' city='+ req.body.cf_handle + ' dep=' + req.body.atcoder_username);
    console.log(req.body);
    if(req.body.password.length<8){
        //res.end("Password must be 8 chars long");
        res.render('signup' , {
            msg: 'Password must be 8 characters long.',
         });
    }

    else if(req.body.password!=req.body.cpassword){
        res.render('signup' , {
            msg: 'Password do not match',
         });
        //  res.end("Passwords do not match");
    }

    else{
    id_now = req.body.studentID;
    name_now = req.body.name;

    const sql = `INSERT INTO user_table (id, password, handle_codeforces, handle_atcoder, handle_vjudge) VALUES ('${req.body.studentID}', '${req.body.cpassword}', '${req.body.cf_handle}', '${req.body.atcoder_username}','${req.body.name}')`;
    let query = db.query(sql, (err, rows) => {
        if (err) throw err;

        //res.send(results);
        // res.render("doctors", {
        //     title: "Doctor",
        //     data: results,
        // })

        console.log('The data from user table: \n', rows);

    });
  

    ///////
    let options = {
        
        args:[req.body.cf_handle]
    }

    let at_options = {
        
        args:[req.body.atcoder_username]
    }
    console.log("innnnn");

    let cf_rating=0;
    let cf_solve_count=0;

    let at_rating=0;
    let at_solve_count=0;
    

    PythonShell.run("scrapers/codeforces.py", options, function(err, results) {
        if (err) {
            console.log("ERRROR!");
            console.log(err);
        } else {
            console.log("LENGTH IS: ", results.length)
            const data= JSON.parse(results[0]);
            //const data = results[0];
           //console.log(data.titlePhoto);
           // res.send(data);
           // console.log(results);
           /// //console.log("rank: ",data.rank);
           console.log("rating: ",data.rating);
             cf_rating = data.rating;
        }
    })

    
    PythonShell.run("scrapers/main.py", options, function(err, results) {
        if (err) {
            console.log("ERRROR!");
            console.log(err);
        } else {
            console.log("LENGTH IS: ", results.length)
            const data= JSON.parse(results[0]);
            //const data = results[0];
           //console.log(data.titlePhoto);
           // res.send(data);
           // console.log(results);
            // console.log("rank: ",data.rank);
             console.log("sc: ",data.solved_count);
            cf_solve_count=data.solved_count;
            //console.log(rating);
             points += cf_rating+cf_solve_count;
             console.log('pointssss',points);
        }
    })

  

    PythonShell.run("scrapers/atcoder_stat.py", at_options, function(err, results) {
        if (err) {
            console.log("ERRROR!");
            console.log(err);
        } else {
            console.log("LENGTH IS atcoder: ", results.length)
           // const data= JSON.parse(results[1]);
            //const data = results[0];
            console.log(results[0]);
            console.log(results[1]);
            console.log(results[2]);
            //res.send(data);
            at_solve_count = parseInt(results[1]);
            at_rating = parseInt(results[2]);
            //console.log('solved_at',at_solve_count+1000);
            //console.log('rating_at',at_rating+1000);
            points += at_solve_count + at_rating;
            console.log('from atcoder: ',points)
        }
    })

    
    
    //console.log(solve_count);
    ////////
   // res.render('base_logout')
    res.render('base_logout' , {
        userID: id_now,
     });


    ///else end
    }
});


// router.get('/standings', (req, res) => {
//     console.log(points);
//     const sql_standings = `INSERT INTO standings (id, name, points) VALUES ('${id_now}', '${name_now}', '+points+')`;
//     let query_standings = db.query(sql_standings, (err, rows) => {
//         if (err) throw err;

//         //res.send(results);
//         // res.render("doctors", {
//         //     title: "Doctor",
//         //     data: results,
//         // })
//         console.log('ssspointssss',points);

//         console.log('The data from standings table: \n', rows);
        

//     });
//     //res.render("doctors", {});
// })


router.get('/standings', (req, res) => {
    console.log(points);
    db.execute(
        'INSERT INTO `standings` (`id`, `name`, `points`) VALUES (?, ?, ?)',
        [id_now, name_now, points], 
        (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results);
      });

      db.execute(
        'select `id`,`name`,`points` from `standings` order by `points` desc',
        [id_now, name_now, points], 
        (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results);
      });
    })
    //res.render("doctors", {});

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



// route for dashboard
router.post('/base_logout', (req, res) => {
   
    res.render('base_logout')
})

router.get('/signup', (req, res) => {

res.render('signup')
})

router.get('/logout', (req, res) => {

res.render('base')
id_now = "-1";
name_now = "-1";
points = 0;
})

router.get('/from_profile', (req, res) => {

res.render('base_logout' , {
    userID: id_now,
 });
})

router.get('/homelogin', (req, res) => {

res.render('login')
})

router.get('/aftersignup', (req, res) => {

res.render('base')
})


module.exports = router;