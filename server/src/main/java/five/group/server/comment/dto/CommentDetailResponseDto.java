package five.group.server.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class CommentDetailResponseDto {
    private Long memberId;
    private Long commentId;
    private String nickname;
    private String content;
    private LocalDateTime createAt;
}
