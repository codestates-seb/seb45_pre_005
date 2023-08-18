package five.group.server.answer.repository;

import five.group.server.answer.entity.Answer;
import five.group.server.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
