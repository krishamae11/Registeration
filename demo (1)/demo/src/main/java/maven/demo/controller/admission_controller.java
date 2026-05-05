package maven.demo.controller;

import maven.demo.repository.admissionrepository;
import maven.demo.model.admission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admission")
@CrossOrigin(origins = "*")
public class AdmissionController {

    @Autowired
    private admissionrepository repo;

    @GetMapping("/{id}")
    public admission getAdmission(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }
}
