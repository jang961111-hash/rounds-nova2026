(function(){
  // 팀원 카드 렌더링 (데이터는 ../members.js)
  var LABELS={github:"GitHub",portfolio:"포트폴리오",paper:"논문",project:"프로젝트"};
  var root=document.getElementById("members");
  function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
  function safeUrl(u){return /^https?:\/\//i.test(u||"")||/^assets\/[\w\-./]+$/.test(u||"")}
  function isPdf(u){return /\.pdf($|[?#])/i.test(u||"")}
  (window.MEMBERS||[]).forEach(function(m,i){
    var c=el("article","card reveal");
    c.style.setProperty("--d",(i*0.12)+"s");
    var hasPhoto=!!m.photo&&safeUrl(m.photo);
    var ph=el("div",hasPhoto?"photo":"photo avatar");
    if(hasPhoto){var img=el("img");img.src=m.photo;img.alt=m.name+" 사진";img.loading="lazy";ph.appendChild(img)}
    else{var ini=el("span","initial",/^\(/.test(m.name||"")?"Dr":(m.name||"?").charAt(0));ini.setAttribute("aria-hidden","true");ph.appendChild(ini)}
    c.appendChild(ph);
    var b=el("div","body");
    // 역할 배지: "팀장 · 에이전트 설계·개발" -> 배지 "팀장" + 역할 문구
    if(m.role){
      var parts=m.role.split(" · ");
      if(parts.length>1){b.appendChild(el("span","badge",parts[0]))}
      b.appendChild(el("h3",null,m.name));
      b.appendChild(el("div","role",parts.length>1?parts.slice(1).join(" · "):m.role));
    }else b.appendChild(el("h3",null,m.name));
    if(m.affiliation&&m.affiliation!=="TODO")b.appendChild(el("div","aff",m.affiliation));
    else b.appendChild(el("div","aff pending","소속 준비 중"));
    if(!m.intro||m.intro==="TODO")b.appendChild(el("p","pending","준비 중"));
    else b.appendChild(el("p",null,m.intro));
    if(m.highlights&&m.highlights.length){
      var ul=el("ul");m.highlights.forEach(function(h){ul.appendChild(el("li",null,h))});b.appendChild(ul);
    }
    var l=el("div","links");
    Object.keys(LABELS).forEach(function(k){
      var u=m.links&&m.links[k];
      if(!safeUrl(u))return; // 링크 없으면 버튼 숨김
      var a=el("a","btn sm",LABELS[k]+(isPdf(u)?" (PDF)":""));a.href=u;a.target="_blank";a.rel="noopener noreferrer";l.appendChild(a);
    });
    if(l.children.length)b.appendChild(l);
    c.appendChild(b);
    root.appendChild(c);
  });

  // 테마 토글
  var tb=document.getElementById("theme");
  try{var s=localStorage.getItem("theme");if(s)document.documentElement.setAttribute("data-theme",s)}catch(e){}
  tb.addEventListener("click",function(){
    var cur=document.documentElement.getAttribute("data-theme");
    var dark=cur?cur==="dark":matchMedia("(prefers-color-scheme: dark)").matches;
    var n=dark?"light":"dark";
    document.documentElement.setAttribute("data-theme",n);
    try{localStorage.setItem("theme",n)}catch(e){}
  });

  // 스크롤 등장: JS가 없으면 .reveal 은 처음부터 보임. 모션 감소 설정이면 CSS에서 숨김 자체가 없음.
  var items=[].slice.call(document.querySelectorAll(".reveal"));
  if(!("IntersectionObserver" in window)||matchMedia("(prefers-reduced-motion: reduce)").matches){
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
