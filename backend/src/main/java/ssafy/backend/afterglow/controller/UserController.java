package ssafy.backend.afterglow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.backend.afterglow.domain.User;
import ssafy.backend.afterglow.repository.UserRepository;
import ssafy.backend.afterglow.service.UserService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Arrays;

@RestController
public class UserController {
    private Authentication authentication;
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @GetMapping("/customLogin")
    @Transactional
    public ResponseEntity<Object> login(HttpServletRequest request) throws IOException {
        Cookie[] cookies = request.getCookies();
        String access_token = cookies[1].getValue();
        User user = userService.login(access_token);
        return ResponseEntity.ok(user.getUsername());
    }
}
