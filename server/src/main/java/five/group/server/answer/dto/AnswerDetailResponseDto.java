package five.group.server.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class AnswerDetailResponseDto {

    private String nickname;
    private String title;
    private String content;
    private LocalDateTime createAt;

}
