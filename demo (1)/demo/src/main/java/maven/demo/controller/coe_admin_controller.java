package maven.demo.controller;

import maven.demo.repository.coe__admin_repository;
import maven.demo.model.coe_admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/studentinfo")
@CrossOrigin(origins = "*")
public class coe_admin_controller {

    @Autowired
    private coe_admin_repository repo;

    @GetMapping // your custom endpoint
    public List<coe_admin> getAllSchedules() {
        return repo.findAll();
    }
}
