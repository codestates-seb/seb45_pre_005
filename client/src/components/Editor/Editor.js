import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { EditorContainer } from './Editor.styled';

export default function Editor({ onFocus, onChange, value }) {
  return (
    <EditorContainer>
      <ReactQuill
        theme="snow"
        onChange={onChange}
        value={value}
        modules={Editor.modules}
        formats={Editor.formats}
        onFocus={onFocus}
      />
      {/* <div className="viewer" dangerouslySetInnerHTML={{ __html: editorHtml }} />
      <div>
        {editorHtml}
      </div> */}
    </EditorContainer>
  );
}

Editor.modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['code-block', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link']
  ]
};

Editor.formats = [
  'header',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'code-block',
  'blockquote',
  'list',
  'bullet',
  'link',
  'code-block'
];
