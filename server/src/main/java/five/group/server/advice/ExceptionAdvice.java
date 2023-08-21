package five.group.server.advice;

import five.group.server.error.ErrorResponse;
import five.group.server.exception.BusinessLogicException;
import five.group.server.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;
import five.group.server.error.ErrorResponse.*;

import java.util.List;

@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler // 요청파라미터 예외처리
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public List<FieldError> methodArgumentExceptionHandler(MethodArgumentNotValidException e){
        ErrorResponse response = ErrorResponse.of(e.getBindingResult());

        return response.getFieldErrors();
    }

    @ExceptionHandler // 유효성 검사 예외처리
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public List<ConstraintViolationError> constraintViolationExceptionHandler(ConstraintViolationException e){
        ErrorResponse response = ErrorResponse.of(e.getConstraintViolations());

        return response.getViolationErrors();
    }
    @ExceptionHandler // 커스텀 예외 처리
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ExceptionCode businessExceptionHandler(BusinessLogicException e){
        ErrorResponse response = ErrorResponse.of(e.getExceptionCode());

        return response.getExceptionCode();
    }
}
