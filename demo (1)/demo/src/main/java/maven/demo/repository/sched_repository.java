package maven.demo.repository;

import maven.demo.entity.sched_assess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface sched_repository extends JpaRepository<sched_assess, Integer> {

    @Query("""
        SELECT s FROM sched_assess s
        WHERE s.section = :section
        AND s.academicYear = :academicYear
        AND LOWER(s.semester) LIKE LOWER(CONCAT('%', :semester, '%'))
    """)
    List<sched_assess> filterSchedule(
            @Param("section") String section,
            @Param("academicYear") String academicYear,
            @Param("semester") String semester
    );
}
