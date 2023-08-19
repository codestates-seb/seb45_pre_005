package five.group.server.question.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

public class QuestionDto {

    // 질문 등록
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post {

        @NotBlank(message = "타이틀을 입력하세요.")
        @Size(max = 30, message = "제목은 최대 30자까지 입력할 수 있습니다.")
        private String title;

        @NotBlank(message = "본문을 입력하세요.")
        @Size(max = 200, message = "본문은 최대 200자까지 입력할 수 있습니다.")
        private String content;
        private Long memberId;
    }

    // 질문 수정
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        @Positive
        private Long questionId;

        @NotBlank(message = "타이틀을 입력하세요.")
        @Size(max = 30, message = "제목은 최대 30자까지 입력할 수 있습니다.")
        private String title;

        @NotBlank(message = "본문을 입력하세요.")
        @Size(max = 200, message = "본문은 최대 200자까지 입력할 수 있습니다.")
        private String content;
    }

    // 질문 조회
    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class responsePage {
        private String title;
        private String nickname;
        private LocalDateTime createdAt;
    }
}
