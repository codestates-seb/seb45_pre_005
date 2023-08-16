import { CommentWrap } from './Comment.styled';

export default function Comment() {
  return (
    <CommentWrap>
      <span>Comment content ...</span>
      <span>&nbsp;-&nbsp;</span>
      <span className="comment-user">User name</span>
      <span className="comment-date">Mar 9, 2014 at 18:00</span>
      <div>
        <button>Delete</button>
        <button>Edit</button>
      </div>
    </CommentWrap>
  );
}
