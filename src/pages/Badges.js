import React from "react";
import { Link } from "react-router-dom";

import "./styles/Badges.css";
import confLogo from "../images/logo-badge.svg";
import BadgesList from "../components/BadgesList";
import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";
import MiniLoader from "../components/MiniLoader";

import api from "../api";

class Badges extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
  };

  componentDidMount() {
    this.fetchData();

    this.intervalId = setInterval(this.fetchData, 5000);
    //La pagina cada 5 segundos va a recargar los datos y actualizarlos
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
    //Aca cancelamos el interval asi no se sigue produciendo la accion asincrona
    //al irnos de la pagina.
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });

    try {
      const data = await api.badges.list();
      this.setState({ loading: false, data: data });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading === true && this.state.data === undefined) {
      return <PageLoading />;
    }

    if (this.state.error) {
      return <PageError error={this.state.error} />;
    }

    return (
      <React.Fragment>
        <div className="Badges">
          <div className="Badges__hero">
            <div className="Badges__container">
              <img
                className="Badges_conf-logo"
                src={confLogo}
                alt="Conf Logo"
              />
            </div>
          </div>
        </div>

        <div className="Badge__container">
          <div className="Badges__buttons">
            <Link to="/badges/new" className="btn btn-primary">
              New Badge
            </Link>
          </div>

          <div className="Badges__list">
            <div className="Badges__container">
              {/* Igualo la prop badges (que en BadgesList mapie), para que la funcion utilizada
              en BadgesList (Donde solo se ubica el funcionamiento), tenga Data con la que trabajar
              cuando se rendericen los dos componentes integralmente. La data esta en Badges, el funcionamiento
              en BadgesList. */}
              <BadgesList badges={this.state.data} />

              {this.state.loading && <MiniLoader />}
              {/*Agregamos un MiniLoader en la actualizacion constante de la pagina*/}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Badges;
