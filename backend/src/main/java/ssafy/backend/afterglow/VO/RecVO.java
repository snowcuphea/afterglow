package ssafy.backend.afterglow.VO;

import lombok.Getter;
import lombok.Setter;
import ssafy.backend.afterglow.domain.User;

import java.time.LocalDateTime;

@Getter
@Setter
public class RecVO {
    private User user;
    private String recName;
}
