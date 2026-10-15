/* Appointments: status workflow, WhatsApp confirmation draft, CSV, delete */
(function(){
  var all=SCD.appts(),qEl=document.getElementById("q"),fEl=document.getElementById("f"),tbl=document.getElementById("rows");
  function filtered(){
    var q=(qEl.value||"").toLowerCase(),f=fEl.value;
    return all.filter(function(x){if(f!=="all"&&x.status!==f)return false;
      return !q||(x.name+" "+x.phone+" "+x.ref+" "+x.service).toLowerCase().indexOf(q)>-1;});
  }
  function waDraft(x){
    var d=new Date(x.date+"T00:00").toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"});
    return "Hello "+x.name+", this is SmileCraft Dental Studio. Your appointment is confirmed: "+x.service+" on "+d+" at "+x.slot+". Reference "+x.ref+". Please arrive 10 minutes early and bring any previous X-rays or prescriptions if you have them. Address: "+SCD.cfg().address+". Reply here if you need to reschedule.";
  }
  function draw(){
    var list=filtered();
    tbl.innerHTML=list.length?list.map(function(x,i){
      return "<tr><td><b>"+SCD.esc(x.name)+"</b><br><small>"+SCD.esc(x.phone)+"</small></td><td>"+SCD.esc(x.service)+"</td><td>"+SCD.esc(x.date)+"<br><small>"+SCD.esc(x.slot||"")+"</small></td><td><small>"+SCD.esc(x.ref)+"</small></td><td><span class='badge "+SCD.esc(x.status)+"'>"+SCD.esc(x.status)+"</span></td><td><div class='rowact'>"
      +"<a class='wa' target='_blank' rel='noopener' href='https://wa.me/"+x.phone.replace(/\D/g,"")+"?text="+encodeURIComponent(waDraft(x))+"'>WhatsApp draft</a>"
      +"<button data-act='next' data-i='"+i+"'>"+nextLabel(x.status)+"</button>"
      +"<button data-act='cancel' data-i='"+i+"'>Cancel</button>"
      +"<button class='del' data-act='del' data-i='"+i+"'>Delete</button></div><div class='draftbox' id='db-"+i+"'><small>WhatsApp confirmation draft (edit before sending):</small><textarea>"+SCD.esc(waDraft(x))+"</textarea><div class='rowact' style='margin-top:8px'><a class='wa' target='_blank' rel='noopener' href='https://wa.me/"+x.phone.replace(/\D/g,"")+"?text="+encodeURIComponent(waDraft(x))+"'>Open in WhatsApp</a></div></div></td></tr>";
    }).join(""):'<tr><td colspan="6" class="empty">No appointments match. New online bookings appear here on their own.</td></tr>';
    tbl.querySelectorAll("button").forEach(function(b){b.addEventListener("click",function(){
      var i=+b.getAttribute("data-i"),act=b.getAttribute("data-act"),x=filtered()[i];
      if(act==="next"){x.status=nextStatus(x.status);}
      else if(act==="cancel"){x.status="cancelled";}
      else if(act==="del"){if(!confirm("Delete this appointment record?"))return;all=all.filter(function(y){return y.ref!==x.ref;});}
      SCD.saveAppts(all);draw();AdminToast(act==="del"?"Deleted":"Updated");
    });});
    tbl.querySelectorAll(".badge").forEach(function(bd){bd.addEventListener("click",function(){
      var i=+bd.closest("tr").querySelector("button").getAttribute("data-i");var db=document.getElementById("db-"+i);
      document.querySelectorAll(".draftbox.show").forEach(function(d){if(d!==db)d.classList.remove("show");});
      db.classList.toggle("show");
    });});
  }
  function nextStatus(s){return s==="new"?"confirmed":s==="confirmed"?"done":s;}
  function nextLabel(s){return s==="new"?"Confirm":s==="confirmed"?"Mark done":"--";}
  qEl.addEventListener("input",draw);fEl.addEventListener("change",draw);
  document.getElementById("csv").addEventListener("click",function(){
    var rows=[["Ref","Name","Phone","Service","Date","Slot","Status","Note"]].concat(all.map(function(x){return [x.ref,x.name,x.phone,x.service,x.date,x.slot||"",x.status,(x.note||"").replace(/[\n\r,]/g," ")];}));
    var csv=rows.map(function(r){return r.map(function(v){return '"'+String(v).replace(/"/g,'""')+'"';}).join(",");}).join("\n");
    var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="smilecraft-appointments.csv";a.click();AdminToast("CSV exported");
  });
  draw();
})();
