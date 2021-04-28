package ssafy.backend.afterglow.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name="RouteRecord")
@Getter
@Setter
@NoArgsConstructor
public class RouteRecord {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("rr_id")
    @Id
    private Integer rrId;

    @JsonProperty("dr")
    @ManyToOne
    @JoinColumn(name = "drId")
    private DailyRecord dr;

    @JsonProperty("rr_latitude")
    private Double rrLatitude;
    @JsonProperty("rr_longitude")
    private Double rrLongitude;
    @JsonProperty("rr_time")
    private LocalDateTime rrTime;

    @Builder
    public RouteRecord(DailyRecord dr, Double rrLatitude, Double rrLongitude, LocalDateTime rrTime){
        super();
        this.dr = dr;
        this.rrLatitude = rrLatitude;
        this.rrLongitude = rrLongitude;
        this.rrTime = rrTime;
    }
}
