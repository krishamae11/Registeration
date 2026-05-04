package maven.demo.repository;

import maven.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface userrepository extends JpaRepository<User, Long> {
}