package maven.demo.controller;

import maven.demo.entity.sched_assess;
import maven.demo.repository.sched_repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedule")
@CrossOrigin(origins = "*")
public class sched_controller {

    private final sched_repository repo;

    public sched_controller(sched_repository repo) {
        this.repo = repo;
    }

    @GetMapping("/filter")
    public List<sched_assess> filterSchedule(
            @RequestParam String section,
            @RequestParam String academicYear,
            @RequestParam String semester
    ) {

        System.out.println("SECTION = [" + section + "]");
        System.out.println("YEAR = [" + academicYear + "]");
        System.out.println("SEM = [" + semester + "]");

        return repo.filterSchedule(
                section.trim(),
                academicYear.trim(),
                semester.trim()
        );
    }
}
