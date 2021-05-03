package ssafy.backend.afterglow.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import javax.persistence.*;

@Entity(name="Record")
@Getter
@Setter
@NoArgsConstructor
public class Record {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("usr_id")
    private Long recId;
    @JsonProperty("rec_name")
    private String recName;

    @ManyToOne
    @JoinColumn(name = "usrId")
    @JsonProperty("usr")
    private User user;

    @Builder
    public Record(User user, String recName){
        super();
        this.recName = recName;
        this.user = user;
    }
}
