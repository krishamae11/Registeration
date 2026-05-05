/*@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TestController {

    @GetMapping("/schedules")
    public List<Map<String, String>> getSchedules() {

        List<Map<String, String>> list = new ArrayList<>();

        // SAMPLE (later this comes from DB)
        Map<String, String> s1 = new HashMap<>();
        s1.put("subject", "CC5");
        s1.put("schedule", "3-5 pm T ITRM3");

        list.add(s1);

        return list;
    }
};*/
package maven.demo.controller;

import maven.demo.repository.coe_repository;
import maven.demo.model.coe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/coe")
@CrossOrigin(origins = "*")
public class coe_controller {

    @Autowired
    private coe_repository repo;

    @GetMapping // your custom endpoint
    public List<coe> getAllSchedules() {
        return repo.findAll();
    }
}
