package five.group.server.question.dto;

import five.group.server.answer.dto.AnswerDetailResponseDto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestionGetDetailResponse {
    private Long questionId;
    private String nickname;
    private String title;
    private String content;
    private int viewCount;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
