// ============================================================
// STUDENT ACADEMIC & SCHOLARSHIP MANAGEMENT SYSTEM
// Full Stack Lab 03
// ============================================================


// ============================================================
// Student Object
// ============================================================
const student = {
    name: "Usman Raza",
    registrationNumber: "FA23-BSE-014",
    program: "BS Software Engineering",
    semester: 5,
    cgpa: 1.85,
    attendance: 55,
    assignmentMarks: 6,
    midtermMarks: 10,
    finalExamMarks: 18
};


// ============================================================
// Student Information Display
// ============================================================

document.getElementById("studentName").textContent = student.name;

document.getElementById("registrationNumber").textContent =
    student.registrationNumber;

document.getElementById("program").textContent =
    student.program;

document.getElementById("semester").textContent =
    student.semester;

document.getElementById("cgpa").textContent =
    student.cgpa;

document.getElementById("attendance").textContent =
    student.attendance;


// Display Academic Marks

document.getElementById("assignmentMarks").textContent =
    student.assignmentMarks;

document.getElementById("midtermMarks").textContent =
    student.midtermMarks;

document.getElementById("finalExamMarks").textContent =
    student.finalExamMarks;


// ============================================================
// Academic Calculation
// ============================================================

// Maximum marks for each assessment

const assignmentMaximum = 20;
const midtermMaximum = 30;
const finalExamMaximum = 50;


// Calculate total obtained marks

const totalMarks =
    student.assignmentMarks +
    student.midtermMarks +
    student.finalExamMarks;


// Calculate total maximum marks

const totalMaximumMarks =
    assignmentMaximum +
    midtermMaximum +
    finalExamMaximum;


// Calculate percentage

const percentage =
    (totalMarks / totalMaximumMarks) * 100;


// Round percentage to two decimal places

const finalPercentage = percentage.toFixed(2);


// Display calculations

document.getElementById("totalMarks").textContent =
    totalMarks;

document.getElementById("percentage").textContent =
    finalPercentage;


// ============================================================
// Grade Calculation
// ============================================================

let grade;

if (percentage >= 80) {

    grade = "A";

}
else if (percentage >= 70) {

    grade = "B";

}
else if (percentage >= 60) {

    grade = "C";

}
else if (percentage >= 50) {

    grade = "D";

}
else {

    grade = "F";

}


// Display grade

document.getElementById("grade").textContent = grade;


// ============================================================
// Pass / Fail Decision
// ============================================================

let passFail;

if (percentage >= 50) {

    passFail = "Passed";

}
else {

    passFail = "Failed";

}


// Display pass/fail status

document.getElementById("passFail").textContent = passFail;


// ============================================================
// Scholarship Eligibility
// ============================================================

// Scholarship requirements

const minimumScholarshipCGPA = 3.00;
const minimumScholarshipAttendance = 80;
const minimumScholarshipPercentage = 70;


// Basic scholarship eligibility

const scholarshipEligible =
    student.cgpa >= minimumScholarshipCGPA &&
    student.attendance >= minimumScholarshipAttendance &&
    percentage >= minimumScholarshipPercentage;


// ============================================================
// Multiple Scholarship Categories
// ============================================================

let scholarshipStatus;


// Gold Scholarship
// High CGPA + high attendance + high academic percentage

if (
    student.cgpa >= 3.50 &&
    student.attendance >= 90 &&
    percentage >= 80
) {

    scholarshipStatus = "Gold Scholarship";

}


// Silver Scholarship
// Good CGPA + acceptable attendance + good academic percentage

else if (
    student.cgpa >= 3.00 &&
    student.attendance >= 80 &&
    percentage >= 70
) {

    scholarshipStatus = "Silver Scholarship";

}


// Not Eligible

else {

    scholarshipStatus = "Not Eligible";

}


// ============================================================
// Using ! Operator
// ============================================================

// Demonstrating logical NOT operator.
// If the student is NOT scholarship eligible,
// the result will be true.

const notEligibleForBasicScholarship = !scholarshipEligible;

console.log(
    "Not Eligible for Basic Scholarship:",
    notEligibleForBasicScholarship
);


// Display scholarship status

document.getElementById("scholarshipStatus").textContent =
    scholarshipStatus;


// ============================================================
// Academic Warning System
// ============================================================

let academicStatus;


// Critical condition
// Very low percentage OR very low CGPA OR very low attendance

if (
    percentage < 40 ||
    student.cgpa < 2.00 ||
    student.attendance < 60
) {

    academicStatus = "Critical";

}


// Academic Warning
// Low percentage OR low attendance OR low CGPA

else if (
    percentage < 50 ||
    student.attendance < 75 ||
    student.cgpa < 2.50
) {

    academicStatus = "Academic Warning";

}


// Good Standing

else {

    academicStatus = "Good Standing";

}


// Display academic status

document.getElementById("academicStatus").textContent =
    academicStatus;


// ============================================================
// Operators Demonstration
// ============================================================


// -------------------------
// Arithmetic Operators
// -------------------------

const marksDifference =
    totalMaximumMarks - totalMarks;

const averageMarks =
    totalMarks / 3;

const percentageRemainder =
    totalMarks % 10;

console.log("Marks Difference:", marksDifference);
console.log("Average Marks:", averageMarks);
console.log("Percentage Remainder:", percentageRemainder);


// -------------------------
// Comparison Operators
// -------------------------

console.log("Percentage > 80:", percentage > 80);

console.log("Percentage < 50:", percentage < 50);

console.log("CGPA >= 3.00:", student.cgpa >= 3.00);

console.log("Attendance <= 75:", student.attendance <= 75);

console.log("Grade === A:", grade === "A");

console.log("Grade !== F:", grade !== "F");


// -------------------------
// Logical Operators
// -------------------------

const highAcademicPerformance =
    percentage >= 80 &&
    student.cgpa >= 3.50;


const needsAttention =
    percentage < 50 ||
    student.attendance < 75;


const notFailed =
    !(grade === "F");


console.log(
    "High Academic Performance:",
    highAcademicPerformance
);

console.log(
    "Needs Academic Attention:",
    needsAttention
);

console.log(
    "Student has not failed:",
    notFailed
);


// ============================================================
// Hoisting Demonstration
// ============================================================


// -------------------------
// var Hoisting
// -------------------------

console.log("Value of hoistedVar before assignment:", hoistedVar);

var hoistedVar = "var variable";

console.log("Value of hoistedVar after assignment:", hoistedVar);


// Explanation:
// var declarations are hoisted to the top of their scope.
// Therefore, accessing the variable before its assignment
// does not produce a ReferenceError.
// Its value is undefined before the assignment.


// -------------------------
// let Hoisting
// -------------------------

// IMPORTANT:
// Uncomment the following two lines one at a time
// to observe the error in the browser console.

// console.log(hoistedLet);
// let hoistedLet = "let variable";


// Explanation:
// let declarations are also hoisted internally,
// but they remain in the Temporal Dead Zone (TDZ)
// until the declaration is reached.
// Accessing the variable before declaration produces:
// ReferenceError: Cannot access 'hoistedLet' before initialization.


// ============================================================
// Final Academic Report
// ============================================================

console.log("================================");
console.log("STUDENT ACADEMIC REPORT");
console.log("================================");

console.log("Student Name:", student.name);
console.log("Registration No:", student.registrationNumber);
console.log("Program:", student.program);
console.log("Semester:", student.semester);

console.log("CGPA:", student.cgpa);
console.log("Attendance:", student.attendance + "%");

console.log("Assignment Marks:", student.assignmentMarks);
console.log("Midterm Marks:", student.midtermMarks);
console.log("Final Exam Marks:", student.finalExamMarks);

console.log("Total Marks:", totalMarks);
console.log("Percentage:", finalPercentage + "%");
console.log("Grade:", grade);
console.log("Pass/Fail:", passFail);
console.log("Scholarship Status:", scholarshipStatus);
console.log("Academic Status:", academicStatus);

console.log("================================");

