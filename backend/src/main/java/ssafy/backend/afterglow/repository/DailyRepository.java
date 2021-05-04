package ssafy.backend.afterglow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.backend.afterglow.domain.DailyRecord;
import ssafy.backend.afterglow.domain.Record;

import java.util.List;

public interface DailyRepository extends JpaRepository<DailyRecord, Long> {
    List<DailyRecord> findByRec(Record rec);
    // SELECT * FROM dailyrecord ORDER BY ROWID DESC LIMIT 1; -> 마지막 행 찾기
}
