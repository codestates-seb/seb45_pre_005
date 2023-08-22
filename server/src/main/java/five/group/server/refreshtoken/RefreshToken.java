package five.group.server.refreshtoken;

import five.group.server.exception.BusinessLogicException;
import five.group.server.exception.ExceptionCode;

import java.util.List;

// 재발급 로직 생각 중..
//public class RefreshToken {
//
//    private static List<String> refreshTokenRepository;
//
//    public static void saveRefreshToken(String refreshToken){
//        refreshTokenRepository.add(refreshToken);
//    }
//    public static void verifyRefreshToken(String refreshToken){
//        if(!refreshTokenRepository.contains(refreshToken)){
//            throw new BusinessLogicException(ExceptionCode.NO_TOKEN);
//        }
//    }
//
//    public static void deleteRefreshToken(String refreshToken){
//        refreshTokenRepository.remove(refreshToken);
//    }
//
//}
