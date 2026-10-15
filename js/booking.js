/* Appointment booking — saves to the demo store, shows a confirmation with reference */
(function(){
  var f=document.getElementById("book-form");if(!f)return;
  var slotChips=f.querySelectorAll(".chip");
  var slot="";slotChips.forEach(function(ch){ch.addEventListener("click",function(){
    slotChips.forEach(function(x){x.classList.remove("on");});ch.classList.add("on");slot=ch.textContent.trim();});});
  f.addEventListener("submit",function(ev){
    ev.preventDefault();
    var name=f.querySelector("#bk-name"),phone=f.querySelector("#bk-phone"),svc=f.querySelector("#bk-svc"),date=f.querySelector("#bk-date"),note=f.querySelector("#bk-note");
    var n=name.value.trim(),p=phone.value.trim();
    var digits=p.replace(/\D/g,"");
    if(n.length<2||digits.length<10||!svc.value||!date.value){f.querySelector(".form-note").textContent="Please fill your name, a 10-digit phone number, service and date.";return;}
    var all=SCD.appts();
    var dupe=all.some(function(a){return a.phone.replace(/\D/g,"")===digits&&a.date===date.value&&a.status!=="cancelled";});
    if(dupe){f.querySelector(".form-note").textContent="An appointment with this number is already booked for that date. Call us if you need a change.";return;}
    var appt={ref:SCD.ref(),name:n,phone:p,service:svc.value,date:date.value,slot:slot||"Any open slot",note:note.value.trim(),status:"new",created:new Date().toISOString()};
    SCD.saveAppts(all.concat([appt]));
    /* patients ledger */
    var pats=SCD.patients();
    var ex=pats.find(function(x){return x.phone.replace(/\D/g,"")===digits;});
    if(ex){ex.visits=(ex.visits||1)+1;}else{pats.push({name:n,phone:p,firstVisit:date.value,visits:1,note:"Booked online"});SCD.savePatients(pats);}
    f.style.display="none";
    var box=document.getElementById("book-confirm");
    box.querySelector(".ref").textContent=appt.ref;
    box.querySelector(".sum").textContent=svc.value+" · "+new Date(date.value+"T00:00").toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"})+" · "+appt.slot;
    box.classList.add("show");
    box.scrollIntoView({behavior:"smooth",block:"center"});
  });
})();
