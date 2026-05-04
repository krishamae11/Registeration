package maven.demo.controller;

import maven.demo.repository.coerepository;
import maven.demo.model.coe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/coeupper")
@CrossOrigin(origins = "*")
public class coecontrollerupper {

    @Autowired
    private coerepository repo;

    @GetMapping // your custom endpoint
    public List<coe> getAllSchedules() {
        return repo.findAll();
    }
}