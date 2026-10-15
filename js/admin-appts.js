/* Appointments: date/doctor filters, time setting, WhatsApp drafts, call, manual add, CSV */
(function(){
  var SLOTS=["10:00 AM","11:00 AM","12:00 PM","2:00 PM","5:30 PM","7:30 PM"];
  var qEl=document.getElementById("q"),fEl=document.getElementById("f"),docEl=document.getElementById("doc"),
      dmode=document.getElementById("dmode"),dpick=document.getElementById("dpick"),tbl=document.getElementById("rows");
  document.getElementById("a-date").value=new Date().toISOString().slice(0,10);
  function today(){return new Date().toISOString().slice(0,10);}
  function filtered(){
    var q=(qEl.value||"").toLowerCase(),f=fEl.value,doc=docEl.value,all=SCD.appts();
    var date=null;
    if(dmode.value==="today")date=today();
    else if(dmode.value==="pick")date=dpick.value;
    return all.filter(function(x){
      if(f!=="all"&&x.status!==f)return false;
      if(doc!=="all"&&(x.doctor||"Any dentist")!==doc)return false;
      if(date&&x.date!==date)return false;
      return !q||(x.name+" "+x.phone+" "+x.ref+" "+x.service).toLowerCase().indexOf(q)>-1;
    });
  }
  function draft(x){
    var d=new Date(x.date+"T00:00").toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"});
    return "Hello "+x.name+", this is SmileCraft Dental Studio. Your appointment"+
      ((x.doctor&&x.doctor!=="Any dentist")?" with "+x.doctor:"")+" is confirmed: "+x.service+" on "+d+" at "+(x.slot||"the agreed time")+
      ". Reference "+x.ref+". Please arrive 10 minutes early and bring any previous X-rays or prescriptions. Address: "+SCD.cfg().address+". Reply here if you need to reschedule.";
  }
  function nextStatus(s){return s==="new"?"confirmed":s==="confirmed"?"done":s;}
  function nextLabel(s){return s==="new"?"Confirm":s==="confirmed"?"Mark done":"--";}
  function fmt(s){if(!s||s==="Any open slot")return "—";var m=s.match(/^(\d{1,2}):(\d{2})/);if(!m)return s;var h=+m[1],mm=m[2],ap=h>=12?"PM":"AM";h=h%12||12;return h+":"+mm+" "+ap;}
  function draw(){
    var list=filtered();
    tbl.innerHTML=list.length?list.map(function(x,i){
      var ph=x.phone.replace(/\D/g,"");
      return "<tr><td><b>"+SCD.esc(x.name)+"</b><br><small>"+SCD.esc(x.phone)+"</small><br><span class='badge src'>"+(x.source==="call"?"Call / walk-in":"Online")+"</span></td>"
      +"<td>"+SCD.esc(x.service)+"</td>"
      +"<td>"+SCD.esc(x.doctor||"Any dentist")+"</td>"
      +"<td>"+SCD.esc(x.date)+"<br><small>"+SCD.esc(fmt(x.slot))+"</small></td>"
      +"<td><small>"+SCD.esc(x.ref)+"</small></td>"
      +"<td><span class='badge "+SCD.esc(x.status)+"'>"+SCD.esc(x.status)+"</span></td>"
      +"<td><div class='rowact'>"
      +"<a class='wa' target='_blank' rel='noopener' href='https://wa.me/"+ph+"?text="+encodeURIComponent(draft(x))+"'>WhatsApp draft</a>"
      +"<button data-act='time' data-i='"+i+"'>Set time</button>"
      +"<button data-act='next' data-i='"+i+"'>"+nextLabel(x.status)+"</button>"
      +"<a href='tel:"+x.phone.replace(/\s/g,"")+"'>Call</a>"
      +"<button data-act='cancel' data-i='"+i+"'>Cancel</button>"
      +"<button class='del' data-act='del' data-i='"+i+"'>Delete</button>"
      +"</div><div class='draftbox' id='tb-"+i+"'><small>Fix the exact slot:</small><div class='chips'>"
      +SLOTS.map(function(s){return "<span class='chip"+(fmt(x.slot)===s?" on":"")+"' data-s='"+s+"'>"+s+"</span>";}).join("")
      +"</div><div class='rowact' style='margin-top:10px'><input type='time' id='tin-"+i+"' value='"+(x.slot&&x.slot!=="Any open slot"?to24(x.slot):"")+"'><button data-act='savetime' data-i='"+i+"'>Save time</button><button data-act='cleartime' data-i='"+i+"'>Clear</button></div></div>"
      +"<div class='draftbox' id='db-"+i+"'><small>WhatsApp confirmation draft (edit before sending):</small><textarea>"+SCD.esc(draft(x))+"</textarea><div class='rowact' style='margin-top:8px'><a class='wa' target='_blank' rel='noopener' href='https://wa.me/"+ph+"?text="+encodeURIComponent(draft(x))+"'>Open in WhatsApp</a></div></div></td></tr>";
    }).join(""):'<tr><td colspan="7" class="empty">No appointments match these filters.</td></tr>';
    wire();
  }
  function to24(s){var m=s.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);if(!m)return "";var h=+m[1],mm=m[2],ap=(m[3]||"").toUpperCase();if(ap==="PM"&&h!==12)h+=12;if(ap==="AM"&&h===12)h=0;return String(h).padStart(2,"0")+":"+mm;}
  function to12(v){if(!v)return "";var p=v.split(":"),h=+p[0],mm=p[1],ap=h>=12?"PM":"AM";h=h%12||12;return h+":"+mm+" "+ap;}
  function wire(){
    tbl.querySelectorAll("button").forEach(function(b){b.addEventListener("click",function(){
      var i=+b.getAttribute("data-i"),act=b.getAttribute("data-act"),x=filtered()[i],all=SCD.appts();
      var target=all.find(function(y){return y.ref===x.ref;});
      if(act==="next"){target.status=nextStatus(target.status);SCD.saveAppts(all);AdminToast("Status: "+target.status);draw();}
      else if(act==="cancel"){target.status="cancelled";SCD.saveAppts(all);AdminToast("Cancelled");draw();}
      else if(act==="del"){if(!confirm("Delete this appointment record?"))return;SCD.saveAppts(all.filter(function(y){return y.ref!==x.ref;}));AdminToast("Deleted");draw();}
      else if(act==="time"){toggleBox("tb-"+i,"db-"+i);}
      else if(act==="savetime"){
        var v=document.getElementById("tin-"+i).value;
        var chip=document.querySelector("#tb-"+i+" .chip.on");
        target.slot=v?to12(v):(chip?chip.getAttribute("data-s"):"Any open slot");
        SCD.saveAppts(all);AdminToast("Slot set: "+target.slot);draw();
      }
      else if(act==="cleartime"){target.slot="Any open slot";SCD.saveAppts(all);draw();}
    });});
    tbl.querySelectorAll(".draftbox .chip").forEach(function(ch){ch.addEventListener("click",function(){
      ch.closest(".chips").querySelectorAll(".chip").forEach(function(x){x.classList.remove("on");});ch.classList.add("on");
      var tin=ch.closest(".draftbox").querySelector("input[type=time]");if(tin)tin.value=to24(ch.getAttribute("data-s"));
    });});
    tbl.querySelectorAll(".badge.status,td .badge:not(.src)").forEach(function(bd){bd.addEventListener("click",function(){
      var tr=bd.closest("tr"),btn=tr.querySelector("button[data-act='time']");
      var i=+btn.getAttribute("data-i");toggleBox("db-"+i,"tb-"+i);
    });});
  }
  function toggleBox(show,hide){
    var s=document.getElementById(show),h=hide&&document.getElementById(hide);
    if(h)h.classList.remove("show");
    if(s)s.classList.toggle("show");
  }
  qEl.addEventListener("input",draw);fEl.addEventListener("change",draw);docEl.addEventListener("change",draw);
  dmode.addEventListener("change",function(){dpick.style.display=dmode.value==="pick"?"":"none";draw();});
  dpick.addEventListener("change",draw);
  document.getElementById("toggle-add").addEventListener("click",function(){
    var p=document.getElementById("addpanel");p.style.display=p.style.display==="none"?"":"none";
    if(p.style.display!=="none")p.scrollIntoView({behavior:"smooth",block:"start"});
  });
  document.getElementById("addform").addEventListener("submit",function(ev){
    ev.preventDefault();
    var all=SCD.appts();
    var slotRaw=document.getElementById("a-slot").value;
    all.push({ref:SCD.ref(),name:document.getElementById("a-name").value.trim(),phone:document.getElementById("a-phone").value.trim(),
      service:document.getElementById("a-svc").value,doctor:document.getElementById("a-doc").value,
      date:document.getElementById("a-date").value,slot:slotRaw?to12(slotRaw):"Any open slot",
      note:document.getElementById("a-note").value.trim(),source:"call",status:"new",created:new Date().toISOString()});
    SCD.saveAppts(all);
    var pats=SCD.patients(),n=document.getElementById("a-name").value.trim(),p=document.getElementById("a-phone").value.trim();
    if(!pats.some(function(x){return x.phone.replace(/\D/g,"")===p.replace(/\D/g,"");})){
      pats.push({name:n,phone:p,firstVisit:document.getElementById("a-date").value,visits:1,note:"Added at desk"});SCD.savePatients(pats);
    }
    this.reset();document.getElementById("a-date").value=today();
    AdminToast("Appointment saved");draw();
  });
  document.getElementById("csv").addEventListener("click",function(){
    var rows=[["Ref","Name","Phone","Service","Doctor","Date","Slot","Status","Source","Note"]].concat(SCD.appts().map(function(x){return [x.ref,x.name,x.phone,x.service,x.doctor||"",x.date,x.slot||"",x.status,x.source||"online",(x.note||"").replace(/[\n\r,]/g," ")];}));
    var csv=rows.map(function(r){return r.map(function(v){return '"'+String(v).replace(/"/g,'""')+'"';}).join(",");}).join("\n");
    var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="smilecraft-appointments.csv";a.click();AdminToast("CSV exported");
  });
  draw();
})();
