import Brand from '../components/Brand.jsx';
import { useState } from 'react';
import ItemList from '../components/ItemList.jsx';
import ItemDetail from '../components/ItemDetail.jsx';
import { items } from '../data/items.js';
import '../styles/items.css';

export default function StudentLayout() {
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <div className="student-shell">
      <a className="skip-link" href="#main-content">본문 바로가기</a>
      <header className="student-header"><Brand /></header>
      <main id="main-content" className="student-main" tabIndex={-1}>
        <section className="student-intro" aria-labelledby="student-title">
          <p className="eyebrow">CAMPUS LOAN</p>
          <h1 id="student-title">필요할 때,<br />빌려드립니다.</h1>
          <p className="muted">학교생활에 필요한 물품을<br />한울타리 총학생회에서 만나보세요.</p>
        </section>
        <p className="demo-notice">화면 미리보기 · 물품과 수량은 예시이며 실제 재고가 아닙니다.</p>
        <section aria-labelledby="items-title">
          <h2 id="items-title">대여 물품</h2>
          <ItemList items={items} onSelect={setSelectedItem} />
          {selectedItem && <ItemDetail item={selectedItem} onClose={() => setSelectedItem(null)} />}
        </section>
      </main>
      <footer className="student-footer">동양미래대학교 한울타리 총학생회</footer>
    </div>
  );
}
