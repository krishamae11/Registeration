package maven.demo.model;//sched_assess

/*import jakarta.persistence.*;

@Entity
@Table(name = "admission")
public class sched_assess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "program")
    private String program;

    @Column(name = "year_level")
    private String yearLevel;

    // GETTERS
    public Long getStudentId() { return studentId; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getProgram() { return program; }
    public String getYearLevel() { return yearLevel; }

    // SETTERS
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setProgram(String program) { this.program = program; }
    public void setYearLevel(String yearLevel) { this.yearLevel = yearLevel; }
}*/

import jakarta.persistence.*;

@Entity
@Table(name = "student_schedule")
public class sched_assess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String code;
    private String subject;
    private String description;
    private Double units;
    private String schedule;
    private String instructor;
    private String section;
    private String academicyear;
    private String sem;

    // getters and setters

    public int getId() { return id; }
    public String getCode() { return code; }
    public String getSubject() { return subject; }
    public String getSection() { return section; }
    public String getInstructor() { return instructor; }
    public String getSchedule() { return schedule; }
    public String getDescription() { return description; }
    public Double getUnits() { return units; }
    public String getAcademicyear() { return academicyear; }
    public void setAcademicyear(String academicyear) { this.academicyear = academicyear; }


    public void setId(int id) { this.id = id; }
    public void setCode(String code) { this.code = code; }
    public void setSubject(String subject) { this.subject = subject; }
    public void setDescription(String description) { this.description = description; }
    public void setUnits(Double units) { this.units = units; }
    public void setSchedule(String schedule) { this.schedule = schedule; }
    public void setInstructor(String instructor) { this.instructor = instructor; }
    public void setSection(String section) { this.section = section; }

    public String getSem() { return sem; }
    public void setSem(String sem) { this.sem = sem; }
}

