package ssafy.backend.afterglow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.backend.afterglow.domain.DailyRecord;
import ssafy.backend.afterglow.domain.Record;
import ssafy.backend.afterglow.domain.RouteRecord;

import java.util.List;
import java.util.Optional;

public interface RouteRepository extends JpaRepository<RouteRecord, Long> {

    Optional<List<RouteRecord>> findByDr(DailyRecord dr);
}
