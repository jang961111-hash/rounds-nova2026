(function(){
  var root=document.getElementById("members");
  var DICT=window.I18N||{ko:{},en:{}};
  var lang="ko";
  var membersRendered=false;
  var menuBtn=document.getElementById("menu"),nav=document.getElementById("site-nav"),hdr=document.querySelector("header.top");

  function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
  function safeUrl(u){return /^https?:\/\//i.test(u||"")||/^assets\/[\w\-./]+$/.test(u||"")}
  function isPdf(u){return /\.pdf($|[?#])/i.test(u||"")}
  function tr(key){var d=DICT[lang]||{};return d[key]!=null?d[key]:(DICT.ko[key]!=null?DICT.ko[key]:key)}

  // ---------- 팀원 카드 렌더링 (데이터는 members.js, 영어는 m.en) ----------
  // 현재 언어 필드 선택: en 값이 있으면 en, 없으면 기존 한국어 필드로 대체
  function pick(m,k){return(lang==="en"&&m.en&&m.en[k]!=null&&m.en[k]!=="")?m.en[k]:m[k]}
  var LINKS=["github","portfolio","paper","project"];

  function renderMembers(){
    if(!root)return;
    root.textContent="";
    (window.MEMBERS||[]).forEach(function(m,i){
      var c=el("article","card reveal"+(membersRendered?" in":""));
      c.style.setProperty("--d",(i*0.12)+"s");
      var hasPhoto=!!m.photo&&safeUrl(m.photo);
      var ph=el("div",hasPhoto?"photo":"photo avatar");
      if(hasPhoto){var img=el("img");img.src=m.photo+"?v=10040008";img.alt=pick(m,"name")+tr("m.photoAlt");img.loading="lazy";if(m.photoZoom){img.style.transform="scale("+m.photoZoom+")";img.style.transformOrigin="50% 30%"}ph.appendChild(img)}
      else{var ini=el("span","initial",/^\(/.test(m.name||"")?"Dr":(m.name||"?").charAt(0));ini.setAttribute("aria-hidden","true");ph.appendChild(ini)}
      c.appendChild(ph);
      var b=el("div","body");
      // 역할 배지: "팀장 · 에이전트 설계·개발" -> 배지 "팀장" + 역할 문구
      var role=pick(m,"role");
      if(role){
        var parts=role.split(" · ");
        if(parts.length>1){b.appendChild(el("span","badge",parts[0]))}
        b.appendChild(el("h3",null,pick(m,"name")));
        b.appendChild(el("div","role",parts.length>1?parts.slice(1).join(" · "):role));
      }else b.appendChild(el("h3",null,pick(m,"name")));
      var aff=pick(m,"affiliation");
      if(aff&&aff!=="TODO")b.appendChild(el("div","aff",aff));
      else b.appendChild(el("div","aff pending",tr("m.affPending")));
      var intro=pick(m,"intro");
      if(!intro||intro==="TODO")b.appendChild(el("p","pending",tr("m.pending")));
      else b.appendChild(el("p",null,intro));
      var hl=pick(m,"highlights");
      if(hl&&hl.length){
        var ul=el("ul");hl.forEach(function(h){ul.appendChild(el("li",null,h))});b.appendChild(ul);
      }
      var l=el("div","links");
      LINKS.forEach(function(k){
        var u=m.links&&m.links[k];
        if(!safeUrl(u))return; // 링크 없으면 버튼 숨김
        var a=el("a","btn sm",tr("m."+k)+(isPdf(u)?" (PDF)":""));a.href=u;a.target="_blank";a.rel="noopener noreferrer";l.appendChild(a);
      });
      if(l.children.length)b.appendChild(l);
      c.appendChild(b);
      root.appendChild(c);
    });
    membersRendered=true;
  }

  // ---------- 정적 텍스트 사전 적용 ----------
  function applyStatic(){
    var d=DICT[lang]||{},k=DICT.ko;
    function get(key){return d[key]!=null?d[key]:k[key]}
    [].forEach.call(document.querySelectorAll("[data-i18n]"),function(n){var v=get(n.getAttribute("data-i18n"));if(v!=null)n.textContent=v});
    [].forEach.call(document.querySelectorAll("[data-i18n-html]"),function(n){var v=get(n.getAttribute("data-i18n-html"));if(v!=null)n.innerHTML=v}); // 사전은 정적·신뢰 문자열만
    [].forEach.call(document.querySelectorAll("[data-i18n-attr]"),function(n){
      n.getAttribute("data-i18n-attr").split(";").forEach(function(p){
        var kv=p.split(":");var v=get(kv[1]);if(v!=null)n.setAttribute(kv[0],v);
      });
    });
    var t=get("meta.title");if(t)document.title=t;
    syncMenuLabel();
  }

  // ---------- 언어 선택 ----------
  function normalize(v){v=(v||"").toLowerCase();return v.indexOf("ko")===0?"ko":v.indexOf("en")===0?"en":null}
  function urlLang(){try{return normalize(new URLSearchParams(location.search).get("lang"))}catch(e){return null}}
  function storedLang(){try{return normalize(localStorage.getItem("lang"))}catch(e){return null}}
  // ?lang 는 공유 링크의 명시적 의도이므로 저장값보다 우선, 그다음 저장값, 마지막이 브라우저 언어
  function initialLang(){return urlLang()||storedLang()||normalize(navigator.language||(navigator.languages||[])[0])||"ko"}

  var langBtns=[].slice.call(document.querySelectorAll(".lang button[data-lang]"));
  function paintToggle(){
    langBtns.forEach(function(b){b.setAttribute("aria-pressed",b.getAttribute("data-lang")===lang?"true":"false")});
  }
  function setLang(next,opts){
    opts=opts||{};
    if(next!==lang||opts.force){
      lang=next;
      document.documentElement.lang=lang;
      applyStatic();renderMembers();paintToggle();
    }
    if(opts.persist){
      try{localStorage.setItem("lang",lang)}catch(e){}
      try{if(urlLang()!==null){var u=new URL(location.href);u.searchParams.set("lang",lang);history.replaceState(null,"",u.toString())}}catch(e){}
    }
  }
  var fadeTimer=null,reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  function switchLang(next){
    if(next===lang)return;
    if(reduce){setLang(next,{persist:true});return}
    var h=document.documentElement;
    clearTimeout(fadeTimer);
    h.classList.add("lang-swap"); // 짧게 페이드 아웃 → 텍스트 교체 → 페이드 인
    fadeTimer=setTimeout(function(){
      setLang(next,{persist:true});
      requestAnimationFrame(function(){h.classList.remove("lang-swap")});
    },160);
  }
  langBtns.forEach(function(b){b.addEventListener("click",function(){switchLang(b.getAttribute("data-lang"))})});

  lang=initialLang();
  document.documentElement.lang=lang;
  applyStatic();renderMembers();paintToggle();
  if(urlLang()){try{localStorage.setItem("lang",lang)}catch(e){}}

  // ---------- 테마 토글 ----------
  var tb=document.getElementById("theme");
  try{var s=localStorage.getItem("theme");if(s)document.documentElement.setAttribute("data-theme",s)}catch(e){}
  tb.addEventListener("click",function(){
    var cur=document.documentElement.getAttribute("data-theme");
    var dark=cur?cur==="dark":matchMedia("(prefers-color-scheme: dark)").matches;
    var n=dark?"light":"dark";
    document.documentElement.setAttribute("data-theme",n);
    try{localStorage.setItem("theme",n)}catch(e){}
  });

  // ---------- 모바일 햄버거 메뉴 ----------
  function syncMenuLabel(){
    if(!menuBtn)return;
    menuBtn.setAttribute("aria-label",tr(menuBtn.getAttribute("aria-expanded")==="true"?"ui.menuClose":"ui.menuOpen"));
  }
  function setMenu(open,focusBtn){
    menuBtn.setAttribute("aria-expanded",open?"true":"false");
    hdr.classList.toggle("menu-open",open);
    syncMenuLabel();
    if(!open&&focusBtn)menuBtn.focus();
  }
  if(menuBtn&&nav){
    menuBtn.addEventListener("click",function(){setMenu(menuBtn.getAttribute("aria-expanded")!=="true")});
    nav.addEventListener("click",function(e){if(e.target.closest("a"))setMenu(false)});
    document.addEventListener("keydown",function(e){
      if(e.key==="Escape"&&menuBtn.getAttribute("aria-expanded")==="true"){setMenu(false,true)}
    });
    document.addEventListener("click",function(e){
      if(menuBtn.getAttribute("aria-expanded")==="true"&&!hdr.contains(e.target))setMenu(false);
    });
    matchMedia("(min-width: 721px)").addEventListener&&matchMedia("(min-width: 721px)").addEventListener("change",function(q){if(q.matches)setMenu(false)});
  }

  // ---------- 스크롤 등장 ----------
  // JS가 없으면 .reveal 은 처음부터 보임. 모션 감소 설정이면 CSS에서 숨김 자체가 없음.
  var items=[].slice.call(document.querySelectorAll(".reveal"));
  if(!("IntersectionObserver" in window)||reduce){
    items.forEach(function(e){e.classList.add("in")});return;
  }
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}});
  },{threshold:.12,rootMargin:"0px 0px -6% 0px"});
  items.forEach(function(e,i){
    if(!e.style.getPropertyValue("--d")&&e.classList.contains("stat"))e.style.setProperty("--d",((i%4)*0.08)+"s");
    io.observe(e);
  });
})();
