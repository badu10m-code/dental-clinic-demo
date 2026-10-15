/* Clinic settings (demo) */
(function(){
  var c=SCD.cfg(),f=document.getElementById("cfgform");
  ["name","phone","whatsapp","address","hours"].forEach(function(k){var el=f.querySelector("#c-"+k);if(el)el.value=c[k]||"";});
  f.addEventListener("submit",function(ev){
    ev.preventDefault();
    var upd={};
    ["name","phone","whatsapp","address","hours"].forEach(function(k){var el=f.querySelector("#c-"+k);if(el)upd[k]=el.value.trim();});
    upd.whatsapp=upd.whatsapp.replace(/\D/g,"");
    SCD.saveCfg(upd);AdminToast("Settings saved. The site reads them on every page load.");
  });
})();
