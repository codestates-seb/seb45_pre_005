package five.group.server.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

public class CommentDto {
    @Getter
    @AllArgsConstructor
    public static class Post {

        @NotBlank(message = "댓글을 입력하세요")
        @Size(max = 30, message = "댓글은 최대 200자까지 입력할 수 있습니다.")
        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        @Positive
        private Long commentId;

        @NotBlank(message = "댓글을 입력하세요")
        @Size(max = 30, message = "댓글은 최대 200자까지 입력할 수 있습니다.")
        private String content;

        public void setCommentId(Long commentId) {
            this.commentId = commentId;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class response {
        private String content;
        private LocalDateTime createAt;
    }
}
