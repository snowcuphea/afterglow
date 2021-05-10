package ssafy.backend.afterglow.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class RecordDTO {
    private Long recId;
    private String recName;
    private List<DailyRecordDTO> days;

    @Builder
    public RecordDTO(Long recId, String recName, List<DailyRecordDTO> days){
        super();
        this.recId = recId;
        this.recName = recName;
        this.days = days;
    }
}
