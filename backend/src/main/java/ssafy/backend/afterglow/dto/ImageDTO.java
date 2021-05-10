package ssafy.backend.afterglow.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import ssafy.backend.afterglow.domain.ImageRecord;

@Data
@Getter
@Setter
public class ImageDTO {
    private Long imgId;
    private byte[] irImage;

    @Builder
    public ImageDTO(Long imgId, byte[] irImage){
        super();
        this.imgId = imgId;
        this.irImage = irImage;
    }
}
