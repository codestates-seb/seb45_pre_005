import { QuestionCardContainer } from './QuestionCard.styled';
import { Link } from 'react-router-dom';
import profileImg from '../../common/image/profile.png';

export default function QuestionCard({ question }) {
  const title = question.title;
  const content = new DOMParser().parseFromString(question.content, 'text/html')
    .body.textContent;
  const author = question.nickname;
  const date = new Date(question.createdAt);
  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  };
  const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(
    date
  );

  return (
    <Link to={`/questions/${question.questionId}`}>
      <QuestionCardContainer>
        <div className="question-info">
          <span>{question.answerCount} answers</span>
          <span>{question.viewCount} views</span>
        </div>
        <div className="question-main">
          <div className="question-title">{title}</div>
          <div className="question-contents">{content}</div>
          <div className="author-info">
            <div>
              <img src={profileImg} alt="profile" />
            </div>
            <span className="author-nickname">{author}</span>
            <span>asked</span>
            <span className="date">{formattedDate}</span>
          </div>
        </div>
      </QuestionCardContainer>
    </Link>
  );
}
