package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/answers")
public class AnswerController {
    private final AnswerService answerService;

    //@Autowired
    public AnswerController(AnswerService answerService){
        this.answerService = answerService;
    }

    @GetMapping
    public List<Answer> getAllAnswers(){
        return answerService.findAll();
    }

    @PostMapping
    public Answer createAnswer(@RequestBody Answer answer){
        return answerService.createAnswer(answer);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Answer>
    updateAnswer(@PathVariable Long id, @RequestBody Map<String ,String> requestMap){
        String newText = requestMap.get("text");
        if(newText != null){
            Answer updatedAnswer =
                    answerService.updateAnswer(id,newText);
            if(updatedAnswer != null){
                return ResponseEntity.ok(updatedAnswer);
            }
        }
        return ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void>
    deleteAnswer(@PathVariable Long id){
        answerService.deleteAnswer(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping
    public String Hello(){return  "Hello";}
}
