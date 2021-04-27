package ssafy.backend.afterglow.dto;

import lombok.Builder;
import lombok.Getter;
import ssafy.backend.afterglow.domain.User;

import java.util.Collections;
import java.util.Map;

@Getter
public class OAuthAttributes {
    private Map<String, Object> attributes;
    private String registrationId;
    private String nameAttributeKey;
    private String username;
    private String email;
    private String gender;
    private String age_range;
    private String profile_img;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey, String username, String email, String gender, String age_range, String registrationId, String profile_img){
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.username = username;
        this.email = email;
        this.gender = gender;
        this.age_range = age_range;
        this.registrationId = registrationId;
        this.profile_img = profile_img;
    }

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes){
        return ofKakao(registrationId, "id", attributes);
    }

    private static OAuthAttributes ofKakao(String registrationId, String userNameAttributeName, Map<String, Object> attributes){
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
        profile.put("username", properties.get("nickname"));
        profile.put("email", kakaoAccount.get("email"));
        profile.put("profile_img", properties.get("profile_image"));
        profile.put("gender", kakaoAccount.get("gender"));
        profile.put("age_range", kakaoAccount.get("age_range"));
        profile.put("id", attributes.get("id"));

        return OAuthAttributes.builder()
                .username((String) profile.get("nickname"))
                .email((String) profile.get("email"))
                .gender((String) profile.get("gender"))
                .profile_img((String) profile.get("profile_img"))
                .age_range((String) profile.get("age_range"))
                .attributes(profile)
                .nameAttributeKey(userNameAttributeName)
                .registrationId(registrationId)
                .build();
    }

    public User toEntity() {
        return User.builder()
                .username(username)
                .usrEmail(email)
                .usrGender(gender)
                .usrAgeRange(age_range)
                .usrProfileImg(profile_img)
                .roles(Collections.singletonList("ROLE_USER"))
                .build();
    }

}
