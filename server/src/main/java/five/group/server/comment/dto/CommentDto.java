package five.group.server.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

public class CommentDto {
    @Getter
    @AllArgsConstructor
    public static class Post {

        @Positive
        private Long answerId;

        @NotBlank(message = "댓글을 입력하세요")
        @Size(max = 1000, message = "댓글은 최대 1000자까지 입력할 수 있습니다.")
        private String content;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Patch {

        @NotBlank(message = "댓글을 입력하세요")
        @Size(max = 200, message = "댓글은 최대 200자까지 입력할 수 있습니다.")
        private String content;

    }

    @Getter
    @AllArgsConstructor
    public static class response {
        private Long memberId;
        private Long commentId;
        private String content;
    }
}
