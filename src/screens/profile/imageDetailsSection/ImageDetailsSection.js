import React, {Component} from 'react';
import './ImageDetailsSection.css';
import Typography from '@material-ui/core/Typography';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

class ImageDetailsSection extends Component{
constructor(props){
    super(props);
    this.state={
        standard_resolution:"",
        profile_picture:"",
        username:"",
        caption:"",
        tags:[],
        comments:[],
        likes:"",
        showFavorite: false,
        likeBool: false,
        decrementBool: false

    }
}

componentWillMount(){
    this.setState({
      standard_resolution:this.props.currentPostData.images.standard_resolution.url,
      profile_picture:this.props.currentPostData.user.profile_picture,
      username:this.props.currentPostData.user.username,
      caption:this.props.currentPostData.caption.text.split('\n')[0],
      tags:this.props.currentPostData.tags,
      likes:this.props.currentPostData.likes.count

    })
}

   createComment=(e)=>{
       e.preventDefault();
     const newComment=  e.target.elements.comment.value;
     var updatedComments= this.state.comments;
     updatedComments.unshift(newComment);
     this.setState({comments:updatedComments});
     e.target.elements.comment.value='';
   }

  likePicture = () => {
    this.setState({
      showFavorite: true,
      likeBool: true,
      decrementBool: false
    });
  };

  unlikePicture = () => {
    this.setState({
      showFavorite: false,
      decrementBool: true,
      likeBool: false
    });
  };
    render(){
       let comments= this.state.comments;
       let likes = this.state.likes;
       let finalLikes;
       if (this.state.likeBool) {
         finalLikes = likes;
         finalLikes = finalLikes + 1;
       }
       if (this.state.decrementBool) {
         finalLikes = finalLikes - 1;
       }
        return(
            <div className="flex-postDetailsContainer">
                    <div className="left">
                        <img className="postedImage" src={this.state.standard_resolution} alt={this.state.username} />
                    </div>
                    <div className="right">
                        <div className="flex-userDataContainer">
                            <div>
                                <img className="profileImage" src={this.state.profile_picture} alt={this.state.username} />
                            </div>
                            <div>
                                <Typography variant="h5" component="h5">{this.state.username} </Typography>
                            </div>
                        
                        </div>
                        <hr/>
                        
                        <br />
                        
                        <div>
                            <Typography variant="subtitle1">  {this.state.caption}</Typography>         
                        </div>
                    
                        <div>{this.state.tags.map((tag)=>(
                            <span  key={tag} className="hashTags">{"#"+tag+" "}</span>
                        ))}
                        </div>  
                        {/* adding the new comments*/}  
                        <br/>
                        
            
                        <div style={{marginBottom:'100px'}}>
                        {comments.map((comment)=>(
                           <p key={comment} ><strong>{this.state.username+ ": "}</strong>{comment}</p>
                        ))}
                        </div>
                        {/* adding the like and comment components*/}
                       <br/>
                       <div className="likes" style={{ display: "inline - flex" }}>
                          {!this.state.showFavorite ? (
                            <FavoriteBorder
                              onClick={event => {
                                this.likePicture();
                              }}
                            />
                          ) : (
                            <Favorite
                              style={{ color: "red" }}
                              onClick={this.unlikePicture}
                            />
                          )}
                          {!this.state.likeBool || this.state.decrementBool ? (
                            <span id="likeCount"> {likes} likes </span>
                          ) : (
                            <span id="likeCount"> {finalLikes} likes </span>
                          )}
                        </div>
                        <br />
                        <FormControl>
                          <form onSubmit={this.createComment}>
                            <div className="comment-component">
                              <div>
                                <InputLabel variant="standard" htmlFor="comment">
                                  Add a comment
                                </InputLabel>
                                <Input
                                  className="comment-textfield"
                                  name="comment"                                 
                                  placeholder="Add a comment"
                                  style={{ marginRight: " 200px" }}
                                />
                              </div>
                              <Button
                                type="submit"
                                variant="contained"
                                size="small"
                                color="primary"
                                className="comment-btn"
                              >
                                <strong>Add</strong>
                              </Button>
                            </div>
                          </form>
                        </FormControl>
    
                        </div>
                        <br/>
                      
                </div>

              
        );
    }
}
export default ImageDetailsSection;