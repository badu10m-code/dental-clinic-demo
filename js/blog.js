/* Blog layer: owner-written posts on blog.html + title overrides everywhere + dynamic article page */
(function(){
  if(!window.SCD)return;
  var page=document.body.getAttribute("data-page");
  /* built-in article overrides */
  var ovr=SCD.overrides();
  if(page==="blog"){
    document.querySelectorAll("#postlist .row[data-slug]").forEach(function(r){
      var o=ovr[r.getAttribute("data-slug")];
      if(!o)return;
      var h=r.querySelector("h3");if(o.title&&h)h.textContent=o.title;
      if(o.cat)r.setAttribute("data-cat",o.cat);
    });
    var cust=document.getElementById("owner-cards"),posts=SCD.posts();
    if(cust&&posts.length){
      cust.innerHTML="";
      posts.slice(0,4).forEach(function(p){
        var a=document.createElement("a");a.className="row";a.href="article.html?id="+encodeURIComponent(p.id||p.created);
        var img=document.createElement("img");img.className="rthumb";img.src=p.image||"assets/img/clinic-chair.jpg";img.alt="";img.loading="lazy";a.appendChild(img);
        var d1=document.createElement("div");
        var h=document.createElement("h3");h.textContent=p.title;d1.appendChild(h);
        var s=document.createElement("span");s.className="form-note";
        s.textContent="By the clinic · "+new Date(p.created).toLocaleDateString("en-IN",{day:"numeric",month:"short"})+" · "+(p.category||"update");
        d1.appendChild(s);a.appendChild(d1);
        var tag=document.createElement("span");tag.className="price";tag.textContent="New";a.appendChild(tag);
        cust.appendChild(a);
      });
      var wrap=document.getElementById("owner-wrap");if(wrap)wrap.style.display="";
    }
  }
  /* static article pages: apply title override */
  var slug=document.body.getAttribute("data-slug");
  if(slug&&ovr[slug]&&ovr[slug].title){
    var h1=document.querySelector(".article h1");if(h1)h1.textContent=ovr[slug].title;
    document.title=ovr[slug].title+" — SmileCraft Dental Studio";
  }
  /* dynamic article page */
  var dyn=document.getElementById("dyn-article");
  if(dyn){
    var id=new URLSearchParams(location.search).get("id");
    var p=SCD.posts().find(function(x){return (x.id||x.created)===id;});
    if(!p){dyn.innerHTML='<p class="empty">This update was removed or never existed.</p>';}
    else{
      document.title=p.title+" — SmileCraft Dental Studio";
      var img=document.getElementById("dyn-img");if(p.image){img.src=p.image;img.style.display="";}
      dyn.querySelector("h1").textContent=p.title;
      dyn.querySelector(".meta span").textContent="By the clinic · "+new Date(p.created).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"});
      var body=dyn.querySelector(".dyn-body");
      (p.body||"").split(/\n\n+/).forEach(function(par){
        if(!par.trim())return;var el=document.createElement("p");el.textContent=par;body.appendChild(el);
      });
    }
  }
})();
