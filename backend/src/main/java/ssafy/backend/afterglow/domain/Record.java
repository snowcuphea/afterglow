package ssafy.backend.afterglow.domain;

import lombok.*;
import javax.persistence.*;

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
    @JoinColumn(name = "userId")
    private User user;
    private String recName;

}
