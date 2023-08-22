import { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import { BaseContainer, BaseWrap } from '../../style/Global.styled';
import { AddQuestionContainer } from './AddQuestion.styled';
import QuestionGuide from '../../components/QuestionGuide/QuestionGuide';
import InputGuide from '../../components/InputGuide/InputGuide';
import InputForm from '../../components/InputForm/InputForm';
import { inputGuideProps, inputFormProps } from '../../common/data/AddQuestionPropsData';

export default function AddQuestion() {
  const [focusedInput, setFocusedInput] = useState(null);
  const [inputTitle, setInputTitle] = useState('');
  const [inputBody, setInputBody] = useState('');

  const handleTitleChange = (event) => {
    setInputTitle(event.target.value);
  };

  const handleBodyChange = (html) => {
    setInputBody(html);
  };

  const handleAllInputDelete = () => {
    setInputTitle('');
    setInputBody('');
  }

  const htmlToText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const handleSubmit = async () => {
    if (!inputTitle || htmlToText(inputBody).length < 20) {
      alert('Please check your question.');
      return;
    }

    const confirmation = window.confirm('Would you like to register a question?');
    if (confirmation) {
      const data = {
        title: inputTitle,
        content: inputBody
      };

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/questions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('accessToken')
          },
          body: JSON.stringify(data),
          credentials: 'include',
          mode: 'cors'
        });

        if (response.ok) {
          setInputTitle('');
          setInputBody('');
          alert('Question has been registered.');
          window.location.href = '/';
        } else {
          alert('Question submission failed.');
        }
      } catch (error) {
        console.error(error);
        alert('Error: Question submission failed.');
      }
    }
  };

  const handleDiscard = () => {
    const confirmation = window.confirm('Are you sure you want to discard this question?');
    if (confirmation) {
      handleAllInputDelete();
      setFocusedInput(null);
      window.scrollTo(0, 0);
    }
  }

  const isSubmitButtonDisabled = !inputTitle || htmlToText(inputBody).length < 20;

  return (
    <BaseContainer>
      <BaseWrap>
        <AddQuestionContainer>
          <h1>Ask a public question</h1>
          <QuestionGuide />

          <div className="flex-box">
            <InputForm
              {...inputFormProps.title}
              onFocus={() => setFocusedInput('title')}
              onChange={handleTitleChange}
              value={inputTitle}
              nextBtnClick={() => setFocusedInput('body')}
            />
            {focusedInput === 'title' && (
              <InputGuide data={inputGuideProps[focusedInput]} />
            )}
          </div>

          <div className="flex-box">
            <InputForm
              {...inputFormProps.body}
              onFocus={() => setFocusedInput('body')}
              onChange={handleBodyChange}
              value={inputBody}
              nextBtnClick={() => setFocusedInput('tag')}
            />
            {focusedInput === 'body' && (
              <InputGuide data={inputGuideProps[focusedInput]} />
            )}
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitButtonDisabled}
          >
            Post your question
          </button>
          <button
            className="red-btn"
            onClick={handleDiscard}
          >
            Discard draft
          </button>
        </AddQuestionContainer>
      </BaseWrap>
      <Footer />
    </BaseContainer>
  );
}
