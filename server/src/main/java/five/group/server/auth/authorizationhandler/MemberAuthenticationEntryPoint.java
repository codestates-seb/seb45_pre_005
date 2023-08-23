package five.group.server.auth.authorizationhandler;


import five.group.server.auth.jwt.JwtTokenizer;
import five.group.server.error.HandlerErrorResponse;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.Map;

@Component
@Slf4j
public class MemberAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private final JwtTokenizer jwtTokenizer;

    public MemberAuthenticationEntryPoint(JwtTokenizer jwtTokenizer) {
        this.jwtTokenizer = jwtTokenizer;
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {

        Exception exception = (Exception) request.getAttribute("exception");

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        HandlerErrorResponse.sendErrorResponse(HttpStatus.UNAUTHORIZED, response);

        String message = exception != null ? exception.getMessage() : authException.getMessage();
        log.warn("Authorization Error: {}", message);
        }
    }

