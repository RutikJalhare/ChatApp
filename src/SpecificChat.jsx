import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { io } from "socket.io-client";


const socket = io.connect("http://localhost:5000");

const SpecificChat = () => {




    let dispatch = useDispatch()


    let { id } = useParams();    // receiverid 
    let states = useSelector(state => state)
    let [message, setMessage] = useState(states.message)
    let SenderId = states.UserLogin.id
    let [textMessage ,setTextMessage] = useState({
        "SenderId":SenderId,
        "ReceiverId":id,
        "Messsage":null
    })
    console.log("start" ,textMessage)
    let communication_bet = [SenderId, id]



function SendMsg(e){
    e.preventDefault()
socket.emit("Message",textMessage)



}

socket.on("Response",(fromserver)=>{
//  console.log("the id s are ",fromserver)
axios.post("http://localhost:5000/message", communication_bet).then(response => {

            dispatch({ type: "Message", payload: response.data })
            setMessage(response.data)


        }).catch(error => {
            console.log(error)
        })








})



    useEffect(() => {

        axios.post("http://localhost:5000/message", communication_bet).then(response => {

            dispatch({ type: "Message", payload: response.data })
            setMessage(response.data)


        }).catch(error => {
            console.log(error)
        })


    }, [])


    return (
        <>

            <div className="container">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="card chat-app">

                            <div className="chat">
                                <div className="chat-header clearfix">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <Link to="#" data-toggle="modal" data-target="#view_info">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar" />
                                            </Link>
                                            <div className="chat-about">
                                                <h6 className="m-b-0"></h6>
                                                <small>Last seen: 2 hours ago</small>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 hidden-sm text-right">
                                            <Link to="#" className="btn btn-outline-secondary"><i className="fa fa-camera"></i></Link>
                                            <Link to="#" className="btn btn-outline-primary"><i className="fa fa-image"></i></Link>
                                            <Link to="#" className="btn btn-outline-info"><i className="fa fa-cogs"></i></Link>
                                            <Link to="#" className="btn btn-outline-warning"><i className="fa fa-question"></i></Link>
                                        </div>
                                    </div>
                                </div>


                                <div className="chat-history">

                                    <ul className="m-b-0">

                                    {
                                            message.map((data, pos) => {
                                                {/* console.log(data) */}
                                                return (


<div key={pos}>
                                                    <li className="clearfix">
                                                        <div className="message-data text-right">
                                                            <span className="message-data-time">10:10 AM, Today</span>
                                                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                                                        </div>
                                                        <div className={ data.ReceiverId == SenderId ?  "message my-message" : "message other-message"} > { data.Messsage}</div>
                                                    </li>
</div>
                                                )
                                            })
                                        }
                                     
                                    

                                    </ul>

                                </div>
                                <div className="chat-message clearfix">
                                    <div className="input-group mb-0">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" onClick={(e)=>{
                                            SendMsg(e)
                                            }}><i className="fa fa-send"></i></span>
                                        </div>
                                        <input type="text" name="message" className="form-control" onChange={(e)=>{
                                       setTextMessage({
                                        ...textMessage,
                                        Messsage:e.target.value
                                       })
                                        }} placeholder="Enter text here..." />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>















        </>
    )
}

export default SpecificChat