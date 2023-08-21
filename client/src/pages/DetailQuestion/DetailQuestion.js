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
import { allData } from '../../common/data/detailQuestion';
import Editor from '../AddQuestion/Editor/Editor';
import { AnswerLikeContainer } from '../../components/Answer/Answer.styled';
import { useSelector, useDispatch } from 'react-redux';
import {
  questionEdit,
  endQuestionEdit
} from '../../redux/actions/detailQuestion';
import { dateFormat } from '../../common/utils/dateFormat';
export default function DetailQuestion() {
  const author = true;
  // eslint-disable-next-line no-undef
  const BASE_URL = process.env.REACT_APP_API_URL;
  const param = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);

  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const dispatch = useDispatch();
  const questionEditFlag = useSelector((state) => state.questionReducer);

  const examMemberId = 2;

  useEffect(() => {
    fetch(`/questions/${param.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420'
      },
      credentials: 'include',
      mode: 'cors'
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.data);
        setAnswers(data.list);
        setTitle(data.data.title);
        setContent(data.data.content);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(question);
  console.log(answers);

  // const handleQuestionEditFlag = () => {
  //   dispatch(questionEdit(true));
  //   console.log(questionEditFlag);
  // };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (html) => {
    setContent(html);
  };
  const htmlToText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const submitQuestionPatch = async () => {
    if (!title || htmlToText(content).length < 20) {
      return;
    }

    const data = {
      title: title,
      content: content
    };

    await fetch(`${BASE_URL}/questions/${question.questionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6W10sInVzZXJuYW1lIjoidGVzdEB0ZXN0Iiwic3ViIjoidGVzdEB0ZXN0IiwiZXhwIjoxNjkyNjAzODIxfQ.O8y5exaF2ijlNUslC-6Zh70yz3ah0B4JiI7mcg9hgy8`
      },
      body: JSON.stringify(data),
      credentials: 'include',
      mode: 'cors'
    }).then((res) => console.log(res));

    dispatch(endQuestionEdit(false));
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
                defaultValue={title}
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
                <Editor value={content} onChange={handleBodyChange} />
              ) : (
                <div
                  className="innerHtml"
                  dangerouslySetInnerHTML={{ __html: question.content }}
                />
              )}

              <DescContainer>
                <div>
                  {question.memberId === examMemberId ? (
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
                        <button>Delete</button>
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
            <h2>2 Answers</h2>
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
          <LinkButton to="/">Ask Question</LinkButton>
        </ButtonContainer>
      </BaseWrap>
      <Footer />
    </BaseContainer>
  );
}
