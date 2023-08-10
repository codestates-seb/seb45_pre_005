package five.group.server.member.service;

import five.group.server.auth.MemberAuthority;
import five.group.server.member.entity.Member;
import five.group.server.member.repository.MemberRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static five.group.server.member.entity.Member.MemberStatus.MEMBER_QUIT;

@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MemberAuthority memberAuthority;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, MemberAuthority memberAuthority) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.memberAuthority = memberAuthority;
    }

    public Member createMember(Member member) {

        verityExistEmail(member.getEmail());
        String encodedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encodedPassword);
        List<String> roles = memberAuthority.createRoles();
        member.setRoles(roles);


        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifyMember(member.getMemberId());

        Authentication authentication = getAuthentication();
        verifyAuthentication(member,authentication);

        Optional.ofNullable(member.getNickname())
                .ifPresent(nickName -> findMember.setNickname(nickName));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(passwordEncoder.encode(password)));

        return findMember;
    }

    @Transactional(readOnly = true)
    public Member getMember(long memberId) {
        Member findMember = findVerifyMember(memberId);

        Authentication authentication = getAuthentication();
        verifyAuthentication(findMember,authentication);
        return findMember;
    }

    public void deleteMember(long memberId) {

        Member findMember = findVerifyMember(memberId);

        Authentication authentication = getAuthentication();
        verifyAuthentication(findMember,authentication);
        findMember.setMemberStatus(MEMBER_QUIT);
    }

    private void verityExistEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()) throw new RuntimeException(); // 커스텀 익셉션 추가
    }

    private Member findVerifyMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() -> new RuntimeException()); // 커스텀 익셉션 추가

        if (findMember.getMemberStatus().getStatus().equals("QUIT")) {
            throw new RuntimeException(); // 커스텀 익셉션 추가
        }

        return findMember;
    }
    private Authentication getAuthentication(){
        return SecurityContextHolder.getContext().getAuthentication();
    }

    private void verifyAuthentication(Member member, Authentication authentication) {
        if (!member.getEmail().equals(authentication.getName())) {
            throw new RuntimeException(); // 커스텀 익셉션 추가
        }
    }

}