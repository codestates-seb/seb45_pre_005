package five.group.server.comment.service;

import five.group.server.comment.entity.Comment;
import five.group.server.comment.repository.CommentRepository;
import five.group.server.exception.BusinessLogicException;
import five.group.server.exception.ExceptionCode;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository){
        this.commentRepository = commentRepository;
    }

    public Comment createComment(Comment comment) {
        Comment createComment = commentRepository.save(comment);
        return createComment;
    }

    public Comment updateComment(Comment comment) {
        Comment getComment = findVerifiedComment(comment.getCommentId());

        Optional.ofNullable(comment.getContent())
                .ifPresent(content -> getComment.setContent(content));

        return commentRepository.save(getComment);
    }

//    public Comment getComment(Long CommentId) {
//        return findVerifiedComment(CommentId);
//    }

    public void deleteComment (Long commentId) {
        Comment verifiedComment = findVerifiedComment(commentId);
        commentRepository.delete(verifiedComment);
    }

    public Comment findVerifiedComment(Long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return findComment;
    }
}
