package maven.demo.controller;

import maven.demo.repository.coe_repository;
import maven.demo.model.coe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/coeupper")
@CrossOrigin(origins = "*")
public class coe_controller_upper {

    @Autowired
    private coe_repository repo;

    @GetMapping // your custom endpoint
    public List<coe> getAllSchedules() {
        return repo.findAll();
    }
}
