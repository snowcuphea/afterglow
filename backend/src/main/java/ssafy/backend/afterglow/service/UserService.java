package ssafy.backend.afterglow.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ssafy.backend.afterglow.repository.UserRepository;

import javax.transaction.Transactional;
import java.beans.Transient;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @RequestMapping(value="/login/oauth2/code/kakao")
    public String login(@RequestParam("code") String code) {
        System.out.println("controller access_token : " + code);

        return "index";
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return (UserDetails) userRepository.findByUsername(username)
                .orElse(null);
    }
}
