export function renderItemList(list, items) {
  list.replaceChildren();
  if (items.length === 0) {
    const message = document.createElement('li');
    message.className = 'empty-state muted';
    message.textContent = '등록된 물품이 없습니다.';
    list.append(message);
    return;
  }

  for (const item of items) {
    const card = document.querySelector('#item-card-template').content.cloneNode(true);
    // 데이터는 HTML로 해석하지 않고 텍스트로 넣습니다.
    card.querySelector('.item-symbol').textContent = item.symbol;
    card.querySelector('[data-field="name"]').textContent = item.name;
    card.querySelector('[data-field="summary"]').textContent = `전체 ${item.total}개 · 대여 중 ${item.total - item.available}개`;
    card.querySelector('[data-field="available"]').textContent = `${item.available}개`;
    card.querySelector('[data-field="status"]').textContent = item.available > 0 ? '대여 가능' : '대여 불가';
    card.querySelector('.item-stock').classList.toggle('unavailable', item.available === 0);
    const button = card.querySelector('button');
    button.addEventListener('click', () => openItemDetail(item, button));
    list.append(card);
  }
}

function openItemDetail(item, trigger) {
  const dialog = document.querySelector('#item-detail-template').content.firstElementChild.cloneNode(true);
  dialog.querySelector('#item-detail-title').textContent = item.name;
  dialog.querySelector('#item-detail-description').textContent = item.description;
  const values = {
    total: `${item.total}개`,
    rented: `${item.total - item.available}개`,
    available: `${item.available}개`,
    returnGuide: item.returnGuide,
  };
  for (const [field, value] of Object.entries(values)) {
    dialog.querySelector(`[data-field="${field}"]`).textContent = value;
  }
  dialog.querySelector('.item-caution').textContent = item.caution;
  const applyButton = dialog.querySelector('.apply-placeholder');
  applyButton.classList.add('primary-button');
  applyButton.disabled = item.available === 0;
  applyButton.textContent = item.available === 0
    ? '현재 대여 가능한 수량이 없어요' : '이 물품 신청하기';
  applyButton.addEventListener('click', () => {
    if (item.available > 0) location.assign(`/apply?item=${encodeURIComponent(item.id)}`);
  });
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    dialog.remove();
    trigger.focus();
  }, { once: true });
  document.querySelector('#app').append(dialog);
  dialog.showModal();
}
