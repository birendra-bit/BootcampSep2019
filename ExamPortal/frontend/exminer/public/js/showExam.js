
function showQuestion(id){
    // eid = $('#'+id).parent().parent().attr('id')
    let examCode = $('#'+id).parent().prev().prev().prev().find('p').html()
    
    let mainId = $('#'+id).parent().parent().parent().parent().attr('id')
    
    let url = "http://localhost:3000/exam/question/"+encodeURIComponent(examCode)
    $('#'+mainId).hide()
        $.ajax(url, {
            type: 'GET',
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            headers:{
                token:localStorage.getItem('token')
            },
            success: function(data) {
                $.each(data, (index, item) => {
                    let indexTemplate = $("#index-template").html();
                    item.index=index+1
                    $("#question-Index").append(Mustache.render(indexTemplate, item ))
                    let questionContent = $("#question-template-body").html()
                    item.index = index + 1
                    $("#question-Display").append(Mustache.render(questionContent, item))
            
                })
                },
            error: function(error) {
               console.log(error)
            }
        })
}
function removeQuestion(id){
    let qsId = $("#"+id).parent().parent().attr('id')
    $.ajax("http://localhost:3000/exam/question/"+qsId, {
        type: 'DELETE',
        dataType: 'json',
        contentType: "application/json",
        headers:{
            token:localStorage.getItem('token')
        },
        success: function(data) {
            location.reload(true)
            },
        error: function(error) {
           console.log(error)
            }
        }) 
}
function updateQues(id){
    
    let questionDetail = {
        questionText: $('#addtestQuestion').val(),
        answer: $('#addtestAnswer').val(),
        options :{
        option1: $('#addtestOption1').val(),
        option2: $('#addtestOption2').val(),
        option3: $('#addtestOption3').val(),
        option4: $('#addtestOption4').val(),
        },
        weightage: $('#addtestWeightage').val(),
    }
    $.ajax("http://localhost:3000/exam/question/"+id, {
    type: 'PATCH',
    dataType: 'json',
    contentType: "application/json",
    headers:{
        token:localStorage.getItem('token')
    },
    data:JSON.stringify(questionDetail),
    success: function(data) {
       location.reload(true)
        },
    error: function(error) {
       console.log(error)
        }
    }) 
}
function editQuestion(id) {
   let qid = $("#"+id).parent().parent().attr('id')
   let pid = $("#"+qid).parent().parent().parent().parent().attr('id')

   $('#'+pid).hide()
   $.ajax("http://localhost:3000/exam/question/byid/"+qid, {
    type: 'GET',
    dataType: 'json',
    contentType: "application/json",
    headers:{
        token:localStorage.getItem('token')
    },
    success: function(data) {
        let editTemplate = $("#edit-question-template").html();
            $("#display-edit-form").append(Mustache.render(editTemplate, data))
        },
    error: function(error) {
       console.log(error)
    }
})
   
}
function updateExam(examObjId){
    let examDetail = {
        examName: $('#addExamName').val(),
        examCode: $('#addExamCode').val(),
        examDuration: $('#addExamDuration').val(),
        examStartTime: $('#addExamDate').val(),
        instructions: $('#addExamInstruction').val()
    }
    $.ajax("http://localhost:3000/exam/"+examObjId, {
        type: 'PATCH',
        dataType: 'json',
        contentType: "application/json",
        headers:{
            token:localStorage.getItem('token')
        },
        data:JSON.stringify(examDetail),
        success: function(data) {
            location.reload(true)
            },
        error: function(error) {
           console.log(error)
        }
    })
}
function editExamDetail(id){
    let examObjId = $('#'+id).parent().parent().attr('id')
    // console.log('examid ',examId)
    let mainId = $('#'+id).parent().parent().parent().parent().attr('id')
    $('#'+mainId).hide()
    $.ajax("http://localhost:3000/exam/"+examObjId, {
        type: 'GET',
        dataType: 'json',
        contentType: "application/json",
        headers:{
            token:localStorage.getItem('token')
        },
        success: function(data) {
        //    console.log(data)
        // console.log(data.instructions)
        let editForm = $("#edit-exam-detail").html()
    $("#display-form").append(Mustache.render(editForm,data))
            },
        error: function(error) {
           console.log(error)
        }
    })
}

function deleteExam(id){
    examObjId =  $('#'+id).parent().parent().attr('id')
    $.ajax("http://localhost:3000/exam/"+examObjId, {
        type: 'DELETE',
        dataType: 'json',
        contentType: "application/json",
        headers:{
            token:localStorage.getItem('token')
        },
        success: function(data) {
            location.reload(true)
            },
        error: function(error) {
           console.log(error)
        }
    })
}

$(document).ready(()=>{
    const tok =localStorage.getItem('token');
    if(tok == null)
    {
      location.replace("../../index.html")
    }
    $.ajax("http://localhost:3000/exam", {
        type: 'GET',
        dataType: 'json',
        contentType: "application/json",
        headers:{
            token:localStorage.getItem('token')
        },
        success: function(data) {
        let parent = $(".exam-detail")
        // load html template to display exam detail
        $.each(data, (index , values )=>{
        let html = $('#display-exam-detail').html()
        values.index = index
        parent.append(Mustache.render(html,values))
                })
            },
        error: function(error) {
           console.log(error)
        }
    })
})