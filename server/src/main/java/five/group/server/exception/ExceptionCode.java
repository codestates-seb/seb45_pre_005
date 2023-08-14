package five.group.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found."),
    QUESTION_NOT_FOUND(404, "Question not found."),
    ANSWER_NOT_FOUND(404, "Answer not found."),
    COMMENT_NOT_FOUND(404, "Comment not found.");

    @Getter
    private int code;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}

