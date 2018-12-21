window.onload = function () {
    //底层共用
    var iBase = {
        Id: function(name) {
            return document.getElementById(name);
        },
        //设置元素透明度,透明度值按IE规则计,即0~100
        SetOpacity: function(ev, v) {
            ev.filters ? ev.style.filter = 'alpha(opacity=' + v + ')' : ev.style.opacity = v / 100;
        }
    }

    //淡入效果(含淡入到指定透明度)
    function fadeIn(elem, speed, opacity) {
        /*
         * 参数说明
         * elem==>需要淡入的元素
         * speed==>淡入速度,正整数(可选)
         * opacity==>淡入到指定的透明度,0~100(可选)
         */
        speed = speed || 20;
        opacity = opacity || 100;
        //显示元素,并将元素值为0透明度(不可见)
        elem.style.display = 'block';
        iBase.SetOpacity(elem, 0);
        //初始化透明度变化值为0
        var val = 0;
        //循环将透明值以10递增,即淡入效果
        (function() {
            iBase.SetOpacity(elem, val);
            val += 10;
            if (val <= opacity) {
                setTimeout(arguments.callee, speed)
            }
        })();
    }

    //淡出效果(含淡出到指定透明度)
    function fadeOut(elem, speed, opacity) {
        /*
         * 参数说明
         * elem==>需要淡出的元素
         * speed==>淡出速度,正整数(可选)
         * opacity==>淡出到指定的透明度,0~100(可选)
         */
        speed = speed || 20;
        opacity = opacity || 0;
        //初始化透明度变化值为0
        var val = 100;
        //循环将透明值以10递减,即淡出效果
        (function() {
            iBase.SetOpacity(elem, val);
            val -= 10;
            if (val >= opacity) {
                setTimeout(arguments.callee, speed);
            } else if (val < 0) {
                //元素透明度为0后隐藏元素
                elem.style.display = 'none';
            }
        })();
    }

    var gif = iBase.Id('gift');
    gif.onclick = function() {
        fadeIn(iBase.Id('fadeIn'),50,100);
        fadeOut(gif,0);
        fadeOut(iBase.Id('click'),0);
        fadeIn(iBase.Id('p1'),100,100);
        fadeIn(iBase.Id('p2'),100,100);
        var myAuto = document.getElementById('myaudio');
        myAuto.play();
    }
    

  //根据ID返回dom元素 
  var $ = function(id){return document.getElementById(id);} 
  //返回dom元素的当前某css值 
  var getCss = function(obj,name){ 
      if(obj.currentStyle) {//for ie ;
          return obj.currentStyle[name]; 
      }else { // for ff;
          var style = document.defaultView.getComputedStyle(obj,null); 
          return style[name]; 
      } 
  } 
   
  var show = function(obj,speed){ 
      obj = $(obj); 
      if (!speed) { 
          obj.style.display = 'block'; 
          return; 
      }
  var initH = 0 , initW = 0;
  //获取dom的宽与高 
  var oWidth = getCss(obj,'width').replace('px',''), oHeight = getCss(obj,'height').replace('px',''); 
  //每次dom的递减数(等比例) 
  var wcut = 2*(+oWidth.replace('px','') / +oHeight.replace('px','')),hcut = 2; 
  //处理动画函数 
  var process = function(){ 
          obj.style.overflow = 'hidden';
      obj.style.display = 'block';
      initW = (initW+wcut) > oWidth ? oWidth : initW+wcut; 
      initH = (initH+hcut) > oHeight ? oHeight : initH+hcut; 
      //判断是否减完了 
      if(initW !== oWidth || initH !== oHeight) { 
          //obj.style.width = initW+'px'; 
          obj.style.height = initH+'px'; 

      setTimeout(function(){process();},speed); 
      }else { 
          //加完后，设置属性为显示以及原本dom的宽与高; 
          //obj.style.width = oWidth+'px';
          obj.style.height = oHeight+'px';
           
      } 
  } 
      process(); 
  } 
     
}
