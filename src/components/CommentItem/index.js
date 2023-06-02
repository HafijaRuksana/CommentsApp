// Write your code here
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleIsLiked, toDeleteComment} = props
  const {
    id,
    nameInput,
    commentInput,
    isLiked,
    colorClassName,
    date,
  } = commentDetails

  const duration = formatDistanceToNow(date)

  const initial = nameInput[0].toUpperCase()

  const likeButtonImage = !isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

  const onClickDelete = () => {
    toDeleteComment(id)
  }

  const changeColor = () => {
    toggleIsLiked(id)
  }

  const likeColor = isLiked ? 'orange' : ''

  return (
    <li className="comment-li">
      <div className="profile-comment-container">
        <div className={`profile ${colorClassName}`}>{initial}</div>
        <div className="name-comment-container">
          <div className="name-time-container">
            <p className="user-name">{nameInput}</p>
            <p className="comment-time">{duration}</p>
          </div>
          <p>{commentInput}</p>
        </div>
      </div>
      <div className="like-delete-container">
        <div className="like-container">
          <div>
            <button
              type="button"
              className={`like-button ${likeColor}`}
              onClick={changeColor}
            >
              <img
                src={likeButtonImage}
                alt="like button"
                className="like-image"
              />
            </button>
          </div>
          <div>
            <p className="likeName">Like</p>
          </div>
        </div>
        <button
          type="button"
          className="delete-button"
          onClick={onClickDelete}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-image"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}
export default CommentItem
