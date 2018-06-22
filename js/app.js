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
                <img src="${course.image}">
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
}

//activate remove button

function removeCourse(e) {

    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
    }
}
// clears cart
function clearCart() {
    shoppingCartContent.innerHTML = '';
}