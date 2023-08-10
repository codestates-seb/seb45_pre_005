import { BaseContainer, BaseWrap } from '../../style/Global.styled';
import { MainContainer } from './Main.styled';
import Footer from '../../components/Footer/Footer';
export default function Main() {
  return (
    <BaseContainer>
      <BaseWrap>
        <MainContainer>
          <div>메인 페이지</div>
        </MainContainer>
      </BaseWrap>
      <Footer />
    </BaseContainer>
  );
}
