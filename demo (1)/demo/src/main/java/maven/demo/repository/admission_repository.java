package maven.demo.repository;

import maven.demo.model.admission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface admissionrepository extends JpaRepository<admission, Long> {
}
