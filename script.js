const WHATSAPP_NUMBER = "919359521650";
const whatsappText = "Hello, I am interested in Iron Edge Fitness Club. I would like to know about membership plans and book a free trial.";
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`;

["heroWhatsapp","contactWhatsapp","floatingWhatsapp"].forEach(id=>{
  const el=document.getElementById(id);
  if(el) el.href=whatsappUrl;
});

const header=document.getElementById("header");
const menuToggle=document.getElementById("menuToggle");
const nav=document.getElementById("nav");
menuToggle?.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",open);
});
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

window.addEventListener("scroll",()=>{
  header.classList.toggle("scrolled",window.scrollY>30);
});

const sections=[...document.querySelectorAll("main section[id]")];
const navLinks=[...document.querySelectorAll(".nav a[href^='#']")];
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(l=>l.classList.toggle("active",l.getAttribute("href")==="#"+entry.target.id));
    }
  });
},{rootMargin:"-40% 0px -50% 0px"});
sections.forEach(s=>observer.observe(s));

// Scroll Reveal Animation System
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("revealed");
      obs.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
});

document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach(el => {
  revealObserver.observe(el);
});

const toast=document.getElementById("toast");
function showToast(message){
  toast.textContent=message;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),4000);
}

document.getElementById("trialForm")?.addEventListener("submit",e=>{
  e.preventDefault();
  const data=new FormData(e.currentTarget);
  const name=data.get("name"), phone=data.get("phone"), date=data.get("date"), program=data.get("program");
  if(!name||!phone||!date||!program){showToast("Please complete all fields.");return;}
  
  // Format message for WhatsApp
  const message = `Hello! I would like to book a free trial session at Iron Edge Fitness Club.

*Name:* ${name}
*Phone:* ${phone}
*Preferred Date:* ${date}
*Preferred Program:* ${program}`;
  
  const targetWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  
  showToast(`Opening WhatsApp to book your free trial, ${name}!`);
  
  window.open(targetWhatsappUrl, "_blank");
  
  e.currentTarget.reset();
});

let testIndex=0;
const testimonials=[...document.querySelectorAll(".testimonial")];
function showTestimonial(index){
  testIndex=(index+testimonials.length)%testimonials.length;
  testimonials.forEach((t,i)=>t.classList.toggle("active",i===testIndex));
}
document.getElementById("prevTestimonial")?.addEventListener("click",()=>showTestimonial(testIndex-1));
document.getElementById("nextTestimonial")?.addEventListener("click",()=>showTestimonial(testIndex+1));
setInterval(()=>showTestimonial(testIndex+1),7000);

const lightbox=document.getElementById("lightbox");
const lightboxImg=document.getElementById("lightboxImg");
document.querySelectorAll(".gallery-item").forEach(item=>{
  item.addEventListener("click",()=>{
    const file=item.dataset.image;
    lightboxImg.src=`images/${file}`;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden","false");
  });
});
function closeLightbox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
}
document.getElementById("closeLightbox")?.addEventListener("click",closeLightbox);
lightbox?.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLightbox()});

const imageElements=document.querySelectorAll("[data-image]");
imageElements.forEach(el=>{
  const file=el.dataset.image;
  if(!el.classList.contains("gallery-item") && !el.classList.contains("image-card") && !el.classList.contains("program-card") && !el.classList.contains("facility")){
    el.style.backgroundImage=`url("images/${file}")`;
  } else if(el.dataset.image){
    el.style.backgroundImage=`url("images/${file}")`;
  }
});

// Prevent accidental form submission from navigating.
document.querySelectorAll("form").forEach(form=>form.addEventListener("keydown",e=>{
  if(e.key==="Enter" && e.target.tagName!=="TEXTAREA") e.preventDefault();
}));
