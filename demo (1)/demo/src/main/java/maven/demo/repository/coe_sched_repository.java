package maven.demo.repository;

import maven.demo.model.coe_admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface coe_sched_repository extends JpaRepository<coe_admin, Long> {
}
