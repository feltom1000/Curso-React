import React from "react";

import Badge from "../components/Badge.js";
import "./styles/BadgeNew.css";
import logoBadge from "../images/platziconf-logo.svg";
import BadgeForm from "../components/BadgeForm.js";
import api from "../api";
import PageLoading from "../components/PageLoading";

class BadgeEdit extends React.Component {
  state = {
    loading: true,
    error: null,
    form: {
      firstName: "",
      lastName: "",
      email: "",
      jobTitle: "",
      twitter: "",
    },
  };

  //Esta pagina tiene que comenzar en loading, porque necesita pedir los datos de la Badge a editar.
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async (e) => {
    this.setState({ loading: true, error: null });

    try {
      const data = await api.badges.read(
        //utilizamos otras props pasadas por react router. Match en este caso.
        // Y con params accedemos a las variables que declaramos en las routas.
        this.props.match.params.badgeId
      );
      this.setState({ loading: false, form: data });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: null });
    console.log("Esta manejandose el Submit");

    try {
        //Aca cambiamos create por update, ya que ya no creamos un item, si no que lo actualizamos.
        //Utiliza dos parametros: el id y la info a actualizar.
      await api.badges.update(this.props.match.params.badgeId, this.state.form);
      this.setState({ loading: false });
      console.log("Se esta enviando el post");

      /* Si todo sale bien me quiero ir del formulario y volver a la pagina de Badges:
        Para ir de una pagina a otra utilizamos una de las tres props
        que pasa React Router a las paginas, que son Match, History and Location.
        Utilizamos History.*/
      this.props.history.push("/badges");
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading) {
      return <PageLoading />;
    }
    return (
      <React.Fragment>
        <div className="BadgeNew__hero">
          <img
            className="img-fluid BadgeNew__hero-image"
            src={logoBadge}
            alt="Logo"
          />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-6">
              <Badge
                firstName={this.state.form.firstName || "FIRST_NAME"}
                lastName={this.state.form.lastName || "LAST_NAME"}
                twitter={this.state.form.twitter || "Twitter"}
                jobTitle={this.state.form.jobTitle || "JOB_TITLE"}
                email={this.state.form.email || "EMAIL"}
              />
            </div>
            <div className="col-6">
              <h1>Edit Attendant</h1>
              <BadgeForm
                envio={this.handleSubmit}
                formDataInput={this.handleChange}
                formValues={this.state.form}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BadgeEdit;
