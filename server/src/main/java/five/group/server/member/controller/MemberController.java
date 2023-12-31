package five.group.server.member.controller;

import five.group.server.member.dto.MemberGetResponseDto;
import five.group.server.member.dto.MemberPatchDto;
import five.group.server.member.dto.MemberPostDto;
import five.group.server.member.dto.MemberResponseDto;
import five.group.server.member.entity.Member;
import five.group.server.member.mapper.MemberMapper;
import five.group.server.member.repository.MemberRepository;
import five.group.server.member.service.MemberService;
import five.group.server.question.dto.QuestionDto;
import five.group.server.question.service.QuestionService;
import five.group.server.uitls.MultiResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
@RequestMapping("/members")
@Slf4j
public class MemberController {
    private final MemberMapper memberMapper;
    private final MemberService memberService;
    private final QuestionService questionService;

    public MemberController(MemberMapper memberMapper, MemberService memberService, QuestionService questionService) {
        this.memberMapper = memberMapper;
        this.memberService = memberService;
        this.questionService = questionService;
    }


    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto postDto){
        Member member = memberMapper.postDtoToEntity(postDto);
        memberService.createMember(member);


        return new ResponseEntity(HttpStatus.CREATED);
    }
    @PatchMapping()
    public ResponseEntity patchMember(@Valid @RequestBody MemberPatchDto patchDto){

        Member member = memberMapper.patchDtoToEntity(patchDto);
        Member updatedMember = memberService.updateMember(member);
        MemberResponseDto response = memberMapper.entityToResponseDto(updatedMember);

        return new ResponseEntity(response, HttpStatus.OK);
    }
    @GetMapping()
    public ResponseEntity getMember(){
        // 토큰으로 멤버 찾기
        Member findMember = memberService.getMember();
        MemberResponseDto response = memberMapper.entityToResponseDto(findMember);
        // 질문 리스트 추가로 반환 //
        List<QuestionDto.responsePage> resposeList = questionService.getQuestionsByMemberId(findMember.getMemberId());

        return new ResponseEntity(new MultiResponseDto(response,resposeList),HttpStatus.OK);
    }
    @DeleteMapping()
    public ResponseEntity deleteMember(){
        memberService.deleteMember();

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
