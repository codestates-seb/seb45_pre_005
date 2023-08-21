import {
  DescContainer,
  DetailUserContainer
} from '../../pages/DetailQuestion/DetailQuestion.styled';
import {
  AnswerLikeContainer,
  AnswerWrap,
  CommentContainer,
  CommentForm
} from './Answer.styled';
import likeUpImg from '../../common/image/like-up.png';
import likeDownImg from '../../common/image/like-down.png';
import profileImg from '../../common/image/profile.png';
import Comment from '../Comment/Comment';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Editor from '../../pages/AddQuestion/Editor/Editor';
import { answerEdit } from '../../redux/actions/detailQuestion';

export default function Answer({ answer }) {
  const [comments, setComments] = useState([]);
  const answerState = useSelector((state) => state.answerReducer);
  const dispatch = useDispatch();
  const examMemberId = 1;

  useEffect(() => {
    setComments(answer.commentList);
  }, []);

  const handleAnswerState = (answerId, flag) => {
    const payload = {
      target: answerId,
      flag: flag
    };
    dispatch(answerEdit(payload));
  };

  return (
    <AnswerWrap>
      <AnswerLikeContainer>
        <button>
          <img src={likeUpImg} alt="like-up" />
        </button>
        <span>0</span>
        <button>
          <img src={likeDownImg} alt="like-down" />
        </button>
      </AnswerLikeContainer>
      <div className="answer-content-container">
        {answer.memberId === examMemberId &&
        answer.answerId === answerState.target ? (
          answerState.flag ? (
            <Editor value={answer.content} />
          ) : (
            <div>{answer.content}</div>
          )
        ) : (
          <div>{answer.content}</div>
        )}

        <DescContainer>
          <div>
            {answer.memberId === examMemberId ? (
              answerState.flag ? (
                answer.answerId === answerState.target ? (
                  <>
                    <button
                      onClick={() => handleAnswerState(answer.answerId, false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="submit-btn"
                      onClick={() => handleAnswerState(answer.answerId, false)}
                    >
                      Submit
                    </button>
                  </>
                ) : (
                  <>
                    <button>Delete</button>
                    <button
                      onClick={() => handleAnswerState(answer.answerId, true)}
                    >
                      Edit
                    </button>
                  </>
                )
              ) : (
                <>
                  <button>Delete</button>
                  <button
                    onClick={() => handleAnswerState(answer.answerId, true)}
                  >
                    Edit
                  </button>
                </>
              )
            ) : null}
          </div>
          <DetailUserContainer>
            <span>answered {answer.createAt}</span>
            <div className="user-desc-container">
              <div>
                <img src={profileImg} alt="profile" />
              </div>
              <p>{answer.nickname}</p>
            </div>
          </DetailUserContainer>
        </DescContainer>
        <CommentContainer>
          {comments.map((comment, idx) => {
            return <Comment key={idx} comment={comment} />;
          })}
        </CommentContainer>
        <CommentForm>
          <input type="text" placeholder="Please enter a comment." />
          <button className="add-comment-btn">Add a comment</button>
        </CommentForm>
      </div>
    </AnswerWrap>
  );
}
