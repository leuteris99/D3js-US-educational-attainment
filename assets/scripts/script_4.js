var pie_chart = document.getElementById("pie-chart");
var s_chart = document.getElementById("chart");
var stacked_bar_chart = document.getElementById("stacked-bar-chart");

var national = document.getElementsByClassName("national");
var regional = document.getElementsByClassName("regional");
var state = document.getElementsByClassName("state");

var national_item = document.getElementsByClassName("national_item");
var regional_item = document.getElementsByClassName("regional_item");
var state_item = document.getElementsByClassName("state_item");

var selected = 0;
MenuSelect();

for(var i = 0; i < national.length; i++){
    national[i].addEventListener('click', function (event) {
        selected = 0;
        MenuSelect();
      });
}

for(var i = 0; i < regional.length; i++){
    regional[i].addEventListener('click', function (event) {
        selected = 1;
        MenuSelect();
      });
}

for(var i = 0; i < state.length; i++){
    state[i].addEventListener('click', function (event) {
        selected = 2;
        MenuSelect();
      });
}

function MenuSelect(){
    switch(selected){
        case 0:
            pie_chart.style.display = "block";
            s_chart.style.display = "none";
            stacked_bar_chart.style.display = "none";

            for(var i = 0; i < national_item.length; i++){
                national_item[i].style.display = "block";
            }
            for(var i = 0; i < regional_item.length; i++){
                regional_item[i].style.display = "none";
            }
            for(var i = 0; i < state_item.length; i++){
                state_item[i].style.display = "none";
            }
            break;
        case 1:
            pie_chart.style.display = "none";
            s_chart.style.display = "block";
            stacked_bar_chart.style.display = "none";

            for(var i = 0; i < national_item.length; i++){
                national_item[i].style.display = "none";
            }
            for(var i = 0; i < regional_item.length; i++){
                regional_item[i].style.display = "block";
            }
            for(var i = 0; i < state_item.length; i++){
                state_item[i].style.display = "none";
            }
            break;
        case 2:
            pie_chart.style.display = "none";
            s_chart.style.display = "none";
            stacked_bar_chart.style.display = "block";

            for(var i = 0; i < national_item.length; i++){
                national_item[i].style.display = "none";
            }
            for(var i = 0; i < regional_item.length; i++){
                regional_item[i].style.display = "none";
            }
            for(var i = 0; i < state_item.length; i++){
                state_item[i].style.display = "block";
            }
            break;
        default:
            pie_chart.style.display = "none";
            s_chart.style.display = "none";
            stacked_bar_chart.style.display = "none";

            for(var i = 0; i < national_item.length; i++){
                national_item[i].style.display = "none";
            }
            for(var i = 0; i < regional_item.length; i++){
                regional_item[i].style.display = "none";
            }
            for(var i = 0; i < state_item.length; i++){
                state_item[i].style.display = "none";
            }
            break;
    }
}