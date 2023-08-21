package five.group.server.comment.entity;

import five.group.server.answer.entity.Answer;
import five.group.server.audit.Auditable;
import five.group.server.member.entity.Member;
import five.group.server.question.entity.Question;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Comment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(nullable = false)
    private String content;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private CommentStatus commentStatus = CommentStatus.COMMENT_POSTED;

    @ManyToOne
    @JoinColumn(name = "answerId")
    private Answer answer;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;

    public enum CommentStatus {
        COMMENT_POSTED("댓글 작성"),
        COMMENT_DELETE("댓글 삭제됨");

        @Getter
        private String status;

        CommentStatus(String status) {
            this.status = status;
        }
    }
}
