package five.group.server.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder

@AllArgsConstructor
public class CommentDetailResponseDto {
    private String nickname;
    private String content;
    private LocalDateTime createAt;
}
