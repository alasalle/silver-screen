import React, { Component } from "react";

export default class Register_Login extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <h2>Login</h2>
          <form
            className="col 12"
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
                <label htmlFor="email">Email</label>
                <span
                  className="helper-text"
                  data-error="Entry must be in the correct email format."
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
                <label htmlFor="password">Password</label>
                <span
                  className="helper-text"
                  data-error="Error"
                  data-success="Success"
                />
              </div>
            </div>

            <div className="row">
              <div className="col 12">
                <button className="btn waves-effect red lighten-2" type="submit" name="action" onClick={this.submitForm}>Login</button>
                <button className="btn waves-effect red lighten-2">Sign Up</button>
              </div>

            </div>
          </form>
        </div>
      </div>
    );
  }
}
