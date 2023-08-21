import { styled } from 'styled-components';

export const EditorContainer = styled.div`
  .ql-container {
    margin-bottom: 0.7rem;
    min-height: 10em;
    border-bottom-left-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
  }

  .ql-toolbar {
    margin-top: 1rem;
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
  }

  p {
    padding: 0.1rem 0;
  }

  strong{
    font-weight:bold;
  }

  em {
    font-style: italic;
  }

  u {
    text-decoration: underline;
  }

  s {
    text-decoration: line-through;
  }

  blockquote {
    background-color: #f9f9f9;
    border-left: 4px solid lightgray;
    padding: 1rem;
  }

  ol {
    list-style: decimal;
    padding: 1rem;
  }

  ul {
    list-style: disc;
    padding: 1rem;
  }
`;