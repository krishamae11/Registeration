package maven.demo.repository;

import maven.demo.model.admission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface admission_repository extends JpaRepository<admission, Long> {
}
