import React, { Component } from 'react';
import './Header.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Search from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
      backgroundColor: '#DFDFDF',
      padding: 8,
      marginTop: 4,
    },
  })(props => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));


 const StyledMenuItem = withStyles(theme => ({
    root: {
      padding: 4,
      minHeight: 'auto',
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

//Header Component rendered on '/'
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: sessionStorage.getItem('access-token') == null ? false : true,
            accessToken : '13805614664.279ad47.b8709f2ffd8641f2aeccd207f5195480',
            open: false,
            anchorEl: null,
            searchCaption: ''
        };
    }

    // On click of user profile icon, the menu is visible
    onClickHandler = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }
    
    // On click of items inside menu
    onCloseHandler = (purpose, e) => {
        if( purpose === 'profile'){
        } else if( purpose === 'logout') {
            sessionStorage.clear();
        } 
        this.setState({ anchorEl: null });
    };
    

    render() {
        return(
            <div>
                <header className="site-header">
                  <div className="site-logo">Image Viewer</div>
                        <div className="header-full-right">
                          <Paper className="searchfield">
                              <Search />
                            <InputBase className="input" placeholder="Search..." onChange={this.props.searchChangeHandler}/>
                          </Paper>
                          <div className="user-profile-icon">
                              <Avatar 
                                  alt={this.state.profileUserName} 
                                  src={this.props.profilePicture}  
                                  className="avatar" 
                                  onClick={this.onClickHandler}
                                  aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                                  aria-haspopup="true"/>
                              <StyledMenu id="simple-menu" anchorEl={this.state.anchorEl} open={Boolean(this.state.anchorEl)} onClose={this.onCloseHandler.bind(this,'')}>
                                  <div>
                                  <StyledMenuItem className="menu-item" onClick={this.onCloseHandler.bind(this,'profile')}>
                                    <ListItemText primary="My Account" />
                                  </StyledMenuItem> 
                                  <Divider light /> 
                                  </div>
                                  <StyledMenuItem className="menu-item" onClick={this.onCloseHandler.bind(this, 'logout')}>
                                    <ListItemText primary="Logout" />
                                  </StyledMenuItem> 
                              </StyledMenu>
                          </div> 
                        </div>
                </header>
            </div>
        )
    }
}

export default Header;