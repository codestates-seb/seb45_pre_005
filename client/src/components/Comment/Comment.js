import { useSelector, useDispatch } from 'react-redux';
import { CommentWrap } from './Comment.styled';
import { commentEdit } from '../../redux/actions/detailQuestion';
import { deleteComment, patchComment } from '../../common/utils/fetchQuestion';
import { useEffect, useState } from 'react';
import { dateFormat, fullDateFormat } from '../../common/utils/dateFormat';
export default function Comment({ comment, setComments, comments }) {
  const commentState = useSelector((state) => state.commentReducer);
  const loginState = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const [editContent, setEditContent] = useState();
  const [editDisabled, setEditDisabled] = useState(true);
  const [disableMsg, setDisableMsg] = useState('');
  useEffect(() => {
    setEditContent(comment.content);
  }, []);

  const handleCommentState = (commentId, flag) => {
    const payload = {
      target: commentId,
      flag: flag
    };
    dispatch(commentEdit(payload));
    setEditContent(comment.content);
  };

  const handleCommentChange = (e) => {
    let text = e.target.value;

    if (text.length < 5) {
      setEditDisabled(true);
      setDisableMsg('* 5자 이상 입력해주세요.');
    } else if (text == comment.content) {
      setEditDisabled(true);
    } else {
      setDisableMsg('');
      setEditDisabled(false);
    }
    setEditContent(text);
  };

  const handleEditCancel = () => {
    handleCommentState(comment.commentId, false);
    setEditContent(comment.content);
    setEditDisabled(true);
    setDisableMsg('');
  };

  const handleCommentPatch = async () => {
    if (editContent.length < 5) {
      alert('댓글 내용이 짧습니다.');
      return;
    }

    const data = {
      content: editContent
    };

    try {
      const result = await patchComment(
        comment.commentId,
        data,
        loginState.accessToken
      );

      if (result.status === 200) {
        comment.content = editContent;
        handleCommentState(comment.commentId, false);
        setEditDisabled(true);
      } else if (result.status === 400) {
        return alert('댓글 내용이 너무 깁니다.');
      } else {
        return alert('Error!');
      }
    } catch (error) {
      console.error(error);
      return alert('Error!');
    }
  };

  const handleDeleteComment = async () => {
    const delConfirm = confirm('댓글을 삭제하시겠습니까?');
    if (delConfirm) {
      try {
        const result = await deleteComment(
          comment.commentId,
          loginState.accessToken
        );
        if (result.status === 204) {
          const deletedList = comments.filter((el) => {
            return el.commentId !== comment.commentId;
          });
          setComments(deletedList);
          alert('댓글이 삭제되었습니다.');
        }
      } catch (error) {
        console.error(error);
        return alert('Error!');
      }
    } else {
      return;
    }
  };
  return (
    <CommentWrap>
      {comment.memberId == loginState.userId &&
      comment.commentId === commentState.target ? (
        commentState.flag ? (
          <input
            type="text"
            defaultValue={editContent}
            onChange={handleCommentChange}
          />
        ) : (
          <>
            <span>{comment.content}</span>
            <span>&nbsp;-&nbsp;</span>
            <span className="comment-user">{comment.nickname}</span>
            <span className="comment-date">{dateFormat(comment.createAt)}</span>
          </>
        )
      ) : (
        <>
          <span>{comment.content}</span>
          <span>&nbsp;-&nbsp;</span>
          <span className="comment-user">{comment.nickname}</span>
          <span className="comment-date">{dateFormat(comment.createAt)}</span>
        </>
      )}

      <div>
        <p className="disable-msg">{disableMsg}</p>
        {comment.memberId == loginState.userId ? (
          commentState.flag ? (
            comment.commentId === commentState.target ? (
              <>
                <button onClick={handleEditCancel}>Cancel</button>
                <button
                  className="submit-btn"
                  onClick={handleCommentPatch}
                  disabled={editDisabled}
                >
                  Submit
                </button>
              </>
            ) : (
              <>
                <button onClick={handleDeleteComment}>Delete</button>
                <button
                  onClick={() => handleCommentState(comment.commentId, true)}
                >
                  Edit
                </button>
              </>
            )
          ) : (
            <>
              <button onClick={handleDeleteComment}>Delete</button>
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
