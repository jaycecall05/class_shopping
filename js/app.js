// Variables
const courses = document.querySelector('#courses-list');


// Listeners

loadEventListeners();

function loadEventListeners() {
    // when a new course is added
    courses.addEventListener('click', buyCourse);
}


// functions

function buyCourse(e) {
    e.preventDefault();

    if (e.target.classList.contains('add-to-cart')) {
        const course = e.target.parentElement.parentElement;

        getCourseInfo(course);
    }
}

function getCourseInfo(course) {
    console.log(course);
}