import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../services/api";
import { Form, Container } from "../styles/form";

class SignUp extends Component {
  
  state = {
    name: "",
    email: "",
    username: "",
    password: "",
    role: "user",
    status: "active",
    success: "",
    error: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { name, username, email, password, role, status } = this.state;
    if (!username || !email || !password) {
      this.setState({ error: "Fill in all the data to register" });
    } else {
      try {
        await api.post("/signUp", { name, username, email, password, role, status })
        .then(response => {
          console.log("response ", response)
          this.setState({ success: response.data.success, error: "" });
          if(response.success)
            this.props.history.push("/");
        });
      } catch (err) {
        console.log(err);
        this.setState({ error: "Error registering", success: "" });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          {console.log("statee: ",this.state)}
          {this.state.success && <p>{this.state.success}</p>}
          {this.state.error && <p>{this.state.error}</p>}
          <i className="fa fa-user-circle"></i>
          <input
            type="text"
            placeholder="Name"
            onChange={e => this.setState({ name: e.target.value })}
            className="input-login"
          />
          <i className="fa fa-envelope"></i>
          <input
            type="email"
            placeholder="E-mail"
            onChange={e => this.setState({ email: e.target.value })}
            className="input-login"
          />
          <i className="fa fa-user"></i>
          <input
            type="text"
            placeholder="Username"
            onChange={e => this.setState({ username: e.target.value })}
            className="input-login"
          />
          <i className="fa fa-lock"></i>
          <input
            type="password"
            placeholder="Password"
            onChange={e => this.setState({ password: e.target.value })}
            className="input-login"
          />
          <button type="submit" className="btn btn-login btn-lg btn-block">Sign Up</button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignUp);