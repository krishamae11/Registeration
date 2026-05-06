package maven.demo.repository;

import maven.demo.entity.admin_assess;
import org.springframework.data.jpa.repository.JpaRepository;

public interface admission_repository extends JpaRepository<admin_assess, Long> {
    boolean existsByIdAndValidatedTrue(Long id);
}
