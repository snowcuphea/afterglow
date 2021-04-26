package ssafy.backend.afterglow.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextListener;
import ssafy.backend.afterglow.repository.RecordRepository;
import ssafy.backend.afterglow.repository.UserRepository;
import ssafy.backend.afterglow.service.RecordService;
import ssafy.backend.afterglow.service.UserService;

@Configuration
public class SpringConfig {
    private final UserRepository userRepository;
    private final RecordRepository recordRepository;

    @Autowired
    public SpringConfig(UserRepository userRepository, RecordRepository recordRepository) {
        this.userRepository = userRepository;
        this.recordRepository = recordRepository;
    }

    @Bean
    public RequestContextListener requestContextListener() {
        return new RequestContextListener();
    }
}
