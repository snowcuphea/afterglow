package ssafy.backend.afterglow.dto;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import ssafy.backend.afterglow.domain.IntegrationEntity;
import ssafy.backend.afterglow.domain.User;

import java.util.*;

@Getter
public class CustomIntegrationDto implements IntegrationKakaoAndMenber {

    private Long usrId;
    private String usrEmail;
    private String usrNickname;
    private String usrPwd;
    private String usrGender;
    private String usrAgeRange;
    private String usrProfileImg;
    private DefaultOAuth2User defaultOAuth2User;
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private final Set<GrantedAuthority> authorities;

    public CustomIntegrationDto(IntegrationEntity integrationEntity, Collection<? extends GrantedAuthority> authorities) {
        new User();
        this.usrEmail = integrationEntity.getUsrEmail();
        this.usrPwd = integrationEntity.getUsrPwd();
        this.usrGender = integrationEntity.getUsrGender();
        this.usrNickname = integrationEntity.getUsrNickname();
        this.usrAgeRange = integrationEntity.getUsrAgeRange();
        this.usrProfileImg = integrationEntity.getUsrProfileImg();
        this.usrId = integrationEntity.getUsrId();
        this.authorities = Collections.unmodifiableSet(new LinkedHashSet<>(this.sortAuthorities(authorities)));
    }

    private Set<GrantedAuthority> sortAuthorities(Collection<? extends GrantedAuthority> authorities) {
        SortedSet<GrantedAuthority> sortedAuthorities = new TreeSet<>(Comparator.comparing(GrantedAuthority::getAuthority));
        sortedAuthorities.addAll(authorities);
        return sortedAuthorities;
    }

    @Override
    public void eraseCredentials() {
        this.usrEmail = null;
    }

    @Override
    public String getPassword() {
        return this.usrPwd;
    }

    @Override
    public String getUsername() {
        return usrEmail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public String getUsrEmail() {
        return getUsrEmail();
    }

}
