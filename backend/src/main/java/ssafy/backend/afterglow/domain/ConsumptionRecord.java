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
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("cr_id")
    private Long crId;
    @JsonProperty("cr_name")
    private String crName;
    @JsonProperty("cr_money")
    private Integer crMoney;
    @JsonProperty("cr_datetime")
    private LocalDateTime crDatetime;

    @ManyToOne
    @JoinColumn(name = "drId")
    @JsonProperty("dr")
    private DailyRecord dr;

    @Builder
    public ConsumptionRecord(DailyRecord dr, String crName, Integer crMoney, LocalDateTime crDatetime){
        super();
        this.dr = dr;
        this.crName = crName;
        this.crMoney = crMoney;
        this.crDatetime = crDatetime;
    }

}
