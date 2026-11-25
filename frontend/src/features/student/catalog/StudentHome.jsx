import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { ItemDetail } from "./ItemDetail";
import { ItemImage } from "./ItemImage";
import { Duty } from "../guide/Duty";
export function StudentHome() {
  const { home } = useOutletContext();
  const [selected, setSelected] = useState(null);
  return (
    <div className="homegrid">
      <div>
        <section className="hero">
          <span className="pill">{home.closed || "운영 중"}</span>
          <small>필요할 때, 언제든지</small>
          <h1>빌려드립니다</h1>
          <p>한울타리 총학생회 물품 대여 서비스</p>
        </section>
        <Link to="/apply" className="btn primary cta wide">
          <img src="/img/box.svg" alt="" />
          대여하기<span>→</span>
        </Link>
        <Duty />
      </div>
      <section>
        <div className="sectiontitle">
          <h2>현재 대여 가능한 물품</h2>
          <small>{home.now.replace("T", " ").slice(5, 16)} 기준</small>
        </div>
        <div className="items">
          {home.items.map((item) => (
            <button
              key={item.id}
              className="item"
              onClick={() => setSelected(item)}
            >
              <ItemImage item={item} />
              <span>
                {item.title}
                <small>{`총 ${item.total}개 · 대여 중 ${item.rented}개`}</small>
              </span>
              <span className="num">
                {item.available}개<small>대여 가능</small>
              </span>
              <span aria-hidden="true">›</span>
            </button>
          ))}
        </div>
      </section>
      {selected && (
        <ItemDetail item={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
