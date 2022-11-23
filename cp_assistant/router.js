var express = require("express");
var bodyParser = require('body-parser')
var router = express.Router();
const mysql = require('mysql');
const mysql2 = require('mysql2');

let {PythonShell} = require('python-shell');
const { addListener } = require("nodemon");

///global

///global

let id_now = "-1";
let name_now = "-1";
let points=0;
let from_sign_up = 0;

let cf_rating=0;
let cf_solve_count=0;
let at_rating=0;
let at_solve_count=0;

var ids = []; 
var updated_points = []; 

let msg =null ;

///

var router = express()

// parse application/x-www-form-urlencoded 
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 
router.use(bodyParser.json())


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




router.post('/login', (req, res)=>{

    if(from_sign_up==1){
        db.execute(
            'INSERT INTO `standings` (`id`, `name`, `points`) VALUES (?, ?, ?)',
            [id_now, name_now, points], 
            (err, results) => {
            if (err) {
                throw err;
            }
            //console.log(results);
          });
          
          
          from_sign_up = 0;
          let cf_rating=0;
          let cf_solve_count=0;
          let at_rating=0;
          let at_solve_count=0;
    }

    ///update scrappers

    db.execute(
        'select `id`,`handle_codeforces`,`handle_atcoder` from `user_table`',
        [id_now, name_now, points], 
        (err, results) => {
        if (err) {
            throw err;
        }
       // console.log(results);
        //console.log(results.length);

        // for (let i = 0; i < results.length; i++) {
        //     ids.push(results[i].id);

        //     ///scrappers for updating
        //     let a=0,b=0,c=0,d=0;

        //     console.log("iddddd",results[i].id)
        //     console.log("cffffff",results[i].handle_codeforces)
        //     console.log("atttttt",results[i].handle_atcoder)

        //     let options = {
        
        //         args:[results[i].handle_codeforces]
        //     }
        
        //     let at_options = {
                
        //         args:[results[i].handle_atcoder]
        //     }
        //    // console.log("innnnn");
        
            

        //     let new_points = 0;
            
        
        //     PythonShell.run("scrapers/codeforces.py", options, function(err, results) {
        //         // function resolveAfter2Seconds() {
        //         //     return new Promise(resolve => {
        //         //       setTimeout(() => {
        //         //         resolve('resolved');
        //         //       }, 5000);
        //         //     });
        //         //   }
                  
        //         //   async function asyncCall() {
        //         //     console.log('calling');
        //         //     const result = await resolveAfter2Seconds();
        //         //     console.log(result);
        //         //     // expected output: "resolved"
        //         //   }
                  
        //         //   asyncCall();
        //         a=1;
        //         if (err) {
        //             console.log("ERRROR!");
        //             console.log(err);
        //         } else {
        //             console.log("LENGTH IS: ", results.length)
        //             const data= JSON.parse(results[0]);
        //             //const data = results[0];
        //            //console.log(data.titlePhoto);
        //            // res.send(data);
        //            // console.log(results);
        //            /// //console.log("rank: ",data.rank);
        //            console.log("rating: ",parseInt(data));
        //              cf_rating = parseInt(data);

                     
        //         }

        //         PythonShell.run("scrapers/main.py", options, function(err, results) {
                    
        //             // function resolveAfter2Seconds() {
        //             //     return new Promise(resolve => {
        //             //       setTimeout(() => {
        //             //         resolve('resolved');
        //             //       }, 5000);
        //             //     });
        //             //   }
                      
        //             //   async function asyncCall() {
        //             //     console.log('calling');
        //             //     const result = await resolveAfter2Seconds();
        //             //     console.log(result);
        //             //     // expected output: "resolved"
        //             //   }
                      
        //             //   asyncCall();

                    
        //               b=1;
        //             if (err) {
        //                 console.log("ERRROR!");
        //                 console.log(err);
        //             } else {
        //                 console.log("LENGTH IS: ", results.length)
        //                 const data= JSON.parse(results[0]);
        //                 //const data = results[0];
        //                //console.log(data.titlePhoto);
        //                // res.send(data);
        //                // console.log(results);
        //                 // console.log("rank: ",data.rank);
        //                  console.log("sc: ",parseInt(data));
        //                 cf_solve_count=parseInt(data);
        //                 //console.log(rating);
        //                  new_points += cf_rating+cf_solve_count;
        //                  console.log('pointssss from cf',new_points,i);
    
                      
                          
                        
        //             }

        //             PythonShell.run("scrapers/atcoder_stat.py", at_options, function(err, results) {
                        
        //                 // function resolveAfter2Seconds() {
        //                 //     return new Promise(resolve => {
        //                 //       setTimeout(() => {
        //                 //         resolve('resolved');
        //                 //       }, 5000);
        //                 //     });
        //                 //   }
                          
        //                 //   async function asyncCall() {
        //                 //     console.log('calling');
        //                 //     const result = await resolveAfter2Seconds();
        //                 //     console.log(result);
        //                 //     // expected output: "resolved"
        //                 //   }
                          
        //                 //   asyncCall();

        
        //                 c=1;
        //                 if (err) {
        //                     console.log("ERRROR!");
        //                     console.log(err);
        //                 } else {
        //                     console.log("LENGTH IS atcoder: ", results.length)
        //                    // const data= JSON.parse(results[1]);
        //                     //const data = results[0];
        //                     console.log(results[0]);
        //                     console.log(results[1]);
        //                     console.log(results[2]);
        //                     //res.send(data);
        //                     at_solve_count = parseInt(results[1]);
        //                     at_rating = parseInt(results[2]);
        //                     //console.log('solved_at',at_solve_count+1000);
        //                     //console.log('rating_at',at_rating+1000);
        //                     new_points += at_solve_count + at_rating;
        //                     console.log('from atcoder: ',new_points,i)
        
        //                     updated_points.push(new_points);
        //                     console.log(updated_points);
                            
        //                     //

        //                 }
        //             })
        //         })
        //     })
        
           

        //     // let count = 0;
  
        //     // const intervalId = setInterval(() => {
        //     //     if(a==1 && b==1 && c==1 && d==0){
        //     //         updated_points.push(new_points);
        //     //         d=1;
        //     //     }
        //     //     count++;
                  
        //     //     if (count === 10) {
        //     //         console.log('Clearing the interval id after 5 executions');
        //     //         clearInterval(intervalId);
        //     //       }
        //     //     }, 1000);

            
        //     //   if(a==1 && b==1 && c==1 && d==0){
        //     //             updated_points.push(new_points);
        //     //             d=1;
        //     //         }
        //     // updated_points.push(new_points);
        //     // console.log(updated_points);


        //   }


      });


    /////

    

    const sql = `select password from user_table where id='${req.body.student_ID}'`;
    let query = db.query(sql, (err, rows) => {

       
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
        
    });

    db.execute(
        // 'select `id`,`name`,`points`, ROW_NUMBER() OVER (order by points desc) as rank  from `standings',
        // 'select `id`,`name`,`points`,  from `standings` order by `points` desc',
        'select `url`,`problem_name` from `problems_table` where `id`=(?)',
        [id_now], 
        (err, results) => {
        if (err) {
            throw err;
        }
        else{
            // res.render('standings',{
            //     title: 'Standings',
            //     sampleData:results,
            //  });

            console.log(results)
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
                sampleData:results,
             });
        }
        
        
        // console.log(results);
      });

    }
})


router.get('/del_profile/:name', (req, res)=>{

    const {name} =req.params;
    console.log('doneeeeee',name);

    // let cfHandle;
    // let cfRating;
    // let cfRank;
    // let cfSolveCount;
    // let cfHandleLink = "codeforces.com/profile/";

    // let atCoderHandle;
    // let atCoderRating;
    // let atCoderRank;
    // let atCoderSolveCount;
    // let atcoderHandleLink = "atcoder.jp/users/";



    // if(id_now=="-1")
    //     res.end("Need to login first");

    // else{
    // const sql = `select handle,rating,rank,solve_count from table_codeforces where id='${id_now}'`;
    // let query = db.query(sql, (err, rows) => {
    //     if (err) throw err;

    //     console.log('cf_rating: ', rows[0].rating);
    //     console.log('cf_rank: ', rows[0].rank);
    //     console.log('cf_solve_count: ', rows[0].solve_count);
        
    //     cfHandle = rows[0].handle;
    //     cfRating =  rows[0].rating;
    //     cfRank =  rows[0].rank;
    //     cfSolveCount = rows[0].solve_count;
    //     cfHandleLink  += rows[0].handle;

    //     console.log(cfHandleLink);
    // });

    // const sql1 = `select handle,rating,rank,solve_count from table_atcoder where id='${id_now}'`;
    // let query1 = db.query(sql1, (err, rows) => {
    //     if (err) throw err;

    //     //res.send(results);
    //     // res.render("doctors", {
    //     //     title: "Doctor",
    //     //     data: results,
    //     // })
    //     console.log('atcoder_rating: ', rows[0].rating);
    //     console.log('atcoder_rank: ', rows[0].rank);
    //     console.log('atcoder_solve_count: ', rows[0].solve_count);

    //     atCoderHandle = rows[0].handle;
    //     atCoderRating =  rows[0].rating;
    //     atCoderRank =  rows[0].rank;
    //     atCoderSolveCount = rows[0].solve_count;
    //     atcoderHandleLink  += rows[0].handle;

    //     console.log(atcoderHandleLink);
        
    // });

    // db.execute(
    //     // 'select `id`,`name`,`points`, ROW_NUMBER() OVER (order by points desc) as rank  from `standings',
    //     // 'select `id`,`name`,`points`,  from `standings` order by `points` desc',
    //     'delete from `problems_table` where `url`=(?)',
    //     [url], 
    //     (err, results) => {
    //     if (err) {
    //         throw err;
    //     }
    //     else{
    //         // res.render('standings',{
    //         //     title: 'Standings',
    //         //     sampleData:results,
    //         //  });

    //         console.log(results)
    //         res.render('profile' , {
    //             userID: id_now,
    //             cfHandle,
    //             cfRating,
    //             cfRank,
    //             cfSolveCount,
    //             cfHandleLink,
    //             atCoderHandle,
    //             atCoderRating,
    //             atCoderRank,
    //             atCoderSolveCount,
    //             atcoderHandleLink,
    //             sampleData:results,
    //          });
    //     }
        
        
    //     // console.log(results);
    //   });

    // }
    
})

//from standings
router.get('/to_profile/:id', (req, res)=>{

    const {id} =req.params;
    console.log(id);
    let text = id.toString();
    console.log(text);

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

    const sql = `select handle,rating,rank,solve_count from table_codeforces where id='${text}'`;
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

    const sql1 = `select handle,rating,rank,solve_count from table_atcoder where id='${text}'`;
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
            userID: text,
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
    

    const sql = `select rating,id, handle, ROW_NUMBER() OVER (order by rating desc) as rank from table_codeforces `;
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
    
    const sql = `select rank,id, handle, ROW_NUMBER() OVER (order by rank desc) as number from table_atcoder `;

    // const sql = `select rank,id, handle from table_atcoder order by rating desc`;
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
        console.log(rows);
    
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

    console.log(updated_points);
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

        console.log('The data from user table: \n', rows);
        from_sign_up = 1;

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
           console.log("rating: ",data);
             cf_rating = data;
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
             console.log("sc: ",data);
            cf_solve_count=data;
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
    // res.render('base_logout' , {
    //     userID: id_now,
    //  });

    res.render('login' , {
        msg: null
     });
    ///else end
    }
});




router.get('/standings', (req, res) => {
  //  console.log(points);
    console.log(updated_points);

      db.execute(
        // 'select `id`,`name`,`points`, ROW_NUMBER() OVER (order by points desc) as rank  from `standings',
        // 'select `id`,`name`,`points`,  from `standings` order by `points` desc',
        'select `id`,`name`,`points`, ROW_NUMBER() OVER (order by points desc) as rank  from `standings`',
        [id_now, name_now, points], 
        (err, results) => {
        if (err) {
            throw err;
        }
        else{
            res.render('standings',{
                title: 'Standings',
                sampleData:results,
             });
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

router.get('/add_problem', (req, res) => {

    res.render('add_problem')
})

router.post('/problem_added', (req, res) => {

    let temp_text = "";
    let options = {
        
        args:[req.body.problem]
    }
    

    PythonShell.run("scrapers/cf_problem_name.py", options, function(err, results) {
        if (err) {
            console.log("ERRROR!");
            console.log(err);
        } else {
            console.log("LENGTH IS: ", results.length)
            //const data= JSON.parse(results[0]);
            //const data = results[0];
           //console.log(data.titlePhoto);
           // res.send(data);
           // console.log(results);
           /// //console.log("rank: ",data.rank);
           
           temp_text = results;
           console.log(results);
           console.log("asdfg");

        //    db.execute(
        //     'INSERT INTO `problems_table` (`url`, `id`, `problem_name`) VALUES (?, ?, ?)',
        //     [req.body.problem, id_now, temp_text], 
        //     (err, t_results) => {
        //     if (err) {
        //         throw err;
        //     }
        //     console.log(t_results);
        //     });

            
        let sql_t = `select * from problems_table where url='${req.body.problem}'`;
        let query_t = db.query(sql_t, (err, results) => {
        if (err) throw err;
        console.log(results);
        //res.send(results);
        // res.render("doctors", {
        //     title: "Doctor",
        //     data: results,
        // })
        if(results.length==0){
            const sql3 = `INSERT INTO problems_table (url,id,problem_name) VALUES ('${req.body.problem}', '${id_now}', '${temp_text}')`;
            let query = db.query(sql3, (err, rows) => {
            if (err) throw err;
    
            console.log('The data from user table: \n', rows);
    
        });
        }
    });

        
        }
    })

    console.log(req.body.problem)
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

        // console.log('cf_rating: ', rows[0].rating);
        // console.log('cf_rank: ', rows[0].rank);
        // console.log('cf_solve_count: ', rows[0].solve_count);
        
        cfHandle = rows[0].handle;
        cfRating =  rows[0].rating;
        cfRank =  rows[0].rank;
        cfSolveCount = rows[0].solve_count;
        cfHandleLink  += rows[0].handle;

        // console.log(cfHandleLink);
    });

  

    const sql1 = `select handle,rating,rank,solve_count from table_atcoder where id='${id_now}'`;
    let query1 = db.query(sql1, (err, rows) => {
        if (err) throw err;

        //res.send(results);
        // res.render("doctors", {
        //     title: "Doctor",
        //     data: results,
        // })
        // console.log('atcoder_rating: ', rows[0].rating);
        // console.log('atcoder_rank: ', rows[0].rank);
        // console.log('atcoder_solve_count: ', rows[0].solve_count);

        atCoderHandle = rows[0].handle;
        atCoderRating =  rows[0].rating;
        atCoderRank =  rows[0].rank;
        atCoderSolveCount = rows[0].solve_count;
        atcoderHandleLink  += rows[0].handle;

        console.log(atcoderHandleLink);



         
        
    });

    db.execute(
        // 'select `id`,`name`,`points`, ROW_NUMBER() OVER (order by points desc) as rank  from `standings',
        // 'select `id`,`name`,`points`,  from `standings` order by `points` desc',
        'select `url`,`problem_name` from `problems_table` where `id`=(?)',
        [id_now], 
        (err, results) => {
        if (err) {
            throw err;
        }
        else{
            // res.render('standings',{
            //     title: 'Standings',
            //     sampleData:results,
            //  });

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
                sampleData:results,
             });
        }
        
        
        console.log(results);
      });

   
    }
})

module.exports = router;