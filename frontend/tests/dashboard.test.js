import assert from 'node:assert/strict';
import test from 'node:test';
import {summarizeWeek} from '../src/features/admin/dashboard/summary.js';

test('주간 집계는 삭제된 품목의 기록도 포함하고 기간 밖 대여를 제외한다',()=>{
 const home={now:'2026-11-24T14:00',items:[]};
 const loan=day=>({issued:day+'T10:00',title:'우산',item_id:3});
 const result=summarizeWeek(home,['2026-11-17','2026-11-18','2026-11-24','2026-11-25'].map(loan));
 assert.deepEqual(result.items,[{title:'우산',count:2}]);
 assert.deepEqual(result.daily.map(([,n])=>n),[1,0,0,0,0,0,1]);
});
