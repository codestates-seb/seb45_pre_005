import { QuestionCardContainer } from './QuestionCard.styled';
import { Link } from 'react-router-dom';

export default function QuestionCard({ question }) {
  return (
    <QuestionCardContainer>
      <Link to={`/questions/${question.id}`}>
        <div className='question-info'>
          <span>0 votes</span>
          <span>0 answers</span>
          <span>0 reviews</span>
        </div>
        <div className='question-main'>
          <div className='question-title'>
            {question.title}
          </div>
          <div className='question-contents'>
            {question.contents.repeat(100).slice(0, 150)}
          </div>
        </div>
      </Link>
    </QuestionCardContainer>
  );
}