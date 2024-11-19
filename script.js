// DOM Elements
const showFormBtn = document.getElementById('showFormBtn');
const meetingForm = document.getElementById('meetingForm');
const addMeetingForm = document.getElementById('addMeetingForm');
const cancelBtn = document.getElementById('cancelBtn');
const meetingsContainer = document.getElementById('meetingsContainer');

// Store meetings in localStorage
let meetings = JSON.parse(localStorage.getItem('meetings')) || [];

// Show/Hide Form
showFormBtn.addEventListener('click', () => {
    meetingForm.classList.remove('hidden');
});

cancelBtn.addEventListener('click', () => {
    meetingForm.classList.add('hidden');
    addMeetingForm.reset();
});

// Add New Meeting
addMeetingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newMeeting = {
        id: Date.now(),
        title: document.getElementById('title').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        participants: document.getElementById('participants').value,
        location: document.getElementById('location').value
    };

    meetings.push(newMeeting);
    saveMeetings();
    displayMeetings();
    addMeetingForm.reset();
    meetingForm.classList.add('hidden');
});

// Delete Meeting
function deleteMeeting(id) {
    if (confirm('Are you sure you want to delete this meeting?')) {
        meetings = meetings.filter(meeting => meeting.id !== id);
        saveMeetings();
        displayMeetings();
    }
}

// Save Meetings to localStorage
function saveMeetings() {
    localStorage.setItem('meetings', JSON.stringify(meetings));
}

// Format Date
function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
function editMeeting(id) {
    const meeting = meetings.find(m => m.id === id);
    if (meeting) {
        // Show the form
        meetingForm.classList.remove('hidden');
        
        // Populate form fields with meeting data
        document.getElementById('title').value = meeting.title;
        document.getElementById('date').value = meeting.date;
        document.getElementById('time').value = meeting.time;
        document.getElementById('participants').value = meeting.participants;
        document.getElementById('location').value = meeting.location;
        
        // Remove the old meeting
        meetings = meetings.filter(m => m.id !== id);
        
        // Update the display
        saveMeetings();
        displayMeetings();
    }
}

// Display Meetings
function displayMeetings() {
    meetingsContainer.innerHTML = meetings
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map(meeting => `
            <div class="meeting-card">
                <div class="meeting-actions">
        <button class="btn-edit" onclick="editMeeting(${meeting.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteMeeting(${meeting.id})">Delete</button>
                </div>
                <h1 style="font-size: 23px; margin-bottom: 4px; font-family: 'Khmer OS', 'Khmer OS System'; color: #11d144;">កិច្ចប្រជុំ</h1>
                <h3 style="font-size: 18px; font-family: 'Khmer OS', 'Khmer OS System';"><b style="color: red;">កម្មវត្ថុ៖​</b>  ${meeting.title}</h3>
                <div class="meeting-info" style="font-size: 16px; font-family: 'Khmer OS', 'Khmer OS System';">ថ្ងៃបរិច្ឆេទ 📅<b>៖</b> ${formatDate(meeting.date)}</div>
                <div class="meeting-info" style="font-size: 16px; font-family: 'Khmer OS', 'Khmer OS System';">ពេលវេលា ⏰<b>៖</b> ${meeting.time}</div>
                ${meeting.location ? `<div class="meeting-info" style="font-size: 16px; font-family: 'Khmer OS', 'Khmer OS System';">បន្ទប់📍<b>៖</b> ${meeting.location}</div>` : ''}
                ${meeting.participants ? `<div class="meeting-info" style="font-size: 16px; font-family: 'Khmer OS', 'Khmer OS System';">អ្នកចូលរួម 👥<b>៖</b> ${meeting.participants}</div>` : ''}
            </div>
        `)
        .join('');
}
// Initial display of meetings
displayMeetings();
