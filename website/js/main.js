$(function(){
    $(".alert").hide();
    $("#loginform").submit(function(e){
        e.preventDefault();
        closeAlert();

        var input = $("#loginform :input").serializeArray();

        $.post("util/Login.php", input, function(data){
            showAlert(data);
        });
    });
    $("#close-alert").click(function(){
        closeAlert();
    });
    $("a[href='#colorblind']").click(function(){
        var cur = $('#stylesheet').attr("href");
        if(cur == "css/red.css") {
            $('#stylesheet').attr("href", "css/colorblind.css");
        } else {
            $('#stylesheet').attr("href", "css/red.css");
        }
    });

    $("#logout").click(function(){
        closeAlert();
        $.get("util/Logout.php", function(data){
            showAlert(data);
        });
    });

    $("#main-body").ready(function(){
        var user = getUrlVar('user');
        $.get("ajax/table.php?user="+user, function(data){
            $("#main-body").empty().append(data).queue(function(){
                $("#main-table").dynatable().queue(function(){
                    $(this).dequeue();
                });
                $("#dynatable-query-search-main-table").addClass("form-control");
                $("#dynatable-per-page-main-table").addClass("form-control");
                $(this).dequeue();
            });
        });
    });
});

function getUrlVar(key){
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
    return result && unescape(result[1]) || "";
}

function showAlert(data){
    $("#alert-text").empty().append(data);
    $(".alert").slideDown();
    $("#topcontent").animate({
        'padding-top': 40,
        'margin-bottom': -40,
    });
}
function closeAlert(){
    $(".alert").slideUp();
    $("#topcontent").animate({
        'padding-top': 0,
        'margin-bottom': 0,
    });
}
