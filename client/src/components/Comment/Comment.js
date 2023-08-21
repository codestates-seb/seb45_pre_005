import { useSelector, useDispatch } from 'react-redux';
import { CommentWrap } from './Comment.styled';
import { commentEdit } from '../../redux/actions/detailQuestion';

export default function Comment({ comment }) {
  const commentState = useSelector((state) => state.commentReducer);
  const dispatch = useDispatch();
  const examMemberId = 1;

  const handleCommentState = (commentId, flag) => {
    const payload = {
      target: commentId,
      flag: flag
    };
    dispatch(commentEdit(payload));
  };

  return (
    <CommentWrap>
      {comment.memberId === examMemberId &&
      comment.commentId === commentState.target ? (
        commentState.flag ? (
          <input type="text" defaultValue={comment.content} />
        ) : (
          <>
            <span>{comment.content}</span>
            <span>&nbsp;-&nbsp;</span>
            <span className="comment-user">{comment.nickname}</span>
            <span className="comment-date">{comment.createAt}</span>
          </>
        )
      ) : (
        <>
          <span>{comment.content}</span>
          <span>&nbsp;-&nbsp;</span>
          <span className="comment-user">{comment.nickname}</span>
          <span className="comment-date">{comment.createAt}</span>
        </>
      )}

      <div>
        {comment.memberId === examMemberId ? (
          commentState.flag ? (
            comment.commentId === commentState.target ? (
              <>
                <button
                  onClick={() => handleCommentState(comment.commentId, false)}
                >
                  Cancel
                </button>
                <button
                  className="submit-btn"
                  onClick={() => handleCommentState(comment.commentId, false)}
                >
                  Submit
                </button>
              </>
            ) : (
              <>
                <button>Delete</button>
                <button
                  onClick={() => handleCommentState(comment.commentId, true)}
                >
                  Edit
                </button>
              </>
            )
          ) : (
            <>
              <button>Delete</button>
              <button
                onClick={() => handleCommentState(comment.commentId, true)}
              >
                Edit
              </button>
            </>
          )
        ) : null}
      </div>
    </CommentWrap>
  );
}
