package five.group.server.auth;

import five.group.server.exception.BusinessLogicException;
import five.group.server.exception.ExceptionCode;
import five.group.server.member.entity.Member;
import five.group.server.member.repository.MemberRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

import static five.group.server.exception.ExceptionCode.MEMBER_NOT_FOUND;

@Component
public class MemberDetailService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final MemberAuthority memberAuthority;

    public MemberDetailService(MemberRepository memberRepository, MemberAuthority memberAuthority) {
        this.memberRepository = memberRepository;
        this.memberAuthority = memberAuthority;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member finMember = optionalMember.orElseThrow(() -> new BusinessLogicException(MEMBER_NOT_FOUND));

        return new MemberDetails(finMember);
    }

    private final class MemberDetails extends Member implements UserDetails{
        MemberDetails(Member member) {
            setMemberId(member.getMemberId());
            setNickname(member.getNickname());
            setEmail(member.getEmail());
            setPassword(member.getPassword());
            setRoles(member.getRoles());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return memberAuthority.createAuthorities(this.getRoles());

        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
