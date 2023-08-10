package five.group.server.question.dto;

import five.group.server.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

public class QuestionDto {

    // 질문 등록페이지
    @Getter
    @AllArgsConstructor
    public static class Post {

        @NotBlank(message = "타이틀을 입력하세요.")
        @Size(max = 30, message = "제목은 최대 30자까지 입력할 수 있습니다.")
        private String title;

        @NotBlank(message = "본문을 입력하세요.")
        @Size(max = 200, message = "본문은 최대 200자까지 입력할 수 있습니다.")
        private String content;
    }

    // 질문 수정페이지
    @Getter
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

        public void setQuestionId(Long questionId) {
            this.questionId = questionId;
        }
    }

    // 질문 조회페이지 (페이지네이션 적용)
    @Getter
    @AllArgsConstructor
    public static class response {
        private String title;
        private String nickname;
        private LocalDateTime createdAt;
//        private Question.QuestionStatus questionStatus;
//        public String getQuestionStatus() {
//            return questionStatus.getStatus();
//        }
    }

    // 질문 상세페이지 구현중

}
