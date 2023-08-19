package five.group.server.answer.dto;

import five.group.server.comment.dto.CommentDetailResponseDto;
import five.group.server.comment.dto.CommentDto;
import five.group.server.comment.entity.Comment;
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
public class AnswerDetailResponseDto {

    private String nickname;
    private String title;
    private String content;
    private LocalDateTime createAt;
}
