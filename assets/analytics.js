/* Google Analytics loader: loads gtag.js only after consent (cookie bar in assets/site.js). Was an inline script. */
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var GA_ID = 'G-FLDM7SHN79';
window.gaGeladen = false;
function laadAnalytics(){
  if (window.gaGeladen) return;
  window.gaGeladen = true;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
  gtag('js', new Date());
  gtag('config', GA_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
}
try { if (localStorage.getItem('bf_cookiekeuze') === 'ja') laadAnalytics(); } catch (e) {}
