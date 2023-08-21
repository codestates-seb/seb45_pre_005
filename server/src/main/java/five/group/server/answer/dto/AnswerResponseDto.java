package five.group.server.answer.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerResponseDto {
    private Long memberId;
    private Long answerId;
    private String title;
    private String content;

}
