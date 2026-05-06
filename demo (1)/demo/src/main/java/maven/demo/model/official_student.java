package maven.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "official_student")
public class official_student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String sex;
    private Integer age;
    private String course;
    private String department;

    @Column(name = "year_level")
    private String yearLevel;

    private String sem;

    @Column(name = "academic_year")
    private String academicyear;

    @Column(name = "dateenrolled")
    private String dateenrolled;

    // --- GETTERS ---
    public Long getId() { return id; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getSex() { return sex; }
    public Integer getAge() { return age; }
    public String getCourse() { return course; }
    public String getDepartment() { return department; }
    public String getYearLevel() { return yearLevel; }
    public String getSem() { return sem; }
    public String getAcademicyear() { return academicyear; }
    public String getDateenrolled() { return dateenrolled; }

    // --- SETTERS ---
    public void setId(Long id) { this.id = id; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setSex(String sex) { this.sex = sex; }
    public void setAge(Integer age) { this.age = age; }
    public void setCourse(String course) { this.course = course; }
    public void setDepartment(String department) { this.department = department; }
    public void setYearLevel(String yearLevel) { this.yearLevel = yearLevel; }
    public void setSem(String sem) { this.sem = sem; }
    public void setAcademicyear(String academicyear) { this.academicyear = academicyear; }
    public void setDateenrolled(String dateenrolled) { this.dateenrolled = dateenrolled; }
}