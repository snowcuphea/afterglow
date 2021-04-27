package ssafy.backend.afterglow.dto;

import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.userdetails.UserDetails;

public interface IntegrationKakaoAndMenber extends UserDetails, CredentialsContainer {
}
