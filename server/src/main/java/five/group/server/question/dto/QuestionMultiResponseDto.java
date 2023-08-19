package five.group.server.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class QuestionMultiResponseDto<T> {
    private T data;
    private List<? extends T> answer;
    private int answerCount;
}
