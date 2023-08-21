package five.group.server.likes.mapper;

import five.group.server.likes.dto.LikePostDto;
import five.group.server.likes.entity.Like;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LikeMapper {
    Like postDtoToEntity(LikePostDto postDto);
}
