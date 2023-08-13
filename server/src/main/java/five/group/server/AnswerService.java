package five.group.server;

import java.util.List;

public interface AnswerService {
    List<AnswerDto> getAllAnswers();
    AnswerDto getAnswerById(Long id);

    AnswerDto createAnswer(AnswerDto answerDto);

    AnswerDto updateAnswer(Long id, AnswerDto answerDto);

    boolean deleteAnswer(Long id);

    AnswerDto likeAnswer(Long id);

    AnswerDto dislikeAnswer(Long id);

    void deleteAllAnswers();
}
