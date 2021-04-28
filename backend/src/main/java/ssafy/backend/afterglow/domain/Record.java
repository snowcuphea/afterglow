package ssafy.backend.afterglow.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import javax.persistence.*;

@Entity(name="Record")
@Getter
@Setter
@NoArgsConstructor
public class Record {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("usr_id")
    @Id
    private Integer recId;

    @JsonProperty("usr")
    @ManyToOne
    @JoinColumn(name = "usrId")
    private User user;
    @JsonProperty("rec_name")
    private String recName;

    @Builder
    public Record(User user, String recName){
        super();
        this.user = user;
        this.recName = recName;
    }
}
