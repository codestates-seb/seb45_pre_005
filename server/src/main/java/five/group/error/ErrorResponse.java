package five.group.server.error;

import five.group.server.exception.BusinessLogicException;
import five.group.server.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
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
    private ExceptionCode exceptionCode; // 커스텀 예외
    private HttpStatus httpStatus;
    private ErrorResponse(List<FieldError> fieldErrors, List<ConstraintViolationError> violationErrors,ExceptionCode exceptionCode,HttpStatus httpStatus) {
        this.fieldErrors = fieldErrors;
        this.violationErrors = violationErrors;
        this.exceptionCode = exceptionCode;
        this.httpStatus = httpStatus;

    }

    public static ErrorResponse of(BindingResult bindingResult) {
        return new ErrorResponse(FieldError.of(bindingResult), null,null,null);
    }

    public static ErrorResponse of(Set<ConstraintViolation<?>> violations) {
        return new ErrorResponse(null, ConstraintViolationError.of(violations),null,null);
    }

    public static ErrorResponse of(ExceptionCode exceptionCode) {
        return new ErrorResponse(null, null, exceptionCode,null);
    }
    public static ErrorResponse of(HttpStatus httpStatus){
        return new ErrorResponse(null, null,null,httpStatus);
    }

    @Getter
    @AllArgsConstructor
    public static class FieldError { // 유효성 검증에서 발생하는 예외 필드
        private String field;
        private String rejectedValue;
        private String reason;

        private static List<FieldError> of(BindingResult bindingResult) {
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
    public static class ConstraintViolationError {  // URI 변수에서 발생하는 예외 필드
        private String propertyPath;
        private String InvalidValue;
        private String reason;

        public static List<ConstraintViolationError> of(Set<ConstraintViolation<?>> constraintViolations) {
            return constraintViolations.stream()
                    .map(constraintViolation -> new ConstraintViolationError(
                            constraintViolation.getPropertyPath().toString(),
                            constraintViolation.getInvalidValue().toString(),
                            constraintViolation.getMessage()
                    )).collect(Collectors.toList());
        }
    }
}
