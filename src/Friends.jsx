import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector  } from "react-redux";
import axios from 'axios';
import { Link } from 'react-router-dom';






const Friends = () => {

  const dispatch = useDispatch();
const userLog = useSelector( state => state )



  let [users, setUsers] = useState(null)

  let getusers = async () => {
    

    let MysendId = { "userId": userLog }
// console.log("hhfghfgfgjk" ,MysendId.userId.UserLogin.id)
    await axios.post("http://localhost:5000/getuser", MysendId.userId.UserLogin).then((res) => {
 console.log("from server " ,res)


       dispatch({ type :"addusers" ,payload : res.data })
       setUsers(userLog.LogUserFriend)
  
    }).catch(err => {
      console.log(err)
    });
  }

  useEffect((e) => {
    getusers()
  },
    [])






  return (


    <>
      <div className="container align-center">
        <div className="row">
          <div className="col-10">
            <div className="articles card">

              <div className="card-close">
                <div className="dropdown">
                  <button type="button" id="closeCard4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-toggle"><i className="fa fa-ellipsis-v"></i></button>

                </div>
              </div>
              <div className="card-header d-flex align-items-center">


                <div className="col">

                  <div className="form">

                    <input type="text" className="form-control form-input" placeholder="Search anything..." />

                  </div>

                </div>

              </div>


              <div className="card-body no-padding">


                {users != null ? users.map((data, pos) => {
              //    console.log( "data" ,data, pos)


                  return (

                    <div  key={pos}>

            <Link to={`/chat/`+`${data.id}`}>
                      <div className="item d-flex align-items-center">



                        <div className="image"><img src={ process.env.REACT_APP_IMGPATH + data.profile  }  alt="..." className="img-fluid rounded-circle" /></div>

                        <div className="text">
                          <h3 className="h5">{data.name}</h3><small>Posted on 5th June 2017 by Aria Smith.   </small>

                        </div>
                        <span id="group">
                          <button type="button" className="buttoninnner btn btn-info">
                            <i className="fa fa-envelope"></i>
                          </button>
                          <span className="badge badge-light">5</span>
                        </span>

                      </div>
</Link>
                    </div>
                  )




                }) : null


                }



              </div>
            </div>
          </div>











        </div>
      </div>



    </>
  )
}








 export default Friends