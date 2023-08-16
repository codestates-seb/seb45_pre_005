package five.group.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found."),
    MEMBER_EXIST(400 , "Member Exist"),
    MEMBER_DELETED(204, "Member Deleted"),
    QUESTION_NOT_FOUND(404, "Question not found."),
    QUESTION_DELETED(204, "Member Deleted"),
    ANSWER_NOT_FOUND(404, "Answer not found."),
    ANSWER_DELETED(204, "Answer Deleted"),
    ANSWER_CANT_POST(400, "Answer Can't Post more than 10"),
    COMMENT_NOT_FOUND(404, "Comment not found."),
    COMMENT_DELETED(204, "Comment Deleted"),
    NO_PERMISSION_CREATING_POST(403, "Only Members can write post"),
    NO_PERMISSION_EDITING_POST(403,"Only Authors can modify post"),
    NO_PERMISSION_DELETING_POST(403, "Only Authors can delete post");

    @Getter
    private int code;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}

