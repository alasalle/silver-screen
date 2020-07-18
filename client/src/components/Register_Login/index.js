import React, { Component } from "react";
export default class Register_Login extends Component {
  
    state = {
      email: "",
      password: "",
      errors: [],
    };

    handleChange = event => {
      this.setState({[event.target.name]: event.target.value});
    }

    submitForm = event => {
      event.preventDefault();
      let data = {
        email: this.state.email,
        password: this.state.password
      };

    if (this.isValidForm(this.state)) {
      

      this.props
        .dispatch(loginUser(data))
        .then((res) => {
          if (res.payload.loginSuccess) {
            this.props.history.push("/");
          } else {
            this.setState({
              errors: [
                ...this.state.errors,
                "Error: password and/or email unrecognized",
              ],
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            errors: [...this.state.errors, "Error: unable to login"],
          });
        });
    } else {
      this.setState({
        errors: [
          ...this.state.errors,
          "Error: incorrect email and/or password format",
        ],
      });
      }
  };

  isValidEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  isValidForm = ({ email, password }) => this.isValidEmail(email) && password;

  displayErrors = (errors) => {
    return errors.map((err, i) => <p key={i}>{err}</p>);
  };
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <h2>Login</h2>
          <form
            className="col s12"
            onSubmit={(event) => this.submitForm(EventSource)}
          >
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="email"
                  value={this.state.email}
                  onChange={(e) => this.handleChange(e)}
                  id="email"
                  type="email"
                  className="validate"
                />
                <label
                  htmlFor="email"
                  style={{
                    visibility: this.state.email !== "" ? "hidden" : null,
                  }}
                >
                  Email
                </label>
                <span
                  className="helper-text"
                  data-error="Error"
                  data-success="Success"
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  name="password"
                  value={this.state.password}
                  onChange={(e) => this.handleChange(e)}
                  id="password"
                  type="password"
                  className="validate"
                />
                <label
                  htmlFor="password"
                  style={{
                    visibility: this.state.password !== "" ? "hidden" : null,
                  }}
                >
                  Password
                </label>
                <span
                  className="helper-text"
                  data-error="Error"
                  data-success="Success"
                />
              </div>
            </div>

            <div className="row">
              <div className="col s12">
                <button
                  className="btn waves-effect red lighten-2"
                  type="submit"
                  name="action"
                  onClick={this.submitForm}
                >
                  Login
                </button>
                <button className="btn waves-effect red lighten-2">
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
