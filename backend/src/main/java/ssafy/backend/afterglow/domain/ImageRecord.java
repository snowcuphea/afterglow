package ssafy.backend.afterglow.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.sql.Blob;

@Entity(name="ImageRecord")
@Getter
@Setter
@NoArgsConstructor
public class ImageRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("pr_id")
    private Integer imgId;

    @JsonProperty("rr")
    @ManyToOne
    @JoinColumn(name = "rrId")
    private RouteRecord rr;

    @JsonProperty("ir_image")
    @Lob
    private byte[] irImage;

    @Builder
    public ImageRecord(RouteRecord rr, byte[] irImage){
        super();
        this.rr = rr;
        this.irImage = irImage;
    }
}
