// this page will create dom to display details of students
var students_details = [{
        studentId: '1',
        studentName: 'Rawat',
        testId: '1011',
        attempted: '10',
        correct: '5',
        unattempted: '0',
        totalScore: '10',
        percentage: '80%'
    },
    {
        studentId: '1',
        studentName: 'Rawat',
        testId: '1011',
        attempted: '10',
        correct: '5',
        unattempted: '0',
        totalScore: '10',
        percentage: '80%'
    },
    {
        studentId: '1',
        studentName: 'Rawat',
        testId: '1011',
        attempted: '10',
        correct: '5',
        unattempted: '0',
        totalScore: '10',
        percentage: '80%'
    },
    {
        studentId: '2',
        studentName: 'Rawat',
        testId: '1011',
        attempted: '10',
        correct: '5',
        unattempted: '0',
        totalScore: '10',
        percentage: '80%'
    }
]


function showStudents() {
    const tok = localStorage.getItem('token');
    if (tok == null) {
        location.replace("../../index.html")
    }

    $.ajax("http://localhost:3000/performance", {
        type: 'GET',
        dataType: 'JSON',
        success: function(data) {
            let i = 0;
            let count = 1;
            // console.log(data.b[0].name)
            // console.log(data.b.length)

            while (i < data.b.length) {

                let tr = document.createElement('tr')
                    //let td = document.createElement('td')
                    // create attribute and set id in all fields
                tr.innerHTML = "<td userId='" + data.b[i]._id + "' id='" + count + "' onclick='studentDetails(this)'>" + count + "</td>";

                // tr.append(td)
                // let td1 = document.createElement('td')
                // td1.innerHTML = data.b[i].name;
                // tr.append(td1)
                $("#tbdy").append(tr)

                i++;
                count++;
                // console.log(document.getElementById("1").parentNode)
            }
        },
        error: function(error) {}
    })
}

function logout() {
    localStorage.removeItem("token")
    location.replace("../../index.html")
}

function studentDetails(this) {
    $.ajax("http://localhost:3000/performance/", {
        type: 'GET',
        dataType: 'JSON',
        success: function(data) {
            let i = 0;
            let count = 1;
            // console.log(data.b[0].name)
            // console.log(data.b.length)

            while (i < data.b.length) {

                let tr = document.createElement('tr')
                    //let td = document.createElement('td')
                    // create attribute and set id in all fields
                tr.innerHTML = "<td userId='" + data.b[i]._id + "' id='" + count + "' onclick='studentDetails(this)'>" + count + "</td>";

                // tr.append(td)
                // let td1 = document.createElement('td')
                // td1.innerHTML = data.b[i].name;
                // tr.append(td1)
                $("#tbdy").append(tr)

                i++;
                count++;
                // console.log(document.getElementById("1").parentNode)
            }
        },
        error: function(error) {}
    })
}