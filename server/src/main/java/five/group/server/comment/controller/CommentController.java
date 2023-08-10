package five.group.server.comment.controller;

import five.group.server.comment.dto.CommentDto;
import five.group.server.comment.entity.Comment;
import five.group.server.comment.mapper.CommentMapper;
import five.group.server.comment.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@Validated
@RequestMapping("/questions")
@Slf4j
public class CommentController {

    private final static String QUESTION_DEFAULT_URL = "/questions";
    private final CommentMapper commentMapper;
    private final CommentService commentService;

    public CommentController(CommentMapper commentMapper, CommentService commentService) {
        this.commentMapper = commentMapper;
        this.commentService = commentService;
    }

    @PostMapping("/{question-id}/answer/{answer-id}/comment")
    public ResponseEntity postComment(@PathVariable("question-id") @Positive Long questionId,
                                      @PathVariable("answer-id") @Positive Long answerId,
                                      @Valid @RequestBody CommentDto.Post requestBody) {

        Comment comment = commentMapper.commentPostDtoToComment(requestBody);

        commentService.createComment(comment);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(QUESTION_DEFAULT_URL + "/{question_id}")
                .buildAndExpand(questionId)
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{question-id}/answer/{answer-id}/comment/edit")
    public ResponseEntity patchComment(@PathVariable("question-id") @Positive Long questionId,
                                       @PathVariable("answer-id") @Positive Long answerId,
                                       @Valid @RequestBody CommentDto.Patch requestBody){

        Comment comment = commentMapper.commentPatchDtoToComment(requestBody);

        commentService.updateComment(comment);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(QUESTION_DEFAULT_URL + "/{question_id}")
                .buildAndExpand(questionId)
                .toUri();

        return ResponseEntity.ok().location(location).build();
    }

    // 댓글의 개별 조회 기능이 필요한가 확인
//    @GetMapping("/{comment-id}")
//    public ResponseEntity getComment(@PathVariable("comment-id") @Positive Long commentId) {
//        Comment comment = commentService.getComment(commentId);
//
//        return new ResponseEntity<>(commentMapper.commentToCommentResponse(comment), HttpStatus.OK);
//    }

    @DeleteMapping("/{question-id}/answer/{answer-id}/comment/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("question-id") @Positive Long questionId,
                                        @PathVariable("answer-id") @Positive Long answerId,
                                        @PathVariable("comment-id") @Positive Long commentId) {

        commentService.deleteComment(commentId);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(QUESTION_DEFAULT_URL + "/{question_id}")
                .buildAndExpand(questionId)
                .toUri();

        return ResponseEntity.ok().location(location).build();
    }
}
