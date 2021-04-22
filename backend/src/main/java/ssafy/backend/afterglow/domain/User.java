package ssafy.backend.afterglow.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity(name="User")
@Getter
@Setter
@NoArgsConstructor
public class User {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("usr_id")
    @Id
    private Integer usrId;

    @JsonProperty("usr_email")
    private String usrEmail;
    @JsonProperty("usr_pwd")
    private String usrPwd;
    @JsonProperty("usr_nickname")
    private String usrNickname;
    @JsonProperty("usr_traveling_state")
    private Integer usrTravelingState;

//    @Builder
//    public User(String usrEmail, String usrPwd, String usrNickname, Integer usrTravelingState){
//        super();
//        this.usrEmail = usrEmail;
//        this.usrPwd = usrPwd;
//        this.usrNickname = usrNickname;
//        this.usrTravelingState = usrTravelingState;
//    }
}