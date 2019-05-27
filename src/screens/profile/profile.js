import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import './profile.css';
import Paper from '@material-ui/core/Paper';
// import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
import profiledata from '../../common/profile_data';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';



const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
      bigAvatar: {
        margin: 20,
        width: 100,
        height: 100,
      }
  });



class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userInfo: [],
      profileData: [],
      checkprofileData: [],
      media:'',
      follows:'',
      follow_by:'',
    }
    
    
  }

  componentWillMount() {
    //Get User Infomration 
    // let dataUserInfo = null;
    // let xhrUserInfo = new XMLHttpRequest();
    // // let that = this;
    // xhrUserInfo.addEventListener("readystatechange", function () {
    //   if (this.readyState === 4) {
    //     this.setState({ userInfo: JSON.parse(this.responseText).data });
    //   }
    // })
    // xhrUserInfo.open("GET", "https://api.instagram.com/v1/users/self/?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
    // xhrUserInfo.send(dataUserInfo);

    //Get Profile Data 
    // let dataProfileData = null;
    // let xhrProfileData = new XMLHttpRequest();
    // xhrProfileData.addEventListener("readystatechange", function () {
    //   if (this.readyState === 4) {
    //      let check_finalProfileData=JSON.parse(this.responseText);
    //     console.log("check_finalProfileData",check_finalProfileData);
    //     //this.setState({profileData: check_finalProfileData});
    //   }
    // })

    // xhrProfileData.open("GET", "https://api.instagram.com/v1/users/self/media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
    // xhrProfileData.send(dataProfileData);

    //console.log(this.state.profileData);
    this.getUserInfo()
    this.getProfile()
  }


  
  getUserInfo = () => {
    fetch('https://api.instagram.com/v1/users/self/?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784', {
      method: 'GET',
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        this.setState({ userInfo : data.data})
        // console.log("check_log",this.state.userInfo.counts.follows)
        this.setState({ media : this.state.userInfo.counts.media})
        this.setState({ follows : this.state.userInfo.counts.follows})
        this.setState({ follow_by : this.state.userInfo.counts.followed_by})
      })
  }
  
  getProfile = () => {
  fetch('https://api.instagram.com/v1/users/self/media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784', {
    method: 'GET',
  })
    .then(data => {
      return data.json()
    })
    .then(data => {
      this.setState({ profileData : data.data})
    })
}



    render() {
        return (
            <div>
              <header className="app-header">
                  <div>Image Viewer </div>
              </header>
              <React.Fragment>
                <CssBaseline />
                <Container maxWidth="md">
                <div  className={styles.root}>
                    <Grid container spacing={8}>
                        <Grid item xs={3}>
                        <Paper className={styles.paper}><Avatar alt="Remy Sharp" src="https://scontent.cdninstagram.com/vp/1f77cead77f0c22685ceca9f2765911a/5D97A317/t51.2885-19/s150x150/41947221_725500971134637_2241518422187835392_n.jpg?_nc_ht=scontent.cdninstagram.com" className={styles.bigAvatar} /></Paper>
                        </Grid>
                        <Grid item xs={8}   >
                        <Paper className={styles.paper}>
                            <div className="profile_name">
                              <span> {this.state.userInfo.username} </span>
                            </div>
                        </Paper>
                          <Typography gutterBottom variant="subtitle1">
                            Posts: {this.state.media} Follows: {this.state.follows} Followed By: {this.state.follow_by}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                          {this.state.userInfo.full_name}
                          </Typography>
                        </Grid>
                    </Grid>
                    <GridList cellHeight={200} className={styles.gridList} cols={3}>
                    {this.state.profileData.map(profile => (
                      <GridListTile key={profile.id} cols={1}>
                        <img src={profile.images.standard_resolution.url} alt={profile.caption.text} />
                      </GridListTile>
                    ))}
                  </GridList>
                </div>
                </Container>
              </React.Fragment>

            </div>

        )
    }
}

export default Profile;