// ======= Course Data =======
const courses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript to build simple websites.",
    lessons: ["HTML Basics", "CSS Styling", "JavaScript Introduction"]
  },
  {
    id: 2,
    title: "Python for Beginners",
    description: "A hands-on introduction to Python programming and problem-solving.",
    lessons: ["Variables and Data Types", "Loops and Conditions", "Functions and Modules"]
  },
  {
    id: 3,
    title: "AI for Software Engineers",
    description: "Discover how AI enhances software development using ML and NLP.",
    lessons: ["Introduction to AI", "Machine Learning Basics", "AI Tools Overview"]
  }
];

// ======= Display Courses on Home Page =======
const courseListContainer = document.getElementById("course-list");
if (courseListContainer) {
  courses.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course-card");
    div.innerHTML = `
      <h3>${course.title}</h3>
      <p>${course.description}</p>
      <button onclick="viewCourse(${course.id})">View Details</button>
    `;
    courseListContainer.appendChild(div);
  });
}

// ======= Navigate to Course Details =======
function viewCourse(id) {
  localStorage.setItem("selectedCourseId", id);
  window.location.href = "course.html";
}

// ======= Display Selected Course Details =======
const courseDetailContainer = document.getElementById("course-detail");
if (courseDetailContainer) {
  const courseId = localStorage.getItem("selectedCourseId");
  const course = courses.find(c => c.id == courseId);

  if (course) {
    document.getElementById("course-title").textContent = course.title;
    document.getElementById("course-description").textContent = course.description;

    const lessonList = document.getElementById("lesson-list");
    course.lessons.forEach(lesson => {
      const li = document.createElement("li");
      li.textContent = lesson;
      lessonList.appendChild(li);
    });

    const completeBtn = document.getElementById("complete-btn");
    const status = document.getElementById("status");

    // Check completion status
    const completedCourses = JSON.parse(localStorage.getItem("completedCourses")) || [];
    if (completedCourses.includes(course.id)) {
      status.textContent = "✅ This course is completed!";
      completeBtn.disabled = true;
    }

    completeBtn.addEventListener("click", () => {
      let completedCourses = JSON.parse(localStorage.getItem("completedCourses")) || [];
      if (!completedCourses.includes(course.id)) {
        completedCourses.push(course.id);
        localStorage.setItem("completedCourses", JSON.stringify(completedCourses));
        status.textContent = "✅ This course is completed!";
        completeBtn.disabled = true;
      }
    });
  }
}
