// connect to the socket
let socket = io();

socket.on('project:update', (project) => {
  $('#projects-list').append(createprojectCard(project));
})

socket.on('chat:broadcast', (msg) => {
  $("#chat-msg-list").append(createMessage(msg, true));
})

function createProjectCard(project) {
    return `
<div class="col s6 m4 l3 xl2" id="project-id-${project.projectID}"style= "width:320px">
  <div class="card">
  <div class="card-image">
  <img class="activator" src="${project.img ? project.img : 'assets/ale.jpg'}">
   </div>
    <div class="card-content">
    
    <span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span>
    <a class="waves-effect waves-light btn" href="project.html?pid=${project.projectID}">Open</a>
    <p><a class="waves-effect waves-light black btn" onClick="deleteItem(${project.projectID})"><i class="material-icons">delete</i></a></p>
  </div>
</div>
</div>`;
}


function deleteProject(id) {
var settings = {
"url": `/api/projects/${id}`,
"method": "DELETE",
"timeout": 0,
};

$.ajax(settings).done(function (response) {
$(`#project-id-${id}`).remove();
});
}


function getBase64(file) {

return new Promise((resolve, reject) => {

const reader = new FileReader();

reader.readAsDataURL(file);

reader.onload = () => resolve(reader.result);

reader.onerror = error => reject(error);

});

}


function createProject() {
let img = document.querySelector('#project-file').files[0];;
if (img) {
getBase64(img).then(
  d => {
    const project = {
      "projectID": $('#project-id').val(),
      "title": $('#project-title').val(),
      "info": $('#project-info').val(),
      "img": d
    };
    var settings = {
      "url": "/api/projects",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify(project),
    };

    $.ajax(settings).done(function (response) {
      // $('#projects-list').append(projectCard(project))
      $('#project-id').val('');
      $('#project-title').val('');
      $('#project-info').val('');
      $('#project-file').val('');
      $('.modal').modal('close');
      console.log(response);
    });
  }
)
}

}

function createMessage(msg, isRight = false) {
return `<p class="${isRight ? 'msg-right' : 'msg-left'}">
${msg}
</p><br style="clear:both"/>`
}


$(document).ready(function () {
console.log('Ready')

$('.sidenav').sidenav();

$('.modal').modal();

$('#insert-project').click(() => {
createProject();
});


//only works once when the page is fully loaded
$.get('/api/projects', (result) => {
for (let p of result) {
  $('#projects-list').append(createprojectCard(p))
}
console.log(result)
})

$("#chat-send-btn").click(() => {
//send this message to the back-end server
socket.emit("chat:msg", $("#chat-msg").val());
$("#chat-msg-list").append(createMessage($("#chat-msg").val()));
//clearing input
$("#chat-msg").val("");
});

}
/*

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
  
    }); */
)