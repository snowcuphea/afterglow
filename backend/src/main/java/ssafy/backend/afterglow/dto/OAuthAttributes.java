package ssafy.backend.afterglow.dto;

import lombok.Builder;
import lombok.Getter;
import ssafy.backend.afterglow.domain.IntegrationEntity;

import java.util.Collections;
import java.util.Map;

@Getter
public class OAuthAttributes {
    private Map<String, Object> attributes;
    private String registrationId;
    private String nameAttributeKey;
    private String nickname;
    private String email;
    private String gender;
    private String age_range;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey, String nickname, String email, String gender, String age_range, String registrationId){
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.nickname = nickname;
        this.email = email;
        this.gender = gender;
        this.age_range = age_range;
        this.registrationId = registrationId;
    }

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes){
        return ofKakao(registrationId, "id", attributes);
    }

    private static OAuthAttributes ofKakao(String registrationId, String userNameAttributeName, Map<String, Object> attributes){
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
        profile.put("nickname", properties.get("nickname"));
        profile.put("email", kakaoAccount.get("email"));
        profile.put("gender", kakaoAccount.get("gender"));
        profile.put("age_range", kakaoAccount.get("age_range"));
        profile.put("id", attributes.get("id"));

        return OAuthAttributes.builder()
                .nickname((String) profile.get("nickname"))
                .email((String) profile.get("email"))
                .gender((String) profile.get("gender"))
                .age_range((String) profile.get("age_range"))
                .attributes(profile)
                .nameAttributeKey(userNameAttributeName)
                .registrationId(registrationId)
                .build();
    }

    public IntegrationEntity toEntity() {
        return IntegrationEntity.builder()
                .usrNickname(nickname)
                .usrEmail(email)
                .usrGender(gender)
                .usrAgeRange(age_range)
                .roles(Collections.singletonList("ROLE_USER"))
                .build();
    }

}
