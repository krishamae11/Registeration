package maven.demo.repository;

import maven.demo.entity.coe_sched;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface coe_sched_repository extends JpaRepository<coe_sched, Integer> {

    @Query("""
        SELECT s FROM coe_sched s
        WHERE s.section = :section
        AND s.academicYear = :academicYear
        AND LOWER(s.semester) LIKE LOWER(CONCAT('%', :semester, '%'))
    """)
    List<coe_sched> filterSchedule(
            @Param("section") String section,
            @Param("academicYear") String academicYear,
            @Param("semester") String semester
    );
}
