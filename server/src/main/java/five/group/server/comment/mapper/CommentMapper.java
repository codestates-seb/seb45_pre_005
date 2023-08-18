package five.group.server.comment.mapper;

import five.group.server.comment.dto.CommentDetailResponseDto;
import five.group.server.comment.dto.CommentDto;
import five.group.server.comment.entity.Comment;
import five.group.server.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    @Mapping(source = "answerId", target = "answer.answerId")
    Comment commentPostDtoToComment(CommentDto.Post requestBody);
    Comment commentPatchDtoToComment(CommentDto.Patch requestBody);
    CommentDto.Response commentToCommentResponse(Comment comment);
}
