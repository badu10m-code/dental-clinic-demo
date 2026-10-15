/* Homepage banner carousel — slides built from the admin's banner manager */
(function(){
  var frame=document.getElementById("bs-frame");if(!frame)return;
  var list=(window.SCD?SCD.banners():[]).filter(function(b){return b.active;});
  var sec=frame.closest("section");
  if(!list.length){sec.style.display="none";return;}
  var dots=document.getElementById("bs-dots"),cur=0,timer;
  list.slice(0,5).forEach(function(b,i){
    var s=document.createElement("div");s.className="bs-slide"+(b.type==="image"?" img-slide":(b.template==="festival"?" tpl alt":" tpl"));
    if(b.type==="image"&&b.img)s.style.backgroundImage="url("+b.img+")";
    var left=document.createElement("div");
    var t=document.createElement("b");t.textContent=b.title||"";left.appendChild(t);
    if(b.sub){var sp=document.createElement("span");sp.textContent=b.sub;left.appendChild(sp);}
    s.appendChild(left);
    var a=document.createElement("a");a.className="bs-cta";a.textContent=b.cta||"Book now";a.href=b.link||"contact.html#book";s.appendChild(a);
    frame.appendChild(s);
    var d=document.createElement("button");d.setAttribute("aria-label","Banner "+(i+1));
    d.addEventListener("click",function(){go(i);});dots.appendChild(d);
  });
  function go(i){cur=i;
    frame.querySelectorAll(".bs-slide").forEach(function(s,j){s.classList.toggle("on",j===i);});
    dots.querySelectorAll("button").forEach(function(d,j){d.classList.toggle("on",j===i);});
    clearInterval(timer);timer=setInterval(next,4500);
  }
  function next(){go((cur+1)%frame.children.length);}
  go(0);
})();
