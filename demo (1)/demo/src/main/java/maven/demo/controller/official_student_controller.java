package maven.demo.controller;

import maven.demo.entity.data_entry; // Changed from admin_assess
import maven.demo.entity.official_student;
import maven.demo.repository.data_entry_repository; // Changed from admission_repository
import maven.demo.repository.official_student_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/official-student")
@CrossOrigin(origins = "*")
public class official_student_controller {

    @Autowired
    private data_entry_repository studentInfoRepo; // Using studentinfo repository

    @Autowired
    private official_student_repository officialRepo;

    // =========================
    // GET STUDENT BY ID
    // =========================
    @GetMapping("/{id}")
    public data_entry getStudentById(@PathVariable Long id) {
        return studentInfoRepo.findById(id).orElse(null);
    }

    // =========================
    // VALIDATE + MOVE TO OFFICIAL TABLE
    // =========================
    @PutMapping("/{id}/validate")
    public data_entry validateStudent(
            @PathVariable Long id,
            @RequestBody(required = false) data_entry studentData
    ) {

        // 1. FIND STUDENT IN STUDENTINFO TABLE
        data_entry student = studentInfoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));

        // 2. SET VALIDATED = TRUE
        student.setValidated(true);

        if (studentData != null && studentData.getDateEnrolled() != null) {
            student.setDateEnrolled(studentData.getDateEnrolled());
        }

        // 3. SAVE UPDATED STUDENTINFO RECORD
        studentInfoRepo.save(student);

        // 4. COPY TO OFFICIAL STUDENT TABLE
        official_student official = new official_student();

        // Mapping fields from data_entry to official_student
        official.setFirstName(student.getFirstName());
        official.setLastName(student.getLastName());

        // Note: Map the fields based on your specific Entity getters
        official.setCourse(student.getProgram());
        official.setDepartment(student.getDepartment());
        official.setYearLevel(student.getYearLevel());
        official.setSem(student.getSemester()); // data_entry uses getSemester()
        official.setAcademicyear(student.getAcademicYear()); // data_entry uses getAcademicYear()
        official.setDateenrolled(student.getDateEnrolled());
        official.setSection(student.getSection());

        officialRepo.save(official);

        // 5. RETURN UPDATED STUDENT
        return student;
    }
}
