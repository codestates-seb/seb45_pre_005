import QuestionCard from '../QuestionCard/QuestionCard';
import { QuestionListContainer } from './QuestionList.styled';
// import Pagination from '../Pagination/Pagination';

export default function QuestionList({
  questions
}) {

  return (
    <QuestionListContainer>
      {questions.map((question) => (
        <QuestionCard
          key={question.questionId}
          question={question}
        />
      ))}
    </QuestionListContainer>
  );
}

