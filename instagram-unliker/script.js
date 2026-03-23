(async function () {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let totalUnliked = parseInt(sessionStorage.getItem('totalUnliked') || '0');
  console.log(`▶️ Reprise — total unliké : ${totalUnliked}`);

  await sleep(3000);

  const container = document.querySelector('.wbloks_94');
  if (!container) { console.log('❌ Conteneur introuvable'); return; }

  console.log('📜 Chargement des posts...');
  let lastCount = 0;
  for (let i = 0; i < 4; i++) {
    const step = container.scrollHeight / 10;
    for (let j = 1; j <= 10; j++) {
      container.scrollTop = step * j;
      await sleep(200);
    }
    await sleep(3000);
    const current = document.querySelectorAll('[aria-label="Image Publication"]').length;
    console.log(`📜 Scroll ${i+1} — ${current} posts chargés`);
    if (current === lastCount && i > 1) break;
    lastCount = current;
  }
  container.scrollTop = 0;
  await sleep(1000);

  const selectBtn = [...document.querySelectorAll('[data-bloks-name="bk.components.Text"]')]
    .find(el => el.textContent.trim() === 'Sélectionner');
  if (!selectBtn) { console.log('❌ Bouton Sélectionner introuvable'); return; }
  selectBtn.closest('[role="button"]')?.click() || selectBtn.parentElement?.click();
  console.log('✅ Sélectionner cliqué');
  await sleep(2000);

  const checkboxes = [...document.querySelectorAll('[aria-label="Activer la case à cocher"]')];
  if (!checkboxes.length) { console.log('✅ Plus rien à unliker !'); return; }

  let count = 0;
  for (const cb of checkboxes) {
    if (count >= 100) break;
    cb.style.pointerEvents = 'auto';
    cb.click();
    await sleep(150);
    count++;
  }
  console.log(`☑️ ${count} posts sélectionnés`);
  await sleep(2000);

  const unlikeBtn = [...document.querySelectorAll('[data-bloks-name="bk.components.TextSpan"]')]
    .find(el => el.textContent.includes('aime plus'));
  if (!unlikeBtn) { console.log('❌ Bouton unlike introuvable'); return; }
  unlikeBtn.closest('[role="button"]')?.click() || unlikeBtn.parentElement?.click();
  console.log('👍 Unlike cliqué');
  await sleep(2500);

  const confirmBtn = [...document.querySelectorAll('button._a9--')]
    .find(el => el.textContent.includes('aime plus'));
  if (confirmBtn) {
    confirmBtn.click();
    console.log('✅ Popup confirmée');
  } else { return; }

  totalUnliked += count;
  sessionStorage.setItem('totalUnliked', totalUnliked);
  console.log(`🔄 Total unliké : ${totalUnliked}. Rechargement dans 1s...`);
  await sleep(1000);
  location.reload();
})();