package ssafy.backend.afterglow.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;


import javax.persistence.*;
import java.util.*;
import java.util.stream.Collectors;

@Getter
@Entity(name = "User")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("usr_id")
    private Long usrId;

    @Column(unique = true, nullable = false)
    @JsonProperty("usr_email")
    private String usrEmail;

    @Column(unique = true)
    @JsonProperty("usr_nickname")
    private String username;

    @JsonProperty("usr_password")
    private String usrPwd;

    @JsonProperty("usr_profile_img")
    private String usrProfileImg;

    @JsonProperty("usr_gender")
    private String usrGender;

    @JsonProperty("usr_age_range")
    private String usrAgeRange;

    @Column(nullable = false)
    @JsonProperty("usr_traveling_state")
    private Boolean usrTravelingState = false;

    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @ElementCollection(fetch = FetchType.EAGER)
    @JsonProperty("usr_roles")
    private List<String> roles = new ArrayList<>();

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Builder
    public User(Long usrId, String usrEmail, String username, String usrPwd, List<String> roles, String usrGender, String usrAgeRange, String usrProfileImg) {
        this.usrId = usrId;
        this.usrEmail = usrEmail;
        this.username = username;
        this.usrPwd = usrPwd;
        this.roles = roles;
        this.usrGender = usrGender;
        this.usrAgeRange = usrAgeRange;
        this.usrProfileImg = usrProfileImg;
    }

    public User update(String username) {
        this.username = username;
        return this;
    }
}