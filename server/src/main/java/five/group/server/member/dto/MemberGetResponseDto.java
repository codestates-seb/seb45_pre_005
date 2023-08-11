package five.group.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class MemberGetResponseDto {
    private String email;
    private String nickname;
    private LocalDateTime createAt;

}
