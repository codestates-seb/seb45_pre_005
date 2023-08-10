package five.group.server.question.mapper;

import five.group.server.question.dto.QuestionDto;
import five.group.server.question.entity.Question;
import five.group.server.question.repository.QuestionRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    Question questionPostDtoToQuestion(QuestionDto.Post requestBody);
    Question questionPatchDtoToQuestion(QuestionDto.Patch requestBody);
    QuestionDto.response questionToQuestionResponse(Question question);

    List<QuestionDto.response> questionsToResponseDto(List<Question> questionList);
}
