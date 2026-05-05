package maven.demo.model;//coe_admin

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "admission")
public class coe_admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String sex;
    private String department;

    @Column(name = "course")
    private String program;

    private String section;

    @Column(name = "year_level")
    private String yearLevel;

    private boolean validated;

    // GETTERS
    public Long getId() { return id; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getSex() { return sex; }
    public String getDepartment() { return department; }
    public String getProgram() { return program; }
    public String getSection() { return section; }
    public String getYearLevel() { return yearLevel; }
    public boolean isValidated() { return validated; }

    // SETTERS
    public void setId(Long id) { this.id = id; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setSex(String sex) { this.sex = sex; }
    public void setDepartment(String department) { this.department = department; }
    public void setProgram(String program) { this.program = program; }
    public void setSection(String section) { this.section = section; }
    public void setYearLevel(String yearLevel) { this.yearLevel = yearLevel; }
    public void setValidated(boolean validated) { this.validated = validated; }
}
}
