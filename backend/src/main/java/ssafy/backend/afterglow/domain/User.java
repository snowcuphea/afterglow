package ssafy.backend.afterglow.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Map;

// 유저
@Entity(name="User")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    // 일련번호
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("usr_id")
    @Id
    private Integer usrId;

    // 이메일
    @JsonProperty("usr_email")
    private String usrEmail;

    // 비밀번호
    @JsonProperty("usr_pwd")
    private String usrPwd;

    // 닉네임
    @JsonProperty("usr_nickname")
    private String usrNickname;

    // 여행 중 여부
    @JsonProperty("usr_traveling_state")
    private Integer usrTravelingState;
}

