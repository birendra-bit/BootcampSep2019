$(document).ready(function(){
    const tok =localStorage.getItem('token');
    if(tok == null)
    {
      location.replace("../../index.html")
    }
})
function logout()
{
    localStorage.removeItem('token');
}
function showEdit() {
    $("#showEditDiv").fadeIn("slow");
    $.ajax("http://localhost:3000/loggedIn", {
        type: 'GET',
        dataType: 'JSON',
        headers: {
            "token": localStorage.getItem('token'),
        },
        success: function(data) {

            changeInputFields(data)

        },
        error: function(error) {
            console.log('not working')
        }
    })
}

function showName() {
    $.ajax("http://localhost:3000/loggedIn", {
        type: 'GET',
        dataType: 'JSON',
        headers: {
            "token": localStorage.getItem('token'),
        },
        success: function(data) {

            console.log(data.name)
            document.getElementById('span').innerHTML = 'Welcome ' + data.name + '! &nbsp; &nbsp; '

        },
        error: function(error) {
            console.log('not working')
        }
    })

}

function changeInputFields(data) {
    console.log(data.collegeName)
    document.getElementById('loggedInEmail').value = data.email;
    document.getElementById('loggedInName').value = data.name;
    document.getElementById('loggedInPhone').value = data.phoneNumber;
    document.getElementById('loggedInCollege').value = data.collegeName;

}

function editDetails() {
    var email = document.getElementById('loggedInEmail').value
    var name = document.getElementById('loggedInName').value
    var phone = document.getElementById('loggedInPhone').value
    var college = document.getElementById('loggedInCollege').value
    var pass = document.getElementById('loggedInPassword').value
    $.ajax("http://localhost:3000/examiner", {
        type: 'PATCH',
        dataType: 'JSON',
        headers: {
            "token": localStorage.getItem('token'),
        },
        data: ({
            "email": email,
            "name": name,
            "phoneNumber": phone,
            "collegeName": college,
            "password": pass
        }),
        success: function(data) {

            // console.log('updated')
            window.alert('User Details Updated !')
            hideEditDetails()
            showName()


        },
        error: function(error) {
            // console.log('not updated')
            window.alert('Not Updated')
        }
    })
}

function hideEditDetails() {
    $("#showEditDiv").fadeOut("slow");
}

function logout() {
    localStorage.removeItem("token")
    location.replace("../../index.html")
}