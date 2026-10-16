/* Site interactions: nav, reveal, counters, FAQ, settings override, owner posts */
(function(){
  /* apply saved clinic settings to data-cfg spans (demo admin writes these) */
  if(window.SCD){var c=SCD.cfg();document.querySelectorAll("[data-cfg]").forEach(function(el){var v=c[el.getAttribute("data-cfg")];if(v)el.textContent=v;});
    var wa=document.querySelectorAll("[data-wa]");wa.forEach(function(a){a.href="https://wa.me/"+c.whatsapp;});}

  /* nav */
  var b=document.querySelector(".burger"),nl=document.querySelector(".navlinks");
  if(b&&nl)b.addEventListener("click",function(){nl.classList.toggle("open");b.classList.toggle("x");});
  document.querySelectorAll(".navlinks a").forEach(function(a){
    if(a.getAttribute("data-page")===document.body.getAttribute("data-page"))a.classList.add("on");
  });

  /* scroll reveal */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.12});
  document.querySelectorAll(".reveal").forEach(function(el){io.observe(el);});

  /* counters */
  var co=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;co.unobserve(e.target);
    var el=e.target,end=parseFloat(el.getAttribute("data-count")),suf=el.getAttribute("data-suf")||"",t0=null,dur=1400;
    function step(t){if(!t0)t0=t;var p=Math.min((t-t0)/dur,1);var v=Math.floor(end*(1-Math.pow(1-p,3)));el.textContent=v.toLocaleString("en-IN")+suf;if(p<1)requestAnimationFrame(step);}
    requestAnimationFrame(step);
  });},{threshold:.4});
  document.querySelectorAll("[data-count]").forEach(function(el){co.observe(el);});

  /* FAQ accordion */
  document.querySelectorAll(".faq-q").forEach(function(q){
    q.addEventListener("click",function(){
      var item=q.closest(".faq-item"),a=item.querySelector(".faq-a"),open=item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function(o){o.classList.remove("open");o.querySelector(".faq-a").style.maxHeight=null;});
      if(!open){item.classList.add("open");a.style.maxHeight=a.scrollHeight+"px";}
    });
  });

  /* owner posts → blog.html clinic updates + home teaser */
  var wrap=document.getElementById("owner-posts");
  if(wrap&&window.SCD){
    var posts=SCD.posts();
    if(posts.length){
      wrap.innerHTML=posts.slice(0,6).map(function(p){
        var dt=new Date(p.created).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
        return '<div class="row"><div><h3>'+SCD.esc(p.title)+'</h3><span class="form-note">Clinic update · '+dt+'</span></div><span></span></div>';
      }).join("");
    } else { wrap.closest(".post-list")&&(wrap.closest(".post-list").style.display="none"); }
  }
  var y=document.getElementById("yr");if(y)y.textContent=new Date().getFullYear();
})();

/* typewriter */
(function(){
  var el=document.getElementById("typer");if(!el)return;
  var words=["listening.","comfort.","honesty.","care."],wi=0,ci=0,del=false;
  function tick(){
    var w=words[wi];
    el.textContent=w.slice(0,ci);
    var wait=del?45:110;
    if(!del&&ci===w.length){wait=1700;del=true;}
    else if(del&&ci===0){del=false;wi=(wi+1)%words.length;wait=350;}
    else ci+=del?-1:1;
    setTimeout(tick,wait);
  }
  tick();
})();
/* scroll progress */
(function(){
  var b=document.createElement("div");b.className="progress";document.body.appendChild(b);
  addEventListener("scroll",function(){
    var d=document.documentElement,max=d.scrollHeight-d.clientHeight;
    b.style.width=(max>0?(d.scrollTop/max*100):0)+"%";
  },{passive:true});
})();
/* clip-path image reveal, fail-safe: image starts visible unless JS arms it, and a timer force-reveals */
(function(){
  var els=Array.prototype.slice.call(document.querySelectorAll(".reveal-img"));
  if(!els.length)return;
  els.forEach(function(el){el.classList.add("pre");});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.05,rootMargin:"300px 0px 80px 0px"});
  els.forEach(function(el){io.observe(el);});
  setTimeout(function(){els.forEach(function(el){el.classList.add("in");});},4000);
})();
