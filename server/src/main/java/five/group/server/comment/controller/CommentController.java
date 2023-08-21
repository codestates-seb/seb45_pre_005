package five.group.server.comment.controller;

import five.group.server.comment.dto.CommentDto;
import five.group.server.comment.entity.Comment;
import five.group.server.comment.mapper.CommentMapper;
import five.group.server.comment.service.CommentService;
import five.group.server.question.entity.Question;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
@RequestMapping("/comments")
@Slf4j
public class CommentController {
    private final CommentMapper commentMapper;
    private final CommentService commentService;

    public CommentController(CommentMapper commentMapper, CommentService commentService) {
        this.commentMapper = commentMapper;
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentDto.Post requestBody) {

        Comment comment = commentMapper.commentPostDtoToComment(requestBody);

        commentService.createComment(comment, requestBody.getAnswerId());

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive Long commentId,
                                       @Valid @RequestBody CommentDto.Patch requestBody){

        requestBody.setCommentId(commentId);

        Comment updateComment =
                commentService.updateComment(commentMapper.commentPatchDtoToComment(requestBody));

//        Comment comment = commentMapper.commentPatchDtoToComment(requestBody);
//
//        Comment updateComment = commentService.updateComment(comment);

        return new ResponseEntity<>(commentMapper.commentToCommentResponse(updateComment), HttpStatus.OK);
    }

    // 댓글의 개별 조회 기능이 필요한가 확인
//    @GetMapping("/{comment-id}")
//    public ResponseEntity getComment(@PathVariable("comment-id") @Positive Long commentId) {
//        Comment comment = commentService.getComment(commentId);
//
//        return new ResponseEntity<>(commentMapper.commentToCommentResponse(comment), HttpStatus.OK);
//    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") @Positive Long commentId){

       commentService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
