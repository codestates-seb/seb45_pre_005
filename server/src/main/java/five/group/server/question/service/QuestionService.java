package five.group.server.question.service;

import five.group.server.exception.BusinessLogicException;
import five.group.server.exception.ExceptionCode;
import five.group.server.question.entity.Question;
import five.group.server.question.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
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
        Question getQuestion = findVerifiedQuestion(question.getId());

        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> getQuestion.setTitle(title));
        Optional.ofNullable(question.getContent())
                .ifPresent(content -> getQuestion.setContent(content));
//        Optional.ofNullable(question.getQuestionstatus())
//                .ifPresent(questionStatus -> getQuestion.setQuestionstatus(questionStatus));

        return questionRepository.save(getQuestion);
    }

    public Question getQuestion(Long id) {
        return findVerifiedQuestion(id);
    }

    public List<Question> getQuestionList() {
        List<Question> getQuestions = questionRepository.findAll();
        return getQuestions;
    }

    public void deleteQuestion (Long id) {
        Question verifiedQuestion = findVerifiedQuestion(id);
        questionRepository.delete(verifiedQuestion);
    }

    public Question findVerifiedQuestion(Long id) {
        Optional<Question> optionalQuestion = questionRepository.findById(id);
        Question findQuestion = optionalQuestion.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.QUESTIONE_NOT_FOUND));

        return findQuestion;
    }
}
