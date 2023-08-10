package five.group.server.question.controller;

import five.group.server.question.dto.QuestionDto;
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
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
@RequestMapping("/questions")
@Slf4j
public class QuestionController {

    private final static String QUESTION_DEFAULT_URL = "/questions";
    private final QuestionMapper questionMapper;
    private final QuestionService questionService;

    public QuestionController(QuestionMapper questionMapper, QuestionService questionService) {
        this.questionMapper = questionMapper;
        this.questionService = questionService;
    }

    @PostMapping
    public ResponseEntity postQuestion(@Positive Long questionId,
                                       @Valid @RequestBody QuestionDto.Post requestBody) {

        Question question = questionMapper.questionPostDtoToQuestion(requestBody);

        Question createdQuestion = questionService.createQuestion(question);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(QUESTION_DEFAULT_URL + "/{question_id}")
                .buildAndExpand(questionId)
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive Long questionId,
                                        @Valid @RequestBody QuestionDto.Patch requestBody) {

        requestBody.setQuestionId(questionId);

        Question question =
                questionService.updateQuestion(questionMapper.questionPatchDtoToQuestion(requestBody));

        return new ResponseEntity<>(questionMapper.questionToQuestionResponse(question), HttpStatus.OK);
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive Long questionId) {
        Question question = questionService.getQuestion(questionId);

        return new ResponseEntity<>(questionMapper.questionToQuestionResponse(question), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getQuestionList(@Positive @RequestParam int page) {
        Pageable pageable = PageRequest.of(page, 10, Sort.by("createdAt").descending());
        Page<Question> pageQuestion = questionService.getQuestionList(pageable);
        List<Question> questionList = pageQuestion.getContent();

        return new ResponseEntity<>(new PageResponseDto<>(questionMapper.questionsToResponseDto(questionList), pageQuestion), HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive Long questionId) {

        questionService.deleteQuestion(questionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
