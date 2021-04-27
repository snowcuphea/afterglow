package ssafy.backend.afterglow.config;

import org.hibernate.integrator.spi.IntegratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ssafy.backend.afterglow.repository.IntegrationRepository;
import ssafy.backend.afterglow.repository.RecordRepository;
import ssafy.backend.afterglow.repository.UserRepository;
import ssafy.backend.afterglow.service.KakaoOAuth2UserService;

@Configuration
public class SpringConfig {
    private final UserRepository userRepository;
    private final RecordRepository recordRepository;
    private final IntegrationRepository integrationRepository;

    @Autowired
    public SpringConfig(UserRepository userRepository, RecordRepository recordRepository, IntegrationRepository integrationRepository) {
        this.userRepository = userRepository;
        this.recordRepository = recordRepository;
        this.integrationRepository = integrationRepository;
    }
}
