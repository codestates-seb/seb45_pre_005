package five.group.server.question.service;


import five.group.server.answer.entity.Answer;

import five.group.server.answer.repository.AnswerRepository;
import five.group.server.answer.service.AnswerService;

import five.group.server.exception.BusinessLogicException;
import five.group.server.exception.ExceptionCode;
import five.group.server.member.entity.Member;
import five.group.server.member.repository.MemberRepository;
import five.group.server.member.service.MemberService;
import five.group.server.question.dto.QuestionDto;
import five.group.server.question.dto.QuestionGetDetailResponse;
import five.group.server.question.entity.Question;
import five.group.server.question.mapper.QuestionMapper;
import five.group.server.question.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static five.group.server.exception.ExceptionCode.*;

@Service
@Transactional
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final MemberService memberService;

    public QuestionService(QuestionRepository questionRepository, MemberService memberService) {
        this.questionRepository = questionRepository;
        this.memberService = memberService;


    public Question createQuestion(Question question) {
        Member findMember = memberService.findAuthenticatedMember();
        question.setMember(findMember);

        return questionRepository.save(question);
    }

    public Question updateQuestion(Question question) {
        Question findQuestion = findVerifiedQuestion(question.getQuestionId());
        verifyAuthorization(findQuestion);
        isQuestionDeleted(findQuestion);

        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> findQuestion.setTitle(title));
        Optional.ofNullable(question.getContent())
                .ifPresent(content -> findQuestion.setContent(content));

        return questionRepository.save(findQuestion);
    }

    public Question getQuestion(Long questionId) {

        Question findQuestion = findVerifiedQuestion(questionId);
        findQuestion.setViewCount(findQuestion.getViewCount() + 1);

        return findQuestion;

    }

    public Page<Question> getQuestionList(Pageable pageable) {
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber() - 1,
                pageable.getPageSize(), Sort.by("createdAt").descending());

        return questionRepository.findAll(pageRequest);
    }


    public void deleteQuestion(Long questionId) {
        Question findQuestion = findVerifiedQuestion(questionId);
        verifyAuthorization(findQuestion);
        isQuestionDeleted(findQuestion);
        findQuestion.setQuestionStatus(Question.QuestionStatus.QUESTION_DELETE);

    }

    public Question findVerifiedQuestion(Long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question findQuestion = optionalQuestion.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        if (findQuestion.getQuestionStatus().getStatus().equals("QUESTION_DELETE")) {
            throw new BusinessLogicException(QUESTION_DELETED);
        }
        return findQuestion;
    }

    public List<QuestionDto.responsePage> getQuestionsByMemberId(Long memberId) {
        return questionRepository.findAll().stream()
                .filter(question -> question.getQuestionStatus() == Question.QuestionStatus.QUESTION_POSTED)
                .filter(question -> question.getMember().getMemberId() == memberId)
                .map(question -> new QuestionDto.responsePage(
                        question.getTitle(),
                        question.getContent(),
                        question.getMember().getNickname(),
                        question.getCreatedAt())

                ).collect(Collectors.toList());
    }

    private void verifyAuthorization(Question question) {
        Member findMember = memberService.findAuthenticatedMember();
        if (question.getMember().getMemberId() != findMember.getMemberId()) {
            throw new BusinessLogicException(NO_AUTHORIZATION);
        }
    }

    private void isQuestionDeleted(Question question) {

        if (question.getQuestionStatus().equals(Question.QuestionStatus.QUESTION_DELETE)) {
            throw new BusinessLogicException(QUESTION_DELETED);
        }
    }
}
