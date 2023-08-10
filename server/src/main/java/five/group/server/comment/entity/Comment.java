package five.group.server.comment.entity;

import five.group.server.question.entity.Question;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(nullable = false)
    private String content;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private CommentStatus commentStatus = CommentStatus.COMMENT_POSTED;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createAt;

    @Column(nullable = false, name = "LAST_MODIFIED_AT")
    private LocalDateTime modifiedAt;

    @ManyToOne
    @JoinColumn(name = "questionId")
    private Question question;

    public enum CommentStatus {
        COMMENT_POSTED("댓글 작성"),
        COMMENT_DELETE("댓글 삭제");

        @Getter
        private String status;

        CommentStatus(String status) {
            this.status = status;
        }
    }
}
