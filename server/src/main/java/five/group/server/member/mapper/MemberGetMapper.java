package five.group.server.member.mapper;

import five.group.server.member.dto.MemberGetResponseDto;
import five.group.server.member.entity.Member;

import java.time.LocalDateTime;

public class MemberGetMapper {

    public static MemberGetResponseDto entityToGetResponse(Member member){
        return new MemberGetResponseDto(
                member.getEmail(),
                member.getNickname(),
                member.getCreateAt()
        );
    }
}
