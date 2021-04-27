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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("usr_id")
    private Long usrId;

    @Column(length = 50, unique = true, nullable = false)
    @JsonProperty("usr_email")
    private String usrEmail;

    @Column(nullable = false, unique = true)
    @JsonProperty("usr_nickname")
    private String usrNickname;

    @Column(nullable = true, length = 200)
    @JsonProperty("usr_password")
    private String usrPwd;

    @JsonProperty("usr_profile_img")
    @Column(nullable = true)
    private String usrProfileImg;

    @Column(nullable = true)
    @JsonProperty("usr_gender")
    private String usrGender;

    @Column(nullable = true)
    @JsonProperty("usr_age_range")
    private String usrAgeRange;

    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    @JsonProperty("usr_roles")
    private List<String> roles = new ArrayList<>();

    @JsonProperty("usr_traveling_state")
    @Column(nullable = false)
    private Integer usrTravelingState=0;

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

