package five.group.server;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "content", length = 200, nullable = false)
    private String content;

    @Column(name = "create_at", nullable = false, columnDefinition = "datetime default current_timestamp")
    private LocalDateTime createAt;

    @Column(name = "modified_at", nullable = false, columnDefinition = "datetime default current_timestamp")
    private LocalDateTime modifiedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "answer_status", nullable = false)
    private AnswerStatus answerStatus;

    @Column(name = "likes", nullable = false)
    private int likes = 0;

    @Column(name = "dislikes", nullable = false)
    private int dislikes = 0;

    @PrePersist
    public void prePersist() {
        createAt = LocalDateTime.now();
        modifiedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        modifiedAt = LocalDateTime.now();
    }



//    @ManyToOne
//    @JoinColumn(name = "QUESTION_ID")
//    private Question question;
}
