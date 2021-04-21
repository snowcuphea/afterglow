package ssafy.backend.afterglow.domain;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;
import ssafy.backend.afterglow.vo.ImageVo;

import javax.persistence.*;
import java.awt.image.BufferedImage;
import java.io.File;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer imgId;

    @ManyToOne
    @JoinColumn(name = "routerecord")
    private RouteRecord routeId;

    //private ImageVo imgFile;
}
