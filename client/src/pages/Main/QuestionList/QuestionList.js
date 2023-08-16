import { useState } from 'react';
import { mockupData } from '../MOCK_DATA';
import QuestionCard from '../QuestionCard/QuestionCard';
import { QuestionListContainer } from './QuestionList.styled';
import Pagination from '../Pagination/Pagination';

export default function QuestionList() {
  const itemsPerPage = 10;
  const [curPage, setCurPage] = useState(1);
  // const [questions, setQuestions] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch(`/questions?size=${itemsPerPage}&page=${curPage}`);
  //       const data = await response.json();
  //       setQuestions(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   fetchData();
  // }, [curPage]);

  const startIndex = (curPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const curPageQuestions = mockupData.slice(startIndex, endIndex);

  return (
    <QuestionListContainer>
      {curPageQuestions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
        />
      ))}

      <Pagination
        totalPages={Math.ceil(mockupData.length / itemsPerPage)}
        curPage={curPage}
        onPageChange={setCurPage}
      />
    </QuestionListContainer>
  );
}

