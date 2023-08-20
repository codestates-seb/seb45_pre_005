package five.group.server.likes.service;

import five.group.server.answer.entity.Answer;
import five.group.server.answer.service.AnswerService;
import five.group.server.comment.entity.Comment;
import five.group.server.exception.BusinessLogicException;
import five.group.server.likes.entity.Like;
import five.group.server.likes.repository.LikeRepository;
import five.group.server.member.entity.Member;
import five.group.server.member.service.MemberService;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static five.group.server.exception.ExceptionCode.LIKE_NOT_FOUND;
import static five.group.server.exception.ExceptionCode.NO_AUTHORIZATION;

@Service
public class LikesService {
    private final MemberService memberService;
    private final AnswerService answerService;
    private final LikeRepository likeRepository;

    public LikesService(MemberService memberService, AnswerService answerService, LikeRepository likeRepository) {
        this.memberService = memberService;
        this.answerService = answerService;
        this.likeRepository = likeRepository;
    }

    public Like createLike(Like like) {
        Member findMember = memberService.findAuthenticatedMember();
        like.setMember(findMember);

        Answer findAnswer = answerService.findVerifiedAnswer(like.getAnswer().getAnswerId());
        like.setAnswer(findAnswer);

        return likeRepository.save(like);
    }

    public void deleteLike(long likeId) {

        Like findlike = findVerifiedLike(likeId);
        verifyAuthorization(findlike);

        likeRepository.delete(findlike);
    }

    private void verifyAuthorization(Like like) {
        Member findMember = memberService.findAuthenticatedMember();
        if (like.getMember().getMemberId() != findMember.getMemberId()) {
            throw new BusinessLogicException(NO_AUTHORIZATION);
        }
    }

    private Like findVerifiedLike(long likeId){
        Optional<Like> optional = likeRepository.findById(likeId);
        Like findLike = optional.orElseThrow(() -> new BusinessLogicException(LIKE_NOT_FOUND));

        return findLike;

    }
}
