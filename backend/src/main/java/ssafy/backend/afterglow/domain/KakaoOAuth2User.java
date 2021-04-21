//package ssafy.backend.afterglow.domain;
//
//import com.fasterxml.jackson.annotation.JsonProperty;
//import lombok.Data;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.AuthorityUtils;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//
//import java.util.Collection;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@Data
//public class KakaoOAuth2User implements OAuth2User {
//    private String id;
//
//    private List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList("ROLE_USER");
//
//    @JsonProperty("kakao_account")
//    private Map<String, Object> kakaoAccount;
//
//    private Map<String, Object> properties;
//
//    @Override
//    public Map<String, Object> getAttributes() {
//        Map<String, Object> attributes = new HashMap<>();
//        attributes.putAll(kakaoAccount);
//        attributes.putAll(properties);
//        return attributes;
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return authorities;
//    }
//
//    @Override
//    public String getName() {
//        return this.id;
//    }
//}