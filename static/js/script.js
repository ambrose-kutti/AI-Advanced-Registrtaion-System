// DOM Elements
let step1Content, step2Content, step3Content;
let step1Indicator, step2Indicator, step3Indicator;
let nextToStep2Btn, backToStep1Btn, nextToStep3Btn, cancelBtn, registerAnotherBtn, viewDashboardBtn, switchCameraBtn;
let userForm, video, captureBtn, photoBoxes, photoError, errorText, successMessage, registrationDetails;

// Application State
let currentStream = null;
let capturedPhotos = {
    front: null,
    left: null,
    right: null,
    top: null,
    bottom: null
};
let currentAngle = 'front';
let currentFacingMode = 'user';

const API_BASE = window.location.origin;    // API Base URL

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
});

function initializeElements() {
    // Step content elements
    step1Content = document.getElementById('step1-content');
    step2Content = document.getElementById('step2-content');
    step3Content = document.getElementById('step3-content');
    // Step indicator elements
    step1Indicator = document.getElementById('step1');
    step2Indicator = document.getElementById('step2');
    step3Indicator = document.getElementById('step3');
    // Button elements
    nextToStep2Btn = document.getElementById('nextToStep2');
    backToStep1Btn = document.getElementById('backToStep1');
    nextToStep3Btn = document.getElementById('nextToStep3');
    cancelBtn = document.getElementById('cancelBtn');
    registerAnotherBtn = document.getElementById('registerAnother');
    viewDashboardBtn = document.getElementById('viewDashboard');
    switchCameraBtn = document.getElementById('switchCamera');
    // Form and camera elements
    userForm = document.getElementById('userForm');
    video = document.getElementById('video');
    captureBtn = document.getElementById('captureBtn');
    photoBoxes = document.querySelectorAll('.photo-box');
    photoError = document.getElementById('photoError');
    errorText = document.getElementById('errorText');
    successMessage = document.getElementById('successMessage');
    registrationDetails = document.getElementById('registrationDetails');
    console.log('Elements initialized:', {
        nextToStep2Btn: !!nextToStep2Btn,
        cancelBtn: !!cancelBtn,
        step1Content: !!step1Content
    });
}

function setupEventListeners() {
    // Step navigation
    if (nextToStep2Btn) {
        nextToStep2Btn.addEventListener('click', goToStep2);
        console.log('Next to Step 2 button listener added');
    }
    if (backToStep1Btn) {
        backToStep1Btn.addEventListener('click', goToStep1);
    }
    if (nextToStep3Btn) {
        nextToStep3Btn.addEventListener('click', goToStep3);
    }
    if (cancelBtn) {
        cancelBtn.addEventListener('click', cancelRegistration);
        console.log('Cancel button listener added');
    }
    if (registerAnotherBtn) {
        registerAnotherBtn.addEventListener('click', registerAnother);
    }
    if (viewDashboardBtn) {
        viewDashboardBtn.addEventListener('click', viewDashboard);
    }
    if (switchCameraBtn) {
        switchCameraBtn.addEventListener('click', switchCamera);
    }
    // Photo capture
    if (captureBtn) {
        captureBtn.addEventListener('click', capturePhoto);
    }
    // Add Enter key support for form
    if (userForm) {
        userForm.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                goToStep2();
            }
        });
    }
}

// Step Navigation Functions
function goToStep2() {
    console.log('goToStep2 called');
    // Validate form
    if (!validateForm()) {
        return;
    }
    // Update UI
    step1Content.classList.add('hidden');
    step2Content.classList.remove('hidden');
    step1Indicator.classList.remove('active');
    step1Indicator.classList.add('completed'); // Mark step 1 as completed
    step2Indicator.classList.add('active');
    document.querySelector('.step-indicator').className = 'step-indicator step2-active';    // Update progress line
    startCamera();  // Start camera
}

function goToStep1() {
    console.log('goToStep1 called');
    // Update UI
    step2Content.classList.add('hidden');
    step1Content.classList.remove('hidden');
    step2Indicator.classList.remove('active');
    step1Indicator.classList.add('active');
    step1Indicator.classList.remove('completed'); // Remove completed status when going back
    document.querySelector('.step-indicator').className = 'step-indicator step1-active';    // Update progress line
    stopCamera();   // Stop camera
}

function goToStep2() {
    console.log('goToStep2 called');
    if (!validateForm()) {
        return;
    }
    step1Content.classList.add('hidden');
    step2Content.classList.remove('hidden');
    step1Indicator.classList.remove('active');
    step1Indicator.classList.add('completed');
    step2Indicator.classList.add('active');
    document.querySelector('.step-indicator').className =
        'step-indicator step2-active';
    // IMPORTANT FIX
    nextToStep3Btn.disabled = true;
    nextToStep3Btn.innerHTML = 'Complete Registration';
    startCamera();
}

async function goToStep3() {
    console.log('goToStep3 called');
    // Validate all photos are captured
    if (!validatePhotos()) {
        photoError.classList.remove('hidden');
        photoError.classList.add('error-message');
        photoError.classList.remove('success-message');
        errorText.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please capture all 5 photos before proceeding.';
        return;
    }
    // Disable button and show loading
    nextToStep3Btn.disabled = true;
    const originalText = nextToStep3Btn.innerHTML;
    nextToStep3Btn.innerHTML = '<div class="loading"></div> Processing...';
    try {
        const result = await saveUserData();    // Save data to FastAPI backend
        // Update UI to show success
        step2Content.classList.add('hidden');
        step3Content.classList.remove('hidden');
        step2Indicator.classList.remove('active');
        step2Indicator.classList.add('completed'); // Mark step 2 as completed
        step3Indicator.classList.add('active');
        document.querySelector('.step-indicator').className = 'step-indicator step3-active';    // Update progress line
        stopCamera();   // Stop camera
    } catch (error) {
        alert('Registration failed: ' + error.message);
        nextToStep3Btn.disabled = false;
        nextToStep3Btn.innerHTML = originalText;
    }
}

function cancelRegistration() {
    console.log('cancelRegistration called');
    if (confirm('Are you sure you want to cancel registration? All data will be lost.')) {
        resetForm();
        goToStep1();
    }
}

function registerAnother() {
    console.log('registerAnother called');
    resetForm();
    // Update UI to show step 1
    step3Content.classList.add('hidden');
    step1Content.classList.remove('hidden');
    // Update step indicators
    step1Indicator.classList.add('active');
    step1Indicator.classList.remove('completed');
    step2Indicator.classList.remove('active');
    step2Indicator.classList.remove('completed');
    step3Indicator.classList.remove('active');
    document.querySelector('.step-indicator').className = 'step-indicator step1-active';    // Reset progress line
}

function viewDashboard() {
    window.open('/admin', '_blank');
}

// Form Validation
function validateForm() {
    const userId = document.getElementById('userId').value;
    const username = document.getElementById('username').value;
    const department = document.getElementById('department').value;
    const designation = document.getElementById('designation').value;
    console.log('Form validation:', { userId, username, department, designation });
    if (!userId || !username || !department || !designation) {
        alert('Please fill in all required fields.');
        return false;
    }
    return true;
}

function validatePhotos() {
    const requiredAngles = ['front', 'left', 'right', 'top', 'bottom'];
    for (let angle of requiredAngles) {
        if (!capturedPhotos[angle]) {
            console.log(`Missing photo for angle: ${angle}`);
            return false;
        }
    }
    return true;
}

// Camera Functions
async function startCamera() {
    console.log('Starting camera...');
    stopCamera(); // Stop any existing stream
    const constraints = {
        video: {
            facingMode: currentFacingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 }
        }
    };
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        currentStream = stream;
        video.srcObject = stream;
        console.log('Camera started successfully');
        return new Promise((resolve) => {
            video.onloadedmetadata = () => {
                resolve();
            };
        });
    } catch (error) {
        console.error('Camera error: ', error);
        // If camera fails, show a message but don't block the user
        alert('Unable to access camera. You can still proceed with photo capture using the demo mode.');
        return Promise.resolve();
    }
}

async function switchCamera() {
    currentFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
    await startCamera();
}

function stopCamera() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
        currentStream = null;
    }
}

function capturePhoto() {
    console.log('capturePhoto called for angle:', currentAngle);
    let imageData;
    if (currentStream && video.readyState === 4) {
        // Real camera capture
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        imageData = canvas.toDataURL('image/png');
    } else {
        imageData = createDemoPhoto(currentAngle);  // Demo mode - create a colored placeholder
    }
    const isValid = simulatePhotoValidation();  // Simulate photo quality validation
    
    if (!isValid) {
        errorText.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Photo quality is poor. Please ensure good lighting and a clear face.';
        photoError.classList.remove('hidden');
        photoError.classList.add('error-message');
        photoError.classList.remove('success-message');
        return;
    }
    photoError.classList.add('hidden'); // Hide any previous error
    // Update the current photo box
    const currentBox = document.querySelector(`.photo-box[data-angle="${currentAngle}"]`);
    currentBox.classList.add('captured');
    currentBox.innerHTML = `
        <img src="${imageData}" alt="${currentAngle} view">
        <div class="photo-label">${getAngleLabel(currentAngle)}</div>
        <div class="photo-status">
            <i class="fas fa-check status-icon status-completed"></i>
            <span class="status-completed">Captured</span>
        </div>
    `;
    capturedPhotos[currentAngle] = imageData;   // Store the photo
    moveToNextAngle();  // Move to next angle
    
    // Check if all photos are captured
    if (validatePhotos()) {
        nextToStep3Btn.disabled = false;
        // Show completion message
        photoError.classList.remove('hidden');
        photoError.classList.remove('error-message');
        photoError.classList.add('success-message');
        errorText.innerHTML = '<i class="fas fa-check-circle"></i> All photos captured! You can now complete registration.';
    } else {
        // Show next angle instruction
        photoError.classList.remove('hidden');
        photoError.classList.remove('error-message');
        photoError.classList.remove('success-message');
        photoError.classList.add('info-message');
        errorText.innerHTML = `<i class="fas fa-info-circle"></i> Next: ${getAngleLabel(currentAngle)}`;
    }
}

function createDemoPhoto(angle) {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const context = canvas.getContext('2d');
    const colors = {    // Different colors for different angles
        front: '#3498db',
        left: '#e74c3c',
        right: '#2ecc71', 
        top: '#f39c12',
        bottom: '#9b59b6'
    };
    context.fillStyle = colors[angle] || '#3498db';
    context.fillRect(0, 0, canvas.width, canvas.height);
    // Add text
    context.fillStyle = 'white';
    context.font = 'bold 20px Arial';
    context.textAlign = 'center';
    context.fillText(angle.toUpperCase(), canvas.width/2, canvas.height/2);
    context.font = '14px Arial';
    context.fillText('DEMO PHOTO', canvas.width/2, canvas.height/2 + 30);
    return canvas.toDataURL('image/png');
}

function simulatePhotoValidation() {
    return Math.random() > 0.1; // For now, we'll simulate a 90% success rate
}

function moveToNextAngle() {
    const angles = ['front', 'left', 'right', 'top', 'bottom'];
    const currentIndex = angles.indexOf(currentAngle);
    if (currentIndex < angles.length - 1) {
        currentAngle = angles[currentIndex + 1];
    } else {
        currentAngle = 'front'; // Reset if we've captured all
    }
    console.log('Moved to next angle:', currentAngle);
}

function getAngleLabel(angle) {
    const labels = {
        front: 'Front View',
        left: 'Left View',
        right: 'Right View',
        top: 'Top View',
        bottom: 'Bottom View'
    };
    return labels[angle];
}

// API Functions
async function saveUserData() {
    const userId = document.getElementById('userId').value;
    const username = document.getElementById('username').value;
    const department = document.getElementById('department').value;
    const designation = document.getElementById('designation').value;
    // Prepare photos data
    const photosData = Object.entries(capturedPhotos).map(([angle, imageData]) => ({
        angle: angle,
        image_data: imageData
    }));
    const registrationData = {
        user: {
            user_id: userId,
            username: username,
            department: department,
            designation: designation
        },
        photos: photosData
    };
    console.log('Saving user data:', registrationData);
    const response = await fetch(`${API_BASE}/api/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
    }
    const result = await response.json();
    // Update success message with details
    successMessage.textContent = result.message;
    registrationDetails.innerHTML = `
        <div class="col-md-6">
            <p><strong>User ID:</strong><br>${userId}</p>
            <p><strong>Username:</strong><br>${username}</p>
        </div>
        <div class="col-md-6">
            <p><strong>Department:</strong><br>${department}</p>
            <p><strong>Designation:</strong><br>${designation}</p>
        </div>
        <div class="col-12">
            <p><strong>Photos Captured:</strong><br>${result.photos_saved}/5</p>
            <p><strong>Registration Time:</strong><br>${new Date().toLocaleString()}</p>
        </div>
    `;
    return result;
}

// Utility Functions
function resetForm() {
    userForm.reset();
    // Reset photo capture state
    capturedPhotos = {
        front: null,
        left: null,
        right: null,
        top: null,
        bottom: null
    };
    currentAngle = 'front';
    // Reset photo boxes
    photoBoxes.forEach(box => {
        box.classList.remove('captured');
        const angle = box.dataset.angle;
        box.innerHTML = `
            <i class="fas fa-user photo-icon"></i>
            <span>${getAngleLabel(angle)}</span>
            <div class="photo-status">
                <i class="fas fa-clock status-icon status-pending"></i>
                <span class="status-pending">Pending</span>
            </div>
        `;
    });
    // Reset buttons
    nextToStep3Btn.disabled = true;
    photoError.classList.add('hidden');
    console.log('Form reset complete');
}