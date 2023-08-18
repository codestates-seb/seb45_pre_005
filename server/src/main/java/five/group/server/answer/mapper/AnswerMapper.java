package five.group.server.answer.mapper;
import five.group.server.answer.dto.*;
import five.group.server.answer.entity.Answer;
import five.group.server.comment.dto.CommentDetailResponseDto;
import five.group.server.comment.dto.CommentDto;
import five.group.server.member.entity.Member;
import five.group.server.question.dto.QuestionDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;


@Mapper(componentModel = "spring")
public interface AnswerMapper {
    @Mapping(source = "questionId", target = "question.questionId")
    Answer postDtoToEntity(AnswerPostDto postDto);

    Answer patchDtoToEntity(AnswerPatchDto patchDto);

    AnswerResponseDto entityToResponseDto(Answer answer);

    default AnswerDetailResponseDto entityToDetailResponse(Answer answer, Member member){
        return new AnswerDetailResponseDto(
                member.getNickname(),
                answer.getTitle(),
                answer.getContent(),
                answer.getCreateAt()
        );
    }



    default AnswerToCommentDto answerToAnswerResponseDtos(Answer answer) {

        AnswerToCommentDto answerToAnswerResponseDtos =
                AnswerToCommentDto.builder()
                        .nickname(answer.getMember().getNickname())
                        .title(answer.getTitle())
                        .content(answer.getContent())
                        .createAt(answer.getCreateAt())
                        .build();

        if (answer.getComments() != null) {
            List<CommentDetailResponseDto> commentDetailResponseDtos =
                    answer.getComments()
                            .stream()
                            .map(comment -> CommentDetailResponseDto.builder()
                                    .nickname(comment.getMember().getNickname())
                                    .content(comment.getContent())
                                    .createAt(comment.getCreateAt())
                                    .build())
                            .collect(Collectors.toList());

            answerToAnswerResponseDtos.setComments(commentDetailResponseDtos);
        }
        return answerToAnswerResponseDtos;
    }
}
