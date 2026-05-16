package maven.demo.controller;

import maven.demo.entity.coe_sched;
import maven.demo.repository.coe_sched_repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coestudsched")
@CrossOrigin(origins = "*")
public class coe_sched_controller {

    private final coe_sched_repository repo;

    public coe_sched_controller(coe_sched_repository repo) {
        this.repo = repo;
    }

    @GetMapping("/filter")
    public List<coe_sched> filterSchedule(
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
