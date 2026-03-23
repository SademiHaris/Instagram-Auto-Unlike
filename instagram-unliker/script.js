(async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const $ = sel => [...document.querySelectorAll(sel)];
  const total = parseInt(sessionStorage.getItem('unliked') || '0');

  await sleep(2000);

  const container = document.querySelector('.wbloks_94');
  if (!container) return;

  let lastCount = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j <= 10; j++) {
      container.scrollTop = container.scrollHeight / 10 * j;
      await sleep(100);
    }
    await sleep(1500);
    const count = $('[aria-label="Image Publication"]').length;
    if (count === lastCount && i > 1) break;
    lastCount = count;
  }
  container.scrollTop = 0;
  await sleep(500);

  const selectBtn = $('[data-bloks-name="bk.components.Text"]')
    .find(el => el.textContent.trim() === 'Sélectionner');
  if (!selectBtn) return;
  (selectBtn.closest('[role="button"]') || selectBtn.parentElement).click();
  await sleep(1500);

  const checkboxes = $('[aria-label="Activer la case à cocher"]');
  if (!checkboxes.length) return;

  let clicked = 0;
  for (const cb of checkboxes) {
    if (clicked >= 100) break;
    cb.style.pointerEvents = 'auto';
    cb.click();
    await sleep(80);
    clicked++;
  }
  await sleep(1500);

  const unlikeBtn = $('[data-bloks-name="bk.components.TextSpan"]')
    .find(el => el.textContent.includes('aime plus'));
  if (!unlikeBtn) return;
  (unlikeBtn.closest('[role="button"]') || unlikeBtn.parentElement).click();
  await sleep(2000);

  const confirmBtn = $('button._a9--')
    .find(el => el.textContent.includes('aime plus'));
  if (!confirmBtn) return;
  confirmBtn.click();

  sessionStorage.setItem('unliked', total + clicked);
  location.reload();
})();
