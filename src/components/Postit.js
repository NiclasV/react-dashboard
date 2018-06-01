import React, { Component } from 'react'; 
import Spinkit from './Spinkit';

class Postit extends Component {
  constructor(props) {
    super(props);
    //Start with setting the state with postits from the localstorage, if there is none saved, i'll handle it below
    this.state = { 
      posts: JSON.parse(localStorage.getItem("posts")),
      value: '', 
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addPost()
  }

  //Function for creating post, adding to localStorage and update "state" with the new post, so that the component updates itself
  addPost() {
    var posts = JSON.parse(localStorage.getItem('posts'));
    var post = {
      postText: this.state.value,
      isDone: false
    }
    posts.push(post)
    localStorage.setItem("posts", JSON.stringify(posts))
    this.setState({posts: JSON.parse(localStorage.getItem('posts'))})
  }

  deletePost(index) {
    var posts = JSON.parse(localStorage.getItem("posts"));
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts))
    this.setState({ posts: JSON.parse(localStorage.getItem('posts'))})
  }

  render() {
    let flexbox = {display: "flex", justifyContent: "space-between",}
    let height = {minHeight: "60%"}

    //If there wasnt no saved post-its in the localStorage, we create one as an example!
    if(!this.state.posts) {
      var posts = [];
      var post = {
        postText: "Exempel Post-It! Lägg till en ny nedan",
        isDone: false
      }
      posts.push(post)
      localStorage.setItem("posts", JSON.stringify(posts))
      this.setState({ posts: JSON.parse(localStorage.getItem('posts'))})
      return <div className="module-box post-it"><span className="label">Post-it</span> <Spinkit /> </div>
    }

    //If there was post-its in the localStorage however, i'll display them
    return (
      <div className="module-box post-it">
        <span className="label">Post-it</span>
        <ul className="list-group" style={height}>
          {this.state.posts.map( (post, index) => { 
            //Looping out the todos with "map", for each todo we create a deleteBtn with an arrowfunction as a workaround
            //so i can pass the index forward, if not arrowfunction the function will run when the code is generated
            return <li key={ index } className="list-group-item list-group-item-dark" style={flexbox}>{post.postText}
              <button className="btn btn-sm btn-danger" onClick={() => this.deletePost(index)}>Ta bort</button></li>
             })
          }
        </ul>
        <form className="form-group" style={flexbox} onSubmit={this.handleSubmit}>
          <input type="text" name="postText" className="form-control" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="lägg till" className="uppercase btn btn-success" />
        </form>
      </div>
    );
  }

}



export default Postit;