package ssafy.backend.afterglow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ssafy.backend.afterglow.domain.PersistentLogins;

import java.util.Date;
import java.util.Optional;

@Repository
public interface RememberMeRepository extends JpaRepository<PersistentLogins, Long> {
    Optional<PersistentLogins> findBySeries(String series);
    void deleteByUsername(String username);
}
