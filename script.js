const boxes=document.querySelectorAll('input[type="checkbox"][data-save]');
boxes.forEach(box=>{
  const key='penghu_'+box.dataset.save;
  if(localStorage.getItem(key)==='true') box.checked=true;
  box.addEventListener('change',()=>localStorage.setItem(key,box.checked));
});

// 手冊以第一人稱撰寫：把頁面中殘留的「你」統一改成「我」。
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
let node;
while((node=walker.nextNode())){
  if(node.nodeValue.includes('你')) node.nodeValue=node.nodeValue.replaceAll('你','我');
}

// 移除不需要的個人標籤與重複提醒。
document.querySelectorAll('h4').forEach(h4=>{
  if(h4.textContent.includes('遊局口蔥油餅')){
    h4.textContent='🧅 遊局口蔥油餅 ⭐';
  }
  if(h4.textContent.includes('許的重點')){
    h4.closest('.item-card')?.remove();
  }
});

document.querySelectorAll('#food .hint').forEach(box=>{
  if(box.textContent.includes('黑糖糕')) box.remove();
});

// 移除所有寫「原則」的提示框／頁尾說明。
document.querySelectorAll('.hint, .notice, .warn, .footer-note').forEach(el=>{
  if(el.textContent.includes('原則')) el.remove();
});

// 移除灰色小字提醒。
document.querySelectorAll('.tiny').forEach(el=>el.remove());

// 票券／憑證平台註記。
document.querySelectorAll('.check-item span').forEach(span=>{
  if(span.textContent.trim()==='船票／訂位資訊') span.textContent='船票／訂位資訊（Klook）';
  if(span.textContent.trim()==='機車租車憑證') span.textContent='機車租車憑證（KKday）';
});

document.querySelectorAll('.item-card').forEach(card=>{
  const title=card.querySelector('h4')?.textContent || '';
  if(title.includes('🛵 機車') && !card.textContent.includes('KKday')){
    const p=document.createElement('p');
    p.innerHTML='<strong>取車憑證：</strong>KKday｜現場出示憑證';
    card.appendChild(p);
  }
  if(title.includes('⛴️ 回程') && !card.textContent.includes('Klook')){
    const p=document.createElement('p');
    p.innerHTML='<strong>船票：</strong>Klook';
    card.appendChild(p);
  }
});

// Day 1 取車卡片補充 KKday 憑證提醒。
document.querySelectorAll('.spot-card').forEach(card=>{
  const title=card.querySelector('.spot-title strong')?.textContent || '';
  if(title.includes('取機車') && !card.textContent.includes('KKday')){
    const p=document.createElement('p');
    p.innerHTML='<strong>憑證：</strong>KKday 預訂，現場出示取車憑證。';
    card.appendChild(p);
  }
});
