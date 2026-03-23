(async function () {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let totalUnliked = parseInt(sessionStorage.getItem('totalUnliked') || '0');
  await sleep(6000);

  const container = document.querySelector('.wbloks_94');
  if (!container) return;

  let lastCount = 0;
  for (let i = 0; i < 4; i++) {
    const step = container.scrollHeight / 10;
    for (let j = 1; j <= 10; j++) {
      container.scrollTop = step * j;
      await sleep(200);
    }
    await sleep(3000);
    const current = document.querySelectorAll('[aria-label="Image Publication"]').length;
    if (current === lastCount && i > 1) break;
    lastCount = current;
  }
  container.scrollTop = 0;
  await sleep(1000);

  const selectBtn = [...document.querySelectorAll('[data-bloks-name="bk.components.Text"]')]
    .find(el => el.textContent.trim() === 'Sélectionner');
  if (!selectBtn) return;
  selectBtn.closest('[role="button"]')?.click() || selectBtn.parentElement?.click();
  await sleep(2000);

  const checkboxes = [...document.querySelectorAll('[aria-label="Activer la case à cocher"]')];
  if (!checkboxes.length) return;

  let count = 0;
  for (const cb of checkboxes) {
    if (count >= 100) break;
    cb.style.pointerEvents = 'auto';
    cb.click();
    await sleep(20);
    count++;
  }
  await sleep(2000);

  const unlikeBtn = [...document.querySelectorAll('[data-bloks-name="bk.components.TextSpan"]')]
    .find(el => el.textContent.includes('aime plus'));
  if (!unlikeBtn) return;
  unlikeBtn.closest('[role="button"]')?.click() || unlikeBtn.parentElement?.click();
  await sleep(2500);

  const confirmBtn = [...document.querySelectorAll('button._a9--')]
    .find(el => el.textContent.includes('aime plus'));
  if (!confirmBtn) return;
  confirmBtn.click();

  sessionStorage.setItem('totalUnliked', totalUnliked + count);
  await sleep(1000);
  location.reload();
})();
