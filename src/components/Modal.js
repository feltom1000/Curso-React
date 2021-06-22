import React from "react";
import ReactDOM from "react-dom";

import './styles/Modal.css'

function Modal(props) {
    if (!props.isOpen){
        return null;
    }

  return ReactDOM.createPortal(
    <div className="Modal">
        <div className="Modal__container">
            {/*Necesitamos manejar tmb el boton para cerrar el modal, y cambiar el isOpen
            de true a false.*/}
            <button onClick={props.onClose} className="Modal__close-button">X</button>

            {/*El contenido del modal (El mensaje que aparece en el recuadro superpuesto)
            va a estar dado dentro del componente en los lugares donde lo utilicemos*/}
            {props.children}
        </div>
    </div>,
    document.getElementById("modal")
  );
}

export default Modal;
