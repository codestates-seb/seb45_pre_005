package five.group.server.answer.service;

import five.group.server.answer.dto.AnswerDetailResponseDto;
import five.group.server.answer.entity.Answer;
import five.group.server.answer.repository.AnswerRepository;
import five.group.server.exception.BusinessLogicException;

import five.group.server.member.entity.Member;
import five.group.server.member.repository.MemberRepository;
import five.group.server.member.service.MemberService;
import five.group.server.question.entity.Question;
import five.group.server.question.service.QuestionService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static five.group.server.exception.ExceptionCode.*;

@Service
@Transactional
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final QuestionService questionService;
    private final MemberService memberService;

    public AnswerService(AnswerRepository answerRepository, QuestionService questionService, MemberService memberService) {
        this.answerRepository = answerRepository;
        this.questionService = questionService;
        this.memberService = memberService;
    }

    public Answer createAnswer(Answer answer, Long questionId) {
        Question findQuestion = questionService.findVerifiedQuestion(questionId);
        verifyPostAnswer(findQuestion);

        findQuestion.addAnswer(answer);

        Member findMember = memberService.findPostMember();
        answer.setMember(findMember);

        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Answer answer) {
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());

        Optional.ofNullable(answer.getTitle())
                .ifPresent(title -> findAnswer.setTitle(title));

        Optional.ofNullable(answer.getContent())
                .ifPresent(content -> findAnswer.setContent(content));

        return findAnswer;

    }
    public Answer getAnswer(Long answerId){
        return findVerifiedAnswer(answerId);
    }

    //getQuestion 호출시 뿌려줄 Answer 값들
    public List<AnswerDetailResponseDto> getAnswers(Long questionId){
        return answerRepository.findAll().stream()
                .filter(answer -> answer.getAnswerStatus() == Answer.AnswerStatus.ANSWER_POSTED)
                .filter(answer -> questionId == answer.getQuestion().getQuestionId())
                .map(answer -> new AnswerDetailResponseDto(
                        answer.getMember().getNickname(),
                        answer.getTitle(),
                        answer.getContent(),
                        answer.getCreateAt()
                ))
                .collect(Collectors.toList());
    }

    public void deleteAnswer(Long answerId){
        Answer findAnswer = findVerifiedAnswer(answerId);
        findAnswer.setAnswerStatus(Answer.AnswerStatus.ANSWER_DELETED);
    }

    private Answer findVerifiedAnswer(Long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer findAnswer = optionalAnswer.orElseThrow(() ->
                new BusinessLogicException(ANSWER_NOT_FOUND));

        return findAnswer;
    }
    // 10개 넘으면 exception
    private void verifyPostAnswer(Question findQuestion) {
        int answerCount = findQuestion.getAnswers().stream()
                .filter(answers -> answers.getAnswerStatus() == Answer.AnswerStatus.ANSWER_POSTED)
                .collect(Collectors.toList()).size();
        if (answerCount > 10) {
            throw new BusinessLogicException(ANSWER_CANT_POST);
        }
    }


}
