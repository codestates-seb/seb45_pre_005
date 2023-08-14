package five.group.server.question.service;

import five.group.server.exception.BusinessLogicException;
import five.group.server.exception.ExceptionCode;
import five.group.server.question.entity.Question;
import five.group.server.question.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question createQuestion(Question question) {
        Question createQuestion = questionRepository.save(question);
        return createQuestion;
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
        return findVerifiedQuestion(questionId);
    }

    public Page<Question> getQuestionList(Pageable pageable) {
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber() - 1,
                pageable.getPageSize(), Sort.by("createdAt").descending());

        return questionRepository.findAll(pageRequest);
    }

    public void deleteQuestion (Long questionId) {
        Question verifiedQuestion = findVerifiedQuestion(questionId);
        questionRepository.delete(verifiedQuestion);
    }

    public Question findVerifiedQuestion(Long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question findQuestion = optionalQuestion.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        return findQuestion;
    }
}
