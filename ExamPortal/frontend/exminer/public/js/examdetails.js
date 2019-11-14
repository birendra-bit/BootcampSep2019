var tempExamCode = ''
$(document).ready(function() {
    const tok = localStorage.getItem('token');
    if (tok == null) {
        location.replace("../../index.html")
    }
    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');

    allWells.hide();

    navListItems.click(function(e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function() {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
            if (!curInputs[i].validity.valid) {
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-primary').trigger('click');
});

$(document).ready(function() {
    $('.loader').hide()
    document.getElementById('btnSave').addEventListener('click', validateForm)

    function validateForm() {
        var testName = document.getElementById("addExamName").value;
        var testCode = document.getElementById("addExamCode").value;
        var testDuration = document.getElementById("addExamDuration").value;
        var testDate = document.getElementById("addExamTestDate").value;
        var testInstruction = document.getElementById("addExamInstruction").value;
        var token = window.localStorage.getItem('token');
        if (testName === "") {
            alert("Please enter test name");
        } else {

            testName = true;
        }

        if (testCode === "") {
            alert("Please enter test code");
        } else {
            testCode = true;
        }


        if (testDuration === "") {
            alert("Please enter test duration");
        } else {
            testDuration = true;
        }


        if (testDate == "") {
            alert("Please enter your test date");
        }  else {
                const testD=testDate.slice(0,10);
                const testd=testDate.slice(11,16)
                testDate=testD.concat(" "+testd+":00")
                
            }
            
    
        if ((testName || testCode || testDuration ) == true) {
                tempExamCode= $('#addExamCode').val()
            let examDetail = {
                examName: $('#addExamName').val(),
                examCode: $('#addExamCode').val(),
                examDuration: $('#addExamDuration').val(),
                examStartTime: testDate,
                instructions: $('#addExamInstruction').val(),
                examinerId: token
            }
            $.ajax("http://localhost:3000/exam", {
                type: "POST",
                dataType: "json",
                headers: {
                    token: localStorage.getItem('userToken')
                },
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(examDetail),
                contentType: "application/json; charset=utf-8",
                success: function(data, status) {
                    document.getElementById("addExamName").value=' ';
                    document.getElementById("addExamCode").value=' ';
                    document.getElementById("addExamDuration").value=' ';
                    document.getElementById("addExamTestDate").value=' ';
                    document.getElementById("addExamInstruction").value=' ';
                },
                error: function(error) {
                    console.log("error : " + error)
                }
            })
        } else {
            return false;
        }
    }
})

$(document).ready(function() {
    $('.loader').hide()
    document.getElementById('submitBtn').addEventListener('click', validateForm)

    function validateForm() {
        var question = document.getElementById("addtestQuestion").value;
        var option1 = document.getElementById("addtestOption1").value;
        var option2 = document.getElementById("addtestOption2").value;
        var option3 = document.getElementById("addtestOption3").value;
        var option4 = document.getElementById("addtestOption4").value;
        var answer = document.getElementById("addtestAnswer").value;
        var weightage = document.getElementById("addtestWeightage").value;

        if (question === "") {
            alert("Please enter question");
        } else {

            question = true;
        }

        if (option1 === "") {
            alert("Please enter 1st option");
        } else {
            option1 = true;
        }


        if (option2 === "") {
            alert("Please enter 2nd option");
        } else {
            option2 = true;
        }
        if (option3 === "") {
            alert("Please enter 3rd option");
        } else {
            option3 = true;
        }


        if (option4 === "") {
            alert("Please enter  4th");
        } else {
            option4 = true;
        }

        if (answer == "") {
            alert("Please enter correct option");
        } else {
            answer = true;
        }

        if (weightage === "") {
            alert("Please enter weightage");
        } else {
            weightage = true;
        }

        if ((question || option1 || option2 || option3 || option4 || answer || weightage) == true) {
            let examDetail = {
                questionText: $('#addtestQuestion').val(),
                answer: $('#addtestAnswer').val(),
                options: {
                    option1: $('#addtestOption1').val(),
                    option2: $('#addtestOption2').val(),
                    option3: $('#addtestOption3').val(),
                    option4: $('#addtestOption4').val(),
                },
                weightage: $('#addtestWeightage').val(),
                examCode: tempExamCode
            }
            $.ajax("http://localhost:3000/exam/question", {
                type: "POST",
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(examDetail),
                contentType: "application/json; charset=utf-8",
                success: function(data, status) {
                    document.getElementById("addtestQuestion").value = '';
                    document.getElementById("addtestOption1").value = '';
                    document.getElementById("addtestOption2").value = '';
                    document.getElementById("addtestOption3").value = '';
                    document.getElementById("addtestOption4").value = '';
                    document.getElementById("addtestAnswer").value = '';
                    document.getElementById("addtestWeightage").value = '';
                },
                error: function(error) {
                    console.log("error : " + error)
                }
            })
        } else {
            return false;
        }
    }
})

function logout() {
    localStorage.removeItem("token")
    location.replace("../../index.html")
}
