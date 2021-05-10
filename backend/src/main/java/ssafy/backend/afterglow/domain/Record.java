package ssafy.backend.afterglow.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name="record")
@Getter @Setter
@NoArgsConstructor
@ToString(exclude = {"user", "dayRecs"})
public class Record {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("rec_id")
    private Long recId;
    @JsonProperty("rec_name")
    private String recName;

    @ManyToOne @JoinColumn(name = "usr_id")
    @JsonIgnore
//    @JsonProperty("usr")
    private User user;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(mappedBy = "rec", cascade = CascadeType.ALL)
    private List<DailyRecord> dayRecs = new ArrayList<>();

    @Builder
    public Record(User user, String recName){
        super();
        this.recName = recName;
        this.user = user;
    }
}
