package ssafy.backend.afterglow.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity(name="ImageRecord")
@Getter
@Setter
@NoArgsConstructor
public class ImageRecord {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("pr_id")
    private Long imgId;
    @Lob @JsonProperty("ir_image")
    private byte[] irImage;

    @ManyToOne @JoinColumn(name = "rrId")
    @JsonIgnore
    //@JsonProperty("rr")
    private RouteRecord rr;

    @Builder
    public ImageRecord(RouteRecord rr, byte[] irImage){
        super();
        this.rr = rr;
        this.irImage = irImage;
    }
}
