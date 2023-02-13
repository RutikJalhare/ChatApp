
import React, { useEffect, useState } from 'react'

import axios from 'axios';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';


function App() {

  let navigate = useNavigate()

  let dispatch = useDispatch()
 let datafromredux = useSelector( state => state)
 console.log("dfr ",datafromredux)
  let userdata = {
    name: "",
    password: "",


  }

  let [urserdata, setdata] = useState(userdata)

  let gettingdata = (e) => {

    setdata({
      ...urserdata,
      [e.target.name]: e.target.value
    })
    //  console.log(urserdata)
  }


  let login = (e) => {
    e.preventDefault();

  
    axios.post("http://localhost:5000/login", urserdata).then(response => {



      if (response.status == 200) {

     //   console.log( (response.data[1])   )
      dispatch({type:"UserLogin" ,payload:(response.data[1])})
 


        // window.localStorage.setItem("token", response.data[0]);
        // window.localStorage.setItem("userId", JSON.stringify(response.data[1]));
        navigate('/friends')
      }



    }).catch(error => {
      console.log(error)
    })













  }








  return (
    <>
{/* {

    console.log("Prev user " ,useSelector( state => state ))
} */}
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">

            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-wrap p-4 p-md-5">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="fa fa-user-o"></span>
                </div>
                <h3 className="text-center mb-4">Have an account?</h3>
                <form className="login-form">
                  <div className="form-group">
                    <input type="text" className="form-control rounded-left" placeholder="Username" name="name" onChange={(e) => { gettingdata(e) }} />
                  </div>
                  <div className="form-group d-flex">
                    <input type="password" className="form-control rounded-left" placeholder="Password" name="password" onChange={(e) => { gettingdata(e) }} />
                  </div>
                  <div className="form-group d-md-flex">
                    <div className="w-50">
                      <label className="checkbox-wrap checkbox-primary">Remember Me
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="w-50 text-md-right">
                      <a href="#">Forgot Password</a>
                    </div>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary rounded submit p-3 px-5" onClick={(e) => { login(e) }}>Get Started</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <script src="js/jquery.min.js"></script>
      <script src="js/popper.js"></script>
      <script src="js/bootstrap.min.js"></script>
      <script src="js/main.js"></script>
      <script defer="" src="https://static.cloudflareinsights.com/beacon.min.js/vaafb692b2aea4879b33c060e79fe94621666317369993" integrity="sha512-0ahDYl866UMhKuYcW078ScMalXqtFJggm7TmlUtp0UlD4eQk0Ixfnm5ykXKvGJNFjLMoortdseTfsRT8oCfgGA==" data-cf-beacon="{&quot;rayId&quot;:&quot;78b55ac29ec79a89&quot;,&quot;token&quot;:&quot;cd0b4b3a733644fc843ef0b185f98241&quot;,&quot;version&quot;:&quot;2022.11.3&quot;,&quot;si&quot;:100}" crossOrigin="anonymous"></script>



    </>
  );
}

export default App;
