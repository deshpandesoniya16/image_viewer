import React, { Component } from "react";
import "./Login.css";
import Header from "../../common/header/Header";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      usernameRequired: "dispNone",
      password: "",
      passwordRequired: "dispNone",
      incorrectCredentials: "dispNone",
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
      credentials: {
        username: "instagram",
        password: "instagram"
      },
      accessToken: "13805614664.279ad47.b8709f2ffd8641f2aeccd207f5195480"
    };
  }

  loginClickHandler = () => {
    this.state.username === ""
      ? this.setState({ usernameRequired: "dispBlock" })
      : this.setState({ usernameRequired: "dispNone" });
    this.state.password === ""
      ? this.setState({ passwordRequired: "dispBlock" })
      : this.setState({ passwordRequired: "dispNone" });

    if (this.state.username === "" || this.state.password === "") {
      this.setState({
        incorrectCredentials: "dispNone"
      });
      return;
    }

    if (
      this.state.username === this.state.credentials.username &&
      this.state.password === this.state.credentials.password
    ) {
      this.setState({
        incorrectCredentials: "dispNone"
      });
      sessionStorage.setItem("access-token", this.state.accessToken);
      this.setState({ loggedIn: true });
      this.redirectToHome();
    } else {
      this.setState({
        incorrectCredentials: "dispBlock"
      });
    }
  };

  redirectToHome = () => {
    this.props.history.push("/home");
  };

  inputUserNameChangeHandler = e => {
    this.setState({ username: e.target.value });
  };

  inputPasswordChangeHandler = e => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div>
        <Header />
        <Card className="cardStyle">
          <CardContent>
            <Typography variant="h5" component="h5">
              LOGIN
            </Typography>
            <br />
            <FormControl className="formControl" required>
              <InputLabel htmlFor="username">Username </InputLabel>
              <Input
                id="username"
                type="text"
                onChange={this.inputUserNameChangeHandler}
              />
              <FormHelperText className={this.state.usernameRequired}>
                <span className="red">Required</span>
              </FormHelperText>
            </FormControl>
            <br />
            <br />
            <FormControl className="formControl" required>
              <InputLabel htmlFor="password">Password </InputLabel>
              <Input
                id="password"
                type="password"
                onChange={this.inputPasswordChangeHandler}
              />
              <FormHelperText className={this.state.passwordRequired}>
                <span className="red">Required</span>
              </FormHelperText>
            </FormControl>
            <br />
            <br />
            <FormHelperText className={this.state.incorrectCredentials}>
              <span className="red">Incorrect username and/or password</span>
              <br />
              <br />
            </FormHelperText>
            <Button
              variant="contained"
              color="primary"
              style={{ width: 10 }}
              onClick={this.loginClickHandler}
            >
              LOGIN
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Login;
