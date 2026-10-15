/* Banner manager: templates + image upload, live preview, active toggles */
(function(){
  var form=document.getElementById("bform"),typeSel=document.getElementById("b-type");
  var tf=document.getElementById("b-template-fields"),imgf=document.getElementById("b-image-fields");
  var imgData="";
  typeSel.addEventListener("change",function(){tf.style.display=typeSel.value==="template"?"":"none";imgf.style.display=typeSel.value==="image"?"":"none";});
  document.getElementById("b-img").addEventListener("change",function(){
    var f=this.files[0];if(!f)return;
    if(f.size>1200000){AdminToast("Image too large for demo storage (keep under ~1 MB)");this.value="";return;}
    var r=new FileReader();r.onload=function(){imgData=r.result;preview();};r.readAsDataURL(f);
  });
  function preview(){
    var title=document.getElementById("b-title").value||"Your headline appears here";
    var sub=document.getElementById("b-sub").value||"Sub-line preview";
    var cta=document.getElementById("b-cta").value||"Book now";
    var pv=document.getElementById("b-preview");
    pv.className="bs-preview "+(typeSel.value==="image"?"imgp":(document.getElementById("b-template").value==="festival"?"altp":""));
    document.getElementById("pv-title").textContent=title;
    document.getElementById("pv-sub").textContent=typeSel.value==="image"?(sub||"(image banner)"):sub;
    document.getElementById("pv-cta").textContent=cta;
    if(typeSel.value==="image"&&imgData)pv.style.backgroundImage="url("+imgData+")";
    else pv.style.backgroundImage="";
  }
  ["b-title","b-sub","b-cta","b-template"].forEach(function(id){document.getElementById(id).addEventListener("input",preview);});
  preview();
  form.addEventListener("submit",function(ev){
    ev.preventDefault();
    var bans=SCD.banners();
    if(bans.length>=5){AdminToast("Five banners running already. Delete one first.");return;}
    bans.push({id:"b"+Date.now(),type:typeSel.value,template:typeSel.value==="template"?document.getElementById("b-template").value:"",
      title:document.getElementById("b-title").value.trim(),sub:document.getElementById("b-sub").value.trim(),
      cta:document.getElementById("b-cta").value.trim()||"Book now",link:document.getElementById("b-link").value,
      img:imgData,active:true,created:new Date().toISOString()});
    SCD.saveBanners(bans);
    form.reset();imgData="";document.getElementById("b-link").value="contact.html#book";document.getElementById("b-cta").value="Book now";
    preview();draw();AdminToast("Banner added. It is live on the homepage strip now.");
  });
  function draw(){
    var bans=SCD.banners(),tbl=document.getElementById("rows");
    tbl.innerHTML=bans.length?bans.map(function(b,i){
      return "<tr><td><b>"+SCD.esc(b.title)+"</b><br><small>"+SCD.esc(b.sub||"")+(b.type==="image"?" · image banner":" · "+SCD.esc(b.template))+"</small></td>"
      +"<td><button data-act='toggle' data-i='"+i+"' class='tg"+(b.active?" on":"")+"'>"+(b.active?"Live":"Hidden")+"</button></td>"
      +"<td><div class='rowact'><a target='_blank' rel='noopener' href='../index.html'>See on site ↗</a><button class='del' data-act='del' data-i='"+i+"'>Delete</button></div></td></tr>";
    }).join(""):'<tr><td colspan="3" class="empty">No banners yet. Add one above and it slides under the homepage hero.</td></tr>';
    tbl.querySelectorAll("button").forEach(function(b){b.addEventListener("click",function(){
      var i=+b.getAttribute("data-i"),act=b.getAttribute("data-act"),bans=SCD.banners();
      if(act==="del"){if(!confirm("Delete this banner?"))return;bans.splice(i,1);AdminToast("Banner deleted");}
      else{bans[i].active=!bans[i].active;AdminToast(bans[i].active?"Banner is live":"Banner hidden");}
      SCD.saveBanners(bans);draw();
    });});
  }
  draw();
})();
