package five.group.server.comment.service;

import five.group.server.answer.dto.AnswerDetailResponseDto;
import five.group.server.answer.entity.Answer;
import five.group.server.answer.service.AnswerService;
import five.group.server.comment.dto.CommentDetailResponseDto;
import five.group.server.comment.entity.Comment;
import five.group.server.comment.repository.CommentRepository;
import five.group.server.exception.BusinessLogicException;
import five.group.server.exception.ExceptionCode;
import five.group.server.member.entity.Member;
import five.group.server.member.service.MemberService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final AnswerService answerService;
    private final MemberService memberService;

    public CommentService(CommentRepository commentRepository, AnswerService answerService, MemberService memberService){
        this.commentRepository = commentRepository;
        this.answerService = answerService;
        this.memberService = memberService;
    }

    public Comment createComment(Comment comment, Long answerId) {

        Answer findAnswer = answerService.findVerifiedAnswer(answerId);

        findAnswer.addComment(comment);

        Member findMember = memberService.findPostMember();

        comment.setMember(findMember);

        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment) {
        Comment getComment = findVerifiedComment(comment.getCommentId());

        Optional.ofNullable(comment.getContent())
                .ifPresent(content -> getComment.setContent(content));

        return getComment;
    }

    public void deleteComment (Long commentId) {
        Comment verifiedComment = findVerifiedComment(commentId);
        verifiedComment.setCommentStatus(Comment.CommentStatus.COMMENT_DELETE);
    }

    public List<CommentDetailResponseDto> getComments(Long answerId){
        return commentRepository.findAll().stream()
                .filter(comment -> comment.getCommentStatus() == Comment.CommentStatus.COMMENT_POSTED)
                .filter(comment -> answerId == comment.getAnswer().getAnswerId())
                .map(comment -> new CommentDetailResponseDto(
                        comment.getMember().getNickname(),
                        comment.getContent(),
                        comment.getCreateAt()
                ))
                .collect(Collectors.toList());
    }
    public Comment findVerifiedComment(Long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return findComment;
    }
}
