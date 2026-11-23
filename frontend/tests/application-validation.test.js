import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeApplication, validateApplication } from '../src/validation.mjs';

const items = [{ id: 'umbrella', available: 2 }, { id: 'blanket', available: 0 }];
const valid = { department: '컴퓨터소프트웨어공학과', studentNo: '20260001', name: '홍길동', phone: '010-1234-5678', itemId: 'umbrella' };

test('입력 공백과 전화번호 구분자를 정리한다', () => {
  const data = normalizeApplication({ ...valid, name: ' 홍길동 ', phone: '010 1234-5678' });
  assert.equal(data.name, '홍길동');
  assert.equal(data.phone, '01012345678');
  assert.deepEqual(validateApplication(data, items).errors, {});
});

test('빈 값과 공백만 입력한 필드를 거부한다', () => {
  assert.deepEqual(Object.keys(validateApplication({ name: '   ' }, items).errors), ['department', 'studentNo', 'name', 'phone', 'itemId']);
});

test('학번은 선행 0을 유지하는 숫자 8자리여야 한다', () => {
  assert.equal(validateApplication({ ...valid, studentNo: '01234567' }, items).data.studentNo, '01234567');
  for (const studentNo of ['1234567', '123456789', '2026A001']) {
    assert.ok(validateApplication({ ...valid, studentNo }, items).errors.studentNo);
  }
});

test('잘못된 전화번호와 과도하게 긴 입력을 거부한다', () => {
  for (const phone of ['010ABC45678', '0212345678', '010123', '010123456789']) {
    assert.ok(validateApplication({ ...valid, phone }, items).errors.phone);
  }
  const { errors } = validateApplication({ ...valid, name: '가'.repeat(51), department: '가'.repeat(81) }, items);
  assert.ok(errors.name);
  assert.ok(errors.department);
});

test('삭제된 물품과 품절 물품은 신청할 수 없다', () => {
  for (const itemId of ['missing', 'blanket', '']) {
    assert.ok(validateApplication({ ...valid, itemId }, items).errors.itemId);
  }
});

test('확인 단계 이후 재고가 소진된 경우에도 다시 검증한다', () => {
  assert.deepEqual(validateApplication(valid, items).errors, {});
  assert.ok(validateApplication(valid, [{ id: 'umbrella', available: 0 }]).errors.itemId);
});
