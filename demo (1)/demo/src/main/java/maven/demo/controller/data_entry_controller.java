package maven.demo.controller;

import maven.demo.repository.data_entry_repository;
import maven.demo.entity.data_entry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/studentinfo")
@CrossOrigin("*")
public class data_entry_controller{

    @Autowired
    private data_entry_repository repo;

    @PostMapping
    public data_entry save(@RequestBody data_entry data) {
        return repo.save(data);
    }

    @GetMapping
    public List<data_entry> getAll() {
        return repo.findAll();
    }
}