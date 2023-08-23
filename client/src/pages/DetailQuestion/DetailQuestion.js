import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Nav from '../../components/Nav/Nav';
import { BaseContainer, BaseWrap } from '../../style/Global.styled';
import {
  AnswerContainer,
  AnswerFormContainer,
  ButtonContainer,
  DescContainer,
  DetailContainer,
  DetailContent,
  DetailHeader,
  DetailUserContainer,
  InnerHTML,
  LinkButton
} from './DetailQuestion.styled';
import profileImg from '../../common/image/profile.png';
import likeUpImg from '../../common/image/like-up.png';
import likeDownImg from '../../common/image/like-down.png';
import Answer from '../../components/Answer/Answer';
import Editor from '../../components/Editor/Editor';
import { AnswerLikeContainer } from '../../components/Answer/Answer.styled';
import { useSelector, useDispatch } from 'react-redux';
import {
  questionEdit,
  endQuestionEdit
} from '../../redux/actions/detailQuestion';
import { dateFormat, fullDateFormat } from '../../common/utils/dateFormat';
import {
  deleteQuestion,
  getQuestion,
  patchQuestion,
  postAnswer
} from '../../common/utils/fetchQuestion';
export default function DetailQuestion() {
  const author = true;

  const param = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);

  const [editTitle, setEditTitle] = useState();
  const [editContent, setEditContent] = useState();
  const [answerContent, setAnswerContent] = useState();
  const [editDisabled, setEditDisabled] = useState(true);
  const [postDisabled, setPostDisabled] = useState(true);
  const [editMsg, setEditMsg] = useState('');
  const [postMsg, setPostMsg] = useState('');
  const dispatch = useDispatch();
  const questionEditFlag = useSelector((state) => state.questionReducer);
  const loginState = useSelector((state) => state.loginReducer);
  const [askedDate, setAskedDate] = useState('');
  const [modifiedDate, setModifiedDate] = useState('');
  const [inputDisable, setInputDisable] = useState(false);
  useEffect(() => {
    getQuestion(param.id)
      .then((value) => {
        setQuestion(value.data);
        setAnswers(value.list);
        setEditTitle(value.data.title);
        setEditContent(value.data.content);
        setAskedDate(dateFormat(value.data.createdAt));
        setModifiedDate(dateFormat(value.data.modifiedAt));
      })
      .catch((error) => console.log(error));
    setPostMsg('');

    if (!localStorage.getItem('accessToken')) {
      setInputDisable(true);
    }
  }, []);

  const handleTitleChange = (event) => {
    if (event.target.value.length < 5 || htmlToText(editContent).length < 20) {
      setEditDisabled(true);
      setEditMsg('* 제목은 5자 이상, 내용은 20자 이상 입력해주세요.');
    } else if (
      event.target.value === question.title &&
      editContent == question.content
    ) {
      setEditDisabled(true);
    } else {
      setEditDisabled(false);
      setEditMsg('');
    }
    setEditTitle(event.target.value);
  };

  const handleBodyChange = (html) => {
    if (editTitle.length < 5 || htmlToText(html).length < 20) {
      setEditDisabled(true);
      setEditMsg('* 제목은 5자 이상, 내용은 20자 이상 입력해주세요.');
    } else if (editTitle === question.title && html == question.content) {
      setEditDisabled(true);
    } else {
      setEditDisabled(false);
      setEditMsg('');
    }
    setEditContent(html);
  };

  const handleAnswerChange = (html) => {
    if (inputDisable) {
      setAnswerContent('');
      setPostDisabled(true);
      setPostMsg('* 로그인을 해주세요.');
      return;
    }

    if (htmlToText(html).length < 20) {
      setPostDisabled(true);
      setPostMsg('* 20자 이상 입력해주세요.');

      if (htmlToText(html).length < 1) {
        setPostMsg('');
      }
    } else if (htmlToText(html).length == 0) {
      setPostMsg('');
    } else {
      setPostDisabled(false);
      setPostMsg('');
    }
    setAnswerContent(html);
  };

  const handleEditState = () => {
    dispatch(questionEdit(true));
    setEditContent(question.content);
    setEditTitle(question.title);
  };

  const handleEditCancel = () => {
    dispatch(endQuestionEdit(false));
    setEditContent(question.content);
    setEditTitle(question.title);
    setEditDisabled(true);
    setEditMsg('');
  };

  const htmlToText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const submitQuestionPatch = async () => {
    if (!editTitle || htmlToText(editContent).length < 20) {
      alert('제목이 비어있거나 본문이 짧습니다.');
      return;
    }

    const data = {
      title: editTitle,
      content: editContent
    };

    const patchResult = await patchQuestion(
      question.questionId,
      data,
      loginState.accessToken
    );

    try {
      if (patchResult.status === 200) {
        getQuestion(param.id)
          .then((value) => {
            setQuestion(value.data);
            setAnswers(value.list);
            setEditTitle(value.data.title);
            setEditContent(value.data.content);
            setEditDisabled(true);
            setEditMsg('');
            dispatch(endQuestionEdit(false));
          })
          .catch((error) => console.log(error));
      } else if (patchResult.status === 400) {
        return alert('질문 내용이 너무 깁니다.');
      } else {
        return alert('Error!');
      }
    } catch (error) {
      console.error(error);
      return alert('Error!');
    }
  };

  const submitAnswerPost = async () => {
    if (htmlToText(answerContent).length < 20) {
      alert('질문 내용이 짧습니다.');
      return;
    }

    const data = {
      questionId: question.questionId,
      title: 'title',
      content: answerContent
    };
    try {
      const result = await postAnswer(data, loginState.accessToken);

      if (result.status === 201) {
        getQuestion(param.id)
          .then((value) => {
            setQuestion(value.data);
            setAnswers(value.list);
            setAnswerContent('');
            setPostDisabled(true);
            setPostMsg('');
            alert('답변이 등록되었습니다.');
          })
          .catch((error) => console.log(error));
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

  const handleDeleteQuestion = async () => {
    const delConfirm = confirm('질문을 삭제하시겠습니까?');
    if (delConfirm) {
      try {
        const result = await deleteQuestion(
          question.questionId,
          loginState.accessToken
        );
        if (result.status === 204) {
          navigate('/');
        }
      } catch (error) {
        console.error(error);
        return alert('Error!');
      }
    } else {
      return;
    }
  };
  return (
    <BaseContainer>
      <BaseWrap>
        <Nav tabNum={1} />
        <DetailContainer>
          <DetailHeader>
            {questionEditFlag ? (
              <input
                type="text"
                defaultValue={editTitle}
                onChange={handleTitleChange}
              />
            ) : (
              <h1>{question.title}</h1>
            )}

            <div className="header-desc-container">
              <div>
                <span>Asked</span>
                <span>{askedDate}</span>
              </div>
              <div>
                <span>Modified</span>
                <span>{modifiedDate}</span>
              </div>
              <div>
                <span>Viewed</span>
                <span>{question.viewCount} times</span>
              </div>
            </div>
            <div></div>
          </DetailHeader>
          <DetailContent>
            <AnswerLikeContainer>
              <button>
                <img src={likeUpImg} alt="like-up" />
              </button>
              <span>0</span>
              <button>
                <img src={likeDownImg} alt="like-down" />
              </button>
            </AnswerLikeContainer>
            <div className="detail-wrap">
              {questionEditFlag ? (
                <Editor value={editContent} onChange={handleBodyChange} />
              ) : (
                <InnerHTML
                  dangerouslySetInnerHTML={{ __html: question.content }}
                />
              )}

              <DescContainer>
                <div>
                  <p className="disable-msg">{editMsg}</p>
                  {question.memberId == loginState.userId ? (
                    questionEditFlag ? (
                      <>
                        <button onClick={handleEditCancel}>Cancel</button>
                        <button
                          className="submit-btn"
                          onClick={submitQuestionPatch}
                          disabled={editDisabled}
                        >
                          Submit
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={handleDeleteQuestion}>Delete</button>
                        <button onClick={handleEditState}>Edit</button>
                      </>
                    )
                  ) : null}
                </div>
                <DetailUserContainer $author={author.toString()}>
                  <span>asked {askedDate}</span>
                  <div className="user-desc-container">
                    <div>
                      <img src={profileImg} alt="profile" />
                    </div>
                    <p>{question.nickname}</p>
                  </div>
                </DetailUserContainer>
              </DescContainer>
            </div>
          </DetailContent>
          <AnswerContainer>
            <h2>{answers.length > 0 ? answers.length : 0} Answers</h2>
            {answers.map((answer, idx) => {
              return (
                <Answer
                  key={idx}
                  answer={answer}
                  setAnswers={setAnswers}
                  answers={answers}
                />
              );
            })}
          </AnswerContainer>
          <AnswerFormContainer>
            <h2>Your Answer</h2>
            <Editor value={answerContent} onChange={handleAnswerChange} />
            <p className="disable-msg">{postMsg}</p>
            <button onClick={submitAnswerPost} disabled={postDisabled}>
              Post Your Answer
            </button>
          </AnswerFormContainer>
        </DetailContainer>
        <ButtonContainer>
          <LinkButton to="/add-question">Ask Question</LinkButton>
        </ButtonContainer>
      </BaseWrap>
      <Footer />
    </BaseContainer>
  );
}
