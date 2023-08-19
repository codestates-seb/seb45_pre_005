package five.group.server.question.controller;

import five.group.server.answer.dto.AnswerToCommentDto;
import five.group.server.answer.mapper.AnswerMapper;
import five.group.server.answer.service.AnswerService;
import five.group.server.comment.service.CommentService;
import five.group.server.member.service.MemberService;
import five.group.server.question.dto.QuestionDto;
import five.group.server.question.dto.QuestionGetDetailResponse;
import five.group.server.question.dto.QuestionMultiResponseDto;
import five.group.server.question.entity.Question;
import five.group.server.question.mapper.QuestionMapper;
import five.group.server.question.response.PageResponseDto;
import five.group.server.question.service.QuestionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
@RequestMapping("/questions")
@Slf4j
public class QuestionController {

    private final QuestionMapper questionMapper;
    private final QuestionService questionService;
    private final AnswerMapper answerMapper;
    private final AnswerService answerService;
    private final CommentService commentService;
    private final MemberService memberService;

    public QuestionController(QuestionMapper questionMapper, QuestionService questionService, AnswerMapper answerMapper, AnswerService answerService, CommentService commentService, MemberService memberService) {
        this.questionMapper = questionMapper;
        this.questionService = questionService;
        this.memberService = memberService;
        this.answerMapper = answerMapper;
        this.answerService = answerService;
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionDto.Post requestBody,
                                       HttpServletRequest request) {

        Question question = questionMapper.questionPostDtoToQuestion(requestBody);

        questionService.createQuestion(question);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive Long questionId,
                                        @Valid @RequestBody QuestionDto.Patch requestBody) {

        Question question = questionMapper.questionPatchDtoToQuestion(requestBody);

        question.setQuestionId(questionId);

        Question updateQuestion = questionService.updateQuestion(question);

        return new ResponseEntity<>(questionMapper.questionToQuestionResponseDto(updateQuestion), HttpStatus.OK);
    }
    // 질문 상세 페이지
    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive Long questionId) {

        Question question = questionService.getQuestion(questionId);

        QuestionGetDetailResponse response = questionMapper.questionToQuestionResponseDto(question);

        List<AnswerToCommentDto> responseList = answerService.getAnswers(question.getQuestionId());

        int answerCount = responseList.size();

        return new ResponseEntity<>(new QuestionMultiResponseDto<>(response,responseList, answerCount), HttpStatus.OK);
    }

    // 질문 조회 리스트
    @GetMapping
    public ResponseEntity getQuestionList(@Positive @RequestParam int page) {

        Pageable pageable = PageRequest.of(page, 10, Sort.by("createdAt").descending());

        Page<Question> pageQuestion = questionService.getQuestionList(pageable);

        List<Question> questionList = pageQuestion.getContent();

        return new ResponseEntity<>(new PageResponseDto<>(questionMapper.questionsToQuestionList(questionList), pageQuestion), HttpStatus.OK);
    }



    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive Long questionId) {

        questionService.deleteQuestion(questionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
