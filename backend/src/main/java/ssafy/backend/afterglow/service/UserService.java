package ssafy.backend.afterglow.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;
import ssafy.backend.afterglow.domain.User;
import ssafy.backend.afterglow.repository.UserRepository;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.Principal;
import java.util.*;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Value("${kakao_rest_api_key}")
    private String kakao_rest_api_key;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return (UserDetails) userRepository.findByUsername(username)
                .orElse(null);
    }

    public User login(HttpServletRequest request) throws IOException {
        String userInfo = getUserInfo(request);
        User tempUser = customUserBuilder(userInfo);
        return saveOrUpdate(tempUser);
    }

    public Optional<User> findUserByToken(HttpServletRequest request) throws IOException {
        String userInfo = getUserInfo(request);
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(userInfo);
        JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
        String email = kakao_account.getAsJsonObject().get("email").getAsString();
        Optional<User> user = userRepository.findByUsrEmail(email);
        return user;
    }

    private User saveOrUpdate(User tempUser) {
        User user = userRepository.findByUsrEmail(tempUser.getUsrEmail())
                .map(entity -> entity.update(tempUser.getUsrEmail()))
                .orElse(tempUser);

        return userRepository.save(user);
    }

    public String getUserInfo(HttpServletRequest request) throws IOException {
        Map<String, Object> cookies = new HashMap<>();
        Arrays.stream(request.getCookies())
                .forEach(cookie -> cookies.put(cookie.getName(), cookie.getValue()));

        String access_Token = (String) cookies.get("access_token");
        String reqURL = "https://kapi.kakao.com/v2/user/me";
        URL url = new URL(reqURL);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Authorization", "Bearer " + access_Token);
        int responseCode = conn.getResponseCode();
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String line = "";
        String result = "";
        while ((line = br.readLine()) != null) {
            result += line;
        }
        return result;
    }

    public User customUserBuilder(String userInfo) {
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(userInfo);
        JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
        JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
        JsonObject profile = kakao_account.getAsJsonObject().get("profile").getAsJsonObject();

        String username = properties.getAsJsonObject().get("nickname").getAsString();
        String email = kakao_account.getAsJsonObject().get("email").getAsString();
        String profile_img = properties.getAsJsonObject().get("profile_image").getAsString();
        String gender = kakao_account.getAsJsonObject().get("gender").getAsString();
        String age_range = kakao_account.getAsJsonObject().get("age_range").getAsString();

        User tempUser = User.builder()
                .username(username)
                .usrEmail(email)
                .usrGender(gender)
                .usrAgeRange(age_range)
                .usrProfileImg(profile_img)
                .build();
        saveOrUpdate(tempUser);
        return tempUser;
    }

//    public Map<String, Object> renewalToken(HttpServletRequest request) throws IOException {
//        List<Cookie> cookies = Arrays.asList(request.getCookies());
//        String refresh_token = cookies.get
//
//        String reqURL = "https://kapi.kakao.com/oauth/token";
//        URL url = new URL(reqURL);
//        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//        conn.setRequestMethod("GET");
//        conn.setRequestProperty("grant_type", "refresh_token");
//        conn.setRequestProperty("client_id", kakao_rest_api_key);
//        conn.setRequestProperty("refresh_token", refresh_token);
//        int responseCode = conn.getResponseCode();
//        System.out.println("responseCode : " + responseCode);
//
//        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//        String line = "";
//        String res = "";
//        while ((line = br.readLine()) != null) {
//            res += line;
//        }
//        JsonParser parser = new JsonParser();
//        JsonElement element = parser.parse(res);
//        Map<String, Object> result = new HashMap<>();
//        result.put("access_token", element.getAsJsonObject().get("access_token").getAsString());
//        result.put("refresh_token", element.getAsJsonObject().get("refresh_token").getAsString());
//        return result;
//    }


    public Optional<User> findUserByPrincipal(Principal principal) {
        Optional<User> result = null;
        if (principal instanceof OAuth2AuthenticationToken) {
            result = userRepository.findByUsername(principal.getName());
        }
        return result;
    }
}
