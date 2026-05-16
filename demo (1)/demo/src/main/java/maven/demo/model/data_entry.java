package maven.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "studentinfo")
public class data_entry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String section;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name")
    private String lastName;

    private String program;

    @Column(name = "year_level")
    private String yearLevel;

    private String department;

    private String semester;

    @Column(name = "academic_year")
    private String academicYear;

    private boolean validated;

    @Column(name = "dateenrolled")
    private String dateEnrolled;

    // GETTERS AND SETTERS

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getMiddleName() { return middleName; }
    public void setMiddleName(String middleName) { this.middleName = middleName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getProgram() { return program; }
    public void setProgram(String program) { this.program = program; }

    public String getYearLevel() { return yearLevel; }
    public void setYearLevel(String yearLevel) { this.yearLevel = yearLevel; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }

    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }

    public boolean isValidated() { return validated; }
    public void setValidated(boolean validated) { this.validated = validated; }

    public String getDateEnrolled() { return dateEnrolled; }
    public void setDateEnrolled(String dateEnrolled) { this.dateEnrolled = dateEnrolled; }
}