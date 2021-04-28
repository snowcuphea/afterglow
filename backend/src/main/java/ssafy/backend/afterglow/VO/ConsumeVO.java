package ssafy.backend.afterglow.VO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ConsumeVO {
    private String name;
    private Integer money;
    private LocalDateTime dateTime;
}
