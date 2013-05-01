// Updates/deletes immediately after new To Do created
// Does not update/delete when page is refreshed

$(document).ready(function() {
  
  $("#new_todo_item").on("submit", function(event){
    event.preventDefault();
    var form = $(this);
    var name = $("#todo_item_name").val();
    
    // var completed = $("#todo_item_completed");    

    $.ajax({
      url: form.attr("action"),
      method: form.attr("method"),
      // input name for text field is todo_item[name]
      data: {"todo_item": {"name": name, "completed": false} },
      dataType: "json",
      // register callback function on success
      // doesn't have to be todo_item
      success: function(todo_item) {
        var todo_Id = todo_item.id;
        var listTags = $("<li></li>");
        var itemName = $("<span>" + todo_item.name + "</span>")
        var checkBox = $("<input id='todo_item_completed' name='todo_item[completed]' type='checkbox'>");
        var deleteBtn = $("<button class='deleteBtn'><span class='btnText'>Remove</span></button>");

        $(checkBox).appendTo(listTags);
        $(itemName).appendTo(listTags);
        $(deleteBtn).appendTo(listTags);
        $(listTags).appendTo("#todoItems");
        $("#todo_item_name").val("");

        checkBox.on("click", function(){
          var chkBox = $(this);
          if (chkBox.is(":checked")) {
            chkBox.parent().appendTo("#completedItems").addClass("completed");
             $.ajax({
              url: "/todo_items/" + todo_Id,
              method: "put",
              dataType: "json",
              data: {"todo_item": {"completed": true} },
            });
          } else {
            chkBox.parent().appendTo("#todoItems").removeClass("completed");
            $.ajax({
              url: "/todo_items/" + todo_Id,
              type: "put",
              dataType: "json",
              data: {"todo_item": {"completed": false} },
            });
          };
        });

        deleteBtn.on("click", function(event){
          event.preventDefault();
          var btn = $(this);
          btn.parent().fadeOut(800, function() {btn.parent().remove()});
          $.ajax({
            url: "/todo_items/" + todo_Id,
            type: "post",
            dataType: "json",
            data: {"_method":"delete"}
          });
        })

      },
      error: function(){
        alert("Couldn't add a todo because the server was down :(");
      }
    });
  });
});