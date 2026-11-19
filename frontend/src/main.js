import { items } from './data/items.js';
import { renderItemList } from './items.js';
import { initApplication } from './application.js';
import './styles/global.css';
import './styles/layout.css';
import './styles/items.css';
import './styles/application.css';

const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
const templateId = pathname === '/' ? 'student-template'
  : pathname === '/admin' ? 'admin-template'
    : pathname === '/apply' ? 'apply-template' : 'not-found-template';

document.querySelector('#app').append(
  document.getElementById(templateId).content.cloneNode(true),
);

if (pathname === '/') {
  renderItemList(document.querySelector('#item-list'), items);
}
if (pathname === '/apply') initApplication(items);
