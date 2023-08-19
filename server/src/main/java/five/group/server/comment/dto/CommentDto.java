package five.group.server.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

public class CommentDto {
    @Getter
    @AllArgsConstructor
    public static class Post {

        @Positive
        private Long answerId;

        @NotBlank(message = "댓글을 입력하세요")
        @Size(max = 30, message = "댓글은 최대 200자까지 입력할 수 있습니다.")
        private String content;
        private Long answerId;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {

        @NotBlank(message = "댓글을 입력하세요")
        @Size(max = 30, message = "댓글은 최대 200자까지 입력할 수 있습니다.")
        private String content;
        private Long commentId;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long commentId;
        private String content;
    }
}
