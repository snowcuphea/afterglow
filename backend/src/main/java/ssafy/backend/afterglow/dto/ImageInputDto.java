package ssafy.backend.afterglow.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;

@Data
@Getter
@Setter
@Builder
public class ImageInputDto {
    private Long imgId;
    private MultipartFile irImage;
    private Integer height;
    private Integer width;
    private Long RrId;
}
