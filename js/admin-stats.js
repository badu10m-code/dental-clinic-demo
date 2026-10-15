/* Booking stats: 7-day chart, status split, top services */
(function(){
  var a=SCD.appts();
  function dayKey(d){return d.toISOString().slice(0,10);}
  var days=[],today=new Date();
  for(var i=6;i>=0;i--){var t=new Date(today);t.setDate(t.getDate()-i);days.push({key:dayKey(t),label:t.toLocaleDateString("en-IN",{weekday:"short",day:"numeric"}),n:0});}
  a.forEach(function(x){var k=x.created.slice(0,10);var d=days.find(function(y){return y.key===k;});if(d)d.n++;});
  var max=Math.max.apply(null,days.map(function(d){return d.n;}).concat([1]));
  document.getElementById("chart").innerHTML=days.map(function(d){
    var h=Math.round(d.n/max*100);
    return "<div class='bcol'><span class='bval'>"+(d.n||"")+"</span><div class='bar' style='height:"+Math.max(h,4)+"%' title='"+d.label+": "+d.n+" bookings'></div><small>"+d.label+"</small></div>";
  }).join("");
  var st={new:0,confirmed:0,done:0,cancelled:0};
  a.forEach(function(x){st[x.status]=(st[x.status]||0)+1;});
  var tot=a.length||1;
  document.getElementById("status-split").innerHTML=["new","confirmed","done","cancelled"].map(function(k){
    var pct=Math.round(st[k]/tot*100);
    return "<div class='srow'><small>"+k+" · "+st[k]+"</small><div class='sbar'><div style='width:"+pct+"%'></div></div></div>";
  }).join("");
  var sv={};a.forEach(function(x){sv[x.service]=(sv[x.service]||0)+1;});
  var top=Object.keys(sv).sort(function(x,y){return sv[y]-sv[x];}).slice(0,5);
  document.getElementById("svc-rows").innerHTML=top.length?top.map(function(s){
    return "<tr><td>"+SCD.esc(s)+"</td><td>"+sv[s]+"</td></tr>";
  }).join(""):'<tr><td colspan="2" class="empty">No data yet.</td></tr>';
  var onl=a.filter(function(x){return (x.source||"online")==="online";}).length;
  document.getElementById("x-total").textContent=a.length;
  document.getElementById("x-online").textContent=onl;
  document.getElementById("x-call").textContent=a.length-onl;
  document.getElementById("x-new").textContent=SCD.patients().length;
})();
