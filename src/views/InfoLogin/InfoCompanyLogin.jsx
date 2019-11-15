import React, { Component } from "react";
import { Redirect } from "react-router";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "components/Header/Header.jsx";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { Link } from "react-router-dom";
import CustomButton from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import TextField from "@material-ui/core/TextField";
import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.jsx";
import WebFooter from "components/WebFooter/WebFooter.jsx";

import image from "assets/img/wisewalletA1.jpg";
import "assets/css/style.css";


class InfoLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleClick() {
    const { email, password } = this.state;

    fetch("/company_users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(response => response.json())
      .then(json => {

        if (json.data.code === 200) {
          sessionStorage.setItem('userID', json.data.company_user_data.user_id);
          sessionStorage.setItem('isCompany', json.data.company_user_data.isCompany);
          if (json.data.company_user_data.isCompany) {
            this.props.history.push('/company_users/company');
          }
          else
            this.props.history.push('/company_users/login');
        }
        else {
          alert("Emai_id or Password is invalid")
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    const { classes } = this.props;
    if (sessionStorage.getItem("userID")) {
      return (<Redirect to="/search" />)
    }
    return (<div>
      <header style={{ backgroundColor: "#031D44" }} >
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <Link to="/">
                <h2>
                  <img src={require("assets/img/logos/white-logo.png")}
                    height="42"
                    width="42"></img>
                  WiseWallet</h2>
              </Link>
              <div className="simpborder"></div>
              <p>Put your money where your mind is.</p>
            </div>
          </div>
        </div>
      </header>
      <div>
        <center>
          <h2 style={{ fontFamily: "gotham-bold" }}>Login</h2>
          <form
            autoComplete="off">
            <div className="simpborder"></div>
            <TextField
              id="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange("email")}
              margin="normal" />
            <br></br>
            <TextField
              id="password"
              label="Password"
              required
              className={classes.textField}
              type="password"
              value={this.state.password}
              onChange={this.handleChange("password")}
              autoComplete="current-password"
              margin="normal" />
            <br></br>
            <Button style={{ marginRight: "10px" }} variant="outlined" color="#031d44"
              onClick={this.handleClick}>
              Login
          </Button>
            <Button variant="outlined" color="#031d44">
              <Link to="/login" style={{ color: "#012E3C" }}>If you are not company</Link>
            </Button><br></br><br></br>
            Don't have account
            <Button style={{ marginLeft: "10px" }} variant="outlined" color="#031d44">
              <Link to="/company/signup" style={{ color: "#012E3C" }}>Beta Company Signup</Link>
            </Button><br></br>
            <br></br>
            If you are not Company User
            <Button style={{ marginLeft: "10px" }} variant="outlined" color="#031d44">
              <Link to="/signup" style={{ color: "#012E3C" }}>Beta Signup</Link>
            </Button>
          </form>
        </center>
      </div>
      <WebFooter />
    </div >);
  }
}

export default withStyles(loginPageStyle)(InfoLogin);