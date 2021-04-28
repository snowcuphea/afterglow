package ssafy.backend.afterglow.domain;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import javax.persistence.*;

@Entity(name="PinRecord")
@Getter
@Setter
@NoArgsConstructor
public class PinRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("pr_id")
    private Integer pinId;

    @JsonProperty("rr")
    @ManyToOne
    @JoinColumn(name = "rrId")
    private RouteRecord rr;

    @JsonProperty("pr_name")
    private String prName;
    @JsonProperty("pr_memo")
    private String prMemo;

    @Builder
    public PinRecord(RouteRecord rr, String prName, String prMemo){
        super();
        this.rr = rr;
        this.prName = prName;
        this.prMemo = prMemo;
    }
}
