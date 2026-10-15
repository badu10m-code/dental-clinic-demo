/* Blog posts manager (demo: posts live in browser storage and render on blog.html) */
(function(){
  function draw(){
    var p=SCD.posts(),tbl=document.getElementById("rows");
    tbl.innerHTML=p.length?p.map(function(x,i){
      var dt=new Date(x.created).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
      return "<tr><td><b>"+SCD.esc(x.title)+"</b><br><small>Published "+dt+"</small></td><td><div class='rowact'><button class='del' data-i='"+i+"'>Delete</button></div></td></tr>";
    }).join(""):'<tr><td colspan="2" class="empty">No clinic updates published yet.</td></tr>';
    tbl.querySelectorAll("button").forEach(function(b){b.addEventListener("click",function(){
      if(!confirm("Delete this post?"))return;
      var p=SCD.posts();p.splice(+b.getAttribute("data-i"),1);SCD.savePosts(p);draw();AdminToast("Post deleted");
    });});
  }
  document.getElementById("postform").addEventListener("submit",function(ev){
    ev.preventDefault();
    var t=document.getElementById("po-title"),b=document.getElementById("po-body");
    if(t.value.trim().length<3||b.value.trim().length<10)return;
    var p=SCD.posts();p.unshift({title:t.value.trim(),body:b.value.trim(),created:new Date().toISOString()});
    if(p.length>6)p.pop();
    SCD.savePosts(p);t.value="";b.value="";draw();AdminToast("Published to clinic updates");
  });
  draw();
})();
