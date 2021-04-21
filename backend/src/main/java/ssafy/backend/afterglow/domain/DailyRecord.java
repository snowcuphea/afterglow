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
public class DailyRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer dayRecId;

    @ManyToOne
    @JoinColumn(name = "record")
    private Record rec;

    private String recName;
    private LocalDate recDay;
    private LocalDateTime recStartTime;
    private LocalDateTime recEndTime;

}
