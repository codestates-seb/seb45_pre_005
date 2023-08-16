import Footer from '../../components/Footer/Footer';
import Nav from '../../components/Nav/Nav';
import { BaseContainer, BaseWrap } from '../../style/Global.styled';
import {
  AnswerContainer,
  AnswerFormContainer,
  ButtonContainer,
  DescContainer,
  DetailContainer,
  DetailHeader,
  DetailUserContainer,
  LinkButton
} from './DetailQuestion.styled';
import profileImg from '../../common/image/profile.png';
import Answer from '../../components/Answer/Answer';

export default function DetailQuestion() {
  return (
    <BaseContainer>
      <BaseWrap>
        <Nav tabNum={1} />
        <DetailContainer>
          <DetailHeader>
            <h1>Question Title..</h1>
            <div className="header-desc-container">
              <div>
                <span>Asked</span>
                <span>today</span>
              </div>
              <div>
                <span>Viewed</span>
                <span>5 times</span>
              </div>
            </div>
            <div></div>
          </DetailHeader>
          <div>
            <div>Question Content ..</div>
            <DescContainer>
              <div>
                <button>Delete</button>
                <button>Edit</button>
              </div>
              <DetailUserContainer author={true}>
                <span>asked today</span>
                <div className="user-desc-container">
                  <div>
                    <img src={profileImg} alt="profile" />
                  </div>
                  <p>User name</p>
                </div>
              </DetailUserContainer>
            </DescContainer>
          </div>
          <AnswerContainer>
            <h2>2 Answers</h2>
            <Answer />
            <Answer />
          </AnswerContainer>
          <AnswerFormContainer>
            <h2>Your Answer</h2>
            <div>Editor Form ..</div>
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
