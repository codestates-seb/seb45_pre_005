package five.group.server.answer.controller;


import five.group.server.answer.dto.*;
import five.group.server.answer.entity.Answer;
import five.group.server.answer.mapper.AnswerMapper;
import five.group.server.answer.service.AnswerService;
import five.group.server.comment.dto.CommentDetailResponseDto;
import five.group.server.comment.service.CommentService;
import five.group.server.uitls.MultiResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/answers")
@Validated
public class AnswerController {
    private final AnswerService answerService;
    private final AnswerMapper answerMapper;
    private final CommentService commentService;

    public AnswerController(AnswerService answerService, AnswerMapper answerMapper, CommentService commentService) {
        this.answerService = answerService;
        this.answerMapper = answerMapper;
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity postAnswer(@RequestBody AnswerPostDto postDto){
        Answer answer = answerMapper.postDtoToEntity(postDto);
        Long questionId = postDto.getQuestionId();
        answerService.createAnswer(answer, questionId);

        return new ResponseEntity(HttpStatus.CREATED);
    }
    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") @Positive Long answerId,
                                      @RequestBody AnswerPatchDto patchDto){
        Answer answer = answerMapper.patchDtoToEntity(patchDto);
        answer.setAnswerId(answerId);
        Answer updateAnswer = answerService.updateAnswer(answer);
        AnswerResponseDto response = answerMapper.entityToResponseDto(updateAnswer);

        return new ResponseEntity(response,HttpStatus.OK);
    }
    @GetMapping("/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("answer-id") @Positive Long answerId){
//        Answer 조회 시 Comment가 존재 할 경우 리턴(data, list 방식)
        Answer answer = answerService.getAnswer(answerId);
        AnswerDetailResponseDto response = answerMapper.entityToDetailResponse(answer,answer.getMember());
        List<CommentDetailResponseDto> responseList = commentService.getComments(answer.getAnswerId());
        return new ResponseEntity(new AnswerMultiResponseDto<>(response,responseList), HttpStatus.OK);

//         Answer 조회 시 Comment 가 존재 할 경우 리턴(Answer 내 인자값으로 포함)
//        List<AnswerToCommentDto> answerAndComments = answerService.getAnswersAndComment(answerId);
//        return new ResponseEntity(answerAndComments, HttpStatus.OK);

    }
    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") Long answerId){

        answerService.deleteAnswer(answerId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
