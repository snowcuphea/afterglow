package ssafy.backend.afterglow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.backend.afterglow.domain.ImageRecord;
import ssafy.backend.afterglow.domain.Record;
import ssafy.backend.afterglow.domain.RouteRecord;

import java.util.List;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<ImageRecord, Long> {
    Optional<List<ImageRecord>> findAllByRr(RouteRecord rr);
}
