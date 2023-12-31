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
        @Size(max = 255, message = "제목은 최대 255자까지 입력할 수 있습니다.")
        private String title;

        @NotBlank(message = "본문을 입력하세요.")
        @Size(max = 1000, message = "본문은 최대 1000자까지 입력할 수 있습니다.")
        private String content;
    }

    // 질문 수정
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {

        @NotBlank(message = "타이틀을 입력하세요.")
        @Size(max = 255, message = "제목은 최대 255자까지 입력할 수 있습니다.")
        private String title;

        @NotBlank(message = "본문을 입력하세요.")
        @Size(max = 1000, message = "본문은 최대 1000자까지 입력할 수 있습니다.")
        private String content;

    }

    // 질문 조회
    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class responsePage {
        private Long memberId;
        private Long questionId;
        private String title;
        private String content;
        private String nickname;
        private int viewCount;
        private int answerCount;
        private LocalDateTime createdAt;
    }
}
