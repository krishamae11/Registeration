package maven.demo.repository;

import maven.demo.model.admin_assess;
import org.springframework.data.jpa.repository.JpaRepository;

public interface admission_repository extends JpaRepository<admin_assess, Long> {
}
