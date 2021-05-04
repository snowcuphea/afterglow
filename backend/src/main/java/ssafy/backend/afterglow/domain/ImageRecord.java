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
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("pr_id")
    private Long imgId;
    @Lob @JsonProperty("ir_image")
    private Blob irImage;

    @ManyToOne
    @JoinColumn(name = "rrId")
    @JsonProperty("rr")
    private RouteRecord rr;

    @Builder
    public ImageRecord(RouteRecord rr, Blob irImage){
        super();
        this.rr = rr;
        this.irImage = irImage;
    }
}
