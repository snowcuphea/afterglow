package ssafy.backend.afterglow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.backend.afterglow.domain.PinRecord;
import ssafy.backend.afterglow.domain.Record;

public interface PinRepository extends JpaRepository<PinRecord, Long> {
}
