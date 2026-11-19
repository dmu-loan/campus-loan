import { useEffect, useRef } from 'react';

export default function ItemDetail({ item, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);

  return (
    <dialog ref={dialogRef} className="item-dialog" aria-labelledby="item-detail-title" aria-describedby="item-detail-description" onClose={onClose}>
      <div className="dialog-heading">
        <h2 id="item-detail-title">{item.name}</h2>
        <button className="close-dialog" onClick={() => dialogRef.current.close()} autoFocus>닫기</button>
      </div>
      <p id="item-detail-description">{item.description}</p>
      <dl className="item-facts">
        <div><dt>전체 수량</dt><dd>{item.total}개</dd></div>
        <div><dt>대여 중</dt><dd>{item.total - item.available}개</dd></div>
        <div><dt>대여 가능</dt><dd>{item.available}개</dd></div>
        <div><dt>반납 안내</dt><dd>{item.returnGuide}</dd></div>
      </dl>
      <p className="item-caution">{item.caution}</p>
      <p className="muted">물품 정보와 반납 안내는 화면 개발용 예시입니다.</p>
      <button className="apply-placeholder" disabled>
        {item.available === 0 ? '현재 대여 가능한 수량이 없어요' : '대여 신청 준비 중'}
      </button>
    </dialog>
  );
}
