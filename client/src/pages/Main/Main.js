import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BaseContainer, BaseWrap } from '../../style/Global.styled';
import { MainContainer } from './Main.styled';
import Footer from '../../components/Footer/Footer';
import Nav from '../../components/Nav/Nav';
import QuestionList from '../../components/QuestionList/QuestionList';
import Pagination from '../../components/Pagination/Pagination';

export default function Main() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pageParam = searchParams.get('page');
  const initialPage = pageParam ? parseInt(pageParam) : 1;

  const [questions, setQuestions] = useState([]);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [curPage, setCurPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchQuestions(page) {
      const url = `/questions?size=10&page=${page}`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: process.env.REACT_APP_AUTH_TOKEN,
            'ngrok-skip-browser-warning': '69420'
          },
          credentials: 'include',
          mode: 'cors',
        });

        if (response.ok) {
          const data = await response.json();
          setQuestions(data.data);
          setQuestionsCount(data.pageInfo.totalElements);
          setTotalPages(data.pageInfo.totalPages)
          console.log('get questions success');
        } else {
          console.error('Fetch questions failed');
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchQuestions(curPage);
  }, [curPage]);

  return (
    <BaseContainer>
      <BaseWrap>
        <Nav tabNum={1} />
        <MainContainer>
          <div className='flex-box'>
            <div className='left-box'>
              <h1>All Questions</h1>
              <div className='questions-num'>{questionsCount.toLocaleString()} questions</div>
            </div>
            <div className='right-box'>
              <Link to='/add-question'>
                <button
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Ask question
                </button>
              </Link>
            </div>
          </div>
          <QuestionList
            questions={questions}
            curPage={curPage}
            setCurPage={setCurPage}
          />
          <Pagination
            totalPages={totalPages}
            curPage={curPage}
            onPageChange={setCurPage}
          />
        </MainContainer>
      </BaseWrap>
      <Footer />
    </BaseContainer>
  );
}
