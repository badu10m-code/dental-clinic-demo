/* Patients ledger */
(function(){
  var tbl=document.getElementById("rows");
  function draw(){
    var p=SCD.patients();
    tbl.innerHTML=p.length?p.map(function(x,i){
      return "<tr><td><b>"+SCD.esc(x.name)+"</b></td><td>"+SCD.esc(x.phone)+"</td><td>"+SCD.esc(x.firstVisit||"-")+"</td><td>"+(x.visits||1)+"</td><td>"+SCD.esc(x.note||"-")+"</td><td><div class='rowact'><button class='del' data-i='"+i+"'>Remove</button></div></td></tr>";
    }).join(""):'<tr><td colspan="6" class="empty">No patients yet. Every online booking adds the patient here automatically.</td></tr>';
    tbl.querySelectorAll("button").forEach(function(b){b.addEventListener("click",function(){
      if(!confirm("Remove this patient record?"))return;
      var p=SCD.patients();p.splice(+b.getAttribute("data-i"),1);SCD.savePatients(p);draw();AdminToast("Removed");
    });});
  }
  document.getElementById("addform").addEventListener("submit",function(ev){
    ev.preventDefault();
    var n=document.getElementById("p-name"),ph=document.getElementById("p-phone"),no=document.getElementById("p-note");
    if(n.value.trim().length<2||ph.value.replace(/\D/g,"").length<10)return;
    var p=SCD.patients();p.push({name:n.value.trim(),phone:ph.value.trim(),firstVisit:new Date().toISOString().slice(0,10),visits:1,note:no.value.trim()});
    SCD.savePatients(p);n.value="";ph.value="";no.value="";draw();AdminToast("Patient added");
  });
  draw();
})();
