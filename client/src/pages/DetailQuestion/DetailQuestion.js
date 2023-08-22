import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import { dateFormat } from '../../common/utils/dateFormat';
import {
  deleteQuestion,
  getQuestion,
  patchQuestion
} from '../../common/utils/fetchQuestion';
export default function DetailQuestion() {
  const author = true;

  const param = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);

  const [editTitle, setEditTitle] = useState();
  const [editContent, setEditContent] = useState();

  const dispatch = useDispatch();
  const questionEditFlag = useSelector((state) => state.questionReducer);
  const loginState = useSelector((state) => state.loginReducer);

  useEffect(() => {
    getQuestion(param.id)
      .then((value) => {
        setQuestion(value.data);
        setAnswers(value.list);
        setEditTitle(value.data.title);
        setEditContent(value.data.content);
      })
      .catch((error) => console.log(error));

    // fetch(`/questions/${param.id}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'ngrok-skip-browser-warning': '69420'
    //   },
    //   credentials: 'include',
    //   mode: 'cors'
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setQuestion(data.data);
    //     setAnswers(data.list);
    //     setTitle(data.data.title);
    //     setContent(data.data.content);
    //   });
  }, []);

  // console.log(question);
  // console.log(answers);
  // console.log(loginState);
  // const handleQuestionEditFlag = () => {
  //   dispatch(questionEdit(true));
  //   console.log(questionEditFlag);
  // };

  const handleTitleChange = (event) => {
    setEditTitle(event.target.value);
  };

  const handleBodyChange = (html) => {
    setEditContent(html);
  };
  const htmlToText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const submitQuestionPatch = async () => {
    if (!editTitle || htmlToText(editContent).length < 20) {
      alert('제목이 비어있거나 내용이 짧습니다.');
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

    if (patchResult.status === 200) {
      getQuestion(param.id)
        .then((value) => {
          setQuestion(value.data);
          setAnswers(value.list);
          setEditTitle(value.data.title);
          setEditContent(value.data.content);
          dispatch(endQuestionEdit(false));
        })
        .catch((error) => console.log(error));
    } else {
      console.log(patchResult);
      console.log(patchResult.status);
      return alert('Error!');
    }

    // patchResult
    //   .then((res) => {
    //     if (res.status === 200) {
    //       getQuestion(param.id)
    //         .then((value) => {
    //           setQuestion(value.data);
    //           setAnswers(value.list);
    //           setEditTitle(value.data.title);
    //           setEditContent(value.data.content);
    //           dispatch(endQuestionEdit(false));
    //         })
    //         .catch((error) => console.log(error));
    //     } else {
    //       console.log(res);
    //       console.log(res.status);
    //       return alert('Error!');
    //     }
    //   })
    //   .catch((error) => console.log(error));
  };

  const handleDeleteQuestion = () => {
    const result = deleteQuestion(question.questionId, loginState.accessToken);

    console.log(result);
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
                <span>{question.createdAt}</span>
              </div>
              <div>
                <span>Modified</span>
                <span>{question.modifiedAt}</span>
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
                <div
                  className="innerHtml"
                  dangerouslySetInnerHTML={{ __html: question.content }}
                />
              )}

              <DescContainer>
                <div>
                  {question.memberId == loginState.userId ? (
                    questionEditFlag ? (
                      <>
                        <button
                          onClick={() => dispatch(endQuestionEdit(false))}
                        >
                          Cancel
                        </button>
                        <button
                          className="submit-btn"
                          onClick={submitQuestionPatch}
                        >
                          Submit
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={handleDeleteQuestion}>Delete</button>
                        <button onClick={() => dispatch(questionEdit(true))}>
                          Edit
                        </button>
                      </>
                    )
                  ) : null}
                </div>
                <DetailUserContainer $author={author.toString()}>
                  <span>asked {question.createdAt}</span>
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
              return <Answer key={idx} answer={answer} />;
            })}
          </AnswerContainer>
          <AnswerFormContainer>
            <h2>Your Answer</h2>
            <Editor value={''} />
            <button>Post Your Answer</button>
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
