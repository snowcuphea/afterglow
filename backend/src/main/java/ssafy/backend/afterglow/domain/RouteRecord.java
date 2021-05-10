package ssafy.backend.afterglow.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd 'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime rrTime;

    @JsonProperty("rr_name")
    private String rrName;

    @JsonProperty("rr_memo")
    private String rrMemo;

    @ManyToOne @JoinColumn(name = "drId")
    @JsonIgnore
    //@JsonProperty("dr")
    private DailyRecord dr;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(mappedBy = "rr", cascade = CascadeType.ALL)
    private List<ImageRecord> imgRecs = new ArrayList<>();

    @Builder
    public RouteRecord(DailyRecord dr, Double rrLatitude, Double rrLongitude, LocalDateTime rrTime, String rrName, String rrMemo){
        super();
        this.dr = dr;
        this.rrLatitude = rrLatitude;
        this.rrLongitude = rrLongitude;
        this.rrTime = rrTime;
        this.rrName = rrName;
        this.rrMemo = rrMemo;
    }
}
