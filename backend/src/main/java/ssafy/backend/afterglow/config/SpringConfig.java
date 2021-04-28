package ssafy.backend.afterglow.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import ssafy.backend.afterglow.repository.UserRepository;
import ssafy.backend.afterglow.repository.RecordRepository;

@Configuration
public class SpringConfig {
    private final UserRepository userRepository;
    private final RecordRepository recordRepository;

    @Autowired
    public SpringConfig(UserRepository userRepository, RecordRepository recordRepository) {
        this.userRepository = userRepository;
        this.recordRepository = recordRepository;
    }
}
