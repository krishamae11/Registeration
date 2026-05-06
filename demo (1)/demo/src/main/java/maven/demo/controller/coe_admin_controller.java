package maven.demo.controller;

import maven.demo.repository.coe_admin_repository;
import maven.demo.entity.coe_admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
// This base path covers the general COE requests
@RequestMapping("/api/coestudentinfo")
@CrossOrigin(origins = "*")
public class coe_admin_controller {

    @Autowired
    private coe_admin_repository repo;

    // 1. Corrected method for your COE Page
    // This maps to: http://localhost:6969/api/coestudentinfo/15
    @GetMapping("/{id}")
    public coe_admin getStudentById(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }

    // 2. If your JS calls "/api/admission/15", use this Mapping:
    @GetMapping("/api/admission/{id}")
    public coe_admin getStudent(@PathVariable Long id) {
        // FIX: Use 'repo' (the variable), NOT 'coe_admin_repository' (the class)
        return repo.findById(id).orElse(null);
    }
}
