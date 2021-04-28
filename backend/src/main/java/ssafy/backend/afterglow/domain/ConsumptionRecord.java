package ssafy.backend.afterglow.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.apache.tomcat.jni.Local;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity(name="ConsumptionRecord")
@Getter
@Setter
@NoArgsConstructor
public class ConsumptionRecord {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("cr_id")
    @Id
    private Integer crId;

    @JsonProperty("dr")
    @ManyToOne
    @JoinColumn(name = "drId")
    private DailyRecord dr;

    @JsonProperty("cr_name")
    private String crName;
    @JsonProperty("cr_money")
    private Integer crMoney;
    @JsonProperty("cr_datetime")
    private LocalDateTime crDatetime;

    @Builder
    public ConsumptionRecord(DailyRecord dr, String crName, Integer crMoney, LocalDateTime crDatetime){
        super();
        this.dr = dr;
        this.crName = crName;
        this.crMoney = crMoney;
        this.crDatetime = crDatetime;
    }

}
