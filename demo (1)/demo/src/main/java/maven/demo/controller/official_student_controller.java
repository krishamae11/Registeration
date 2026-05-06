package maven.demo.controller;

import maven.demo.entity.admin_assess;
import maven.demo.entity.official_student;
import maven.demo.repository.admission_repository;
import maven.demo.repository.official_student_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/official-student")
@CrossOrigin(origins = "*")
public class official_student_controller {

    @Autowired
    private admission_repository admissionRepo;

    @Autowired
    private official_student_repository officialRepo;

    // =========================
    // GET STUDENT BY ID
    // =========================
    @GetMapping("/{id}")
    public admin_assess getStudentById(@PathVariable Long id) {
        return admissionRepo.findById(id).orElse(null);
    }

    // =========================
    // VALIDATE + MOVE TO OFFICIAL TABLE
    // =========================
    @PutMapping("/{id}/validate")
    public admin_assess validateStudent(
            @PathVariable Long id,
            @RequestBody(required = false) admin_assess studentData
    ) {

        // 1. FIND STUDENT IN ADMISSION TABLE
        admin_assess student = admissionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));

        // 2. SET VALIDATED = TRUE
        student.setValidated(true);

        if (studentData != null && studentData.getDateEnrolled() != null) {
            student.setDateEnrolled(studentData.getDateEnrolled());
        }

        // 3. SAVE UPDATED ADMISSION RECORD
        admissionRepo.save(student);

        // 4. COPY TO OFFICIAL STUDENT TABLE
        official_student official = new official_student();

        official.setFirstName(student.getFirstName());
        official.setLastName(student.getLastName());
        official.setSex(student.getSex());

        official.setCourse(student.getProgram());
        official.setDepartment(student.getDepartment());
        official.setYearLevel(student.getYearLevel());
        official.setSem(student.getSem());
        official.setAcademicyear(student.getAcademicyear());
        official.setDateenrolled(student.getDateEnrolled());

        officialRepo.save(official);

        // 5. RETURN UPDATED STUDENT
        return student;
    }
}