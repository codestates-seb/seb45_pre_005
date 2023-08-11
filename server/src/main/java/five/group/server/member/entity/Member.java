package five.group.server.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(length = 8, nullable = false)
    private String nickname;

    @Column(length = 30, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    @Column(updatable = false)
    private LocalDateTime createAt = LocalDateTime.now();

    @Column
    private LocalDateTime modifiedAt = LocalDateTime.now();

//    @ElementCollection(fetch = FetchType.EAGER)
//    private List<String> roles = new ArrayList<>();

    // 질문 댓글 답변 필드 추가 //


    public enum MemberStatus {
        MEMBER_ACTIVE("활동중"),
        MEMBER_QUIT("회원 탈퇴");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }

}
