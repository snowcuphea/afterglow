package ssafy.backend.afterglow.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
public class ConsumptionDTO {
    private Long crId;
    private String crName;
    private Integer crMoney;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd 'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime crDatetime;

    @Builder
    public ConsumptionDTO(Long crId, String crName, Integer crMoney, LocalDateTime crDatetime){
        super();
        this.crId = crId;
        this.crName = crName;
        this.crMoney = crMoney;
        this.crDatetime = crDatetime;
    }
}
