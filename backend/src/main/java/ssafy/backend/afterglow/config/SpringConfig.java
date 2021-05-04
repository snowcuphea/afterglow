package ssafy.backend.afterglow.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import ssafy.backend.afterglow.repository.ImageRepository;
import ssafy.backend.afterglow.repository.UserRepository;
import ssafy.backend.afterglow.repository.RecordRepository;

@Configuration
public class SpringConfig {
    private final UserRepository userRepository;
    private final RecordRepository recordRepository;
    private final ImageRepository imageRepository;

    @Autowired
    public SpringConfig(UserRepository userRepository, RecordRepository recordRepository, ImageRepository imageRepository) {
        this.userRepository = userRepository;
        this.recordRepository = recordRepository;
        this.imageRepository = imageRepository;
    }
}
