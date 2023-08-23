package five.group.server.refreshtoken;

public class RefreshToken {
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
