package five.group.server.error;

import com.google.gson.Gson;
import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class HandlerErrorResponse {

    public static void sendErrorResponse(HttpStatus status, HttpServletResponse response) throws IOException {

        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(status);
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }

}
