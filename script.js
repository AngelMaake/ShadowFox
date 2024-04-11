document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Tab functionality
    const tabs = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
    const body = document.body;

    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this,
                args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function updateBackground() {
        const currentScroll = window.scrollY;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
                const nextSection = sections[index + 1];
                const nextSectionColor = nextSection ? getComputedStyle(nextSection).backgroundColor : null;
                body.style.backgroundColor = nextSectionColor;
            }
        });
    }

    function checkSlide() {
        sections.forEach(section => {
            const slideInAT = (window.scrollY + window.innerHeight * 0.8);
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const isHalfShown = slideInAT > sectionTop;
            const isNotScrolledPast = window.scrollY < sectionBottom;

            if (isHalfShown && isNotScrolledPast) {
                section.style.opacity = 1;
                // section.classList.add('active');
            } else {
                section.style.opacity = 0;
                // section.classList.remove('active');
            }
        });
        updateBackground();
    }

    window.addEventListener('scroll', debounce(checkSlide));

    // tabs.forEach(tab => {
    //     tab.addEventListener('click', function(e) {
    //         e.preventDefault();

    //         // Hide all sections
    //         sections.forEach(section => {
    //             section.classList.add('hidden');
    //         });

    //         // Show the selected section
    //         const targetId = this.getAttribute('href').slice(1);
    //         const targetSection = document.getElementById(targetId);
    //         targetSection.classList.remove('hidden');
    //     });
    // });

    // Form submission handling
    const form = document.querySelector('form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // You can perform validation here if needed

        // Dummy action for demonstration
        alert(`Message sent!\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);

        // Clear form fields
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
    });

    // Project functionallity
    const addProjectBtn = document.getElementById('add-project-btn');
    const projectForm = document.getElementById('project-form');
    const projectList = document.getElementById('project-list');
    const cancelProjectBtn = document.getElementById('cancel-project-btn');
    const noProjectsMsg =document.getElementById('no-project-msg');

    addProjectBtn.addEventListener('click', function() {
        projectForm.classList.remove('hidden');
        projectList.classList.add('hidden');
    });

    cancelProjectBtn.addEventListener('click', function() {
        projectForm.classList.add('hidden');
        projectList.classList.remove('hidden');
    });

    const addProjectForm = document.getElementById('add-project-form');
    addProjectForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const projectName = document.getElementById('project-name').value;
        const projectDescription = document.getElementById('project-description').value;
        const projectLink = document.getElementById('project-link').value;

        // Validate project link
        if (!isValidURL(projectLink)) {
            alert("Please enter a valid URL for the project link.");
            return;
        }

        // Create new project element
        const newProject = document.createElement('div');
        newProject.classList.add('project');
        newProject.innerHTML = `
            <h3>${projectName}</h3>
            <p>${projectDescription}</p>
            <a href="${projectLink}" target="_blank">Project Link</a>
        `;

        // Append the new project to the project list
        projectList.appendChild(newProject);

        // Clear form fields
        addProjectForm.reset();

        // Hide the project form and show the project list
        projectForm.classList.add('hidden');
        projectList.classList.remove('hidden');

        // Remove "no projects added" message if it exists
        // const noProjectsMsg = document.getElementById('no-projects-msg');
        if (noProjectsMsg) {
            noProjectsMsg.remove();
        }
    });

    // Display "no projects added" message if there are no projects
    // if (projectList.children.length === 0) {
    //     const noProjectsMsg = document.createElement('p');
    //     noProjectsMsg.id = 'no-projects-msg';
    //     noProjectsMsg.textContent = 'No projects added';
    //     projectList.appendChild(noProjectsMsg);
    // }

    // Function to validate URL
    function isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }

    // Addition of skills and file uploads
    const skillsDropdown = document.getElementById('skills-dropdown');
    const addSkillBtn = document.getElementById('add-skill-btn');
    const skillsList = document.getElementById('skills-list');

    addSkillBtn.addEventListener('click', function() {
        const selectedSkill = skillsDropdown.value;

        if (selectedSkill && !isSkillAlreadyAdded(selectedSkill)) {
            // Create a new list item for the selected skill
            const skillItem = document.createElement('li');
            skillItem.textContent = selectedSkill;

            // Append the new skill to the skills list
            skillsList.appendChild(skillItem);

            // Clear the selected skill from the dropdown
            skillsDropdown.value = "";
        }
    });

    // Function to check if a skill is already added
    function isSkillAlreadyAdded(skill) {
        return Array.from(skillsList.children).some(item => item.textContent === skill);
    }

    // File upload handling (Optional: Implement your own logic)
    const resumeInput = document.getElementById('resume');
    const coverLetterInput = document.getElementById('cover-letter');
    const certificatesInput = document.getElementById('certificates');

    // View document buttons
    const viewResumeBtn = document.getElementById('view-resume-btn');
    const viewCoverLetterBtn = document.getElementById('view-cover-letter-btn');
    const viewCertificatesBtn = document.getElementById('view-certificates-btn');

    const certificatesGallery = document.getElementById('certificates-gallery');

    // Function to handle file selection
    function handleFileSelection(input, viewButton) {
        input.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                viewButton.disabled = false;
            } else {
                viewButton.disabled = true;
            }
        });
    }

    // Function to open file in a new tab
    function openFileInNewTab(file) {
        const url = URL.createObjectURL(file);
        window.open(url, '_blank');
    }

    // View document button click handling
    viewResumeBtn.addEventListener('click', function() {
        const file = resumeInput.files[0];
        if (file) {
            openFileInNewTab(file);
        }
    });

    viewCoverLetterBtn.addEventListener('click', function() {
        const file = coverLetterInput.files[0];
        if (file) {
            openFileInNewTab(file);
        }
    });

    // Event listener for viewing certificates
    viewCertificatesBtn.addEventListener('click', function() {
        const files = certificatesInput.files;
        if (files.length > 0) {
            // Iterate through each selected certificate file
            Array.from(files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    // If the file is an image, create a preview
                    createImagePreview(file);
                } else if (file.type === 'application/pdf') {
                    // If the file is a PDF, create a preview
                    createPdfPreview(file);
                }
            });
        } else {
            alert('No certificates selected.');
        }
    });

    // Function to create an image preview
    function createImagePreview(file) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const certificatePreview = document.createElement('img');
            certificatePreview.src = event.target.result;
            certificatePreview.alt = file.name;
            certificatePreview.classList.add('certificate-image');

            certificatesGallery.appendChild(certificatePreview);

            // Add click event listener to expand image
            certificatePreview.addEventListener('click', function() {
                openModal(event.target.src, file.name);
            });
        };

        reader.readAsDataURL(file);
    }

    // Function to create a PDF preview
    function createPdfPreview(file) {
        const certificatePreview = document.createElement('div');
        certificatePreview.textContent = file.name;
        certificatePreview.classList.add('certificate-pdf');

        certificatesGallery.appendChild(certificatePreview);

        // Add click event listener to open PDF in a new tab
        certificatePreview.addEventListener('click', function() {
            openPdfInNewTab(file);
        });
    }

    // Function to open PDF in a new tab
    function openPdfInNewTab(file) {
        const url = URL.createObjectURL(file);
        window.open(url, '_blank');
    }

    // Function to open modal with enlarged image
    function openModal(imageSrc, imageName) {
        const modalOverlay = document.createElement('div');
        modalOverlay.classList.add('modal-overlay');

        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');

        const modalImage = document.createElement('img');
        modalImage.src = imageSrc;
        modalImage.alt = imageName;

        modalContainer.appendChild(modalImage);
        modalOverlay.appendChild(modalContainer);

        document.body.appendChild(modalOverlay);

        // Event listener to close modal when clicking outside the image
        modalOverlay.addEventListener('click', function() {
            document.body.removeChild(modalOverlay);
        });
    }

    //Photo upload handling
    const photoUploadInput = document.getElementById('photo-upload');
    const photoGallery = document.getElementById('photos-gallery');

    document.getElementById('add-photo-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const file = photoUploadInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const imageUrl = event.target.result;

                // Create new image element
                const newImage = document.createElement('img');
                newImage.src = imageUrl

                //Append the new image to the photos gallery
                photoGallery.appendChild(newImage);

                //Clear the file input
                photoUploadInput.value = "";
            };
            reader.readAsDataURL(file);
        }
    });
});