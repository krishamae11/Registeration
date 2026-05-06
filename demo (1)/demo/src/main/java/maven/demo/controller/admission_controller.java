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
    public admin_assess validateStudent(@PathVariable Long id, @RequestBody admin_assess studentData) {
        // 1. Find the student
        admin_assess student = repo.findById(id).orElseThrow();

        // 2. Set validated to true
        student.setValidated(true);

        // 3. 🔥 FIX: Get the date from the Request Body and save it!
        // This 'studentData' comes from the JSON.stringify in your JS
        if (studentData.getDateEnrolled() != null) {
            student.setDateEnrolled(studentData.getDateEnrolled());
        }

        // 4. Save the updated student back to the database
        return repo.save(student);
    }
}
