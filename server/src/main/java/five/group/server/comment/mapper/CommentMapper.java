package five.group.server.comment.mapper;

import five.group.server.comment.dto.CommentDetailResponseDto;
import five.group.server.comment.dto.CommentDto;
import five.group.server.comment.entity.Comment;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment commentPostDtoToComment(CommentDto.Post requestBody);
    Comment commentPatchDtoToComment(CommentDto.Patch requestBody);
    CommentDto.response commentToCommentResponse(Comment comment);


}
