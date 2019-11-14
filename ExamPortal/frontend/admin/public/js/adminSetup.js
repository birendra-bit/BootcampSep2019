$(document).ready(function(){
  const token =localStorage.getItem('token');
  if(token == null)
  {
    location.replace("../../index.html")
  }
  
    $("#submit").click(function(e){
        e.preventDefault();
        var email=document.getElementById("email").value;
        var name=document.getElementById("name").value;
        var password=document.getElementById("password").value;
        var accountype=document.getElementById("accountype").value;
        var phoneno=document.getElementById("phoneno").value;
        var collegename=document.getElementById("collegename").value;

        console.log(email);
        console.log(name);
        console.log(password);
        console.log(accountype);
        console.log(phoneno);
        console.log(collegename);
       
      $.ajax("http://127.0.0.1:3000/signup",{
        type:"POST",
        dataType:"json",
        contentType:"application/json",
        
            data:JSON.stringify(
                {
                  "email":email,
                  "name":name,
                  "password":password,
                  "accountType":accountype,
                  "collegeName":collegename,
                  "phoneNumber":phoneno

                }
            ),
            success:function(recent){ 
              console.log("Data inserted");
              window.location.replace("adminHome.html")
            },
            error:function()
            {
                console.log("Something went wrong");
            }
            
          });
      });
  });