import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
// @material-ui/icons
import InsertChart from "@material-ui/icons/InsertChart";
import ListIcon from "@material-ui/icons/List";
import Loyalty from "@material-ui/icons/Loyalty";
// core components
import Header from "components/Header/Header.jsx";
import SignUpLinks from "components/Header/SignUpLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Popup from "reactjs-popup";

import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.jsx";

import image from "assets/img/register.jpg";

const Mailchimp = require('mailchimp-api-js');
class Components extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    };
    this.onSignUp = this.onSignUp.bind(this);
  }
    
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  };
  onSignUp() {
    const {email, password, firstName, lastName} = this.state;
    
      /*
    fetch("https://tldpv6umn7.execute-api.us-east-1.amazonaws.com/default/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: email, lastName: lastName, password: password, firstName: firstName})
    }).then(response => response.json()).then(json => {
      console.log('json', json);
      if (json.success) {
        console.log("success " + json.userID);
        sessionStorage.setItem('userID', json.userID);
      }
    });
    */

    let body = {
        email_address : email,
        status: 'subscribed',
        merge_fields : { FNAME: firstName, LNAME: lastName, ADDRESS: '', PHONE: ''}
    }
      var mailchimp = new Mailchimp("WiseWallet","12282ab4749c9cf79956abf705903cfa-us17");
    mailchimp.members.add('fce1ac23fe', body).then(function (err, result) {
        console.log(result)
        console.log(err)
    })
      this.props.history.push('/link')

  }
  render() {
    const {
      classes,
      ...rest
    } = this.props;
    return (<div>
      <Header absolute="absolute" color="transparent" brand="WiseWallet" />
      <div className={classes.pageHeader} style={{
          backgroundImage: "url("+image+")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={10} md={4}>
              <Card className={classes.cardSignup}>
                <h2 className={classes.cardTitle}>Register</h2>
                <CardBody>
                  <center>
                  <form className={classes.form}>
                    <TextField id="firstName" label="First Name" className={classes.textField} value={this.state.firstName} onChange={this.handleChange("firstName")} margin="normal"/>
                    <TextField id="lastName" label="Last Name" className={classes.textField} value={this.state.lastName} onChange={this.handleChange("lastName")} margin="normal"/>
                    <TextField id="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange("email")} margin="normal"/>
                    <TextField id="password" label="Password" className={classes.textField} type="password" value={this.state.password} onChange={this.handleChange("password")} autoComplete="current-password" margin="normal"/>
                    <Button color="primary" size = "medium" onClick={this.onSignUp}>
                      Sign up
                    </Button>

                  </form>
                  </center>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer theme ="white" content={<div>
          <GridContainer>
            <GridItem sm={3}>
            </GridItem>
            <GridItem sm={6}>
          <div className={classNames(classes.pullCenter, classes.copyRight)} style={{width: 'auto'}}>
            Copyright &copy; {1900 + new Date().getYear()}{" "}
            <a href="http://www.mywisewallet.com">WiseWallet Inc. </a> 
            All Rights Reserved. </div></GridItem>
        </GridContainer>
        </div>}></Footer>
      </div>
    </div>);
  }
}

export default withStyles(signupPageStyle)(Components);


