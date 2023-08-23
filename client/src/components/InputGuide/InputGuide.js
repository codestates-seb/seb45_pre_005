import {
  InputGuideContainer,
  InputGuideTitle,
  InputGuideBody
} from '../InputGuide/InputGuide.styled';
import PencilImg from '../../common/image/pencil.png';

export default function InputGuide({ data }) {
  const { title, body } = data;
  return (
    <InputGuideContainer>
      <InputGuideTitle>
        {title}
      </InputGuideTitle>
      <InputGuideBody>
        <img src={PencilImg} alt='' />
        <div>
          {body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </InputGuideBody>
    </InputGuideContainer>
  );
}