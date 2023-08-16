package five.group.server.member.mapper;

import five.group.server.member.dto.MemberGetResponseDto;
import five.group.server.member.dto.MemberPatchDto;
import five.group.server.member.dto.MemberPostDto;
import five.group.server.member.dto.MemberResponseDto;
import five.group.server.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member postDtoToEntity(MemberPostDto postDto);

    Member patchDtoToEntity(MemberPatchDto patchDto);

    MemberResponseDto entityToResponseDto(Member member);

    default MemberGetResponseDto entityToGetResponse(Member member) {
        return new MemberGetResponseDto(
                member.getEmail(),
                member.getNickname(),
                member.getCreateAt()
        );

    }
}
