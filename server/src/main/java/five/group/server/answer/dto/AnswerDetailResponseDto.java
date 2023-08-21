package five.group.server.answer.dto;

import five.group.server.comment.dto.CommentDetailResponseDto;
import five.group.server.comment.repository.CommentRepository;
import five.group.server.likes.entity.Like;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class AnswerDetailResponseDto {
    private Long memberId;
    private Long answerId;
    private String nickname;
    private String title;
    private String content;
    private LocalDateTime createAt;
    private int likeCount;
    private List<CommentDetailResponseDto> commentList;

}
