package five.group.server.answer.mapper;
import five.group.server.answer.dto.AnswerPatchDto;
import five.group.server.answer.dto.AnswerPostDto;
import five.group.server.answer.dto.AnswerDetailResponseDto;
import five.group.server.answer.dto.AnswerResponseDto;
import five.group.server.answer.entity.Answer;
import five.group.server.member.entity.Member;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface AnswerMapper {

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
}
