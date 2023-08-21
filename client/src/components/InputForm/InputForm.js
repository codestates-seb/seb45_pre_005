import { InputFromContainer } from './InputForm.styled';
import Editor from '../Editor/Editor';

export default function InputForm({
  label,
  formTitle,
  formInfo,
  formType,
  placeholder,
  onFocus,
  onChange,
  value,
  // nextBtnClick,
  tags,
  onKeyDown,
  handleTagDelete
}) {
  const inputField = () => {
    if (label === "title") {
      return (
        <input
          id={label}
          type={formType}
          placeholder={placeholder}
          onFocus={onFocus}
          onChange={onChange}
          value={value}
        />
      );
    } else if (label === "body") {
      return (
        <Editor
          onFocus={onFocus}
          onChange={onChange}
          value={value}
        />
      );
    } else if (label === "tag") {
      return (
        <input
          id={label}
          type={formType}
          placeholder={placeholder}
          onFocus={onFocus}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      );
    }
  }

  return (
    <InputFromContainer>
      <label htmlFor={label}>{formTitle}</label>
      <div>{formInfo}</div>
      {inputField()}
      <div>
        {tags && tags.map((tag, index) => (
          <button
            key={index}
            className='tag'
            onClick={handleTagDelete}
          >
            {tag}
          </button>
        ))}
      </div>
      {/* {label !== 'tag' && <button className='next-btn' type='button' onClick={nextBtnClick}>Next</button>} */}
    </InputFromContainer>
  );
}
