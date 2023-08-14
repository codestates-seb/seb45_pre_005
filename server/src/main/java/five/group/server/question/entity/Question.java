package five.group.server.question.entity;

import five.group.server.audit.Auditable;
import five.group.server.comment.entity.Comment;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private QuestionStatus questionStatus = QuestionStatus.QUESTION_POSTED;

    //    @ManyToOne
//    @JoinColumn(name = "memberId")
//    private Member member;
//
//    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)
//    private List<Answer> answers;

    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)
    private List<Comment> comments;

    public enum QuestionStatus {
        QUESTION_POSTED("글 작성"),
        QUESTION_DELETE("글 삭제됨");

        @Getter
        private String status;
        QuestionStatus(String status){
            this.status = status;
        }
    }
}