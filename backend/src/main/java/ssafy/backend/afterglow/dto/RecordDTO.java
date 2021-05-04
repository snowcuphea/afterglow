package ssafy.backend.afterglow.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import ssafy.backend.afterglow.domain.DailyRecord;

import java.util.List;

@Data
public class RecordDTO {
    private Long recId;
    private String recName;
    private List<DailyRecordDTO> dayRecs;

    @Builder
    public RecordDTO(Long recId, String recName, List<DailyRecordDTO> dayRecs){
        super();
        this.recId = recId;
        this.recName = recName;
        this.dayRecs = dayRecs;
    }
}
