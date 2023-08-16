import {
  DescContainer,
  DetailUserContainer
} from '../../pages/DetailQuestion/DetailQuestion.styled';
import {
  AnswerLikeContainer,
  AnswerWrap,
  CommentContainer
} from './Answer.styled';
import likeUpImg from '../../common/image/like-up.png';
import likeDownImg from '../../common/image/like-down.png';
import profileImg from '../../common/image/profile.png';
import Comment from '../Comment/Comment';

export default function Answer() {
  return (
    <AnswerWrap>
      <AnswerLikeContainer>
        <button>
          <img src={likeUpImg} alt="like-up" />
        </button>
        <span>30</span>
        <button>
          <img src={likeDownImg} alt="like-down" />
        </button>
      </AnswerLikeContainer>
      <div className="answer-content-container">
        <div>Answer content...</div>
        <DescContainer>
          <div>
            <button>Delete</button>
            <button>Edit</button>
          </div>
          <DetailUserContainer>
            <span>answered today</span>
            <div className="user-desc-container">
              <div>
                <img src={profileImg} alt="profile" />
              </div>
              <p>User name</p>
            </div>
          </DetailUserContainer>
        </DescContainer>
        <CommentContainer>
          <Comment />
          <Comment />
        </CommentContainer>
        <button className="add-comment-btn">Add a comment</button>
      </div>
    </AnswerWrap>
  );
}
