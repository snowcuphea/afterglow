package ssafy.backend.afterglow.domain;


import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PinRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pinId;

    @ManyToOne
    @JoinColumn(name = "routeRec")
    private RouteRecord route;

    private String name;
    private String memo;
}
