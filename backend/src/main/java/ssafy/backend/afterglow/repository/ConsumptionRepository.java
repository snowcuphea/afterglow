package ssafy.backend.afterglow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.backend.afterglow.domain.ConsumptionRecord;
import ssafy.backend.afterglow.domain.Record;

public interface ConsumptionRepository extends JpaRepository<ConsumptionRecord, Integer> {
}
