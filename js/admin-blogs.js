/* Blog manager: customise built-in articles, publish new posts with images (max 4) */
(function(){
  var BUILT=[
    {slug:"article-root-canal-mumbai",def:"Root canal in Mumbai: cost, pain and what actually happens",cat:"root-canal"},
    {slug:"article-implants-guide",def:"Dental implants: the honest guide before you spend ₹30,000",cat:"implants"},
    {slug:"article-braces-vs-aligners",def:"Braces or clear aligners? A choice that fits your life",cat:"braces"},
    {slug:"article-kids-first-visit",def:"Your child's first dental visit: what we do differently",cat:"kids"},
    {slug:"article-whitening-truth",def:"Teeth whitening: what works, what wastes money",cat:"cosmetic"},
    {slug:"article-scaling-cleaning",def:"Scaling and cleaning: the ₹1,500 visit that saves ₹15,000",cat:"prevention"}
  ];
  var CATS=["root-canal","implants","braces","kids","cosmetic","prevention","updates"];
  /* object literal keys with hyphen need quotes */
  var CATL={"root-canal":"Root Canal",implants:"Implants",braces:"Braces",kids:"Kids",cosmetic:"Cosmetic",prevention:"Prevention",updates:"Clinic update"};
  var ovr=SCD.overrides();
  function drawBuilt(){
    var t=document.getElementById("built");
    t.innerHTML=BUILT.map(function(a,i){
      var o=ovr[a.slug]||{};
      return "<tr><td><b>"+SCD.esc(a.def)+"</b><br><small><a target='_blank' rel='noopener' href='../"+a.slug+".html'>Open article ↗</a></small></td>"
      +"<td><input data-k='title' data-i='"+i+"' value='"+SCD.esc(o.title||a.def)+"' maxlength='90' style='width:100%'></td>"
      +"<td><select data-k='cat' data-i='"+i+"'>"+CATS.map(function(c){return "<option value='"+c+"'"+((o.cat||a.cat)===c?" selected":"")+">"+CATL[c]+"</option>";}).join("")+"</select></td>"
      +"<td><div class='rowact'><button data-act='save' data-i='"+i+"'>Save</button><button data-act='reset' data-i='"+i+"'>Reset</button></div></td></tr>";
    }).join("");
    t.querySelectorAll("button").forEach(function(b){b.addEventListener("click",function(){
      var i=+b.getAttribute("data-i"),act=b.getAttribute("data-act"),slug=BUILT[i].slug;
      if(act==="save"){
        ovr[slug]={title:t.querySelector("input[data-i='"+i+"']").value.trim(),cat:t.querySelector("select[data-i='"+i+"']").value};
        SCD.saveOverrides(ovr);AdminToast("Article updated on the live site");
      } else {delete ovr[slug];SCD.saveOverrides(ovr);AdminToast("Reset to original");drawBuilt();}
    });});
  }
  var imgData="";
  document.getElementById("po-img").addEventListener("change",function(){
    var f=this.files[0];if(!f)return;
    if(f.size>1200000){AdminToast("Image too large for demo storage (keep under ~1 MB)");this.value="";return;}
    var r=new FileReader();r.onload=function(){imgData=r.result;};r.readAsDataURL(f);
  });
  document.getElementById("postform").addEventListener("submit",function(ev){
    ev.preventDefault();
    var p=SCD.posts();
    if(p.length>=4){AdminToast("Demo keeps up to 4 custom posts. Delete one first.");return;}
    p.unshift({id:"p"+Date.now(),title:document.getElementById("po-title").value.trim(),
      category:document.getElementById("po-cat").value,image:imgData||"assets/img/blog-scaling.jpg",
      body:document.getElementById("po-body").value.trim(),created:new Date().toISOString()});
    SCD.savePosts(p);
    this.reset();imgData="";draw();AdminToast("Published. It is on the blog page now.");
  });
  function draw(){
    var p=SCD.posts(),tbl=document.getElementById("rows");
    tbl.innerHTML=p.length?p.map(function(x,i){
      var dt=new Date(x.created).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
      return "<tr><td><b>"+SCD.esc(x.title)+"</b><br><small>"+dt+" · "+CATL[x.category]+"</small><br><small><a target='_blank' rel='noopener' href='../article.html?id="+encodeURIComponent(x.id||x.created)+"'>Read on site ↗</a></small></td>"
      +"<td><div class='rowact'><button class='del' data-i='"+i+"'>Delete</button></div></td></tr>";
    }).join(""):'<tr><td colspan="2" class="empty">No custom posts yet.</td></tr>';
    tbl.querySelectorAll("button").forEach(function(b){b.addEventListener("click",function(){
      if(!confirm("Delete this post?"))return;
      var p=SCD.posts();p.splice(+b.getAttribute("data-i"),1);SCD.savePosts(p);draw();AdminToast("Post deleted");
    });});
  }
  drawBuilt();draw();
})();
