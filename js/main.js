var str = '科研项目及成果展示';
var i = 0;

function typing() {
    var divTyping = document.getElementById('typer');
    if (i < str.length) {
        divTyping.innerHTML = str.slice(0, i++) + '_';
        setTimeout('typing()', 500); //递归调用
    } else {
        divTyping.innerHTML = str; //结束打字,移除 _ 光标
    }
}


typing();


var wrap = document.querySelector(".wrap");
var next = document.querySelector(".arrow_right");
var prev = document.querySelector(".arrow_left");
next.onclick = function () {
    next_pic();
}
prev.onclick = function () {
    prev_pic();
}

function next_pic() {
    index++;
    if (index > 7) {
        index = 0;
    }
    showCurrentDot();
    var newLeft;
    if (wrap.style.left == "-5400px") {
        newLeft = -1200;
    } else {
        newLeft = parseInt(wrap.style.left) - 600;
    }
    wrap.style.left = newLeft + "px";
}

function prev_pic() {
    index--;
    if (index < 0) {
        index = 7;
    }
    showCurrentDot();
    var newLeft;
    if (wrap.style.left === "0px") {
        newLeft = -4200;
    } else {
        newLeft = parseInt(wrap.style.left) + 600;
    }
    wrap.style.left = newLeft + "px";
}
var timer = null;

function autoPlay() {
    timer = setInterval(function () {
        next_pic();
    }, 2000);
}
autoPlay();

var container = document.querySelector(".container");
container.onmouseenter = function () {
    clearInterval(timer);
}
container.onmouseleave = function () {
    autoPlay();
}

var index = 0;
var dots = document.getElementsByTagName("span");

function showCurrentDot() {
    for (var i = 0, len = dots.length; i < len; i++) {
        dots[i].className = "";
    }
    dots[index].className = "on";
}

for (var i = 0, len = dots.length; i < len; i++) {
    (function (i) {
        dots[i].onclick = function () {
            var dis = index - i;
            if (index == 7 && parseInt(wrap.style.left) !== -4800) {
                dis = dis - 8;
            }
            //和使用prev和next相同，在最开始的照片5和最终的照片1在使用时会出现问题，导致符号和位数的出错，做相应地处理即可
            if (index == 0 && parseInt(wrap.style.left) !== -600) {
                dis = 8 + dis;
            }
            wrap.style.left = (parseInt(wrap.style.left) + dis * 600) + "px";
            index = i;
            showCurrentDot();
        }
    })(i);
}
