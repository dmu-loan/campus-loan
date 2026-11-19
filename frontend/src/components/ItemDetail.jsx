import { useEffect, useRef } from 'react';

export default function ItemDetail({ item, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    // StrictMode의 effect 재실행에서도 close 이벤트로 상태가 초기화되지 않도록 합니다.
    // 팝업을 닫으면 onClose가 선택 상태를 지우고 dialog DOM도 제거됩니다.
    if (!dialog.open) dialog.showModal();
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
