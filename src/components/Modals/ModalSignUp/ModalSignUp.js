import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import '../Modal.css'
import './ModalSignUp.css'

const ModalSignUp = (props) =>{

  return (
      <div className="ModalSignUp">
        <Backdrop clicked={props.clicked} />
        <div className="Modal">
            <form onSubmit={props.submit}>
              <input placeholder="Nombre(s)" type="text" onChange={props.changeFirstName} required/>
              <input placeholder="Apellido(s)" type="text" onChange={props.changeLastName} required/>
              <input placeholder="email" type="email" onChange={props.changeEmail}  required/>
              <input placeholder="password" type="password" minLength="6" onChange={props.changePassword}  required/>
              <br></br><br></br><br></br>
              <input className="inputButton" type="submit" value="Registrarse"/>
            </form>
        </div>
    </div>
  )
}

export default ModalSignUp;
