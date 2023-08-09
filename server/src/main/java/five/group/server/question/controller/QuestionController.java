package five.group.server.question.controller;

import five.group.server.question.dto.QuestionDto;
import five.group.server.question.entity.Question;
import five.group.server.question.mapper.QuestionMapper;
import five.group.server.question.service.QuestionService;
import five.group.server.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

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
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionDto.Post requestBody) {

        Question question = questionMapper.questionPostDtoToQuestion(requestBody);

        Question createdQuestion = questionService.createQuestion(question);
        URI location = UriCreator.createUri(QUESTION_DEFAULT_URL, createdQuestion.getId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive Long id,
                                        @Valid @RequestBody QuestionDto.Patch requestBody) {

        requestBody.setId(id);

        Question question =
                questionService.updateQuestion(questionMapper.questionPatchDtoToQuestion(requestBody));

        return new ResponseEntity<>(questionMapper.questionToQuestionResponse(question), HttpStatus.OK);
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive Long id) {
        Question question = questionService.getQuestion(id);

        return new ResponseEntity<>(questionMapper.questionToQuestionResponse(question), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getQuestionList() {
        List<Question> questionList = questionService.getQuestionList();

        List<QuestionDto.response> questions =
                questionList.stream()
                        .map(question -> questionMapper.questionToQuestionResponse(question))
                        .collect(Collectors.toList());

        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive Long id) {

        questionService.deleteQuestion(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
