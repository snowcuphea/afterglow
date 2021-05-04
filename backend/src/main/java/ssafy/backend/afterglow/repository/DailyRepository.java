package ssafy.backend.afterglow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.backend.afterglow.domain.DailyRecord;

public interface DailyRepository extends JpaRepository<DailyRecord, Long> {
    // SELECT * FROM dailyrecord ORDER BY ROWID DESC LIMIT 1; -> 마지막 행 찾기
}
