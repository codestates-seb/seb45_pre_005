package five.group.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/answers")
public class AnswerController {

    private final AnswerService answerService;

    @Autowired
    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @GetMapping
    public ResponseEntity<List<AnswerDto>> getAllAnswers() {
        List<AnswerDto> answers = answerService.getAllAnswers();
        return ResponseEntity.ok(answers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnswerDto> getAnswerById(@PathVariable Long id) {
        AnswerDto answerDto = answerService.getAnswerById(id);
        if (answerDto != null) {
            return ResponseEntity.ok(answerDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<AnswerDto> createAnswer(@RequestBody AnswerDto answerDto) {
        AnswerDto createdAnswer = answerService.createAnswer(answerDto);
        return ResponseEntity.ok(createdAnswer);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<AnswerDto> updateAnswer(@PathVariable Long id, @RequestBody AnswerDto answerDto) {
        AnswerDto updatedAnswer = answerService.updateAnswer(id, answerDto);
        if (updatedAnswer != null) {
            return ResponseEntity.ok(updatedAnswer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable Long id) {
        boolean deleted = answerService.deleteAnswer(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<AnswerDto> likeAnswer(@PathVariable Long id) {
        AnswerDto updatedAnswer = answerService.likeAnswer(id);
        if (updatedAnswer != null) {
            return ResponseEntity.ok(updatedAnswer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/dislike")
    public ResponseEntity<AnswerDto> dislikeAnswer(@PathVariable Long id) {
        AnswerDto updatedAnswer = answerService.dislikeAnswer(id);
        if (updatedAnswer != null) {
            return ResponseEntity.ok(updatedAnswer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllAnswers() {
        answerService.deleteAllAnswers();
        return ResponseEntity.noContent().build();
    }
}
