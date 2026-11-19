export function initApplication(items) {
  const form = document.querySelector('#rental-form');
  const sections = [...form.querySelectorAll('[data-step]')];
  const steps = [...document.querySelectorAll('.apply-progress li')];
  const next = document.querySelector('#apply-next');
  const back = document.querySelector('#apply-back');
  const select = form.elements.itemId;
  let step = 0;

  for (const item of items) {
    const option = new Option(`${item.name}${item.available === 0 ? ' (품절)' : ''}`, item.id);
    option.disabled = item.available === 0;
    select.add(option);
  }
  const requested = new URLSearchParams(location.search).get('item');
  if (items.some(item => item.id === requested && item.available > 0)) select.value = requested;

  function showStep() {
    sections.forEach((section, index) => { section.hidden = index !== step; });
    steps.forEach((element, index) => {
      if (index === step) element.setAttribute('aria-current', 'step');
      else element.removeAttribute('aria-current');
    });
    back.hidden = step === 0;
    next.textContent = step === 2 ? '신청 체험 완료하기' : '다음으로';
    sections[step].querySelector('h2').focus();
  }

  back.addEventListener('click', () => {
    if (step > 0) { step--; showStep(); }
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (step < 2) { step++; showStep(); }
    else {
      form.hidden = true;
      document.querySelector('#apply-complete').hidden = false;
      document.querySelector('#apply-complete h2').focus();
      form.reset();
    }
  });
}
