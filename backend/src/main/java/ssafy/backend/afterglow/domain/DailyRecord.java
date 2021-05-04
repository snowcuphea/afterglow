package ssafy.backend.afterglow.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity(name="daily_record")
@Getter @Setter
@NoArgsConstructor
@ToString(exclude = {"rec"})
public class DailyRecord {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("dr_id")
    private Long drId;
    @JsonProperty("dr_day")
    private LocalDate drDay;
    @JsonProperty("dr_start_time")
    private LocalDateTime drStartTime;
    @JsonProperty("dr_end_time")
    private LocalDateTime drEndTime;

    @ManyToOne @JoinColumn(name = "rec_id")
    @JsonProperty("rec")
    private Record rec;

    @Builder
    public DailyRecord(Record rec, LocalDateTime drStartTime){
        super();
        this.rec = rec;
        this.drStartTime = drStartTime;
    }
}
