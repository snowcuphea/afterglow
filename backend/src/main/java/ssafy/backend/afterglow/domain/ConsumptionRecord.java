package ssafy.backend.afterglow.domain;

import lombok.*;
import org.apache.tomcat.jni.Local;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConsumptionRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer conRecId;

    @ManyToOne
    @JoinColumn(name = "dayRec")
    private DailyRecord day;

    private String name;
    private Integer money;
    private LocalDateTime dateTime;

}
