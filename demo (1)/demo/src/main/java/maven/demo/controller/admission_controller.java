package maven.demo.controller;

import maven.demo.repository.admission_repository;
import maven.demo.entity.admin_assess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admission")
@CrossOrigin(origins = "*")
public class admission_controller {

    @Autowired
    private admission_repository repo;

    @GetMapping("/{id}")
    public admin_assess getStudentById(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }

    @PutMapping("/{id}/validate")
    public admin_assess validateStudent(@PathVariable Long id,
                                        @RequestBody admin_assess studentData) {

        // 🚨 1. BLOCK duplicate enrollment
        if (repo.existsByIdAndValidatedTrue(id)) {
            throw new RuntimeException("Student already enrolled!");
        }

        // 2. Find student
        admin_assess student = repo.findById(id).orElseThrow();

        // 3. Set validated
        student.setValidated(true);

        // 4. Save date
        if (studentData.getDateEnrolled() != null) {
            student.setDateEnrolled(studentData.getDateEnrolled());
        }

        // 5. Save
        return repo.save(student);
    }
}


