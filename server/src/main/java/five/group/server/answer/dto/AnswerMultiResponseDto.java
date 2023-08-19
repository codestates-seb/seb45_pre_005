package five.group.server.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class AnswerMultiResponseDto<T> {
    private T data;
    private List<? extends T> comment;
}
