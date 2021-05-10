package ssafy.backend.afterglow.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class PositionDTO {
    private Double latitude;
    private Double longitude;

    @Builder
    public PositionDTO(Double latitude, Double longitude){
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
