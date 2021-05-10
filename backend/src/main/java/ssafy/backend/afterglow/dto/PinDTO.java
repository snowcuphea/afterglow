package ssafy.backend.afterglow.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import ssafy.backend.afterglow.domain.PinRecord;

@Data
@Getter
@Setter
public class PinDTO {
    private Long pinId;
    private String prName;
    private String prMemo;

    @Builder
    public PinDTO(Long pinId, String prName, String prMemo){
        super();
        this.pinId = pinId;
        this.prName = prName;
        this.prMemo = prMemo;
    }
}
