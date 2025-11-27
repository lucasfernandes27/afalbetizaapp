// JavaScript Example: Reading Entities
// Filterable fields: total_xp, level, completed_lessons, achievements, current_streak, last_activity_date
async function fetchUserProgressEntities() {
    const response = await fetch(`https://app.base44.com/api/apps/6927aa7cac5c9bc262ab585f/entities/UserProgress`, {
        headers: {
            'api_key': 'bcf76ec314a74f79a49419e4e36ba556', // or use await User.me() to get the API key
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data);
}

// JavaScript Example: Updating an Entity
// Filterable fields: total_xp, level, completed_lessons, achievements, current_streak, last_activity_date
async function updateUserProgressEntity(entityId, updateData) {
    const response = await fetch(`https://app.base44.com/api/apps/6927aa7cac5c9bc262ab585f/entities/UserProgress/${entityId}`, {
        method: 'PUT',
        headers: {
            'api_key': 'bcf76ec314a74f79a49419e4e36ba556', // or use await User.me() to get the API key
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    });
    const data = await response.json();
    console.log(data);
}