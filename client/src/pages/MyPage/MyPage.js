import Footer from '../../components/Footer/Footer';
import { BaseContainer, BaseWrap } from '../../style/Global.styled';

export default function MyPage() {
  return (
    <BaseContainer>
      <BaseWrap>
        <div>마이 페이지</div>
      </BaseWrap>
      <Footer />
    </BaseContainer>
  );
}
