package maven.demo.repository;

import maven.demo.model.sched_assess;
import org.springframework.data.jpa.repository.JpaRepository;

public interface sched_repository extends JpaRepository<sched_assess, Long> {
}
