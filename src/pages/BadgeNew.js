import React from "react";

import Badge from "../components/Badge.js";
import "./styles/BadgeNew.css";
import logoBadge from "../images/platziconf-logo.svg";
import BadgeForm from "../components/BadgeForm.js";
import api from "../api";
import PageLoading from "../components/PageLoading";

class BadgeNew extends React.Component {
  state = {
    loading: false,
    error: null,
    form: {
      firstName: "",
      lastName: "",
      email: "",
      jobTitle: "",
      twitter: "",
    },
  };

  /* Cada vez que es llamada esta funcion (es decir, cada vez que hay un evento de
    onChange en la form), se sobrescribe la info del state al ser invocado el metodo
    "setState" nuevamente. Para prevenir esto y contar con todos los valores de los inputs
    de la form, es decir, todos los eventos de onChange, son propuestas dos maneras: */

  handleChange = (e) => {
    // /* MANERA 1:
    // e va a ser el argumento de la funcion que represente la info que tiene
    // adentro la prop pasada por parametro del componente: formData. */
    // const nextForm = this.state.form;
    // nextForm[e.target.name] = e.target.value;
    // /* Y con .target accedemos a cada valor dentro de la la info de formData, que queremos */
    // this.setState({
    //   form: nextForm,
    // });
    this.setState({
      form: {
        /* Sobrescribimos la info del state con toda la info anterior, agregando nueva: */
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
      await api.badges.create(this.state.form);
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
              <h1>New Attendant</h1>
              <BadgeForm
                envio={this.handleSubmit}
                formDataInput={this.handleChange}
                /* BadgeForm recibe un prop(argumento, bloque de memoria con info) llamada formDataInput, que dentro tiene toda
              la info de los eventos sucedidos en el formulario. Esa info la llevo a la funcion handlechange, declarada arriba. */
                formValues={this.state.form}
                /* formValues, con toda la data de la los valores de cada input de la form, va a ir directo a ser igual
              a el state local, dentro del objeto inicialmente vacio llamado form. */
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BadgeNew;
