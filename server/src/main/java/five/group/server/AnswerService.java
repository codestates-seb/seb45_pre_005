package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerService {
    @Autowired
    private AnswerIT answerIT;

    public List<Answer> findAll(){
        return answerIT.findAll();
    }
    public Answer createAnswer(Answer answer){
        return answerIT.save(answer);
    }

    public Answer updateAnswer(Long id,String newText){
        Answer existingAnswer=
                answerIT.findById(id).orElse(null);
        if(existingAnswer != null){
            existingAnswer.setText(newText);
            return answerIT.save(existingAnswer);
        }
        return null;
    }
    public void deleteAnswer(Long id){
        answerIT.deleteById(id);
    }
}
