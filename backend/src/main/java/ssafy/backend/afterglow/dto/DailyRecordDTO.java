package ssafy.backend.afterglow.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Getter
@Setter
public class DailyRecordDTO {
    private Long drId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate drDay;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd 'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime drStartTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd 'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime drEndTime;
    private List<RouteDTO> routes;
    private List<ConsumptionDTO> cons;

    @Builder
    public DailyRecordDTO(Long drId, LocalDate drDay, LocalDateTime drStartTime, LocalDateTime drEndTime, List<RouteDTO> routes, List<ConsumptionDTO> cons){
        super();
        this.drId = drId;
        this.drDay = drDay;
        this.drStartTime = drStartTime;
        this.drEndTime = drEndTime;
        this.routes = routes;
        this.cons = cons;
    }
}
