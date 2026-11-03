/* Cookie bar, conversion events, sticky call bar and FAQ tabs. Was an inline script. */
/* ---------- cookiekeuze ---------- */
var balk = document.getElementById('cookiebalk');

function leesKeuze(){
  try { return localStorage.getItem('bf_cookiekeuze'); } catch (e) { return null; }
}

function wisGaCookies(){
  var host = location.hostname.replace(/^www\./, '');
  document.cookie.split(';').forEach(function(c){
    var naam = c.split('=')[0].trim();
    if (naam.indexOf('_ga') === 0) {
      ['', ';domain=' + host, ';domain=.' + host].forEach(function(d){
        document.cookie = naam + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/' + d;
      });
    }
  });
}

if (!leesKeuze()) balk.hidden = false;

balk.addEventListener('click', function(e){
  var knop = e.target.closest('button[data-keuze]');
  if (!knop) return;
  var keuze = knop.getAttribute('data-keuze');
  var wasGeladen = window.gaGeladen;
  try { localStorage.setItem('bf_cookiekeuze', keuze); } catch (err) {}
  balk.hidden = true;
  if (keuze === 'ja') {
    laadAnalytics();
  } else {
    wisGaCookies();
    if (wasGeladen) location.reload();
  }
});

document.getElementById('cookieInstellingen').addEventListener('click', function(){
  balk.hidden = false;
});

/* ---------- conversie-events: bellen, WhatsApp, mail ---------- */
document.addEventListener('click', function(e){
  var a = e.target.closest('a[href]');
  if (!a || !window.gaGeladen) return;
  var href = a.getAttribute('href');
  var naam = null;
  if (href.indexOf('tel:') === 0) naam = 'bel_klik';
  else if (href.indexOf('wa.me') > -1) naam = 'whatsapp_klik';
  else if (href.indexOf('mailto:') === 0) naam = 'mail_klik';
  if (!naam) return;
  var plek = a.closest('[data-locatie]');
  gtag('event', naam, {
    locatie: plek ? plek.getAttribute('data-locatie') : 'overig',
    transport_type: 'beacon'
  });
});

/* ---------- sticky mobiele call bar ---------- */
var hero = document.querySelector('.hero');
var sticky = document.getElementById('stickyCall');
window.addEventListener('scroll', function(){
  var heroBottom = hero.getBoundingClientRect().bottom;
  if (heroBottom < 0) {
    sticky.classList.add('tonen');
  } else {
    sticky.classList.remove('tonen');
  }
}, { passive: true });
/* ---------- tabbladen veelgestelde vragen ---------- */
var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
function kiesTab(tab, focus){
  tabs.forEach(function(t){
    var actief = t === tab;
    t.setAttribute('aria-selected', actief ? 'true' : 'false');
    t.tabIndex = actief ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !actief;
  });
  if (focus) tab.focus();
}
tabs.forEach(function(t, i){
  t.addEventListener('click', function(){ kiesTab(t); });
  t.addEventListener('keydown', function(e){
    var n = null;
    if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
    else if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
    else if (e.key === 'Home') n = tabs[0];
    else if (e.key === 'End') n = tabs[tabs.length - 1];
    if (n){ e.preventDefault(); kiesTab(n, true); }
  });
});
if (tabs.length) kiesTab(tabs[0]);
