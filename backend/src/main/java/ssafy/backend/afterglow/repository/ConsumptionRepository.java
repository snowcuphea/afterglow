package ssafy.backend.afterglow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.backend.afterglow.domain.ConsumptionRecord;
import ssafy.backend.afterglow.domain.Record;

import java.util.List;
import java.util.Optional;

public interface ConsumptionRepository extends JpaRepository<ConsumptionRecord, Long> {
    Optional<List<ConsumptionRecord>> findAllByDrId(Long drId);
}
