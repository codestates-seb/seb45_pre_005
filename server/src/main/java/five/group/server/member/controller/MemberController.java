package five.group.server.member.controller;

import five.group.server.member.dto.MemberGetResponseDto;
import five.group.server.member.dto.MemberPatchDto;
import five.group.server.member.dto.MemberPostDto;
import five.group.server.member.dto.MemberResponseDto;
import five.group.server.member.entity.Member;
import five.group.server.member.mapper.MemberGetMapper;
import five.group.server.member.mapper.MemberMapper;
import five.group.server.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
@RequestMapping("/members")
public class MemberController {
    private final MemberMapper mapper;
    private final MemberService service;

    public MemberController(MemberMapper mapper, MemberService service) {
        this.mapper = mapper;
        this.service = service;
    }


    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto postDto){
        Member member = mapper.postDtoToEntity(postDto);
        service.createMember(member);

        return new ResponseEntity(HttpStatus.CREATED);
    }
    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
                                      @Valid @RequestBody MemberPatchDto patchDto){
        Member member = mapper.patchDtoToEntity(patchDto);
        member.setMemberId(memberId);
        Member updatedMember = service.updateMember(member);
        MemberResponseDto response = mapper.entityToResponseDto(updatedMember);

        return new ResponseEntity(response, HttpStatus.OK);
    }
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId){
        Member findMember = service.getMember(memberId);
        MemberGetResponseDto response = MemberGetMapper.entityToGetResponse(findMember);
        // 질문 리스트 추가로 반환 //

        return new ResponseEntity(response,HttpStatus.OK);
    }
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId){
        service.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
