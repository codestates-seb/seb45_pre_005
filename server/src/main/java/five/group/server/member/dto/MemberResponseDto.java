package five.group.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class MemberResponseDto {

    private String nickname;
    private LocalDateTime createAt;
    private LocalDateTime modifiedAt;

}
