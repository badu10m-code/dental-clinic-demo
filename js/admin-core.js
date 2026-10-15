/* Admin core: demo notice, sidebar, toast, new-appointments badge */
(function(){
  window.AdminToast=function(msg){var t=document.getElementById("toast");if(!t){t=document.createElement("div");t.className="toast";t.id="toast";document.body.appendChild(t);}t.textContent=msg;t.classList.add("show");clearTimeout(t._h);t._h=setTimeout(function(){t.classList.remove("show");},2600);};
  var c=window.SCD.cfg();
  document.querySelectorAll("[data-cfg]").forEach(function(el){el.textContent=c[el.getAttribute("data-cfg")]||"";});
  var here=location.pathname.split("/").pop()||"index.html";
  var n=SCD.appts().filter(function(a){return a.status==="new";}).length;
  document.querySelectorAll(".side a").forEach(function(a){
    if(a.getAttribute("href")===here)a.classList.add("on");
    if(a.getAttribute("href")==="appointments.html"&&n>0){var p=document.createElement("span");p.className="pill";p.textContent=n;a.appendChild(p);}
  });
  if(n>0&&here!=="appointments.html")document.title="("+n+") "+document.title;
  var y=document.getElementById("yr");if(y)y.textContent=new Date().getFullYear();
})();
