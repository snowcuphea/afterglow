package ssafy.backend.afterglow.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.backend.afterglow.domain.User;
import ssafy.backend.afterglow.repository.UserRepository;
import ssafy.backend.afterglow.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.io.IOException;

@RestController
public class UserController {
    private Authentication authentication;
    private UserRepository userRepository;
    private UserService userService;

    @GetMapping("/customLogin")
    @Transactional
    public ResponseEntity<Object> login(HttpServletRequest request) throws IOException {
        User user = userService.login(request);
        return ResponseEntity.ok(user.getUsername());
    }
}
