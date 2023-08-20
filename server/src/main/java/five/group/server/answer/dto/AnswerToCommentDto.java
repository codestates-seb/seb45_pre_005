package five.group.server.answer.dto;

import five.group.server.comment.dto.CommentDetailResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class AnswerToCommentDto {
    private String nickname;
    private String title;
    private String content;
    private LocalDateTime createAt;

    private List<CommentDetailResponseDto> comments;
}
