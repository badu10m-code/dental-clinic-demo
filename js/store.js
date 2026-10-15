/* SmileCraft demo store — browser-local demo storage (no server, no password by design) */
(function(){
  var K={appt:"scd2_appointments",pat:"scd2_patients",post:"scd2_posts",cfg:"scd2_settings",ban:"scd2_banners",ovr:"scd2_overrides"};
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
  function d(n){var t=new Date();t.setDate(t.getDate()+n);return t.toISOString().slice(0,10);}
  function appt(o){return Object.assign({ref:"",name:"",phone:"",service:"",doctor:"Any dentist",date:"",slot:"Any open slot",note:"",source:"online",status:"new",created:new Date().toISOString()},o);}
  function seed(){
    if(read(K.appt,null)!==null)return;
    var t=new Date().toISOString();
    function ct(n){return new Date(d(n)+"T09:15:00").toISOString();}
    write(K.appt,[
      appt({ref:"SCD-M4KD2A",name:"Priya Nair",phone:"+91 98200 11223",service:"Root Canal Treatment",doctor:"Dr. Ananya Sharma",date:d(0),slot:"11:00 AM",note:"Sensitive to cold since last week.",status:"new",created:ct(0)}),
      appt({ref:"SCD-Q8WB7T",name:"Arjun Mehta",phone:"+91 98330 44190",service:"Dental Implant Consultation",doctor:"Dr. Rohan Mehta",date:d(0),slot:"5:30 PM",note:"Second opinion on implant plan.",source:"call",status:"confirmed",created:ct(0)}),
      appt({ref:"SCD-T2NP9C",name:"Farah Shaikh",phone:"+91 99201 77845",service:"Kids Dentistry",doctor:"Dr. Ananya Sharma",date:d(-1),slot:"12:00 PM",note:"First visit for daughter, age 6.",status:"done",created:ct(-1)}),
      appt({ref:"SCD-B7RX4M",name:"Rohit Verma",phone:"+91 98110 20394",service:"Cleaning & Polishing",doctor:"Any dentist",date:d(-1),slot:"10:00 AM",note:"",status:"done",created:ct(-1)}),
      appt({ref:"SCD-C9LT2H",name:"Sneha Kulkarni",phone:"+91 99870 55123",service:"Braces / Clear Aligners",doctor:"Dr. Rohan Mehta",date:d(-2),slot:"2:00 PM",note:"Wants aligner simulation.",status:"cancelled",created:ct(-2)}),
      appt({ref:"SCD-D3PW8K",name:"Imran Qureshi",phone:"+91 98209 33012",service:"Tooth pain / emergency",doctor:"Dr. Ananya Sharma",date:d(-2),slot:"7:30 PM",note:"Broken molar filling.",source:"call",status:"done",created:ct(-2)}),
      appt({ref:"SCD-E6NJ5F",name:"Meera Iyer",phone:"+91 99670 81245",service:"Teeth Whitening",doctor:"Dr. Rohan Mehta",date:d(-3),slot:"5:30 PM",note:"",status:"done",created:ct(-3)}),
      appt({ref:"SCD-F2KT7B",name:"Vikas Chauhan",phone:"+91 98197 66034",service:"Wisdom Tooth Extraction",doctor:"Dr. Ananya Sharma",date:d(-4),slot:"10:00 AM",note:"",status:"done",created:ct(-4)}),
      appt({ref:"SCD-G8VD3R",name:"Tanvi Desai",phone:"+91 98331 90876",service:"Crowns & Bridges",doctor:"Dr. Rohan Mehta",date:d(-5),slot:"2:00 PM",note:"Three units, zirconia.",status:"done",created:ct(-5)}),
      appt({ref:"SCD-H5QM9S",name:"Sameer Khan",phone:"+91 99205 44718",service:"Gum Treatment",doctor:"Dr. Ananya Sharma",date:d(1),slot:"12:00 PM",note:"Bleeding gums for a month.",status:"new",created:ct(1)})
    ]);
    write(K.pat,[
      {name:"Priya Nair",phone:"+91 98200 11223",firstVisit:d(0),visits:1,note:"Cold sensitivity"},
      {name:"Arjun Mehta",phone:"+91 98330 44190",firstVisit:d(0),visits:1,note:"Implant second opinion"},
      {name:"Farah Shaikh",phone:"+91 99201 77845",firstVisit:d(-1),visits:1,note:"Daughter, age 6, first visit"},
      {name:"Rohit Verma",phone:"+91 98110 20394",firstVisit:d(-1),visits:1,note:""},
      {name:"Sneha Kulkarni",phone:"+91 99870 55123",firstVisit:d(-2),visits:1,note:"Aligner simulation"},
      {name:"Imran Qureshi",phone:"+91 98209 33012",firstVisit:d(-2),visits:1,note:"Emergency"},
      {name:"Meera Iyer",phone:"+91 99670 81245",firstVisit:d(-3),visits:1,note:""},
      {name:"Vikas Chauhan",phone:"+91 98197 66034",firstVisit:d(-4),visits:1,note:""},
      {name:"Tanvi Desai",phone:"+91 98331 90876",firstVisit:d(-5),visits:1,note:"Zirconia x3"},
      {name:"Sameer Khan",phone:"+91 99205 44718",firstVisit:d(1),visits:1,note:"Gum treatment"}
    ]);
    write(K.post,[
      {id:"p-camp",title:"Free kids' dental camp this Sunday",category:"updates",image:"assets/img/blog-kids.jpg",body:"This Sunday the studio runs a free checkup camp for children under 12, from 10 AM to 1 PM. No appointment needed, walk in with the kids.\n\nEvery child gets a full checkup, a brushing demo, and a fluoride varnish if needed. Bring their old reports if you have them.",created:t}
    ]);
    write(K.ban,[
      {id:"b1",type:"template",template:"festival",title:"Dussehra week: 20% off on cleaning & polishing",sub:"Till 22 October · walk in or WhatsApp to book",cta:"Book now",link:"contact.html#book",active:true,created:t},
      {id:"b2",type:"template",template:"welcome",title:"Now accepting new patients",sub:"Same-week appointments with MDS specialists",cta:"Book a visit",link:"contact.html#book",active:true,created:t}
    ]);
    write(K.cfg,DEFAULT_CFG);
    write(K.ovr,{});
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
    banners:function(){return read(K.ban,[]);},
    saveBanners:function(b){return write(K.ban,b);},
    overrides:function(){return read(K.ovr,{});},
    saveOverrides:function(o){return write(K.ovr,o);},
    cfg:function(){var c=read(K.cfg,null);return Object.assign({},DEFAULT_CFG,c||{});},
    saveCfg:function(c){return write(K.cfg,Object.assign({},this.cfg(),c));},
    ref:ref,esc:esc
  };
})();
