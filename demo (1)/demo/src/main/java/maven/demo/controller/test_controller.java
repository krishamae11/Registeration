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

import maven.demo.model.User;
import maven.demo.repository.userrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/schedule")
@CrossOrigin(origins = "*")
public class TestController {

    @Autowired
    private userrepository repo;

    @GetMapping // your custom endpoint
    public List<User> getAllSchedules() {
        return repo.findAll();
    }
}
