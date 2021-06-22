import React from "react";

import { Link } from "react-router-dom";

import "./styles/BadgeDetails.css";
import confLogo from "../images/platziconf-logo.svg";
import Badge from "../components/Badge";
import DeleteBadgeModal from "../components/DeleteBadgeModal";

function BadgeDetails(props) {
  const badge = props.badge;

  return (
    <div>
      <div className="BadgeDetails__hero">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <img src={confLogo} alt="Logo de la Conferencia"></img>
            </div>
            <div className="col-6 BadgeDetails__hero-attendant-name">
              <h1>
                {badge.firstName} {badge.lastName}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container"></div>
      <div className="row">
        <div className="col">
          <Badge
            firstName={badge.firstName}
            lastName={badge.lastName}
            email={badge.email}
            twitter={badge.twitter}
            jobTitle={badge.jobTitle}
          />
        </div>
        <div className="col">
          <h2>Actions</h2>
          <div>
            <Link
              className="btn btn-primary mb-4"
              to={`/badges/${badge.id}/edit`}
            >
              Edit
            </Link>
            <div>
              {/* El evento de abrir el modal lo maneja el boton de delete, el de cerrarlo el mismo modal */}
              <button onClick={props.onOpenModal} className="btn btn-danger">
                Delete
              </button>
              {/*Necesitamos creae una ventana modal para deletiar, para eso utilizamos los portales
              Los portales van a renderizar una nueva pagina superpuesta en nuestro DOM*/}

              {/* Agregamos una prop llamada onClose, que la va manejar BadgeDetailsContainer,
              el componente encargado de la logica. (A parte de que este componente es funcional,
              por lo tanto no maneja estado) */}
              <DeleteBadgeModal
                isOpen={props.modalIsOpen}
                onClose={props.onCloseModal}
                onDeleteBadge={props.onDeleteBadge}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BadgeDetails;
