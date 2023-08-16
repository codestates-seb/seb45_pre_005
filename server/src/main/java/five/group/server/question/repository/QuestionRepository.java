package five.group.server.question.repository;

import five.group.server.question.dto.QuestionDto;
import five.group.server.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
//    List<QuestionDto.responsePage> findByMemberId(Long memberId);
}