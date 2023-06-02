import {Component} from 'react'

import {v4 as uuidV4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {nameInput: '', commentInput: '', noOfComments: 0, commentList: []}

  onClickAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput, commentList} = this.state
    const colorClassName =
      initialContainerBackgroundClassNames[
        Math.floor(Math.random() * initialContainerBackgroundClassNames.length)
      ]
    const date = new Date()

    const commentObject = {
      id: uuidV4(),
      nameInput,
      commentInput,
      colorClassName,
      date,
      isLiked: false,
    }
    if (nameInput.length > 0 && commentInput.length > 0) {
      this.setState(prevState => ({
        commentList: [...commentList, commentObject],
        nameInput: '',
        commentInput: '',
        noOfComments: prevState.noOfComments + 1,
      }))
    }
  }

  onDelete = id => {
    const {commentList} = this.state
    const filteredList = commentList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState(prevState => ({
      commentList: filteredList,
      noOfComments: prevState.noOfComments - 1,
    }))
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onChangeInputName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeCommentName = event => {
    this.setState({commentInput: event.target.value})
  }

  render() {
    const {nameInput, commentInput, noOfComments, commentList} = this.state

    return (
      <div className="comments-app">
        <h1 className="heading">Comments</h1>
        <p className="description">Say something about 4.0 Technologies</p>
        <div className="comment-container">
          <form className="inputs-container">
            <input
              type="text"
              onChange={this.onChangeInputName}
              value={nameInput}
              className="name-input"
              placeholder="Your Name"
            />
            <textarea
              type="text"
              cols="36"
              rows="10"
              onChange={this.onChangeCommentName}
              value={commentInput}
              className="comment-input"
              placeholder="Your Comment"
            />
            <button
              type="submit"
              onClick={this.onClickAddComment}
              className="submit-button"
            >
              Add Comment
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="image"
          />
        </div>
        <hr className="line" />
        <div className="comments-count-container">
          <p className="comments-count">{noOfComments}</p>
          <p>Comments</p>
        </div>
        <ul>
          {commentList.map(eachComment => (
            <CommentItem
              key={eachComment.id}
              commentDetails={eachComment}
              toggleIsLiked={this.toggleIsLiked}
              toDeleteComment={this.onDelete}
            />
          ))}
        </ul>
      </div>
    )
  }
}
export default Comments
