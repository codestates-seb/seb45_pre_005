package five.group.server.auth;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
 @Component
public class MemberAuthority {
    private final List<String> USER_ROLES_STRING = List.of("USER");

    // 나중에 관리자 권한 추가?
    public List<GrantedAuthority> createAuthorities(List<String> roles){

       return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
    }

    public List<String> createRoles(){
        return USER_ROLES_STRING;
    }

}
