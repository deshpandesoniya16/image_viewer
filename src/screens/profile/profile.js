import React, { Component } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import './profile.css';
import Paper from '@material-ui/core/Paper';
// import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
// import profiledata from '../../common/profile_data';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import MuiDialogTitle from '@material-ui/core/DialogTitle';
// import MuiDialogContent from '@material-ui/core/DialogContent';
// // import MuiDialogActions from '@material-ui/core/DialogActions';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
import Modal from 'react-modal';
import ImageDetailsSection from './imageDetailsSection/ImageDetailsSection'

const styles = theme => ({
    root: {
      flexGrow: 1,
      margin: 0,
      padding: theme.spacing(2),
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
      },
      smallDp:{
        width: 1,
        height: 1,
      },
      closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
      },
      // smallDp: {
      //   width: 79px,
      //   height: 82px,
      //  },
  });
  // const styles = theme => ({
  //   root: {
  //     margin: 0,
  //     padding: theme.spacing(2),
  //   },
  //   closeButton: {
  //     position: 'absolute',
  //     right: theme.spacing(1),
  //     top: theme.spacing(1),
  //     color: theme.palette.grey[500],
  //   },
  // });
  
  // const DialogTitle = withStyles(styles)(props => {
  //   const { children, classes, onClose } = props;
  //   return (
  //     <MuiDialogTitle disableTypography className={classes.root}>
  //       <Typography variant="h6">{children}</Typography>
  //       {onClose ? (
  //         <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
  //           <CloseIcon />
  //         </IconButton>
  //       ) : null}
  //     </MuiDialogTitle>
  //   );
  // });
  
  // const DialogContent = withStyles(theme => ({
  //   root: {
  //     padding: theme.spacing(2),
  //   },
  // }))(MuiDialogContent);
  
  // const DialogActions = withStyles(theme => ({
  //   root: {
  //     margin: 0,
  //     padding: theme.spacing(1),
  //   },
  // }))(MuiDialogActions);


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
      select_image:'',
      select_image_text:'',
      select_image_tags:'',
      select_image_likes:'',
      currentPost:'',
      open: false,
      detailsModalIsOpen: false
    }
  }


  handleClickOpen = (selectedId) => {
    this.setState({detailsModalIsOpen:true});
    // let selectedPicData = [];
    // for (let star of this.state.profileData) {
    //     if (star.id === selectedId) {
    //       selectedPicData.push(star.images);   
    //       selectedPicData.push(star.caption);   
    //       selectedPicData.push(star.likes);   
    //       selectedPicData.push(star.tags);        
    //     }        
    // }
    // this.setState({ select_image : selectedPicData[0].standard_resolution});
    // this.setState({ select_image_text : selectedPicData[1]});
    // this.setState({ select_image_tags : selectedPicData[2]});
    // this.setState({ select_image_likes : selectedPicData[3]});
    this.setState({ currentPost : selectedId});
  };

  handleClose = () => {
    this.setState({ detailsModalIsOpen: false });
  };

  componentWillMount() {
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
                        <Paper className={styles.paper}><Avatar alt="Remy Sharp" src={this.state.userInfo.profile_picture} className={styles.bigAvatar} /></Paper>
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
                        <img src={profile.images.standard_resolution.url} alt={profile.caption.text} onClick={() => this.handleClickOpen(profile)} />
                      </GridListTile>
                    ))}
                  </GridList>
                </div>
                </Container>
              </React.Fragment>
              <Modal ariaHideApp={false} isOpen={this.state.detailsModalIsOpen} 
              onRequestClose={this.handleClose}  >
             
                <ImageDetailsSection currentPostData={this.state.currentPost}/>
              
              
      </Modal>
            </div>

        )
    }
}

export default Profile;