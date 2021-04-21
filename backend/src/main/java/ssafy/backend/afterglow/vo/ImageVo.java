package ssafy.backend.afterglow.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageVo {
    private int imgKey;
    private byte[] imgData;
    private String imgName;
}
