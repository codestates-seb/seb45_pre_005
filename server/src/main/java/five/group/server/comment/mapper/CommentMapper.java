package five.group.server.comment.mapper;

import five.group.server.comment.dto.CommentDto;
import five.group.server.comment.entity.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment commentPostDtoToComment(CommentDto.Post requestBody);
    Comment commentPatchDtoToComment(CommentDto.Patch requestBody);
    CommentDto.response commentToCommentResponse(Comment comment);

}
