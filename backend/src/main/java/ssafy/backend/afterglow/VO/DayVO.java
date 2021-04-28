package ssafy.backend.afterglow.VO;

import lombok.Getter;
import lombok.Setter;
import ssafy.backend.afterglow.domain.Record;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class DayVO {
    private Record rec;
    private LocalDateTime startTime;
}
