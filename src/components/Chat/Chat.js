import React, { Component } from 'react';
import axios from 'axios'
import Inbox from './Inbox/Inbox'
import './Chat.css'
import config from '../../config'
class Chat extends Component {


    constructor(props){
        super(props);
        this.state={
            users:[],
            destId:this.props.destId
        }
    }

    componentWillMount(){
      let path = `${config.server}/getChatUsers?userId=${this.props.userId}`
      axios.get(path)
      .then( response =>{
          console.log('USERS1',response.data.data);
          this.setState({
              users:response.data.data
          })
      })
      .catch( error=>{
          console.log(error);
      })
    }


    componentDidMount(){
        this.interval = setInterval(() =>{
            let path = `${config.server}/getChatUsers?userId=${this.props.userId}`
            axios.get(path)
            .then( response =>{
                console.log('USERS1',response.data.data);
                this.setState({
                    users:response.data.data
                })
            })
            .catch( error=>{
                console.log(error);
            })
        }, 5000);

    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    selectionHandler = id=>{
        let x = id.toString()
        this.setState({
            destId:x
        })
    }



    render() {

        let users = null
        users = this.state.users.map( user=>{
            return   <p key={user.userId} onClick={()=>this.selectionHandler(user.userId)} className='userchatx'> {user.firstName} {user.lastName} </p>
        })

        let inbox = null
        if(this.state.destId){
            inbox=<Inbox srcId={this.props.userId} destId={this.state.destId}/>
        }
        return (

            <div className="Chat">
                {inbox}
                <div className="Userschat">
                  {users}
                </div>
            </div>
        );
    }
}

export default Chat;
