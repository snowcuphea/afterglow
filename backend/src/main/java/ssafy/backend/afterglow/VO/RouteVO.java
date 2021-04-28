package ssafy.backend.afterglow.VO;

import lombok.Getter;
import lombok.Setter;
import ssafy.backend.afterglow.domain.DailyRecord;

@Getter
@Setter
public class RouteVO {
    private DailyRecord dr;
    private double latitude;
    private double longitude;
}
