$(document).ready(function() {
  getIdeas();
  createIdea();
  deleteIdea();
  searchIdeas();
  editTitle();
  editBody();
});

function renderIdea(idea) {
  var body = truncateBody(idea.body);

  $("#latest-ideas").prepend(
    "<div class='idea' data-id='"
    + idea.id
    + "'><h6>Published on "
    + idea.created_at
    + "</h6><p>"
    + "<b id='idea-title' contentEditable='true'>"
    + idea.title
    + "</b><p id='idea-body' contentEditable='true'>"
    + body
    + "</p><p id='idea-quality"
    + idea.id
    + "'>Quality: "
    + idea.quality
    + "<p><button id='upvote-idea"
    + idea.id
    + "' name='button-fetch' class='btn btn-default btn-xs'>+</button>"
    + "  <button id='downvote-idea"
    + idea.id
    + "' name='button-fetch' class='btn btn-default btn-xs'>-</button>"
    + "</p>"
    + "<button id='delete-idea' name='button-fetch' class='btn btn-default btn-xs'>Delete</button>"
    + "  <button id='edit-idea' name='button-fetch' class='btn btn-default btn-xs'>Edit</button>"
    + "</div>"
  );
    upvoteIdea(idea.id);
    downvoteIdea(idea.id);
}

function truncateBody(body) {
  if (body.length > 100) {
    var trimmedBody = body.substring(0,98);
    return trimmedBody.substring(0, Math.min(trimmedBody.length, trimmedBody.lastIndexOf(' '))) + '...'
  } else {
    return body
  };
}

function getIdeas() {
  $.getJSON('api/ideas.json')
    .then(function(ideas){
      $.each(ideas, function(index, idea){
        renderIdea(idea)
    });
  });
}

function createIdea() {
  $('#create-idea').on('click', function(){
    var ideaTitle  = $('#idea-title').val()
    var ideaBody   = $('#idea-body').val()
    var ideaParams = {
      idea: {
        title: ideaTitle,
        body: ideaBody
      }
    }

    $('#idea-title').val('');
    $('#idea-body').val('');

    $.post("api/ideas.json", ideaParams, $(this).serialize())
      .done(renderIdea);
  });
}

function deleteIdea() {
  $('#latest-ideas').delegate('#delete-idea', 'click', function() {
    var $idea = $(this).closest('.idea');

    $.ajax({
      type: 'DELETE',
      url: 'api/ideas/' + $idea.attr('data-id') + '.json',
      success: function(response) {
        $idea.remove();
      }
    });
  });
}

function searchIdeas() {
  $("#filter").keyup(function(){
		var filter = $(this).val();
		$("#latest-ideas").children().each(function(){
			if ($(this).text().search(new RegExp(filter, "i")) < 0) {
				$(this).fadeOut();
			} else {
				$(this).show();
			}
		});
	});
}

function upvoteIdea(id) {
  $('#upvote-idea' + id).on('click', function(){
    event.preventDefault();

    $.getJSON('/api/ideas/' + id, function(idea){
      var newQuality = function(){
        if (idea.quality === 'swill'){
          return 'plausible'
        } else { return 'genius'}
      };

      $.ajax({
        type: 'PUT',
        url: '/api/ideas/' + id + '.json',
        data: {
          idea: {quality: newQuality}
        },
        success: function(idea){
          $('#idea-quality' + id).html(newQuality);
        }
      })
    })
  })
}

function downvoteIdea(id) {
  $('#downvote-idea' + id).on('click', function(){
    event.preventDefault();

    $.getJSON('/api/ideas/' + id, function(idea){
      var newQuality = function(){
        if (idea.quality === 'genius'){
          return 'plausible'
        } else { return 'swill'}
      };

      $.ajax({
        type: 'PUT',
        url: '/api/ideas/' + id + '.json',
        data: {
          idea: {quality: newQuality}
        },
        success: function(idea){
          $('#idea-quality' + id).html(newQuality);
        }
      })
    })
  })
}

function editTitle() {
  $('#latest-ideas').delegate('#idea-title', 'keydown', function(event) {
    if(event.which == 13 || event.keyCode == 13){
      var $title = event.currentTarget.textContent
      var $id = $(this).closest('.idea').attr('data-id')
      var params = {
        idea: {
          title: $title,
        }
      }
      event.preventDefault();
      this.blur();
      ideaAjaxCall($id, params);
    }
  });
}

function editBody() {
  $('#latest-ideas').delegate('#idea-body', 'keydown', function(event) {
    if(event.which == 13 || event.keyCode == 13){
      var $body = event.currentTarget.textContent
      var $id = $(this).closest('.idea').attr('data-id')
      var params = {
        idea: {
          body: $body,
        }
      }
      event.preventDefault();
      this.blur();
      ideaAjaxCall($id, params);
    }
  });
}

function ideaAjaxCall(id, params) {
  $.ajax({
    type: 'PUT',
    url: '/api/ideas/' + id + '.json',
    data: params,
    success: function(idea){
    }
  });
}
