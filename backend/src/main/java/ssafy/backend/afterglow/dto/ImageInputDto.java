package ssafy.backend.afterglow.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Data
@Getter
@Setter
public class ImageInputDto {
    private Long imgId;
    private MultipartFile irImage;
    private Double longitude;
    private Double latitude;
    private Integer height;
    private Integer width;

    @Builder
    public ImageInputDto(Long imgId, MultipartFile irImage, Double longitude, Double latitude, Integer height, Integer width){
        super();
        this.imgId = imgId;
        this.irImage = irImage;
        this.longitude = longitude;
        this.latitude = latitude;
        this.height = height;
        this.width = width;
    }
}
