const coursesData = [];

function addCourse() {
    const course = {
        name: prompt("Enter Course Name:"),
        creditHours: parseFloat(prompt("Enter Credit Hours:")),
        totalMarks: parseFloat(prompt("Enter Total Marks (out of 100):"))
    };

    if (isNaN(course.creditHours) || isNaN(course.totalMarks)) {
        alert("Please enter valid numbers for credit hours and total marks.");
        return;
    }

    coursesData.push(course);

    const coursesDiv = document.getElementById('courses');
    coursesDiv.innerHTML += `
        <div>
            <strong>${course.name}</strong><br>
            Credit Hours: ${course.creditHours}<br>
            Total Marks: ${course.totalMarks}
        </div>
        <hr>
    `;

    const resultTable = document.getElementById('resultTable');
    const newRow = resultTable.insertRow(-1);
    const courseCell = newRow.insertCell(0);
    const creditHoursCell = newRow.insertCell(1);
    const totalMarksCell = newRow.insertCell(2);

    courseCell.innerHTML = course.name;
    creditHoursCell.innerHTML = course.creditHours;
    totalMarksCell.innerHTML = course.totalMarks;
}

function calculateGPA() {
let totalPercentage = 0;
let totalCreditHours = 0;

// Calculate percentage for each course, accumulate total percentage and update table with grade points
coursesData.forEach((course, index) => {
const percentage = (course.totalMarks / 100) * 100; // Assuming totalMarks are out of 100
const gradePoint = getGradePoint(percentage);
totalPercentage += percentage * course.creditHours;
totalCreditHours += course.creditHours;

// Update table with grade points only if not already calculated
const resultTable = document.getElementById('resultTable');
const row = resultTable.rows[index + 1]; // +1 to skip header row
const gradePointCell = row.cells[3];
if (!gradePointCell) {
    // If grade point cell doesn't exist, insert a new one
    const newGradePointCell = row.insertCell(3);
    newGradePointCell.innerHTML = gradePoint.toFixed(2);
}
});

// Calculate GPA based on the total percentage and credit hours
const averagePercentage = totalPercentage / totalCreditHours;
const totalGPA = (averagePercentage / 25).toFixed(2); // Assuming the scale is 4 (divide by 25)

document.getElementById('totalGPA').textContent = totalGPA;
}


function getGradePoint(percentage) {
// Define your grade point logic here based on percentage
// For example, assuming a linear scale
if (percentage >= 90) {
return 4.0;
} else if (percentage >= 80) {
return 3.5;
} else if (percentage >= 70) {
return 3.0;
} else if (percentage >= 60) {
return 2.5;
} else if (percentage >= 50) {
return 2.0;
} else {
return 0.0;
}
}
