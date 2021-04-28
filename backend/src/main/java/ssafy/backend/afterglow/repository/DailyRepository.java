package ssafy.backend.afterglow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.backend.afterglow.domain.DailyRecord;

public interface DailyRepository extends JpaRepository<DailyRecord, Integer> {
}
