package five.group.server.answer.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

@Getter
@Setter
public class AnswerPostDto {

    private Long questionId;
    @NotBlank(message = "답변 제목을 입력해주세요.")
    @Size(max = 255 ,message = "제목은 최대 255자 입니다." )
    private String title;
    @NotBlank(message = "답변 내용을 입력해주세요")
    @Size(max = 1000 ,message = "답변은 최대 1000자 입니다." )
    private String content;

}
