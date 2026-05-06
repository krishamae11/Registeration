package maven.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "admission")
public class admin_assess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String sex;
    private String department;
    private String program;
    private String section;

    private boolean validated;

    @Column(name = "year_level")
    private String yearLevel;

    @Column(name = "academic_year")
    private String academicyear;

    // Add this to your admin_assess.java entity
    @Column(name = "dateenrolled")
    private String dateEnrolled;

    // 2. The Getter (used by COE page)
    public String getDateEnrolled() {
        return dateEnrolled;
    }

    // 3. The Setter (used by Assessment page)
    public void setDateEnrolled(String dateEnrolled) {
        this.dateEnrolled = dateEnrolled;
    }
    private String sem;

    // GETTERS
    public Long getId() { return id; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getSex() { return sex; }
    public String getDepartment() { return department; }
    public String getProgram() { return program; }
    public String getSection() { return section; }
    public boolean isValidated() { return validated; }
    public String getYearLevel() { return yearLevel; }
    public String getAcademicyear() { return academicyear; }
    public String getSem() { return sem; }

    // SETTERS
    public void setId(Long id) { this.id = id; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setSex(String sex) { this.sex = sex; }
    public void setDepartment(String department) { this.department = department; }
    public void setProgram(String program) { this.program = program; }
    public void setSection(String section) { this.section = section; }
    public void setValidated(boolean validated) { this.validated = validated; }
    public void setYearLevel(String yearLevel) { this.yearLevel = yearLevel; }
    public void setAcademicyear(String academicyear) { this.academicyear = academicyear; }
    public void setSem(String sem) { this.sem = sem; }
}
