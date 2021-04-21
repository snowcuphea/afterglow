package ssafy.backend.afterglow.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("usr_id")
    private Integer usrId;

    @JsonProperty("usr_email")
    private String usrEmail;
    @JsonProperty("usr_pwd")
    private String usrPwd;
    @JsonProperty("usr_nickname")
    private String usrNickname;
    @JsonProperty("usr_traveling_state")
    private Integer usrTravelingState;
}