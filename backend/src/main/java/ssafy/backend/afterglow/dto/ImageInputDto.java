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
    private Double Longitude;
    private Double Latitude;

    @Builder
    public ImageInputDto(Long imgId, MultipartFile irImage, Double Longitude, Double Latitude){
        super();
        this.imgId = imgId;
        this.irImage = irImage;
        this.Longitude = Longitude;
        this.Latitude = Latitude;
    }
}
