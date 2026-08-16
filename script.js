const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');toggle?.addEventListener('click',()=>{nav.classList.toggle('open');toggle.setAttribute('aria-expanded',nav.classList.contains('open'))});
const slides=[...document.querySelectorAll('.slide')];let current=0;function show(n){if(!slides.length)return;slides[current].classList.remove('active');current=(n+slides.length)%slides.length;slides[current].classList.add('active')}document.querySelector('.next')?.addEventListener('click',()=>show(current+1));document.querySelector('.prev')?.addEventListener('click',()=>show(current-1));setInterval(()=>show(current+1),6500);
document.querySelectorAll('a[href^="#"]').forEach(a=>a.onclick=()=>nav?.classList.remove('open'));
// Close mobile menu after any navigation action
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
// Every content photograph leads to the school's Instagram; logo remains a home link.
document.querySelectorAll('main img').forEach(img=>{
 if(img.closest('a')) return;
 img.setAttribute('role','link'); img.setAttribute('tabindex','0'); img.setAttribute('aria-label',(img.alt||'Фотография')+' — открыть Instagram');
 const openInstagram=()=>window.open('https://instagram.com/armenian_community48','_blank','noopener');
 img.addEventListener('click',openInstagram); img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openInstagram()}});
});
// Autoplaying news rail with manual controls and pause on interaction.
(function(){
 const track=document.querySelector('.news-track'); if(!track)return;
 const cards=[...track.children], rail=track.closest('.news-rail'); let index=0, timer;
 const visible=()=>window.innerWidth<=700?1:2;
 function stepWidth(){return cards[0]?.getBoundingClientRect().width+18||0}
 function go(n){const max=Math.max(0,cards.length-visible());index=(n>max)?0:(n<0?max:n);track.style.transform=`translateX(${-index*stepWidth()}px)`}
 function start(){clearInterval(timer);timer=setInterval(()=>go(index+1),4200)}
 rail.querySelector('.rail-next')?.addEventListener('click',()=>{go(index+1);start()});
 rail.querySelector('.rail-prev')?.addEventListener('click',()=>{go(index-1);start()});
 rail.addEventListener('mouseenter',()=>clearInterval(timer));rail.addEventListener('mouseleave',start);
 rail.addEventListener('focusin',()=>clearInterval(timer));rail.addEventListener('focusout',start);
 window.addEventListener('resize',()=>go(Math.min(index,Math.max(0,cards.length-visible()))));start();
})();
// Featured news slider: first item is admissions, thumbnails control the same large panel.
(function(){
 const slider=document.querySelector('.news-slider'); if(!slider)return;
 const slides=[...slider.querySelectorAll('.news-slide')], thumbs=[...slider.querySelectorAll('.news-thumb')];let current=0,timer;
 function show(n){current=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle('active',i===current));thumbs.forEach((t,i)=>t.classList.toggle('active',i===current));}
 function start(){clearInterval(timer);timer=setInterval(()=>show(current+1),3400)}
 thumbs.forEach((t,i)=>t.addEventListener('click',()=>{show(i);start()}));
 slider.addEventListener('mouseenter',()=>clearInterval(timer));slider.addEventListener('mouseleave',start);slider.addEventListener('focusin',()=>clearInterval(timer));slider.addEventListener('focusout',start);start();
})();
// The thumbnail strip moves independently from the featured slide.
(function(){
 const strip=document.querySelector('.news-thumbs'); if(!strip)return;
 let direction=1,timer;
 function move(){const step=(strip.querySelector('.news-thumb')?.getBoundingClientRect().width||180)+12;const end=strip.scrollWidth-strip.clientWidth;if(end<=2)return;if(strip.scrollLeft>=end-3)direction=-1;if(strip.scrollLeft<=3)direction=1;strip.scrollBy({left:direction*step,behavior:'smooth'})}
 function start(){clearInterval(timer);timer=setInterval(move,4500)}
 strip.addEventListener('mouseenter',()=>clearInterval(timer));strip.addEventListener('mouseleave',start);strip.addEventListener('touchstart',()=>clearInterval(timer),{passive:true});strip.addEventListener('touchend',start,{passive:true});start();
})();
// Dedicated full-width preview rail arrows.
(function(){
 const strip=document.querySelector('.news-thumbs'); if(!strip)return;
 function step(dir){const card=strip.querySelector('.news-thumb');if(!card)return;strip.scrollBy({left:dir*(card.getBoundingClientRect().width+16),behavior:'smooth'})}
 document.querySelector('.preview-prev')?.addEventListener('click',()=>step(-1));
 document.querySelector('.preview-next')?.addEventListener('click',()=>step(1));
})();
// Local video carousel: autoplay first video in view, pause when out of view.
(function(){
 const section=document.querySelector('.video-section');if(!section)return;
 const slides=[...section.querySelectorAll('.video-slide')];let active=0,inView=false;
 slides.forEach(slide=>{const v=slide.querySelector('video');if(!v)return;const orient=()=>{slide.classList.toggle('is-portrait',v.videoHeight>v.videoWidth);slide.classList.toggle('is-landscape',v.videoWidth>=v.videoHeight)};v.addEventListener('loadedmetadata',orient);if(v.readyState>=1)orient()});
 function stopAll(){slides.forEach(s=>s.querySelector('video')?.pause())}
 function render(n){stopAll();active=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle('active',i===active));section.querySelector('.video-count b').textContent=String(active+1).padStart(2,'0');if(inView&&active===0)slides[0].querySelector('video')?.play().catch(()=>{})}
 section.querySelector('.video-prev')?.addEventListener('click',()=>render(active-1));section.querySelector('.video-next')?.addEventListener('click',()=>render(active+1));
 new IntersectionObserver(entries=>{inView=entries[0].isIntersecting&&entries[0].intersectionRatio>=.45;if(inView&&active===0){slides[0].querySelector('video')?.play().catch(()=>{})}else stopAll()},{threshold:[0,.45,.7]}).observe(section);
})();
