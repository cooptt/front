import React from 'react';
import Backdrop from '../Backdrop/Backdrop'
import '../Modal.css'
import './ModalSignIn.css'
const ModalSignIn = (props) =>{

  return (
    <div className="ModalSignIn">
        <Backdrop clicked={props.clicked} />
        <div className="Modal">
            <button onClick={props.loginGoogle}>
                Iniciar Sesión con Google
            </button>
            <form onSubmit={props.loginEmail}>
                <input placeholder="email" type="email" onChange={props.changeEmail}  required/>
                <input placeholder="password" type="password" onChange={props.changePassword}  required/>
                <br></br><br></br>
                <input className="inputButton" type="submit" value="Iniciar Sesión"/>
            </form>
        </div>
    </div>
  )
}

export default ModalSignIn;
