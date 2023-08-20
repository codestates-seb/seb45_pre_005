package five.group.server.comment.service;

import five.group.server.answer.entity.Answer;
import five.group.server.answer.service.AnswerService;
import five.group.server.comment.dto.CommentDetailResponseDto;
import five.group.server.comment.entity.Comment;
import five.group.server.comment.repository.CommentRepository;
import five.group.server.exception.BusinessLogicException;
import five.group.server.exception.ExceptionCode;
import five.group.server.member.entity.Member;
import five.group.server.member.service.MemberService;
import five.group.server.question.entity.Question;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static five.group.server.exception.ExceptionCode.NO_AUTHORIZATION;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private final AnswerService answerService;

    public CommentService(CommentRepository commentRepository,MemberService memberService,@Lazy AnswerService answerService){
        this.commentRepository = commentRepository;
        this.memberService = memberService;
        this.answerService = answerService;
    }

    public Comment createComment(Comment comment,Long answerId) {
        Member findMember = memberService.findAuthenticatedMember();
        comment.setMember(findMember);


        Answer findAnswer = answerService.getAnswer(answerId);
        findAnswer.addComment(comment);
        comment.setAnswer(findAnswer);

        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment) {
        Comment findComment = findVerifiedComment(comment.getCommentId());
        answerService.findVerifiedAnswer(findComment.getAnswer().getAnswerId());
        verifyAuthorization(findComment);


        Optional.ofNullable(comment.getContent())
                .ifPresent(content -> findComment.setContent(content));

        return commentRepository.save(findComment);
    }

//    public Comment getComment(Long CommentId) {
//        return findVerifiedComment(CommentId);
//    }

    // Question 상세 정보 조회시 answer 와 같이 뿌려줄 comment
    public List<CommentDetailResponseDto> getComments(Long answerId) {
        List<Comment> commentList =commentRepository.findAll().stream()
                .filter(comment ->  comment.getCommentStatus().equals(Comment.CommentStatus.COMMENT_POSTED))
                .filter(comment -> comment.getAnswer().getAnswerId() == answerId)
                .collect(Collectors.toList());

        return commentList.stream()
                .map(comment -> new CommentDetailResponseDto(
                        comment.getMember().getNickname(),
                        comment.getContent(),
                        comment.getCreatedAt()
                )).collect(Collectors.toList());

    }
    public void deleteComment (Long commentId) {
        Comment findComment = findVerifiedComment(commentId);
        answerService.findVerifiedAnswer(findComment.getAnswer().getAnswerId());
        verifyAuthorization(findComment);
        commentRepository.delete(findComment);
    }

    public Comment findVerifiedComment(Long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        isCommentDeleted(findComment);

        return findComment;
    }
    private void verifyAuthorization(Comment comment) {
        Member findMember = memberService.findAuthenticatedMember();
        if (comment.getMember().getMemberId() != findMember.getMemberId()) {
            throw new BusinessLogicException(NO_AUTHORIZATION);
        }
    }
    private void isCommentDeleted(Comment comment){

        if (comment.getCommentStatus().equals(Comment.CommentStatus.COMMENT_DELETE)){
            throw new BusinessLogicException(ExceptionCode.COMMENT_DELETED);
        }
    }
}
