// Global Variables
let imagesURL = [];
let photoNamesArr = [];
let initialPhoto;
let lastPhoto;
const imageContainer = document.querySelector('.image-container img');
let counter = 0;
let slideInterval;
let currentSlide = 0;

// --------- FUNCTIONS ----------

// add event listener to the load photos button
const loadPhotosButton = document.querySelector('.load-local-container input[type="submit"]');
loadPhotosButton.addEventListener('click', loadPhotos);

// Load Photos Button
function loadPhotos(event) {
    // Empty variables
    photoNamesArr = [];
    initialPhoto= "";
    lastPhoto= "";

    // Prevent button from submitting form when clicked
    event.preventDefault();

    // Read user input
    const photoFolder = document.querySelector('#photo-folder').value;
    const commonName = document.querySelector('#common-name').value;
    const startNumber = parseInt(document.querySelector('#start-photo').value);
    const endNumber = parseInt(document.querySelector('#end-photo').value);

    if(checkRange(startNumber, endNumber)) {
        // Push photos to Photo Array
        for (let i = startNumber; i <= endNumber; i++) {
            const photoName = `${photoFolder}${commonName}${i}.jpg`;
            photoNamesArr.push(photoName);
        }
        setPhoto(photoNamesArr);

    } else {
        const status = document.querySelector('.row.status');
        status.innerHTML = '<span class="status-info">Error: Invalid Range</span>';
    }
}

// LAMBDA -- Load JSON Photos
document.querySelector('.load-json-container input[type="submit"]').addEventListener('click', async event => {
    // Empty Photos Array
    photoNamesArr = [];
    initialPhoto= "";
    lastPhoto= "";

    // Prevent button from submitting form when clicked
    event.preventDefault();

    // Read JsonURL
    let json = document.querySelector('#json').value;

    // fetch json - Await
    const res = await fetch(json);
    const { images } = await res.json();
    const imagesJSONArr = images;

    // Save only imageURL's value in Photos Array
    photoNamesArr = imagesJSONArr.map(image => image.imageURL);

    setPhoto(photoNamesArr)
})

// Load first and last photo. Set first photo and update status field
function setPhoto(arr){
    // load the first photo
    initialPhoto = arr[0];

    // load last photo
    lastPhoto = arr.slice(-1)[0];

    // set the first photo
    const imageContainer = document.querySelector('.image-container img');
    imageContainer.src = initialPhoto;

    // update the status field
    updateStatusField(initialPhoto)

}

// update the status field
function updateStatusField(currentPhoto){
    const photoNameField = document.querySelector('#photo-name');
    photoNameField.value = currentPhoto;
}

// Check Range Start and End Photo Number
function checkRange(start, end) {
    const status = document.querySelector('.row.status');

    if (end >= start){
        status.innerHTML = '<span class="status-info">Photo Viewer System</span>';
        return true;
    } else {
        return false;
    }
}
function setError() {
    const status = document.querySelector('.row.status');
    status.innerHTML = '<span class="status-info">Error: you must load data first</span>';
}

// ------------ Button Listeners ------------

// Previous Button
document.querySelector('#prev').addEventListener('click', (event) => {
    // Prevent button from submitting form when clicked since button is inside form
    event.preventDefault();

    if(photoNamesArr.length > 0) {
        // decrement the counter variable by 1
        counter--;
    
        // if the counter is less than 0
        if (counter < 0) {
            // set counter variable to last index in the array
            counter = photoNamesArr.length - 1;
        }
    
        // set photo
        imageContainer.src = photoNamesArr[counter];

        // update the status field
        updateStatusField(photoNamesArr[counter]);
    } else {
        setError()
    }
})

// Next Button
document.querySelector('#next').addEventListener('click', (event) => {
    // Prevent button from submitting form when clicked since button is inside form
    event.preventDefault();   

    if(photoNamesArr.length > 0) {
        // increment the counter variable by 1
        counter++;
    
        // if the counter is greater than or equal to the length of the array
        if (counter >= photoNamesArr.length) {
            // set the counter variable to 0
            counter = 0;
        }
    
        // set photo
        imageContainer.src = photoNamesArr[counter];

        // update the status field
        updateStatusField(photoNamesArr[counter]);
    } else {
        setError()
    }

})

// Next By Clicking Image 
document.querySelector('.image-container img').addEventListener('click', () => {
    if(photoNamesArr.length > 0) {
        // increment the counter variable by 1
        counter++;
    
        // if the counter is greater than or equal to the length of the array
        if (counter >= photoNamesArr.length) {
            // set the counter variable to 0
            counter = 0;
        }
    
        // set photo
        imageContainer.src = photoNamesArr[counter];

        // update the status field
        updateStatusField(photoNamesArr[counter]);
    } else {
        setError()
    }
});


// First Photo Button
document.querySelector('#first').addEventListener('click', (event) => {
    // Prevent button from submitting form when clicked since button is inside form
    event.preventDefault();

    if (initialPhoto) {
        // set the first photo
        imageContainer.src = initialPhoto;

        // update the status field
        updateStatusField(initialPhoto);
    } else {
        setError()
    }
})

// Last Photo Button
document.querySelector('#last').addEventListener('click', (event) => {
    // Prevent button from submitting form when clicked since button is inside form
    event.preventDefault();

    if (lastPhoto) {
        // set the last photo
        imageContainer.src = lastPhoto;

        // update the status field
        updateStatusField(lastPhoto);
    } else {
        setError()
    }
})

// SlideShow Button
document.querySelector('#slide').addEventListener('click', (event) => {
    // Prevent button from submitting form when clicked since button is inside form
    event.preventDefault();

    if(photoNamesArr.length > 0) {
        // Clear Interval
        clearInterval(slideInterval);
    
        // Range of photos
        let start = 0
        let end = photoNamesArr.length - 1;
    
        // Set currentSlide to the start of the range
        currentSlide = start;
    
        // Set first photo
        imageContainer.src = photoNamesArr[currentSlide];
        updateStatusField(photoNamesArr[currentSlide]);

        slideshowInterval = setInterval( () => {
            // increment current slide
            currentSlide++;
    
            // If end of the range, reset to the start
            if (currentSlide > end) {
                currentSlide = start;
            }
    
            // set photo
            imageContainer.src = photoNamesArr[currentSlide];
            
            // update the status field
            updateStatusField(photoNamesArr[currentSlide]);
        }, 1000);
        
    } else {
        setError()
    }


});

// RandomSlideShow Button
document.querySelector('#random').addEventListener('click', (event) => {
    // Prevent button from submitting form when clicked since button is inside form
    event.preventDefault();

    if(photoNamesArr.length > 0){
        // Clear Interval
        clearInterval(slideInterval);
    
        // Range of photos
        let start = 0
        let end = photoNamesArr.length - 1;
    
        // Set currentSlide to the start of the range
        currentSlide = start;
    
        // Shuffle array randomly
        // Math.random() - 0.5 ==> -0.5 to 0.5; half time negative, half time positive
        // If the result is negative, the first element is sorted before the second element. 
        // If the result is positive, the second element is sorted before the first element. 
        // If the result is zero, the order of the elements is unchanged.
        photoNamesArr.sort(() => Math.random() - 0.5);
    
        // Set first photo
        imageContainer.src = photoNamesArr[currentSlide];
        updateStatusField(photoNamesArr[currentSlide]);
    
        slideshowInterval = setInterval( () => {
            // increment current slide
            currentSlide++;
    
            // If end of the range, reset to the start
            if (currentSlide > end) {
                currentSlide = start;
            }
    
            // set photo
            imageContainer.src = photoNamesArr[currentSlide];
            
            // update the status field
            updateStatusField(photoNamesArr[currentSlide]);
        }, 1000);

    } else {
        setError()
    }

});

// StopSlideShow Button
document.querySelector('#stop').addEventListener('click', (event) => {
    // Prevent button from submitting form when clicked since button is inside form
    event.preventDefault();

    if (photoNamesArr.length > 0) {
        // Clear any existing slideshow interval
        clearInterval(slideshowInterval);

    } else {
        setError()
    }

});

// Reset Button
document.querySelector('.reset-form-container .button').addEventListener('click', (event) => {

    // prevent button from resetting form
    event.preventDefault();

    // set default photo
    imageContainer.src = 'InitialImage.jpg';
    
    // reset form
    const form = document.querySelector('#form');
    form.reset();

})