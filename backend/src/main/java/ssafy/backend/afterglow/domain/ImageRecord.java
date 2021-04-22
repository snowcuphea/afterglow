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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("pr_id")
    @Id
    private Integer imgId;

    @JsonProperty("rr")
    @ManyToOne
    @JoinColumn(name = "rrId")
    private RouteRecord rr;

    @JsonProperty("ir_image")
    @Lob
    private Blob irImage;

}
