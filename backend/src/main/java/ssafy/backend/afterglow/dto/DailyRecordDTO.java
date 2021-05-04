package ssafy.backend.afterglow.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import ssafy.backend.afterglow.domain.Record;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class DailyRecordDTO {
    private Long drId;
    private LocalDate drDay;
    private LocalDateTime drStartTime;
    private LocalDateTime drEndTime;

    @Builder
    public DailyRecordDTO(Long drId, LocalDate drDay, LocalDateTime drStartTime, LocalDateTime drEndTime){
        super();
        this.drId = drId;
        this.drDay = drDay;
        this.drStartTime = drStartTime;
        this.drEndTime = drEndTime;
    }
}
