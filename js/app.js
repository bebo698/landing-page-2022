
// Logically  First we need to catch Tag of Ul to add items  inside it 

const Navbar = document.getElementById('navbar__list')

// second we need to idenfiy sections which will be included 

const sections = document.querySelectorAll('section');

// Now sections will be added automatically so it is done by fragment

const fragment = document.createDocumentFragment();

// options is part of observable Api used below

const options = {
    root: null,
    threshold: 0.2,
    rootMargin: "-90px"
};


// to make our first function run 

window.addEventListener('load', BuildNavBar);
 


 

// build the nav bar 

function BuildNavBar() {
    // we want to catch each section of sections to have Ids so we can add in navbar build
    [...sections].forEach(section => {
        const SectionData = section.getAttribute('data-nav');

        // create li and elements 
        const listItems = document.createElement('li');
        const ListLink = document.createElement('a');

        // add style to listlinks 
        ListLink.classList.add('menu__link');
        //add href to each section id 
        ListLink.href = `#${section.id}`;
        //add section data to each item
        ListLink.textContent = SectionData;



        //append li to a 
        listItems.appendChild(ListLink);
        fragment.appendChild(listItems);

        ListLink.addEventListener('click', function (e) {
            e.preventDefault();
            // Scroll to anchor ID using scrollTO event
            section.scrollIntoView({
                behavior: 'smooth',

            });
        });


    });
    //append fragment to navbar 

    Navbar.appendChild(fragment);
 
}

 

// scroll event to link anchor tag with section

window.addEventListener('scroll', () => {
    //loop for sections and define each one 
    for (const section of sections) {
        // Add class 'active' to section when near top of viewport
        const sectiontop = section.getBoundingClientRect().top;

        const equilvelentLink = document.querySelector(`a[href="#${section.id}"]`)
        // Set links as active

        if (sectiontop > 0 && sectiontop < 240) {
            equilvelentLink.classList.add('active')
        }
        // Set sections as un active

        else {
            equilvelentLink.classList.remove('active')
        }
    }

}
);



// observer api
const observer = new IntersectionObserver(function (sections, observer) {
    sections.forEach(section => {
        // Set sections as active

        if (section.isIntersecting) {
            section.target.classList.add('your-active-class');

        }
        // Set sections as  un active

        else {
            section.target.classList.remove('your-active-class');

        }
    }
    );
}, options);


sections.forEach(section => {
    observer.observe(section);
});










