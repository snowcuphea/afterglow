package ssafy.backend.afterglow.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import ssafy.backend.afterglow.domain.RouteRecord;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Getter
@Setter
public class RouteDTO {
    private Long rrId;
    private Double rrLatitude;
    private Double rrLongitude;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd 'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime rrTime;
    private List<PinDTO> pins;
    private List<ImageDTO> images;

    @Builder
    public RouteDTO(Long rrId, Double rrLatitude, Double rrLongitude, LocalDateTime rrTime, List<PinDTO> pins, List<ImageDTO> images){
        super();
        this.rrId = rrId;
        this.rrLatitude = rrLatitude;
        this.rrLongitude = rrLongitude;
        this.rrTime = rrTime;
        this.pins = pins;
        this.images = images;
    }
}
