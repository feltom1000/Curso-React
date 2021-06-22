import React from "react";
import { Link } from "react-router-dom";

import twIcono from "../images/twIcono.png";
import Gravatar from "./Gravatar";
import "./styles/BadgesListItem.css";

class BadgeListItem extends React.Component {
  render() {
    return (
      <div className="box-item row">
        <div className="col-2">
          <Gravatar
            email={this.props.badge.email}
            className="imgAv"
            alt="Avatar"
          />
        </div>

        <div className="col-6">
          <p>
            <strong>
              {this.props.badge.firstName} {this.props.badge.lastName}
            </strong>
            <br /> <img src={twIcono} width="20px" alt="twIcono"></img>{" "}
            <em className="tw">@{this.props.badge.twitter}</em>
            <br /> {this.props.badge.jobTitle}
          </p>
        </div>
      </div>
    );
  }
}

function useSearchBadges(badges) {
  //Aca utilizamos useState que primero tiene por parametro el bloque de memoria
  //donde va a guardar cosas (state = variable) y luego la funcion que lo va a
  //actualizar. El useState('') marca el valor inicial de la variable state.
  const [state, setState] = React.useState("");
  const [filteredBadges, setFilteredBadges] = React.useState(badges);

  //useMemo guarda en memoria u ndato para que la proxima vez que sea pedido, ya
  //tenga la operacion resuelta. Usa una funcion como primer parametro, y un array
  //como segundo (donde voy a poner los datos/variables que si son iguales a alguno ingresado
  //anteriormente, la contestacion te la regresa al toque, porque ya estaría guardada).
  React.useMemo(() => {
    const result = badges.filter((badge) => {
      return `${badge.firstName} ${badge.lastName}`
        .toLowerCase()
        .includes(state.toLowerCase());
    });

    setFilteredBadges(result);
    //Los datos que utilizaria en esta operacion son la lista de badges y el nombre ingresado
    //en el cuadro de busqueda del filtrador, que esta guardada en el state
  }, [badges, state]);

  return { state, setState, filteredBadges };
}

function BadgesList(props) {
  const badges = props.badges;

  const { state, setState, filteredBadges } = useSearchBadges(badges);

  if (filteredBadges.length === 0) {
    return (
      <div>
        <div className="form-group">
          <label>Filter Badges</label>
          <input
            type="text"
            className="form-control"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
            }}
          />
        </div>

        <h3>No Badges were found</h3>
        <Link className="btn btn-primary" to="/badges/new">
          Create New Badge
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="form-group">
        <label>Filter Badges</label>
        <input
          type="text"
          className="form-control"
          value={state}
          onChange={(e) => {
            setState(e.target.value);
          }}
        />
      </div>
      <ul className="list-unstyled">
        {/* La funcion map tiene que estar unida a un Array, el cual tengo en Badges.
        Debo unir la funcion map a una prop de la clase BadgeList y luego en Badges
        voy a igualar esa prop a al array que estare mapeando en esta clase.
        Aqui solo esta el funcionamiento, la data esta en Badges. */}
        {filteredBadges.map((badge) => {
          return (
            <li key={badge.id}>
              <Link
                className="text-reset text-decoration-none"
                to={`/badges/${badge.id}`}
              >
                <BadgeListItem badge={badge} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BadgesList;
