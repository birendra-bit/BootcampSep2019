$(document).on('click', '#loginButton', function() {
    let email = $('#inputEmail').val()
    let password = $('#inputPassword').val()
    $.ajax('http://localhost:3000/login', {
        type: 'POST',
        dataType: 'JSON',
        data: {
            'email': email,
            'password': password
        },
        success: function(data) {
            localStorage.setItem('token', data.token)
         //here i have used accountType to redirect to respective page
            if (data.accountType == "Examiner")
                $(location).attr('href', '../../exminer/views/examiner.html')
            else if (data.accountType == "Student")
                $(location).attr('href',  './accessKey.html')
            else {
               $(location).attr('href', '../../admin/views/adminHome.html')
            }
        },
        error: function(error) {
            console.log(error)
        }

    })
})