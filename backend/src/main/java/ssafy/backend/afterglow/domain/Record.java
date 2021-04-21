package ssafy.backend.afterglow.domain;

import lombok.*;
import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer recId;

    @ManyToOne
    @JoinColumn(name = "user")
    private User usrId;

    private String recName;

    @Builder
    public Record(String recName) {
        this.recName = recName;
    }

}
