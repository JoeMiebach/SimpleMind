var keys = {};

window.onwheel =  function(event){
    if(keys[17]==true){
        console.log("scroll");
    }
};

window.onkeyup = function(e) { keys[e.keyCode] = false; }
window.onkeydown = function(e) { keys[e.keyCode] = true; }