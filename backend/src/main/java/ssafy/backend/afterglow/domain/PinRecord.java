package ssafy.backend.afterglow.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import javax.persistence.*;

@Entity(name="PinRecord")
@Getter
@Setter
@NoArgsConstructor
public class PinRecord {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("pr_id")
    private Long pinId;
    @JsonProperty("pr_name")
    private String prName;
    @JsonProperty("pr_memo")
    private String prMemo;

    @ManyToOne @JoinColumn(name = "rrId")
    @JsonIgnore
    //@JsonProperty("rr")
    private RouteRecord rr;

    @Builder
    public PinRecord(RouteRecord rr, String prName, String prMemo){
        super();
        this.rr = rr;
        this.prName = prName;
        this.prMemo = prMemo;
    }
}
