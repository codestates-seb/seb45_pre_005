package five.group.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnswerServiceImpl implements AnswerService{
    private final AnswerRepository answerRepository;

    @Autowired
    public AnswerServiceImpl(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    @Override
    public List<AnswerDto> getAllAnswers() {
        List<Answer> answers = answerRepository.findAll();
        return answers.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public AnswerDto getAnswerById(Long id) {
        Answer answer = answerRepository.findById(id).orElse(null);
        return (answer != null) ? convertToDTO(answer) : null;
    }

    @Override
    public AnswerDto createAnswer(AnswerDto answerDto) {
        Answer answer = convertToEntity(answerDto);
        answer = answerRepository.save(answer);
        return convertToDTO(answer);
    }

    @Override
    public AnswerDto updateAnswer(Long id, AnswerDto answerDto) {
        Answer existingAnswer = answerRepository.findById(id).orElse(null);
        if (existingAnswer != null) {
            existingAnswer.setContent(answerDto.getContent());
            existingAnswer.setModifiedAt(LocalDateTime.now());
            existingAnswer.setAnswerStatus(answerDto.getAnswerStatus());
            existingAnswer = answerRepository.save(existingAnswer);
            return convertToDTO(existingAnswer);
        } else {
            return null;
        }
    }

    @Override
    public boolean deleteAnswer(Long id) {
        if (answerRepository.existsById(id)) {
            answerRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    private AnswerDto convertToDTO(Answer answer) {
        AnswerDto answerDto = new AnswerDto();
        answerDto.setId(answer.getId());
        answerDto.setContent(answer.getContent());
        answerDto.setCreateAt(answer.getCreateAt());
        answerDto.setModifiedAt(answer.getModifiedAt());
        answerDto.setAnswerStatus(answer.getAnswerStatus());
        return answerDto;
    }

    private Answer convertToEntity(AnswerDto answerDTO) {
        Answer answer = new Answer();
        answer.setId(answerDTO.getId());
        answer.setContent(answerDTO.getContent());
        answer.setCreateAt(answerDTO.getCreateAt());
        answer.setModifiedAt(answerDTO.getModifiedAt());
        answer.setAnswerStatus(answerDTO.getAnswerStatus());
        return answer;
    }

    @Override
    public AnswerDto likeAnswer(Long id) {
        Answer existingAnswer = answerRepository.findById(id).orElse(null);
        if (existingAnswer != null) {
            existingAnswer.setLikes(existingAnswer.getLikes() + 1);
            existingAnswer = answerRepository.save(existingAnswer);
            return convertToDTO(existingAnswer);
        } else {
            return null;
        }
    }

    @Override
    public AnswerDto dislikeAnswer(Long id) {
        Answer existingAnswer = answerRepository.findById(id).orElse(null);
        if (existingAnswer != null) {
            existingAnswer.setDislikes(existingAnswer.getDislikes() + 1);
            existingAnswer = answerRepository.save(existingAnswer);
            return convertToDTO(existingAnswer);
        } else {
            return null;
        }
    }

    @Override
    public void deleteAllAnswers() {
        answerRepository.deleteAll();
    }
}

