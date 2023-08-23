import {
  DescContainer,
  DetailUserContainer,
  InnerHTML
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
import Editor from '../Editor/Editor';
import { answerEdit, endAnswerEdit } from '../../redux/actions/detailQuestion';
import {
  deleteAnswer,
  getQuestion,
  patchAnswer,
  postComment
} from '../../common/utils/fetchQuestion';
import { useParams } from 'react-router-dom';
import { dateFormat, fullDateFormat } from '../../common/utils/dateFormat';

export default function Answer({ answer, setAnswers, answers }) {
  const [comments, setComments] = useState([]);
  const [editContent, setEditContent] = useState('');
  const [editDisabled, setEditDisabled] = useState(true);
  const [editMsg, setEditMsg] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentDisabled, setCommentDisabled] = useState(true);
  const [commentMsg, setCommentMsg] = useState('');
  const answerState = useSelector((state) => state.answerReducer);
  const loginState = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const param = useParams();
  const [inputDisable, setInputDisable] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      setInputDisable(true);
    }

    setComments(answer.commentList);
    setEditContent(answer.content);
  }, []);

  const handleAnswerState = (answerId, flag) => {
    const payload = {
      target: answerId,
      flag: flag
    };
    dispatch(answerEdit(payload));
    setEditContent(answer.content);
  };

  const htmlToText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const handleAnswerChange = (html) => {
    if (htmlToText(html).length < 20) {
      setEditDisabled(true);
      setEditMsg('* 20자 이상 입력해주세요.');
    } else if (html == answer.content) {
      setEditDisabled(true);
    } else {
      setEditDisabled(false);
      setEditMsg('');
    }
    setEditContent(html);
  };

  const handleEditCancel = () => {
    handleAnswerState(answer.answerId, false);
    setEditContent(answer.content);
    setEditDisabled(true);
    setCommentMsg('');
  };

  const handleAnswerPatch = async () => {
    if (htmlToText(editContent).length < 20) {
      alert('답변 내용이 짧습니다.');
      return;
    }

    const data = {
      title: 'title',
      content: editContent
    };

    try {
      const result = await patchAnswer(
        answer.answerId,
        data,
        loginState.accessToken
      );

      if (result.status === 200) {
        answer.content = editContent;
        handleAnswerState(answer.answerId, false);
        setEditDisabled(true);
      } else if (result.status === 400) {
        return alert('답변 내용이 너무 깁니다.');
      } else {
        return alert('Error!');
      }
    } catch (error) {
      console.error(error);
      return alert('Error!');
    }
  };

  const handleDeleteAnswer = async () => {
    const delConfirm = confirm('답변을 삭제하시겠습니까?');
    if (delConfirm) {
      try {
        const result = await deleteAnswer(
          answer.answerId,
          loginState.accessToken
        );
        if (result.status === 204) {
          const deletedList = answers.filter((el) => {
            return el.answerId !== answer.answerId;
          });
          setAnswers(deletedList);
          alert('답변이 삭제되었습니다.');
        }
      } catch (error) {
        console.error(error);
        return alert('Error!');
      }
    } else {
      return;
    }
  };

  const handleCommentChange = (e) => {
    let text = e.target.value;
    console.log(text.length);

    if (text.length < 5) {
      setCommentDisabled(true);
      setCommentMsg('* 5자 이상 입력해주세요.');
      if (text.length < 1) {
        setCommentMsg('');
      }
    } else {
      setCommentDisabled(false);
      setCommentMsg('');
    }
    setCommentContent(text);
  };

  const submitCommentPost = async () => {
    if (commentContent.length < 5) {
      alert('댓글 내용이 짧습니다.');
      return;
    }

    const data = {
      answerId: answer.answerId,
      content: commentContent
    };

    try {
      const result = await postComment(data, loginState.accessToken);

      if (result.status === 201) {
        getQuestion(param.id)
          .then((value) => {
            const findArr = value.list.filter(
              (el) => el.answerId === answer.answerId
            );
            const addedComment =
              findArr[0].commentList[findArr[0].commentList.length - 1];

            const changeArr = answers
              .filter((el) => el.answerId === answer.answerId)
              .map((el) => {
                return (el.commentList = [...el.commentList, addedComment]);
              });

            setComments(...changeArr);
            setCommentContent('');
            setCommentDisabled(true);
            alert('댓글이 등록되었습니다.');
          })
          .catch((error) => console.log(error));
      } else if (result.status === 400) {
        return alert('댓글 내용이 너무 깁니다.');
      } else {
        return alert('Error!');
      }
    } catch (error) {
      console.error(error);
      return alert('Error!');
    }
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
        {answer.memberId == loginState.userId &&
        answer.answerId === answerState.target ? (
          answerState.flag ? (
            <Editor value={editContent} onChange={handleAnswerChange} />
          ) : (
            <InnerHTML dangerouslySetInnerHTML={{ __html: answer.content }} />
          )
        ) : (
          <InnerHTML dangerouslySetInnerHTML={{ __html: answer.content }} />
        )}

        <DescContainer>
          <div>
            <p className="disable-msg">{editMsg}</p>
            {answer.memberId == loginState.userId ? (
              answerState.flag ? (
                answer.answerId === answerState.target ? (
                  <>
                    <button onClick={handleEditCancel}>Cancel</button>
                    <button
                      className="submit-btn"
                      onClick={handleAnswerPatch}
                      disabled={editDisabled}
                    >
                      Submit
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={handleDeleteAnswer}>Delete</button>
                    <button
                      onClick={() => handleAnswerState(answer.answerId, true)}
                    >
                      Edit
                    </button>
                  </>
                )
              ) : (
                <>
                  <button onClick={handleDeleteAnswer}>Delete</button>
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
            <span>answered {dateFormat(answer.createAt)}</span>
            <div className="user-desc-container">
              <div>
                <img src={profileImg} alt="profile" />
              </div>
              <p>{answer.nickname}</p>
            </div>
          </DetailUserContainer>
        </DescContainer>
        {comments.length > 0 ? (
          <CommentContainer>
            {comments.map((comment, idx) => {
              return (
                <Comment
                  key={idx}
                  comment={comment}
                  setComments={setComments}
                  comments={comments}
                />
              );
            })}
          </CommentContainer>
        ) : null}

        <CommentForm>
          <input
            type="text"
            value={commentContent}
            onChange={handleCommentChange}
            placeholder={
              inputDisable ? 'Please log in.' : 'Please enter a comment.'
            }
            disabled={inputDisable}
          />
          <p>{commentMsg}</p>
          <button
            className="add-comment-btn"
            onClick={submitCommentPost}
            disabled={commentDisabled}
          >
            Add a comment
          </button>
        </CommentForm>
      </div>
    </AnswerWrap>
  );
}
