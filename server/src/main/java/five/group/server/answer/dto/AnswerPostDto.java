package five.group.server.answer.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

@Getter
@Setter
public class AnswerPostDto {
    @NotBlank(message = "답변 제목을 입력해주세요.")
    @Size(max = 30 ,message = "제목은 최대 30자 입니다." )
    private String title;
    @NotBlank(message = "답변 내용을 입력해주세요")
    @Size(max = 200 ,message = "답변은 최대 200자 입니다." )
    private String content;
    @Positive
    private Long questionId;
    private Long memberId;
}
