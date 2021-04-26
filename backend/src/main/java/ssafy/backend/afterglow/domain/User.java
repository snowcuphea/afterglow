package ssafy.backend.afterglow.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.annotations.Cascade;
import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

// 유저
@Entity(name = "User")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails, CredentialsContainer {

    // 일련번호
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("usr_id")
    @Id
    private Long usrId;

    // 이메일
    @JsonProperty("usr_email")
    private String usrEmail;

    // 비밀번호
    @JsonProperty("usr_pwd")
    private String usrPwd;

    // 프로필 이미지
    @JsonProperty("usr_profile_img")
    private String usrProfileImg;

    // 성별
    @JsonProperty("usr_gender")
    private String usrGender;

    // 연령대
    @JsonProperty("usr_age_range")
    private String usrAgeRange;

    // 닉네임
    @JsonProperty("usr_nickname")
    private String usrNickname;

    // 여행 중 여부
    @JsonProperty("usr_traveling_state")
    private Integer usrTravelingState;

    // Roles
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    @JsonProperty("usr_roles")
    private List<String> roles;


	public User(String username, String password,
			Collection<? extends GrantedAuthority> authorities) {
		this(username, password, authorities);
	}

    public User(String username, String password, boolean b, boolean b1, boolean b2, boolean b3, Collection<? extends GrantedAuthority> authorities) {
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    @Override
    public void eraseCredentials() {

    }
}

