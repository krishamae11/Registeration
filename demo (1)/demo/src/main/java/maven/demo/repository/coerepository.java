package maven.demo.repository;

import maven.demo.model.coe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface coerepository extends JpaRepository<coe, Long> {
}