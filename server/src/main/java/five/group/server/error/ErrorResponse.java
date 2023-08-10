package five.group.server.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.validation.BindingResult;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

// 에러 내용을 반환할 ErrorResponse 클래스
@Getter
public class ErrorResponse {
    private List<FieldError> fieldErrors; // 유효성 검증에서 발생하는 예외
    private List<ConstraintViolationError> violationErrors; // URI 변수에서 발생하는 예외

    private ErrorResponse(List<FieldError> fieldErrors, List<ConstraintViolationError> violationErrors){
        this.fieldErrors = fieldErrors;
        this. violationErrors = violationErrors;
    }
    // BusinessException 추가하기
    public static  ErrorResponse of(BindingResult bindingResult){
        return new ErrorResponse(FieldError.of(bindingResult),null);
    }
    public static  ErrorResponse of(Set<ConstraintViolation<?>> violations){
        return new ErrorResponse(null, ConstraintViolationError.of(violations));
    }

    @Getter
    @AllArgsConstructor
    public static class FieldError{ // 유효성 검증에서 발생하는 예외 필드
        private String field;
        private String rejectedValue;
        private String reason;

        private static List<FieldError> of(BindingResult bindingResult){
            List<org.springframework.validation.FieldError> fieldErrors =
                    bindingResult.getFieldErrors();

            return fieldErrors.stream()
                    .map(error -> new FieldError(
                            error.getField(),
                            error.getRejectedValue() == null ? "" : error.getRejectedValue().toString(),
                            error.getDefaultMessage()
                    )).collect(Collectors.toList());
        }
    }
    @Getter
    @AllArgsConstructor
    public static class ConstraintViolationError{  // URI 변수에서 발생하는 예외 필드
        private String propertyPath;
        private String InvalidValue;
        private String reason;

        public static List<ConstraintViolationError> of(Set<ConstraintViolation<?>> constraintViolations){
            return constraintViolations.stream()
                    .map(constraintViolation -> new ConstraintViolationError(
                            constraintViolation.getPropertyPath().toString(),
                            constraintViolation.getInvalidValue().toString(),
                            constraintViolation.getMessage()
                    )).collect(Collectors.toList());
        }
    }

}
