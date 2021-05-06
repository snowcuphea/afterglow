package ssafy.backend.afterglow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.backend.afterglow.domain.DailyRecord;
import ssafy.backend.afterglow.domain.Record;
import ssafy.backend.afterglow.domain.User;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DailyRepository extends JpaRepository<DailyRecord, Long> {
    // SELECT * FROM dailyrecord ORDER BY ROWID DESC LIMIT 1; -> 마지막 행 찾기
    List<DailyRecord> findByRec(Record rec);

    Optional<DailyRecord> findById(Integer drId);

    Optional<DailyRecord> findByDrDateAAndRec_User(LocalDate date, User user);
}
