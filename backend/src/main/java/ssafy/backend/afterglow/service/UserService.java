package ssafy.backend.afterglow.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;
import ssafy.backend.afterglow.domain.User;
import ssafy.backend.afterglow.repository.UserRepository;

import java.security.Principal;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return (UserDetails) userRepository.findByUsername(username)
                .orElse(null);
    }

    public Optional<User> findUserByPrincipal(Principal principal){
        Optional<User> result = null;
        if (principal instanceof OAuth2AuthenticationToken) {
            result = userRepository.findByUsername(principal.getName());
        }
        return result;
    }
}
