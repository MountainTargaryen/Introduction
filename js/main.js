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

 // 一开始没有滚动的时候，出现在视窗中的图片也会加载
 start();

 // 当页面开始滚动的时候，遍历图片，如果图片出现在视窗中，就加载图片
 var clock; //函数节流
 $(window).on('scroll',function(){
     if(clock){
         clearTimeout(clock);
     }
     clock = setTimeout(function(){
         start()
     },200)
 })
 
 function start(){
      $('.container img').not('[data-isLoading]').each(function () {
         if (isShow($(this))) {
             loadImg($(this));
         }
     })
 }


 // 判断图片是否出现在视窗的函数
 function isShow($node){
     return $node.offset().top <= $(window).height()+$(window).scrollTop();
 }

 // 加载图片的函数，就是把自定义属性data-src 存储的真正的图片地址，赋值给src
 function loadImg($img){
         $img.attr('src', $img.attr('data-src'));

         // 已经加载的图片，我给它设置一个属性，值为1，作为标识
         // 弄这个的初衷是因为，每次滚动的时候，所有的图片都会遍历一遍，这样有点浪费，所以做个标识，滚动的时候只遍历哪些还没有加载的图片
         $img.attr('data-isLoading',1);
 }
