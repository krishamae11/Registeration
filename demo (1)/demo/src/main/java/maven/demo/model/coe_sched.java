package maven.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "student_schedule")
public class coe_sched {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String code;
    private String subject;
    private String description;
    private Double units;
    private String schedule;
    private String instructor;
    private String section;

    @Column(name = "academic_year")
    private String academicYear;

    private String semester;

    public Integer getId() { return id; }
    public String getCode() { return code; }
    public String getSubject() { return subject; }
    public String getDescription() { return description; }
    public Double getUnits() { return units; }
    public String getSchedule() { return schedule; }
    public String getInstructor() { return instructor; }
    public String getSection() { return section; }
    public String getAcademicYear() { return academicYear; }
    public String getSemester() { return semester; }

    public void setId(Integer id) { this.id = id; }
    public void setCode(String code) { this.code = code; }
    public void setSubject(String subject) { this.subject = subject; }
    public void setDescription(String description) { this.description = description; }
    public void setUnits(Double units) { this.units = units; }
    public void setSchedule(String schedule) { this.schedule = schedule; }
    public void setInstructor(String instructor) { this.instructor = instructor; }
    public void setSection(String section) { this.section = section; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }
    public void setSemester(String semester) { this.semester = semester; }
}
