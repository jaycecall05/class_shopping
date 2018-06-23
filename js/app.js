// Variables
const courses = document.querySelector('#courses-list'),
    shoppingCartContent = document.querySelector('#cart-content tbody'),
    clearCartBtn = document.querySelector('#clear-cart');


// Listeners

loadEventListeners();

function loadEventListeners() {
    // when a new course is added
    courses.addEventListener('click', buyCourse);

    // activate remove button

    shoppingCartContent.addEventListener('click', removeCourse);

    // clear cart btn

    clearCartBtn.addEventListener('click', clearCart);

    // document Ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}


// functions

function buyCourse(e) {
    e.preventDefault();

    if(e.target.classList.contains('add-to-cart')) {
        const course = e.target.parentElement.parentElement;

        getCourseInfo(course);
    }
}

function getCourseInfo(course) {
    //create object w/ course data
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }

    // insert into cart
    addIntoCart(courseInfo);
}

function addIntoCart(course) {

    const row = document.createElement('tr');

    row.innerHTML = ` 
        <tr>
            <td>
                <img src="${course.image}" width=100>
        </td> 
        <td>${course.title}</td>
         <td>${course.price}</td> 
         <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
        </td>
        
        
         </tr>
    `;
        // add into cart
    shoppingCartContent.appendChild(row);

    // add course into storage
    saveIntoStorage(course);
}

// add the courses into storage
function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();

    // add the course into the array
    courses.push(course);

    localStorage.setItem('courses', JSON.stringify(courses) );

}

// get the contents from storage
function getCoursesFromStorage() {
    
    let courses;
    
    if(localStorage.getItem('courses') === null) {
        courses = [];
    }else {
        courses = JSON.parse(localStorage.getItem('courses') );
    }
    return courses;
}

//activate remove button

function removeCourse(e) {
    let course, courseID;

    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseID = courses.querySelector('a').getAttribute('data-id');
    }
    console.log(courseID);

    // remove from storage
    removeCourseLocalStorage(courseID);
}

function removeCourseLocalStorage(id) {
    let coursesLS = getCoursesFromStorage();

    //loop trought the array and find the index to remove
    coursesLS.forEach(function(courseLS, index) {
        if(courseLS.id === id) {
            coursesLS.splice(index, 1);
        }
    });

    localStorage.setItem('courses', JSON.stringify(coursesLS));
}
// clears cart
function clearCart() {
    shoppingCartContent.innerHTML = '';


    // clear from storage
    clearLocalStorage();
}

function clearLocalStorage() {
    localStorage.clear();
}

// loads when doc is ready and print courses to cart

function getFromLocalStorage() {
    let coursesLS = getCoursesFromStorage();

    // loop throught the courses and print in cart
    coursesLS.forEach(function(course) {
        const row = document.createElement('tr');

        row.innerHTML = `
            <tr>
                <td>
                    <img src="${course.image}" width=100>
                </td>
                <td>${course.title}</td>
                <td>${course.price}</td>
                <td>
                    <a href="#" class="remove" data-id="${course.id}">X</a>
                </td>
            </tr>
        
        `;
        shoppingCartContent.appendChild(row);
    });
}