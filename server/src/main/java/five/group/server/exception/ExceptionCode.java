package five.group.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    QUESTIONE_NOT_FOUND(404, "Question not found");

    @Getter
    private int code;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}

