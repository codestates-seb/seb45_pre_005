package five.group.server.uitls;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class MultiResponseDto <T>{
    private T data;
    private List<T> list;
}
