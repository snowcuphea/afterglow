package ssafy.backend.afterglow.domain;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name="PinRecord")
@Getter
@Setter
@NoArgsConstructor
public class PinRecord {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("pr_id")
    @Id
    private Integer pinId;

    @JsonProperty("rr")
    @ManyToOne
    @JoinColumn(name = "rrId")
    private RouteRecord rr;

    @JsonProperty("pr_name")
    private String prName;
    @JsonProperty("pr_memo")
    private String prMemo;
}
