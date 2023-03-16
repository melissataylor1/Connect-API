const { format } = require('date-fns');

function dateFormat(date) {
    return format(date, 'MMMM do, yyyy - h:mm a');
}

module.exports = dateFormat;