package five.group.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@AllArgsConstructor
public class MemberPostDto {
    @NotBlank(message = "닉네임을 입력해주세요")
    private String nickname;
    @Email(message = "올바른 이메일 형식을 입력해주세요")
    private String email;
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*#?&])[A-Za-z[0-9]$@$!%*#?&]$",
             message = "하나 이상의 영문, 숫자, 특수 문자를 포함해주세요")
    private String password;
}
