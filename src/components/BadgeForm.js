import React from "react";

class BadgeForm extends React.Component {
  // state = {};
  // handleChange = (e) => {
  //   // console.log({
  //   //   name: e.target.name,
  //   //   value: e.target.value,
  //   // });

  //   this.setState({
  //     [e.target.name]: e.target.value,
  // Esta funcion va a estar en BadgeNew, porque alli es donde necesito usar la info.
  //   });
  // };

  handleClick = (e) => {
    console.log("Button was Clicked");
  };

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form was submitted");
  // };

  render() {
    return (
      <div>

        <form onSubmit={this.props.envio}>
          <div className="form-group">
            <label>First Name</label>
            <input
              onChange={this.props.formDataInput}
              /* En el evento onChange, lo que hago es poner el
              valor del evento en la propiedad de la clase llamada formData */
              className="form-control"
              type="text"
              name="firstName"
              value={this.props.formValues.firstName}
              /* el valor, enlazado con firstName en este caso, va a ir directo
              a guardarse en la prop (bloque de memoria que guarda info), formValues,
              y jamaz se va a guardar en el estado local */
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              onChange={this.props.formDataInput}
              className="form-control"
              type="text"
              name="lastName"
              value={this.props.formValues.lastName}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              onChange={this.props.formDataInput}
              className="form-control"
              type="email"
              name="email"
              value={this.props.formValues.email}
            />
          </div>

          <div className="form-group">
            <label>Job Title</label>
            <input
              onChange={this.props.formDataInput}
              className="form-control"
              type="text"
              name="jobTitle"
              value={this.props.formValues.jobTitle}
            />
          </div>

          <div className="form-group">
            <label>Twitter</label>
            <input
              onChange={this.props.formDataInput}
              className="form-control"
              type="text"
              name="twitter"
              value={this.props.formValues.twitter}
            />
          </div>

          <button onClick={this.handleClick} className="btn btn-primary">
            Save
          </button>

          {this.props.error && (
            <p className="text-danger">{this.props.error.message}</p>
          )}
        </form>
      </div>
    );
  }
}

export default BadgeForm;
