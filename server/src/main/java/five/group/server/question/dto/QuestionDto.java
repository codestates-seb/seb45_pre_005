package five.group.server.question.dto;

import five.group.server.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

public class QuestionDto {
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

    @Getter
    @AllArgsConstructor
    public static class Patch {
        @NotNull
        private Long id;

        @NotBlank(message = "타이틀을 입력하세요.")
        @Size(max = 30, message = "제목은 최대 30자까지 입력할 수 있습니다.")
        private String title;

        @NotBlank(message = "본문을 입력하세요.")
        @Size(max = 200, message = "본문은 최대 200자까지 입력할 수 있습니다.")
        private String content;

        private Question.QuestionStatus questionStatus;

        public void setId(Long id) {
            this.id = id;
        }
    }

    @AllArgsConstructor
    @Getter
    public static class response {
        private Long id;
        private String title;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
//        private Question.QuestionStatus questionStatus;

//        public String getQuestionStatus() {
//            return questionStatus.getStatus();
//        }
    }
}
