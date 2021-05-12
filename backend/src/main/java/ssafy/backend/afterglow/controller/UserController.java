package ssafy.backend.afterglow.controller;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.backend.afterglow.domain.User;
import ssafy.backend.afterglow.repository.UserRepository;
import ssafy.backend.afterglow.service.UserService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    private Authentication authentication;
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Value("${kakao_rest_api_key}")
    private String kakao_rest_api_key;

    @GetMapping("/customLogin")
    @Transactional
    public ResponseEntity<User> login(HttpServletRequest request,
                                      HttpServletResponse response) throws IOException {
        HttpStatus status = HttpStatus.OK;
        Map<String, Object> cookies = new HashMap<>();
        Arrays.stream(request.getCookies())
                .forEach(cookie -> cookies.put(cookie.getName(), cookie.getValue()));

        String reqURL = "https://kapi.kakao.com/v1/user/access_token_info";
        URL url = new URL(reqURL);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Authorization", "Bearer " + (String) cookies.get("access_token"));
        int responseCode = conn.getResponseCode();
        if (responseCode == 401) {
            String reqRenewalURL = "https://kapi.kakao.com/oauth/token";
            URL renewalURL = new URL(reqRenewalURL);
            HttpURLConnection renewalConn = (HttpURLConnection) renewalURL.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("grant_type", "refresh_token");
            conn.setRequestProperty("client_id", kakao_rest_api_key);
            conn.setRequestProperty("refresh_token", (String) cookies.get("refresh_token"));

            int renewalResponseCode = conn.getResponseCode();
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String res = "";
            while ((line = br.readLine()) != null) {
                res += line;
            }
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(res);
            cookies.replace("access_token", element.getAsJsonObject().get("access_token").getAsString());
            cookies.replace("refresh_token", element.getAsJsonObject().get("refresh_token").getAsString());
            response.addCookie(new Cookie("access_token", (String) cookies.get("access_token")));
            response.addCookie(new Cookie("refresh_token", (String) cookies.get("refresh_token")));
            status = HttpStatus.CREATED;
        }
        User user = userService.login((String) cookies.get("access_token"));
        return new ResponseEntity(user, status);
    }
}
