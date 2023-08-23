package five.group.server.uitls;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class MultiResponseDto <T,B>{
    private T data;
    private List<B> list;
}
