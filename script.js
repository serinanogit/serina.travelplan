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
  if(box.textContent.includes('黑糖糕留到 8/30 再買')) box.remove();
});

// 移除所有寫「原則」的提示框／頁尾說明。
document.querySelectorAll('.hint, .notice, .warn, .footer-note').forEach(el=>{
  if(el.textContent.includes('原則')) el.remove();
});

// 移除灰色小字提醒。
document.querySelectorAll('.tiny').forEach(el=>el.remove());
