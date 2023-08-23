package five.group.server.likes.controller;

import five.group.server.likes.dto.LikePostDto;
import five.group.server.likes.entity.Like;
import five.group.server.likes.mapper.LikeMapper;
import five.group.server.likes.service.LikesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/likes")
public class LikeController {
    private final LikesService likesService;
    private final LikeMapper likeMapper;

    public LikeController(LikesService likesService,LikeMapper likeMapper) {
        this.likesService = likesService;
        this.likeMapper = likeMapper;
    }

    @PostMapping()
    public ResponseEntity postLike(@RequestBody LikePostDto postDto){
        likesService.createLike(postDto.getAnswerId());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{like-id}")
    public ResponseEntity deleteLike(@PathVariable("like-id") long likeId){
        likesService.deleteLike(likeId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
