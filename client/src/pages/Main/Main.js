import { Link } from 'react-router-dom';
import { BaseContainer, BaseWrap } from '../../style/Global.styled';
import { MainContainer } from './Main.styled';
import Footer from '../../components/Footer/Footer';
import { mockupData } from './MOCK_DATA';
import QuestionList from './QuestionList/QuestionList';
import Nav from '../../components/Nav/Nav';

export default function Main() {
  return (
    <BaseContainer>
      <BaseWrap>
        <Nav tabNum={1} />
        <MainContainer>
          <div className="flex-box">
            <div className="left-box">
              <h1>All Questions</h1>
              <div className="questions-num">
                {mockupData.length.toLocaleString()} questions
              </div>
            </div>
            <div className="right-box">
              <Link to="/add-question">
                <button onClick={() => window.scrollTo(0, 0)}>
                  Ask question
                </button>
              </Link>
            </div>
          </div>
          <QuestionList />
        </MainContainer>
      </BaseWrap>
      <Footer />
    </BaseContainer>
  );
}
