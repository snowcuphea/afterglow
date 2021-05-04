package ssafy.backend.afterglow.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("dr_id")
    private Long drId;

    @JsonProperty("dr_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate drDate;

    @JsonProperty("dr_start_time")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd 'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime drStartTime;

    @JsonProperty("dr_end_time")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd 'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime drEndTime;

    @ManyToOne
    @JoinColumn(name = "recId")
    @JsonProperty("rec")
    private Record rec;

    @Builder
    public DailyRecord(Record rec, LocalDateTime drStartTime){
        super();
        this.rec = rec;
        this.drStartTime = drStartTime;
    }
}
