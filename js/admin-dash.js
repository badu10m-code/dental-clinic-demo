/* Dashboard */
(function(){
  var a=SCD.appts();
  var today=new Date().toISOString().slice(0,10);
  var up=a.filter(function(x){return x.date>=today&&x.status!=="cancelled";}).length;
  var pend=a.filter(function(x){return x.status==="new";}).length;
  var done=a.filter(function(x){return x.status==="done";}).length;
  document.getElementById("st-up").textContent=up;
  document.getElementById("st-pend").textContent=pend;
  document.getElementById("st-done").textContent=done;
  document.getElementById("st-pat").textContent=SCD.patients().length;
  var rows=document.getElementById("recent");
  var recent=a.slice().sort(function(x,y){return y.created.localeCompare(x.created);}).slice(0,5);
  rows.innerHTML=recent.length?recent.map(function(x){
    return "<tr><td><b>"+SCD.esc(x.name)+"</b><br><small>"+SCD.esc(x.phone)+"</small></td><td>"+SCD.esc(x.service)+"</td><td>"+SCD.esc(x.date)+"<br><small>"+SCD.esc(x.slot||"")+"</small></td><td><span class='badge "+SCD.esc(x.status)+"'>"+SCD.esc(x.status)+"</span></td></tr>";
  }).join(""):'<tr><td colspan="4" class="empty">No appointments yet. Bookings from the website land here instantly.</td></tr>';
})();
