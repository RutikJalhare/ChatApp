let express = require("express");
let path = require("path");
let conn = require("./db_connection")
require('dotenv').config();
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');


const fileUpload = require("express-fileupload");
const cors = require("cors");
const { json } = require("react-router-dom");
const { Console } = require("console");

const app = express();
let http = require('http').createServer(app);
const io = require('socket.io')(http, {
      cors: {
            origin: "*"

      },
});



app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(cookieParser())

const imgfolder = path.join(__dirname, 'upload')
app.use(express.static(imgfolder))

app.post("/upload", (req, resp) => {


      const filename = Date.now() + "_" + req.files.screenshot.name;
      const file = req.files.screenshot;

      let uploadPath = __dirname + "/upload/" + filename;
      file.mv(uploadPath, (err) => {
            if (err) {
                  return resp.send(err);
            }
            else {

                  let profiledata = {
                        profile: filename
                  }

                  conn.query(`INSERT INTO photo set ?   `, profiledata, function (error, result) {
                        if (error) {
                              console.log(error)
                        }
                        else {
                              return resp.send("register Successfull")
                        }
                  });




            }
      });
});



app.post("/register", (req, resp) => {
      // console.log(req.body)


      conn.query(`INSERT INTO users set ?   `, req.body, function (error, result) {
            if (error) {
                  console.log(error)
            }
            else {
                  return resp.send("register Successfull")
            }
      });

});


app.post("/login", (req, resp) => {
      let data = req.body;

      let name = data.name;
      let password = data.password

      conn.query(`SELECT * FROM users  where email = ?    and password = ? `, [name, password], function (error, result) {
            if (error) {
                  console.log(error)
            }
            else {


                  if (result.length) {
                        var token = jwt.sign(data, process.env.SECREATE_KEY);



                        return resp.status(200).send([token, result[0]])
                  } else {

                        return resp.status(400).send("user not  Available ");
                  }
            }
      });






})




app.post("/getuser", (req, resp) => {
      // console.log(((req.body.id))   )


      conn.query(`SELECT * FROM users u,photo p  where u.id != ?  and u.id = p.id`, req.body.id, function (error, result) {
            if (error) {
                  console.log(error)
            }
            else {
                  return resp.send(result)
            }

      });




})



// message code 
// SELECT `id`, `SenderId`, `ReceiverId`, `Messsage`, `Msg_Time` FROM `message` WHERE ( `SenderId` = 1 and `ReceiverId`= 2 ) OR (`SenderId` = 2 and `ReceiverId`= 1 );

app.post("/message", (req, resp) => {
// console.log(((req.body))   )
let data = [...req.body ,req.body[1],req.body[0]]

conn.query(`SELECT * FROM  message WHERE  SenderId   = ? and ReceiverId= ?  OR SenderId = ? and ReceiverId= ? `,data, function (error, result) {
      if (error) {
            console.log(error)
      }
      else {
           return resp.send(result)
      }

});

})
io.on('connection', socket => {

      socket.on("Message",(communication_bet)=>{
let insertdataa = [communication_bet.SenderId,communication_bet.ReceiverId, communication_bet.Messsage ]

            conn.query(`insert into message (SenderId, ReceiverId ,Messsage )  values(? ,?,?)  `, insertdataa, function (error, result) {
                  if (error) {
                        console.log(error)
                  }
                  else {
                        io.emit("Response", result ); 
                  }
            
            });

            


       
                 //    console.log("the id s are ",communication_bet)
            //let data = [...communication_bet ,communication_bet[1],communication_bet[0]]
            // console.log("the id s are ",communication_bet)



            // conn.query(`SELECT * FROM  message WHERE  SenderId   = ? and ReceiverId= ?  OR SenderId = ? and ReceiverId= ? `,data, function (error, result) {
            //       if (error) {
            //             console.log(error)
            //       }
            //       else {
            //             io.emit("Response", result ); // 
            //       }
            
            // });
           
      })
      
})

// // socket code only here 
// io.on('connection', socket => {
//       // console.log("socket id ", socket.id)


//       socket.on("coll_id",(both_id)=>{
//            let getreceiver = both_id.ReceiverId ;
//            let getSenderId  = both_id.SenderId ;
  
//       conn.query(`select  * from  message  where SenderId = ? and ReceiverId = ?  `,[getSenderId ,getreceiver ], function (error, result) {
//             if (error) {
//                   console.log(error)
//             }
//             else {
                 
//        io.emit("receive_message", result );
//             }
//       })
  
      
  
//       })


//       socket.on("send_message", (data) => {

//             // Message Received 
//             let recv = data.ReceiverId ;
//             let sender= data.SenderId ;
//                   conn.query(`INSERT INTO message set ?   `,data, function (error, result) {
//                         if (error) {
//                               console.log(error)
//                         }
//                         else {
//                               console.log("message inserted  ")
//                         }
//                   })

//                   conn.query(`select  * from  message  where SenderId = ? and ReceiverId = ?  `,[sender ,recv ], function (error, result) {
//                         if (error) {
//                               console.log(error)
//                         }
//                         else {
                             
//      io.emit("receive_message", result );
//                         }
//                   })



//       });



//       // socket.on("send_message", (data) => {
//       //       io.emit("receive_message", data);


//       //     });




// //    socket.emit("receive_message", 123);






// });





// // socket code only here 


http.listen(process.env.NODEPORT, () => {
      console.log("server running ", process.env.NODEPORT)
})




