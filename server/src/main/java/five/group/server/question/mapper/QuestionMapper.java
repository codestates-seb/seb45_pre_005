package five.group.server.question.mapper;

import five.group.server.question.dto.QuestionDto;
import five.group.server.question.dto.QuestionGetDetailResponse;
import five.group.server.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    //    @Mapping(source = "memberId", target = "member.memberId")
    Question questionPostDtoToQuestion(QuestionDto.Post requestBody);

    Question questionPatchDtoToQuestion(QuestionDto.Patch requestBody);

    default List<QuestionDto.responsePage> questionsToQuestionList(List<Question> questionList) {
        return questionList.stream()
                .map(question -> new QuestionDto.responsePage(
                        question.getMember().getMemberId(),
                        question.getQuestionId(),
                        question.getTitle(),
                        question.getContent(),
                        question.getMember().getNickname(),
                        question.getViewCount(),
                        question.getAnswers().size(),
                        question.getCreatedAt()
                )).collect(Collectors.toList());
    }

    default QuestionDto.responsePage questionsToQuestionListDto(Question question) {
        QuestionDto.responsePage QuestionListDto =
                QuestionDto.responsePage.builder()
                        .memberId(question.getMember().getMemberId())
                        .questionId(question.getQuestionId())
                        .title(question.getTitle())
                        .content(question.getContent())
                        .nickname(question.getMember().getNickname())
                        .createdAt(question.getCreatedAt())
                        .build();

        return QuestionListDto;
    }

    // 답변이 존재할 경우 답변 response 를 담아서 반환하는 로직 구현 필요
    default QuestionGetDetailResponse questionToQuestionResponseDto(Question question) {
        QuestionGetDetailResponse questionResponseDto =
                QuestionGetDetailResponse.builder()
                        .memberId(question.getMember().getMemberId())
                        .questionId(question.getQuestionId())
                        .nickname(question.getMember().getNickname())
                        .title(question.getTitle())
                        .content(question.getContent())
                        .viewCount(question.getViewCount())
                        .createdAt(question.getCreatedAt())
                        .modifiedAt(question.getModifiedAt())
                        .build();

        return questionResponseDto;
    }
}
