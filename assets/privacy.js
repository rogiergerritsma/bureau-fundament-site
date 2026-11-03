/* "Wis mijn cookiekeuze" button on the privacy page. Was an inline script. */
document.getElementById('keuzeWissen').addEventListener('click', function(){
  try { localStorage.removeItem('bf_cookiekeuze'); } catch (e) {}
  var host = location.hostname.replace(/^www\./, '');
  document.cookie.split(';').forEach(function(c){
    var naam = c.split('=')[0].trim();
    if (naam.indexOf('_ga') === 0) {
      ['', ';domain=' + host, ';domain=.' + host].forEach(function(d){
        document.cookie = naam + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/' + d;
      });
    }
  });
  document.getElementById('keuzeMelding').hidden = false;
});
