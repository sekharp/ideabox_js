$(document).ready(function() {
  getIdeas()
})

function renderIdea(idea) {
  $("#latest-ideas").append(
    "<div class='idea' data-id='"
    + idea.id
    + "'><h6>Published on "
    + idea.created_at
    + "</h6><p>"
    + "<b>"
    + idea.title
    + "</b><p>"
    + idea.body
    + "</p><p>Quality: "
    + idea.quality
    + "  <button id='delete-idea' name='button-fetch' class='btn btn-default btn-xs'>+</button>"
    + "  <button id='edit-idea' name='button-fetch' class='btn btn-default btn-xs'>-</button>"
    + "</p>"
    + "<button id='delete-idea' name='button-fetch' class='btn btn-default btn-xs'>Delete</button>"
    + "  <button id='edit-idea' name='button-fetch' class='btn btn-default btn-xs'>Edit</button>"
    + "</div>"
    )
}

function getIdeas() {
  $.getJSON('api/ideas.json')
    .then(function(ideas){
      $.each(ideas, function(index, idea){
        renderIdea(idea)
    });
  });
}
