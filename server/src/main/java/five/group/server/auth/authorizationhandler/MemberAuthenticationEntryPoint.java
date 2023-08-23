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

//        // 재발급 로직 생각중..
//
//        Exception exception = (Exception) request.getAttribute("exception");
//        String refreshToken = request.getHeader("Authorization").replace("Bearer ","");
//        RefreshToken.verifyRefreshToken(refreshToken);
//        Map<String, Object> claims;
//        if (exception instanceof ExpiredJwtException) {
//            try {
//                claims = (Map<String, Object>) jwtTokenizer.getClaims(refreshToken,
//                        jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey()));
//            } catch (ExpiredJwtException e) {
//                RefreshToken.deleteRefreshToken(refreshToken);
//                response.setStatus(HttpStatus.UNAUTHORIZED.value());
//                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//
//                HandlerErrorResponse.sendErrorResponse(HttpStatus.UNAUTHORIZED, response);
//
//                String message = exception != null ? exception.getMessage() : authException.getMessage();
//                log.warn("Authorization Error: {}", message);
//
//                return;
//            }
//            String username = (String) claims.get("username");
//            Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
//            String base64EncodedSecretKey = jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey());
//            String newAccessToken = jwtTokenizer.generateAccessToken(claims,username,expiration,base64EncodedSecretKey);
//
//            response.setHeader("Authorization","Bearer" + newAccessToken);

        }


    }

