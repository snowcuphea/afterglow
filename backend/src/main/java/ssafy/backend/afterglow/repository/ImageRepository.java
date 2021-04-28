package ssafy.backend.afterglow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.backend.afterglow.domain.ImageRecord;
import ssafy.backend.afterglow.domain.Record;

public interface ImageRepository extends JpaRepository<ImageRecord, Integer> {
}
