package five.group.server.question.entity;

import five.group.server.audit.Auditable;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

//    @Enumerated(value = EnumType.STRING)
//    @Column(nullable = false)
//    private QuestionStatus questionstatus = QuestionStatus.QUESTION_ACTIVE;

//    @Column(updatable = false, nullable = false)
//    private LocalDateTime createdAt = LocalDateTime.now();
//
//    @Column(nullable = false, name = "LAST_MODIFIED_AT")
//    private LocalDateTime modifiedAt = LocalDateTime.now();

    //    @ManyToOne
//    @JoinColumn(name = "MEMBER_ID")
//    private Member member;
//
//    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)
//    private List<Answer> answers = new ArrayList<>();

    public enum QuestionStatus {
        QUESTION_ACTIVE("글 활성화"),
        QUESTION_DELETE("글 삭제");

        @Getter
        private String status;
        QuestionStatus(String status){
            this.status = status;
        }
    }
}
