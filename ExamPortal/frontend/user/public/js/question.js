function loadQuestions(data,startTime,duration, examName){
    const questionTemplate = document.querySelector('#question-template').innerHTML
    $('.showTest').text(examName)
    setTimeForTest(startTime,duration)
    $('#options').empty()
    const op = document.querySelector('#options')
    const html = Mustache.render(questionTemplate,{questions:data[0]})
    op.insertAdjacentHTML("beforeend",html)
    showPreviousTicks()
}

function loadPaginaton(questions){
    const paginationTemplate = document.querySelector('#pagination-template').innerHTML
    const op = document.querySelector('.pagination-card')
    for(i=0;i<questions.length;i++){
        let j = i + 1
        const html = Mustache.render(paginationTemplate,{pages : j,id:questions[i]._id})
        op.insertAdjacentHTML("beforeend",html)
    }

}
function setTimeForTest(time,duration){
    let testStartTime = new Date(time).getTime()
    let testEndTime = new Date(testStartTime+duration*600000).getTime()
    var x = setInterval(function(){
        let testPresentTime = new Date().getTime()
        let leftTestTime = testEndTime - testPresentTime
        var hours = Math.floor((leftTestTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((leftTestTime % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((leftTestTime % (1000 * 60)) / 1000);
        document.getElementById("showTime").innerHTML = hours + "h "+ minutes + "m " + seconds + "s ";
        if (leftTestTime < 0) {
            clearInterval(x);
            $(location).attr('href','./endTest.html')
            localStorage.clear()
        }
    },1000)
}

function showPreviousTicks(){
    let keys = Object.keys(localStorage)
    for(let i=0;i<keys.length;i++){
        if(keys[i].length > 20){
            let value = localStorage.getItem(keys[i])
            $(`input[name=${keys[i]}][value=${value}]`).prop('checked',true)
        }
    }
}

$(document).ready(function(){
    const tok =localStorage.getItem('token');

    if(tok == null){
      location.replace("../../index.html")
    }

    $('#nextQuestion').attr('value',0)
    $('#previousQuestion').attr({'value':0,'disabled':true})
    $.ajax('http://localhost:3000/test',{
        type:'GET',
        dataType: 'JSON',
        headers: {
            examCode: localStorage.getItem('examCode'),
            token: localStorage.getItem('token')
        },
        data:{
            pageNumber: $('#nextQuestion').attr('value')
        },
        success: function(data){
            data.duration = parseInt(data.duration)
            loadQuestions(data.questions,data.startTime,data.duration,data.examName)
            loadPaginaton(data.allQuestions)
        },
        error: function(err){
            console.log(err)
        }
    })
})

$(document).on('click','#submitAnswer',function(){
    let questionId = $(this).parent().parent().parent().parent().children().children().children().attr('id')
    let examCode = $(this).parent().parent().parent().parent().children().children().children().children().attr('id')
    let radioValue = $(`input[name=${questionId}]:checked`).val()
    $.ajax('http://localhost:3000/test',{
        type: 'POST',
        dataType: 'JSON',
        headers:{
            token: localStorage.getItem('token')
        },
        data:{
            code: examCode,
            checkedOption: radioValue,
            qId : questionId
        },
        success: function(data){
            console.log(data.msg)
        },
        error: function(error){
            console.log(error)
        }
    })
})

$(document).on('click','#nextQuestion',function(){
    let page = parseInt($('#nextQuestion').attr('value'))
    $('#nextQuestion').attr('value',page+1)
    if( $('#nextQuestion').attr('value')!= 0){
        $('#previousQuestion').removeAttr("disabled");
    }
    $.ajax('http://localhost:3000/test',{
        type:'GET',
        dataType: 'JSON',
        headers: {
            examCode: localStorage.getItem('examCode'),
            token: localStorage.getItem('token')
        },
        data:{
            pageNumber: $('#nextQuestion').attr('value')
        },
        success: function(data){
            loadQuestions(data.questions,data.startTime,data.duration)
            if(data.lastQuestionStatus === true){
                $('#nextQuestion').attr('disabled',true)
            }
        },
        error: function(err){
            console.log(err)
        }
    })
})

$(document).on('click','#previousQuestion',function(){
    let pageNumber = parseInt($('#nextQuestion').attr('value'))-1
    $('#nextQuestion').attr('value',pageNumber)
    if(pageNumber == 0){
        $('#previousQuestion').attr({'value':0,'disabled':true})
    }
    $.ajax('http://localhost:3000/test',{
        type:'GET',
        dataType: 'JSON',
        headers: {
            examCode: localStorage.getItem('examCode'),
            token: localStorage.getItem('token')
        },
        data:{
            pageNumber: pageNumber
        },
        success: function(data){
            if(data.lastQuestionStatus === false){
                $('#nextQuestion').removeAttr('disabled')
            }
            loadQuestions(data.questions,data.startTime,data.duration)
        },
        error: function(err){
            console.log(err)
        }
    })
})

$(document).on('click','#modalEndTest',function(){
    $(location).attr('href','./endTest.html')
})

$(document).on('click','#resetRadio',function(){
    let questionId = $(this).parent().parent().parent().parent().children().children().children().attr('id')
    $(`input[name=${questionId}]:checked`).prop("checked",false)
})

$(document).on('click',"input[type='radio']",function(){
    let questionId = $(this)[0].name
    let answer = $(this)[0].value
    localStorage.setItem(questionId,answer)
})

$(document).on('click','.circle',function(){
    let upcomingPage = parseInt($(this).children().html())-1
    $.ajax('http://localhost:3000/test',{
        type:'GET',
        dataType: 'JSON',
        headers: {
            examCode: localStorage.getItem('examCode'),
            token: localStorage.getItem('token')
        },
        data:{
            pageNumber: upcomingPage
        },
        success: function(data){
            loadQuestions(data.questions, data.startTime, data.duration)
        },
        error: function(error){
            console.log(error)
        }
    })
})