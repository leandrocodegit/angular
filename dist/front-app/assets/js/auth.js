

navigate = this.router
var login_event = function(response) {

  console.log(JSON.stringify(login_event))
  
  if(response.authResponse!= null)
  if(response.authResponse.accessToken != null)

   
  if(localStorage.getItem("isLogado") != 'true')
    if (response.status === 'connected') {
      FB.api('/me?fields=id,name,email,picture', function (result) {
        console.log('Checando status facebook ********************** ' + JSON.stringify(result))
        var user = JSON.parse(JSON.stringify(result))
        if (user != null) {               
          localStorage.setItem("isLogado", "true")
          localStorage.setItem("user", JSON.stringify(user))
          localStorage.setItem("name", user.name)
          localStorage.setItem("email", user.email)
          localStorage.setItem("type", "facebook")
          localStorage.setItem("token", response.authResponse.accessToken)       
          document.getElementById('eventBT').click()          
        }
      });          
    }   
    

    if (localStorage.getItem('isLogado') == 'true') {
      var interval = setInterval(() => {
         
        clearInterval(interval)
      }, 2000)
      
    }
          
      
} 

FB.Event.subscribe('auth.authResponseChange', login_event);
