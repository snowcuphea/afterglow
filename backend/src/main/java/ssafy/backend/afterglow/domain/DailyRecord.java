package ssafy.backend.afterglow.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity(name="DailyRecord")
@Getter
@Setter
@NoArgsConstructor
public class DailyRecord {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("dr_id")
    @Id
    private Integer drId;

    @JsonProperty("tr")
    @ManyToOne
    @JoinColumn(name = "recId")
    private Record rec;

    @JsonProperty("dr_seq")
    private Integer drSeq;
    @JsonProperty("dr_day")
    private LocalDate drDay;
    @JsonProperty("dr_start_time")
    private LocalDateTime drStartTime;
    @JsonProperty("dr_end_time")
    private LocalDateTime drEndTime;

}
