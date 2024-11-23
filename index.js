// JavaScript to dynamically update step progress
document.addEventListener("DOMContentLoaded", () => {
    // Define the steps and their corresponding pages
    const steps = [
        { pages: ["DeviceSelection.html", "DeviceSpec.html"], elementId: 0 }, // Step 1
        { pages: ["Verification.html"], elementId: 1 }, // Step 2
        { pages: ["UserDetails.html"], elementId: 2 }, // Step 3
        { pages: ["LoanSummary.html"], elementId: 3 }, // Step 4
        { pages: ["PickupOption.html"], elementId: 4 }  // Step 5
    ];

    // Get current page URL (handle query parameters)
    const currentPage = window.location.pathname.split("/").pop().split("?")[0];

    // Find the current step based on the pages array
    const currentStepIndex = steps.findIndex(step => step.pages.includes(currentPage));

    if (currentStepIndex !== -1) {
        const stepLinks = document.querySelectorAll(".step-links li");

        // Update classes for each step
        stepLinks.forEach((step, index) => {
            const statusText = document.createElement("p");

            if (index < currentStepIndex) {
                step.classList.add("completed"); // Apply completed class
                statusText.textContent = "Completed";
                statusText.style.color = "green";
            } else if (index === currentStepIndex) {
                step.classList.add("in-progress"); // Apply in-progress class
                statusText.textContent = "In Progress";
                statusText.style.color = "blue";
            }

            if (!step.querySelector("p")) {
                step.querySelector(".wrap").appendChild(statusText);
            }
        });
    }
});



document.addEventListener('DOMContentLoaded', () => {
    function getQueryParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            name: params.get('name'),
            image: params.get('image'),
            price: params.get('price'),
            displaySize: params.get('displaySize'),
            network: params.get('network'),
            camera: params.get('camera'),
            memory: params.get('memory'),
            battery: params.get('battery'),
            processor: params.get('processor'),
        };
    }

   
    const phoneData = getQueryParams();

    const phoneButton = document.getElementById('phone-button');
    const phoneImage = document.getElementById('phone-image');
    phoneButton.textContent = phoneData.name;
    phoneImage.src = phoneData.image;
    phoneImage.alt = phoneData.name;

    // Populate the right card (Specifications)
    const phoneSpecs = document.getElementById('phone-specs');
    phoneSpecs.innerHTML = `
        <li><span class="spec-title">Display Size:</span> <span class="spec-detail">${phoneData.displaySize}</span></li>
        <li><span class="spec-title">Network:</span> <span class="spec-detail">${phoneData.network}</span></li>
        <li><span class="spec-title">Camera:</span> <span class="spec-detail">${phoneData.camera}</span></li>
        <li><span class="spec-title">Memory:</span> <span class="spec-detail">${phoneData.memory}</span></li>
        <li><span class="spec-title">Battery:</span> <span class="spec-detail">${phoneData.battery}</span></li>
        <li><span class="spec-title">Processor:</span> <span class="spec-detail">${phoneData.processor}</span></li>
        <li><button class="price-button"><span class="spec-title">Price:</span> <span class="spec-detail">${phoneData.price}</span></button></li>
    `;
});

function submitForm1AndNavigate() {
    console.log("Simulating submission of Form 1");
    
    window.location.href = 'UserDetails.html';
}

function submitForm2AndNavigate() {
    console.log("Simulating submission of Form 2");
    
    window.location.href = 'LoanSummary.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const phonePrice = parseFloat(getQueryParams().price); 
    const interestRate = 0.075; 
    
    
    const today = new Date();
    const selectedDate = new Date(getQueryParams().selectedDate); 

    
    const monthsDifference = ((selectedDate.getFullYear() - today.getFullYear()) * 12) + selectedDate.getMonth() - today.getMonth();

    
    const loanDurationSelect = document.getElementById('loan-duration');
    const loanDurationText = document.getElementById('loan-duration-text');
    const loanAmountElement = document.getElementById('loan-amount');
    const monthlyRepaymentElement = document.getElementById('monthly-repayment');

    
    if (monthsDifference < 3) {
        alert("You are not eligible for a loan with this short duration.");
        loanDurationSelect.disabled = true;
        return;
    }

    
    const eligibleDurations = [];
    for (let i = 3; i <= monthsDifference; i++) {
        eligibleDurations.push(i + " months");
    }

    
    eligibleDurations.forEach(duration => {
        const option = document.createElement("option");
        option.value = duration;
        option.textContent = duration;
        loanDurationSelect.appendChild(option);
    });

    
    window.updateRepaymentSummary = function () {
        const selectedDuration = loanDurationSelect.value;
        if (!selectedDuration) return;

        
        const months = parseInt(selectedDuration);

        
        const totalLoanAmount = phonePrice + (phonePrice * interestRate * months);
        const monthlyRepayment = totalLoanAmount / months;

        
        loanAmountElement.textContent = totalLoanAmount.toFixed(2);
        loanDurationText.textContent = selectedDuration;
        monthlyRepaymentElement.textContent = monthlyRepayment.toFixed(2);
    };
});


 // Variables for managing state
let pickupOption = '';
let campLocation = '';
let storeAddress = '';
let showPopup = false;

// Function to handle the form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    // Get the values from the inputs
    pickupOption = document.querySelector('input[name="pickupOption"]:checked')?.value;
    campLocation = document.getElementById('campLocation')?.value;
    storeAddress = document.getElementById('storeAddress')?.value;

    // Log the values to make sure we are capturing them correctly
    console.log('Pickup Option:', pickupOption);
    console.log('Camp Location:', campLocation);
    console.log('Store Address:', storeAddress);

    // Check which option is selected and validate accordingly
    if (pickupOption === 'camp' && campLocation !== '') {
        // If camp pickup is selected, and camp location is chosen, show the popup
        showCongratulationsPopup();
    } else if (pickupOption === 'store' && storeAddress !== '') {
        // If store pickup is selected, and store address is filled, show the popup
        showCongratulationsPopup();
    } else {
        alert('Please complete the required fields.');
    }
}

// Function to handle the pickup option change
function setPickupOption(option) {
    pickupOption = option;
    // Show or hide the appropriate inputs based on the selected option
    if (pickupOption === 'camp') {
        document.getElementById('campDropdown').style.display = 'block';
        document.getElementById('storeInput').style.display = 'none';
    } else if (pickupOption === 'store') {
        document.getElementById('campDropdown').style.display = 'none';
        document.getElementById('storeInput').style.display = 'block';
    }
}

// Function to show the congratulations popup
function showCongratulationsPopup() {
    showPopup = true;
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('congratulationsPopup').style.display = 'block';
}

// Function to close the congratulations popup
function handlePopupClose() {
    showPopup = false;
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('congratulationsPopup').style.display = 'none';
}


