import React, { Component } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import './profile.css';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Modal from 'react-modal';
import ImageDetailsSection from './imageDetailsSection/ImageDetailsSection';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';


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
  });
  const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
    gridListMedia:{
        flexWrap:"nowrap",
        transform:'translateZ(0)',
        width:'100%'
    }
};
const TabContainer = function(props){
  return(
      <Typography component="div" style={{ padding: 0}}>
      {props.children}
      </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userInfo: [],
      full_name:'',
      profileData: [],
      checkprofileData: [],
      media:'',
      follows:'',
      follow_by:'',
      currentPost:'',
      open: false,
      detailsModalIsOpen: false,
      editModalIsOpen:false,
      editedFullName:"",
      editedFullNameRequired: "dispNone"
    }
  }


  handleClickOpen = (selectedId) => {
    this.setState({detailsModalIsOpen:true});
    this.setState({ currentPost : selectedId});
  };

  handleClose = () => {
    this.setState({ detailsModalIsOpen: false });
  };


    
openEditModalHandler=()=>{
    this.setState({editModalIsOpen:true});
}
closeEditModalHandler=()=>{
    this.setState({editModalIsOpen:false,editedFullNameRequired: "dispNone"});
}
editedFullNameChangeHandler=(e)=>{
   this.setState({editedFullName:e.target.value});
}
editFullNameHandler=()=>{
    let editedName = this.state.editedFullName;
    
    editedName===""? this.setState({editedFullNameRequired:"dispBlock"}):this.setState({editedFullNameRequired:"dispNone",full_name: editedName, editedFullName:"",editModalIsOpen:false,});
}

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
        this.setState({ media : this.state.userInfo.counts.media})
        this.setState({ full_name : this.state.userInfo.full_name})
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
                          {this.state.full_name}
                          <Fab color="secondary" className='editButton' onClick={this.openEditModalHandler} aria-label="Edit"><EditIcon/></Fab> 
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
              <Modal ariaHideApp={false} isOpen={this.state.editModalIsOpen}
                onRequestClose={this.closeEditModalHandler} style={customStyles}>
                <strong  style={{fontSize: 20,fontWeight: 'bold'}}>Edit</strong>
                  <TabContainer>
                      <FormControl required>
                          <InputLabel htmlFor="fullName">Full Name</InputLabel>
                          <Input id="fullName" type="text"  onChange={this.editedFullNameChangeHandler}/>
                          <FormHelperText className={this.state.editedFullNameRequired}>
                          <span className="red">required</span>
                          </FormHelperText>
                      </FormControl><br/>
                      <Button variant="contained" style={{backgroundColor: '#5B00BB',color:"#FFFFFF",marginTop:'10px'}} onClick={this.editFullNameHandler}>UPDATE</Button>
                  </TabContainer>            
                
                </Modal>
            </div>

        )
    }
}

export default Profile;