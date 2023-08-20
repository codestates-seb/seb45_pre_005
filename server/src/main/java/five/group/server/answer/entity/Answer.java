package five.group.server.answer.entity;

import five.group.server.comment.entity.Comment;
import five.group.server.likes.entity.Like;
import five.group.server.member.entity.Member;
import five.group.server.question.entity.Question;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column(length = 30, nullable = false)
    private String title;

    @Column(length = 200, nullable = false)
    private String content;

    @Column(updatable = false)
    private LocalDateTime createAt = LocalDateTime.now();

    @Column
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private AnswerStatus answerStatus = AnswerStatus.ANSWER_POSTED;

    @ManyToOne
    @JoinColumn(name = "questionId")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;


    @OneToMany(mappedBy = "answer", cascade = CascadeType.REMOVE)
    private List<Comment> commentList;


    @OneToMany(mappedBy = "answer", cascade = CascadeType.REMOVE)
    private List<Like> likes;

    public void addComment(Comment comment){
        comments.add(comment);
    }

    public enum AnswerStatus {
        ANSWER_POSTED("답변 게시중"),
        ANSWER_DELETED("답변 삭제됨");
        @Getter
        private String status;

        AnswerStatus(String status) {
            this.status = status;
        }
    }
}
