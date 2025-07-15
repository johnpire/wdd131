const DAYS = 6;
const LIMIT = 30;
let studentReport = [11, 42, 33, 64, 29, 37, 44];

// for
for (let i = 0; i < LIMIT; i++) {
    if (studentReport[i] < LIMIT) {
        console.log(studentReport[i]);
    }
}

// while
let i = 0;
while (i < studentReport.length) {
    if (studentReport[i] < LIMIT) {
        console.log(studentReport[i]);
    }
    i++;
}

// for each
studentReport.forEach(function(grade) {
    if (grade < LIMIT) {
        console.log(grade);
    }
})

// for i in
for (let i in studentReport) {
    if (studentReport[i] < LIMIT) {
        console.log(studentReport[i]);
    }
}

// get the day of the week
let today = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let dayOfWeek = days[today.getDay()];

console.log("Today is " + dayOfWeek);