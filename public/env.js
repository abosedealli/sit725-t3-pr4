// connect to the socket
let socket = io();


socket.on('number', (msg) => {
    console.log('Random number: ' + msg);
})


function createProjectCard(project) {
    return `
    <div class="col s6 m4 l3 xl2" id="project-id-${project.projectID}">
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
  console.log('Ready')
  $('#slide-out').sidenav();

  $('.modal').modal();
  $('#insert-project').click(()=>{
    createProjectCard();
  });

  function createProjectCard(){


const project = {
  projectID: $('#project-id').val(),
  title: $('#project-title').val(),
  info: $('#project-description').val(),
  img: null
};



var settings = {
  "url": "/projects",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/json"
  },
  "data": JSON.stringify(project),
};
}
$.ajax(settings).done(function (response) {
  console.log(response);
  $('#projects-list').append(createprojectCard(project));
  $('.modal').modal('close');
  $('#project-id').val('');
  $('#project-title').val('');
  $('#project-description').val('');
  $('#project-file').val('');
});
    //test get call
    $.get('/projects', (result) => {
        for (let project of result) {
            $('#projects-list').append(createProjectCard(project));
        }
      console.log(result)
    })
  }) 

  function deleteProject(projectId) {
    var settings = {
      "url": `/api/projects/${projectId}`,
      "method": "DELETE",
      "timeout": 0,
    };
    
    $.ajax(settings).done(function (response) {
      alert(`#project-id-${projectId}`);
        $(`#project-id-${projectId}`).remove();
    });
  }
  
  function getBase64(file) {
  
    return new Promise((resolve, reject) => {
  
      const reader = new FileReader();
  
      reader.readAsDataURL(file);
  
      reader.onload = () => resolve(reader.result);
  
      reader.onerr = err => reject(err);
  
    });
  
  }
  