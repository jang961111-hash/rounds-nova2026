(function(){
  // 팀원 카드 렌더링 (데이터는 ../members.js)
  var LABELS={github:"GitHub",portfolio:"포트폴리오",paper:"논문",project:"프로젝트"};
  var root=document.getElementById("members");
  function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
  function safeUrl(u){return /^https?:\/\//i.test(u||"")||/^assets\/[\w\-./]+$/.test(u||"")}
  (window.MEMBERS||[]).forEach(function(m){
    var c=el("article","card");
    var ph=el("div","photo");
    if(m.photo){var img=el("img");img.src=m.photo;img.alt=m.name+" 사진";img.loading="lazy";ph.appendChild(img)}
    else ph.appendChild(el("span","initial",/^\(/.test(m.name||"")?"Dr":(m.name||"?").charAt(0)));
    c.appendChild(ph);
    c.appendChild(el("h3",null,m.name));
    if(m.role)c.appendChild(el("div","role",m.role));
    if(m.affiliation&&m.affiliation!=="TODO")c.appendChild(el("div","aff",m.affiliation));
    else c.appendChild(el("div","aff pending","소속 준비 중"));
    if(!m.intro||m.intro==="TODO")c.appendChild(el("p","pending","준비 중"));
    else c.appendChild(el("p",null,m.intro));
    if(m.highlights&&m.highlights.length){
      var ul=el("ul");m.highlights.forEach(function(h){ul.appendChild(el("li",null,h))});c.appendChild(ul);
    }
    var l=el("div","links");
    Object.keys(LABELS).forEach(function(k){
      var u=m.links&&m.links[k];
      if(!safeUrl(u))return; // 링크 없으면 버튼 숨김
      var a=el("a","btn sm",LABELS[k]);a.href=u;a.target="_blank";a.rel="noopener noreferrer";l.appendChild(a);
    });
    if(l.children.length)c.appendChild(l);
    root.appendChild(c);
  });
  // 테마 토글
  var b=document.getElementById("theme");
  try{var s=localStorage.getItem("theme");if(s)document.documentElement.setAttribute("data-theme",s)}catch(e){}
  b.addEventListener("click",function(){
    var cur=document.documentElement.getAttribute("data-theme");
    var dark=cur?cur==="dark":matchMedia("(prefers-color-scheme: dark)").matches;
    var n=dark?"light":"dark";
    document.documentElement.setAttribute("data-theme",n);
    try{localStorage.setItem("theme",n)}catch(e){}
  });
})();
