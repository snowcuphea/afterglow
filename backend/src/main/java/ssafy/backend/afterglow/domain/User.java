package ssafy.backend.afterglow.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.annotation.Id;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

// 유저
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    // 일련번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("usr_id")
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