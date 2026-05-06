package maven.demo.entity;

import jakarta.persistence.*;

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

    @Column(name = "program")
    private String course;

    private String section;

    @Column(name = "year_level")
    private String yearLevel;

    private boolean validated;

    // Matching the column name exactly as you specified: "dateenrolled"
    @Column(name = "dateenrolled")
    private String dateEnrolled;

    private String sem;

    @Column(name = "academic_year")
    private String academicyear;

    // --- GETTERS ---
    public Long getId() { return id; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getSex() { return sex; }
    public String getDepartment() { return department; }
    public String getCourse() { return course; }
    public String getSection() { return section; }
    public String getYearLevel() { return yearLevel; }
    public boolean isValidated() { return validated; }
    public String getDateEnrolled() { return dateEnrolled; }
    public String getSem() { return sem; }
    public String getAcademicyear() { return academicyear; }

    // --- SETTERS ---
    public void setId(Long id) { this.id = id; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setSex(String sex) { this.sex = sex; }
    public void setDepartment(String department) { this.department = department; }
    public void setCourse(String course) { this.course = course; }
    public void setSection(String section) { this.section = section; }
    public void setYearLevel(String yearLevel) { this.yearLevel = yearLevel; }
    public void setValidated(boolean validated) { this.validated = validated; }
    public void setDateEnrolled(String dateEnrolled) { this.dateEnrolled = dateEnrolled; }
    public void setSem(String sem) { this.sem = sem; }
    public void setAcademicyear(String academicyear) { this.academicyear = academicyear; }
}
