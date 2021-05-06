package ssafy.backend.afterglow.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity(name="daily_record")
@Getter @Setter
@NoArgsConstructor
@ToString(exclude = {"rec"})
public class DailyRecord {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("dr_id")
    private Long drId;
    @JsonProperty("dr_day")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate drDay;
    @JsonProperty("dr_start_time")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd 'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime drStartTime;
    @JsonProperty("dr_end_time")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd 'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime drEndTime;

    @ManyToOne @JoinColumn(name = "rec_id")
    @JsonIgnore
    //@JsonProperty("rec")
    private Record rec;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(mappedBy = "dr", cascade = CascadeType.ALL)
    private List<RouteRecord> routeRecs = new ArrayList<>();

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(mappedBy = "dr", cascade = CascadeType.ALL)
    private List<ConsumptionRecord> conRecs = new ArrayList<>();

    @Builder
    public DailyRecord(Record rec, LocalDate drDay, LocalDateTime drStartTime, LocalDateTime drEndTime){
        super();
        this.rec = rec;
        this.drDay = drDay;
        this.drStartTime = drStartTime;
        this.drEndTime = drEndTime;
    }
}
