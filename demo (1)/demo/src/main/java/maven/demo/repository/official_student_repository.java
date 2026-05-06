package maven.demo.repository;

import maven.demo.entity.official_student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface official_student_repository extends JpaRepository<official_student, Long> {
}