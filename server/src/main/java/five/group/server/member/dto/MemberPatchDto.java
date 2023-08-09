package five.group.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@AllArgsConstructor
public class MemberPatchDto {

    @Nullable
    private String nickname;
    @Nullable
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*#?&])[A-Za-z[0-9]$@$!%*#?&]$",
            message = "하나 이상의 영문, 숫자, 특수 문자를 포함해주세요")
    private String password;
}
