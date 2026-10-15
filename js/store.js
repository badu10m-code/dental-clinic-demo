/* SmileCraft demo store — browser-local demo storage (no server, no password by design) */
(function(){
  var K={appt:"scd_appointments",pat:"scd_patients",post:"scd_posts",cfg:"scd_settings"};
  var DEFAULT_CFG={
    name:"SmileCraft Dental Studio",
    phone:"+91 98765 43210",
    phoneRaw:"+919876543210",
    whatsapp:"919876543210",
    address:"302, Pearl Heights, Veera Desai Road, Andheri West, Mumbai 400053",
    hours:"Mon to Sat 10:00 AM to 8:00 PM · Sunday by appointment",
    mapQuery:"Veera Desai Road, Andheri West, Mumbai"
  };
  function read(k,fb){try{var v=JSON.parse(localStorage.getItem(k));return v==null?fb:v;}catch(e){return fb;}}
  function write(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true;}catch(e){return false;}}
  function ref(){var s="SCD";var c="ABCDEFGHJKMNPQRSTUVWXYZ23456789";for(var i=0;i<6;i++)s+=c[Math.floor(Math.random()*c.length)];return s;}
  function esc(s){var d=document.createElement("div");d.textContent=String(s==null?"":s);return d.innerHTML;}
  function seed(){
    if(read(K.appt,null)!==null)return;
    var today=new Date();
    function d(n){var t=new Date(today);t.setDate(t.getDate()+n);return t.toISOString().slice(0,10);}
    write(K.appt,[
      {ref:"SCD-M4KD2A",name:"Priya Nair",phone:"+91 98200 11223",service:"Root Canal Treatment",date:d(1),slot:"11:00 AM",note:"Sensitive to cold since last week.",status:"new",created:new Date().toISOString()},
      {ref:"SCD-Q8WB7T",name:"Arjun Mehta",phone:"+91 98330 44190",service:"Dental Implant Consultation",date:d(2),slot:"5:30 PM",note:"Needs second opinion on implant plan.",status:"confirmed",created:new Date().toISOString()},
      {ref:"SCD-T2NP9C",name:"Farah Shaikh",phone:"+91 99201 77845",service:"Kids Dentistry",date:d(-2),slot:"12:00 PM",note:"First visit for daughter, age 6.",status:"done",created:new Date().toISOString()}
    ]);
    write(K.pat,[
      {name:"Priya Nair",phone:"+91 98200 11223",firstVisit:d(1),visits:1,note:"Cold sensitivity"},
      {name:"Arjun Mehta",phone:"+91 98330 44190",firstVisit:d(2),visits:1,note:"Implant second opinion"},
      {name:"Farah Shaikh",phone:"+91 99201 77845",firstVisit:d(-2),visits:1,note:"Daughter, age 6, first visit"}
    ]);
    write(K.post,[]);
    write(K.cfg,DEFAULT_CFG);
  }
  seed();
  window.SCD={
    KEY:K,DEFAULT_CFG:DEFAULT_CFG,
    appts:function(){return read(K.appt,[]);},
    saveAppts:function(a){return write(K.appt,a);},
    patients:function(){return read(K.pat,[]);},
    savePatients:function(p){return write(K.pat,p);},
    posts:function(){return read(K.post,[]);},
    savePosts:function(p){return write(K.post,p);},
    cfg:function(){var c=read(K.cfg,null);return Object.assign({},DEFAULT_CFG,c||{});},
    saveCfg:function(c){return write(K.cfg,Object.assign({},this.cfg(),c));},
    ref:ref,esc:esc
  };
})();
