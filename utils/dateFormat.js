const { format } = require('date-fns');

function dateFormat(date) {
    // This formats the date as 'March 14th, 2023 3:30 PM'
    return format(date, 'MMMM do, yyyy h:mm a');
}

module.exports = dateFormat;