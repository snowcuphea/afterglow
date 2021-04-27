package ssafy.backend.afterglow.repository;

import com.sun.el.stream.Stream;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ssafy.backend.afterglow.domain.IntegrationEntity;

import java.util.Optional;

@Repository
public interface IntegrationRepository extends JpaRepository<IntegrationEntity, Long> {
    Optional<IntegrationEntity> findByUsrEmail(String email);
}
