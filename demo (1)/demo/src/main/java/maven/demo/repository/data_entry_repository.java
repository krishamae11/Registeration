package maven.demo.repository;

import maven.demo.entity.data_entry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface data_entry_repository extends JpaRepository<data_entry, Long> {
    // This allows the controller to check enrollment status
    boolean existsByIdAndValidatedTrue(Long id);
}