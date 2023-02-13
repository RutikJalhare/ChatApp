import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { upload } from '@testing-library/user-event/dist/upload';

const Register = () => {




  const [file, setFile] = useState(null);

  let navigate = useNavigate();

  let userdata = {
    email: "",
    name: "",
    password: ""

  }

  let [urserdata, setdata] = useState(userdata)

  let gettingdata = (e) => {

    setdata({
      ...urserdata,
      [e.target.name]: e.target.value
    })
    console.log(urserdata)
  }








  function senddata(e) {
    //upload file api 
    // console.log(urserdata)
    e.preventDefault();



    let profile = document.getElementById("profile")
    let prophoto = profile.files[0].name;

    let upload = async () => {
      let formData = new FormData();
      formData.append("screenshot", file);
      await axios.post("http://localhost:5000/upload", formData).then((res) => {
        // console.log("Success profile upload  ", res)

      }).catch(err => {
        console.log(err)
      });

    }



    let register = async () => {

      await axios.post("http://localhost:5000/register", urserdata).then((res) => {
        console.log("send inserted ", res)
 upload() ;
 navigate("/login") ;




        //navigate('/login')
      }).catch((error) => {
        console.log("Registration Failed ", error)
      })


    }

  
    register();











  }


  return (
    <div>





      <section className="vh-100" >
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" >
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                      <form className="mx-1 mx-md-4">

                        <div className="d-flex flex-row align-items-center mb-4">

                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example1c" name="name" className="form-control" onChange={(e) => { gettingdata(e) }} />
                            <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">

                          <div className="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" name="email" className="form-control" onChange={(e) => { gettingdata(e) }} />
                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">

                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" name="password" className="form-control" onChange={(e) => { gettingdata(e) }} />
                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                          </div>
                        </div>




                        <div className="d-flex flex-row align-items-center mb-4">

                          <div className="form-outline flex-fill mb-0">


                            <input
                              type="file"
                              name="myfile"
                              id="profile"
                              onChange={(e) => {
                                setFile(e.target.files[0]);

                                
                              }}
                            />
                            <label className="form-label" htmlFor="form3Example4c">Upload Profile </label>
                          </div>
                        </div>







                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="button" className="btn btn-primary btn-lg" onClick={(e) => { senddata(e) }}>Register</button>
                        </div>

                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt="Sample image" />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>













    </div>
  )
}

export default Register