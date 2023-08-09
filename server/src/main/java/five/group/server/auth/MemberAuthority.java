package five.group.server.auth;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MemberAuthority {

    private final List<GrantedAuthority> USER_ROLES = AuthorityUtils.createAuthorityList("ROLE_USER");
    private final List<String> USER_ROLES_STRING = List.of("USER");

    // 나중에 관리자 권한 추가?
    public List<GrantedAuthority> createAuthorities(){
        return USER_ROLES;
    }

    public List<String> createRoles(){
        return USER_ROLES_STRING;
    }

}
