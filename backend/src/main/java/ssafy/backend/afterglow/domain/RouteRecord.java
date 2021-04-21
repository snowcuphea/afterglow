package ssafy.backend.afterglow.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RouteRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer routeRecId;

    @ManyToOne
    @JoinColumn(name = "dayRec")
    private DailyRecord day;

    private Double latitude;
    private Double longitude;
    private LocalDateTime time;

}
