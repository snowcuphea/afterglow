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
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("rr_id")
    private Long rrId;
    @JsonProperty("rr_latitude")
    private Double rrLatitude;
    @JsonProperty("rr_longitude")
    private Double rrLongitude;
    @JsonProperty("rr_time")
    private LocalDateTime rrTime;

    @ManyToOne
    @JoinColumn(name = "drId")
    @JsonProperty("dr")
    private DailyRecord dr;

    @Builder
    public RouteRecord(DailyRecord dr, Double rrLatitude, Double rrLongitude, LocalDateTime rrTime){
        super();
        this.dr = dr;
        this.rrLatitude = rrLatitude;
        this.rrLongitude = rrLongitude;
        this.rrTime = rrTime;
    }
}
