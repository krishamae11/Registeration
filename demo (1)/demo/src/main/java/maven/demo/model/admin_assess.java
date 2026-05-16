package maven.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "studentinfo")
public class admin_assess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "middle_name")
    private String middleName;

    private String sex;


    private String department;
    private String program;
    private String section;

    private boolean validated;

    @Column(name = "year_level")
    private String yearLevel;

    @Column(name = "academic_year")
    private String academicyear;

    @Column(name = "dateenrolled")
    private String dateEnrolled;

    public String getDateEnrolled() {
        return dateEnrolled;
    }

    public void setDateEnrolled(String dateEnrolled) {
        this.dateEnrolled = dateEnrolled;
    }

    private String semester;

    // GETTERS
    public Long getId() { return id; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getSex() { return sex; }// NEW
    public String getDepartment() { return department; }
    public String getProgram() { return program; }
    public String getSection() { return section; }
    public boolean isValidated() { return validated; }
    public String getYearLevel() { return yearLevel; }
    public String getAcademicyear() { return academicyear; }
    public String getSem() { return semester; }

    public String getMiddleName() {
        return middleName;
    }

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
    public void setSem(String sem) { this.semester = sem; }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }
}
