package five.group.server.member.service;


import five.group.server.auth.MemberAuthority;
import five.group.server.exception.BusinessLogicException;
import five.group.server.member.entity.Member;
import five.group.server.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static five.group.server.exception.ExceptionCode.*;
import static five.group.server.member.entity.Member.MemberStatus.MEMBER_QUIT;

@Service
@Transactional
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MemberAuthority memberAuthority;


    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder,MemberAuthority memberAuthority) {
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

        Optional.ofNullable(member.getNickname())
                .ifPresent(nickName -> findMember.setNickname(nickName));

        return findMember;
    }

    @Transactional(readOnly = true)
    public Member getMember(long memberId) {
        Member findMember = findVerifyMember(memberId);

        return findMember;
    }

    public void deleteMember(long memberId) {

        Member findMember = findVerifyMember(memberId);
        findMember.setMemberStatus(MEMBER_QUIT);
    }

    private void verityExistEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()) throw new BusinessLogicException(MEMBER_NOT_FOUND);
    }

    private Member findVerifyMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(MEMBER_EXIST));

        if (findMember.getMemberStatus().getStatus().equals("QUIT")) {
            throw new BusinessLogicException(MEMBER_DELETED);
        }

        return findMember;
    }

}