'use strict';

$('#myModal').on('shown.bs.modal', () => {
    $('#myInput').focus()
});

document.getElementById('sendContacts').addEventListener('click',  () => {
    window.location.reload();
});

console.log('Mine');