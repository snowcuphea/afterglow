package ssafy.backend.afterglow.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import ssafy.backend.afterglow.domain.IntegrationEntity;
import ssafy.backend.afterglow.domain.KakaoOAuth2User;
import ssafy.backend.afterglow.dto.CustomIntegrationDto;
import ssafy.backend.afterglow.dto.OAuthAttributes;
import ssafy.backend.afterglow.repository.IntegrationRepository;

import java.util.Collections;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class KakaoOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final IntegrationRepository integrationRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        IntegrationEntity kakaointegrationEntity = saveOrUpdate(attributes);

        return oAuth2User;
    }

    private IntegrationEntity saveOrUpdate(OAuthAttributes attributes) {
        IntegrationEntity kakaoEntity = integrationRepository.findByUsrEmail(attributes.getEmail())
                .map(entity -> entity.update(attributes.getNickname(), attributes.getEmail()))
                .orElse(attributes.toEntity());

        return integrationRepository.save(kakaoEntity);
    }
}