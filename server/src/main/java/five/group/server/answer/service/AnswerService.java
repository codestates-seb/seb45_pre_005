package five.group.server.answer.service;

import five.group.server.answer.dto.AnswerDetailResponseDto;
import five.group.server.answer.dto.AnswerToCommentDto;
import five.group.server.answer.entity.Answer;
import five.group.server.answer.mapper.AnswerMapper;
import five.group.server.answer.repository.AnswerRepository;
import five.group.server.comment.dto.CommentDetailResponseDto;
import five.group.server.comment.entity.Comment;
import five.group.server.comment.service.CommentService;
import five.group.server.exception.BusinessLogicException;

import five.group.server.exception.ExceptionCode;
import five.group.server.member.entity.Member;
import five.group.server.member.service.MemberService;
import five.group.server.question.entity.Question;
import five.group.server.question.service.QuestionService;
import org.springframework.context.annotation.Lazy;
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

    private final CommentService commentService;

    public AnswerService(AnswerRepository answerRepository, QuestionService questionService, MemberService memberService, @Lazy CommentService commentService) {
        this.answerRepository = answerRepository;
        this.questionService = questionService;
        this.memberService = memberService;
        this.commentService = commentService;

    }

    public Answer createAnswer(Answer answer, Long questionId) {
        Question findQuestion = questionService.findVerifiedQuestion(questionId);

        verifyPostAnswer(findQuestion);

        answer.setQuestion(findQuestion);
        findQuestion.addAnswer(answer);

        Member findMember = memberService.findAuthenticatedMember();
        answer.setMember(findMember);

        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Answer answer) {
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());
        verifyAuthorization(findAnswer);

        Optional.ofNullable(answer.getTitle())
                .ifPresent(title -> findAnswer.setTitle(title));

        Optional.ofNullable(answer.getContent())
                .ifPresent(content -> findAnswer.setContent(content));

        return findAnswer;

    }

    public Answer getAnswer(Long answerId) {
        return findVerifiedAnswer(answerId);
    }

    //getQuestion 호출시 뿌려줄 Answer 값들

    public List<AnswerDetailResponseDto> getAnswers(Long questionId) {
        Question findQuestion = questionService.findVerifiedQuestion(questionId);
        List<Answer> answerList = findQuestion.getAnswers();

        List<AnswerDetailResponseDto> answerDetailList = answerList.stream()
                .map(answer -> new AnswerDetailResponseDto(
                        answer.getMember().getNickname(),
                        answer.getTitle(),
                        answer.getContent(),
                        answer.getCreateAt(),
                        commentService.getComments(answer.getAnswerId())

                )).collect(Collectors.toList());
        return answerDetailList;

//    public List<AnswerDetailResponseDto> getAnswers(Long questionId){
//        return answerRepository.findAll().stream()
//                .filter(answer -> answer.getAnswerStatus() == Answer.AnswerStatus.ANSWER_POSTED)
//                .filter(answer -> questionId == answer.getQuestion().getQuestionId())
//                .map(answer -> new AnswerDetailResponseDto(
//                        answer.getMember().getNickname(),
//                        answer.getTitle(),
//                        answer.getContent(),
//                        answer.getCreateAt()
//                ))
//                .collect(Collectors.toList());
//    }

    // getQuestion 호출 시 Comment를 포함한 Answer 값을 반환
    public List<AnswerToCommentDto> getAnswers(Long questionId){
        return answerRepository.findAll().stream()
                .filter(answer -> answer.getAnswerStatus() == Answer.AnswerStatus.ANSWER_POSTED)
                .filter(answer -> questionId == answer.getQuestion().getQuestionId())
                .map(answer -> answerMapper.answerToAnswerResponseDtos(answer))
                .collect(Collectors.toList());

    }

    public void deleteAnswer(Long answerId) {

        Answer findAnswer = findVerifiedAnswer(answerId);
        verifyAuthorization(findAnswer);
        findVerifiedAnswer(answerId);

        findAnswer.setAnswerStatus(Answer.AnswerStatus.ANSWER_DELETED);
    }

    public Answer findVerifiedAnswer(Long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer findAnswer = optionalAnswer.orElseThrow(() ->
                new BusinessLogicException(ANSWER_NOT_FOUND));
        isAnswerDeleted(findAnswer);
        questionService.findVerifiedQuestion(findAnswer.getQuestion().getQuestionId());


        return findAnswer;
    }

    // 10개 넘으면 exception
    private void verifyPostAnswer(Question findQuestion) {
        int answerCount = findQuestion.getAnswers().stream()
                .filter(answers -> answers.getAnswerStatus() == Answer.AnswerStatus.ANSWER_POSTED)
                .collect(Collectors.toList()).size();
        if (answerCount == 10) {
            throw new BusinessLogicException(ANSWER_CANT_POST);
        }
    }

    private void verifyAuthorization(Answer answer) {
        Member findMember = memberService.findAuthenticatedMember();
        if (answer.getMember().getMemberId() != findMember.getMemberId()) {
            throw new BusinessLogicException(NO_AUTHORIZATION);
        }
    }

    private void isAnswerDeleted(Answer answer) {

        if (answer.getAnswerStatus().equals(Answer.AnswerStatus.ANSWER_DELETED)) {
            throw new BusinessLogicException(ANSWER_DELETED);
        }


    }

}
