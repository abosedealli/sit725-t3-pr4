// connect to the socket

let socket = io();


socket.on('number', (msg) => {
    console.log('Random number: ' + msg);
})


function createProjectCard(project) {
    return `
  
  <div class="card">
    <div class="card-content">
      <p>${project.title}</p>
    </div>
    <div class="card-tabs">
      <ul class="tabs tabs-fixed-width">
        <li class="tab"><a href="#test4">Test 1</a></li>
        <li class="tab"><a class="active" href="#test5">Test 2</a></li>
        <li class="tab"><a href="#test6">Test 3</a></li>
      </ul>
    </div>
    <div class="card-content grey lighten-4">
      <div id="test4">report 1</div>
      <div id="test5">report 2</div>
      <div id="test6">report 3</div>
    </div>
  </div>
`;
}

$(document).ready(function() {
    $('#slide-out').sidenav();

      $('.modal').modal();
   $('#save-project').click((e)=>{
    alert("You project saved!");
  });


    //test get call
    $.get('/projects', (result) => {
        for (let project of result) {
            $('#projects-list').append(createProjectCard(project));
        }
      console.log(result)
    })
  }) 
