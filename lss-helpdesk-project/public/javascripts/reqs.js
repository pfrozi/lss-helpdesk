$(document).ready(function () {

    $('#mnuAllReqs').addClass('active');


    $('.btn-remove').button().click(function(){

            $('.chkSelect:checked').each(function() {

                var id = $(this).parent().find(".inputId").val();
                $.ajax({
                      url: "/reqs/" + id + "/delete"
                    , dataType: "json"
                    , success: function(result){
                        console.log(result);
                }});
            });


        }
    );
});
