import { validateApplication } from './application-validation.js';

export function initApplication(items) {
  const form = document.querySelector('#rental-form');
  const sections = [...form.querySelectorAll('[data-step]')];
  const steps = [...document.querySelectorAll('.apply-progress li')];
  const next = document.querySelector('#apply-next');
  const back = document.querySelector('#apply-back');
  const select = form.elements.itemId;
  let step = 0;
  let completed = false;

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
    next.textContent = step === 2 ? '확인 마치기' : '다음으로';
    sections[step].querySelector('h2').focus();
  }

  function clearErrors() {
    form.querySelectorAll('.field-error').forEach(element => { element.textContent = ''; });
    form.querySelectorAll('[aria-invalid]').forEach(element => element.removeAttribute('aria-invalid'));
  }

  function displayErrors(errors) {
    for (const [name, message] of Object.entries(errors)) {
      document.getElementById(`${name}-error`).textContent = message;
      form.elements[name].setAttribute('aria-invalid', 'true');
    }
    document.querySelector('#apply-status').textContent = '입력 내용을 확인해 주세요.';
    form.elements[Object.keys(errors)[0]].focus();
  }

  function showSummary(data) {
    const summary = document.querySelector('#application-summary');
    summary.replaceChildren();
    const item = items.find(item => item.id === data.itemId);
    const entries = [['학과', data.department], ['학번', data.studentNo], ['이름', data.name], ['휴대전화 번호', data.phone], ['신청 물품', item.name]];
    for (const [label, value] of entries) {
      const row = document.createElement('div');
      const term = document.createElement('dt');
      const description = document.createElement('dd');
      term.textContent = label;
      description.textContent = value;
      row.append(term, description);
      summary.append(row);
    }
  }

  back.addEventListener('click', () => {
    if (step > 0) { clearErrors(); step--; showStep(); }
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (completed) return;
    clearErrors();
    if (step === 0) {
      if (!form.elements.understood.checked) {
        displayErrors({ understood: '대여 이용 안내를 확인해 주세요.' });
        return;
      }
      step = 1;
      showStep();
      return;
    }
    const { data, errors } = validateApplication(Object.fromEntries(new FormData(form)), items);
    if (Object.keys(errors).length) {
      step = 1;
      showStep();
      displayErrors(errors);
      return;
    }
    if (step === 1) {
      showSummary(data);
      step = 2;
      showStep();
      return;
    }
    completed = true;
    next.disabled = true;
    form.hidden = true;
    document.querySelector('.apply-progress').hidden = true;
    document.querySelector('#apply-complete').hidden = false;
    document.querySelector('#apply-complete h2').focus();
    form.reset();
    document.querySelector('#application-summary').replaceChildren();
  });
}
