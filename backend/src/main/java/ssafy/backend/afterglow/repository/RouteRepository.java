package ssafy.backend.afterglow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.backend.afterglow.domain.Record;
import ssafy.backend.afterglow.domain.RouteRecord;

public interface RouteRepository extends JpaRepository<RouteRecord, Integer> {
}
