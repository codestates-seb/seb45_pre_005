package five.group.server.question.service;

import five.group.server.answer.repository.AnswerRepository;
import five.group.server.answer.service.AnswerService;
import five.group.server.exception.BusinessLogicException;
import five.group.server.exception.ExceptionCode;
import five.group.server.member.entity.Member;
import five.group.server.member.repository.MemberRepository;
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

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static five.group.server.exception.ExceptionCode.QUESTION_DELETED;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final MemberRepository memberRepository;
    private final QuestionMapper questionMapper;

    public QuestionService(QuestionRepository questionRepository, MemberRepository memberRepository, QuestionMapper questionMapper) {
        this.questionRepository = questionRepository;
        this.memberRepository = memberRepository;
        this.questionMapper = questionMapper;
    }

    public Question createQuestion(Question question) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String memberCheck = authentication.getName();
        System.out.println(memberCheck);

        Optional<Member> verifiedMember = memberRepository.findByEmail(memberCheck);
        System.out.println(memberCheck);

        Member member = verifiedMember.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.NO_PERMISSION_CREATING_POST));

        Question createQuestion = new Question();
        createQuestion.setTitle(question.getTitle());
        createQuestion.setContent(question.getContent());
        createQuestion.setMember(member);

        return questionRepository.save(createQuestion);
    }

    public Question updateQuestion(Question question) {
        Question getQuestion = findVerifiedQuestion(question.getQuestionId());

        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> getQuestion.setTitle(title));
        Optional.ofNullable(question.getContent())
                .ifPresent(content -> getQuestion.setContent(content));

        return questionRepository.save(getQuestion);
    }

    public Question getQuestion(Long questionId) {
        Question question = findVerifiedQuestion(questionId);

        // 조회수 증가
        question.setViewCount(question.getViewCount() + 1);
        questionRepository.save(question);

        return findVerifiedQuestion(questionId);
    }

    public Page<Question> getQuestionList(Pageable pageable) {
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber() - 1,
                pageable.getPageSize(), Sort.by("createdAt").descending());

        return questionRepository.findAll(pageRequest);
    }

    public void deleteQuestion (Long questionId) {
        Question verifiedQuestion = findVerifiedQuestion(questionId);
        verifiedQuestion.setQuestionStatus(Question.QuestionStatus.QUESTION_DELETE);
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
                        question.getCreatedAt())

                ).collect(Collectors.toList());
    }
}
