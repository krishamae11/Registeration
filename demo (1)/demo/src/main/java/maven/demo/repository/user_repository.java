package maven.demo.repository;

import maven.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface user_repository extends JpaRepository<User, Long> {
}
