package ssafy.backend.afterglow.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;


import javax.persistence.*;
import java.util.*;
import java.util.stream.Collectors;

@Getter
@Entity(name = "user")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class IntegrationEntity extends BaseTimeEntity {

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

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Builder
    public IntegrationEntity(Long usrId, String usrEmail, String usrNickname, String usrPwd, List<String> roles, String usrGender, String usrAgeRange) {
        this.usrId = usrId;
        this.usrEmail = usrEmail;
        this.usrNickname = usrNickname;
        this.usrPwd = usrPwd;
        this.roles = roles;
        this.usrGender = usrGender;
        this.usrAgeRange = usrAgeRange;
    }

    public IntegrationEntity update(String usrNickname, String usrEmail) {
        this.usrNickname = usrNickname;
        this.usrEmail = usrEmail;
        return this;
    }
}