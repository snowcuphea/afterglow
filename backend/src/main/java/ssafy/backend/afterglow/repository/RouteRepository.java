package ssafy.backend.afterglow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.backend.afterglow.domain.DailyRecord;
import ssafy.backend.afterglow.domain.Record;
import ssafy.backend.afterglow.domain.RouteRecord;

import java.util.List;

public interface RouteRepository extends JpaRepository<RouteRecord, Long> {
    List<RouteRecord> findByDr(DailyRecord dr);
}
