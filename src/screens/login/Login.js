import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import './login.css';
import Header from '../../common/header/Header';
import Home from '../../screens/home/Home';

import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Input,
  Button,
  FormHelperText
} from "@material-ui/core";

const customStyles = theme => ({
  mainContainer: {
      display: "inline-block",
      padding: "30px 30px",
      border: "2px solid #ccc"
  },
  marginButton: {
    marginTop: theme.spacing(4),
  },
  header: {
    fontSize: "2.125 rem",
    fontFamily: "Roboto,Helvetica,Arial sans-serif",
    fontWeight: 400,
    lineHeight: 1.17,
    letterSpacing: "0.00735em"
  },
  outerDiv: {
    display: "flex",
    justifyContent: "center",
    padding: 30,
    paddingLeft: "32px",
    paddingRight: "32px",
    marginRight: "auto",
    marginLeft: "auto",
    maxWidth: "444px"
  }
  
});
 
class Login extends Component  {
  
    constructor() {
        super();
        this.state = {
            value: 0,
            usernameRequired: "dispNone",
            passwordRequired: "dispNone",
            loginAuthorization: "dispNone",
            username: "",
            password: ""
        }
    }
    loginClickHandler = () => {
      this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
      this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });
      const username = "unns4321";
      const password = "upgrad321";
      const accessToken = "13805614664.279ad47.b8709f2ffd8641f2aeccd207f5195480";
      if (this.state.username.length > 0 && this.state.password.length > 0 && this.state.username === username && this.state.password === password) {
        sessionStorage.setItem("access-token",accessToken);
        this.setState({ loginAuthorization: "dispNone" });
        ReactDOM.render(<Home/>, document.getElementById('root'));
      }else if(this.state.username.length > 0 && this.state.password.length > 0) {
        this.setState({ loginAuthorization: "dispBlock" });
      }else {
        this.setState({ loginAuthorization: "dispNone" });
      }
    }

    inputUsernameChangeHandler = (e) => {
      this.setState({ username: e.target.value });
    }

    inputPasswordChangeHandler = (e) => {
      this.setState({ password: e.target.value });
    }

  render()  {
    const { classes } = this.props;

    return (
  
        <div>
        <Header />
        <div className={classes.outerDiv}>
        <Card>
          <div className={classes.mainContainer}>
          <CardContent>
          <form style={{ width: "100%" }}>
            <h1 className={classes.header}>LOGIN</h1>

            <FormControl required margin="normal" fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler}/>
              <FormHelperText className={this.state.usernameRequired}>
                  <span className="red">required</span>
              </FormHelperText>
            </FormControl>

            <FormControl required margin="normal" fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input id="password" type="password" password={this.state.password} onChange={this.inputPasswordChangeHandler}/>
              <FormHelperText className={this.state.passwordRequired}>
                  <span className="red">required</span>
              </FormHelperText>
            </FormControl>

            <FormHelperText className={this.state.loginAuthorization}>
                <span className="red">Invalid username and/or password</span>
            </FormHelperText>
            <Button className={classes.marginButton} variant="contained" color="primary" size="medium" onClick={this.loginClickHandler}>
              LOGIN
            </Button>
          </form>
          </CardContent>
          </div>
        </Card>
        </div>
        </div>
      );
    }
  }

export default withStyles(customStyles)(Login);