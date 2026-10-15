/* Dashboard: today's schedule + week counters */
(function(){
  var a=SCD.appts(),today=new Date().toISOString().slice(0,10);
  var week=new Date();week.setDate(week.getDate()-6);var wk=week.toISOString().slice(0,10);
  document.getElementById("st-today").textContent=a.filter(function(x){return x.date===today&&x.status!=="cancelled";}).length;
  document.getElementById("st-pend").textContent=a.filter(function(x){return x.status==="new";}).length;
  document.getElementById("st-week").textContent=a.filter(function(x){return x.created.slice(0,10)>=wk;}).length;
  document.getElementById("st-pat").textContent=SCD.patients().length;
  function fmt(s){if(!s||s==="Any open slot")return "—";if(/am|pm/i.test(s))return s;var m=s.match(/^(\d{1,2}):(\d{2})/);if(!m)return s;var h=+m[1],mm=m[2],ap=h>=12?"PM":"AM";h=h%12||12;return h+":"+mm+" "+ap;}
  var rows=a.filter(function(x){return x.date===today&&x.status!=="cancelled";})
    .sort(function(x,y){return (x.slot||"").localeCompare(y.slot||"");});
  document.getElementById("today-rows").innerHTML=rows.length?rows.map(function(x){
    var ph=x.phone.replace(/\D/g,"");
    return "<tr><td><b>"+SCD.esc(fmt(x.slot))+"</b></td><td><b>"+SCD.esc(x.name)+"</b><br><small>"+SCD.esc(x.phone)+"</small></td><td>"+SCD.esc(x.service)+"</td><td>"+SCD.esc(x.doctor||"Any dentist")+"</td><td><span class='badge "+SCD.esc(x.status)+"'>"+SCD.esc(x.status)+"</span></td><td><div class='rowact'><a target='_blank' rel='noopener' href='https://wa.me/"+ph+"?text="+encodeURIComponent(draft(x))+"'>WhatsApp</a><a href='tel:"+x.phone.replace(/\s/g,"")+"'>Call</a></div></td></tr>";
  }).join(""):'<tr><td colspan="6" class="empty">Nothing booked for today yet. Bookings from the website land here instantly.</td></tr>';
  function draft(x){
    var d=new Date(x.date+"T00:00").toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"});
    return "Hello "+x.name+", this is SmileCraft Dental Studio. Your appointment"+
      ((x.doctor&&x.doctor!=="Any dentist")?" with "+x.doctor:"")+" is confirmed: "+x.service+" on "+d+" at "+(x.slot||"the agreed time")+". Reference "+x.ref+". Please arrive 10 minutes early. Address: "+SCD.cfg().address+". Reply here to reschedule.";
  }
})();
