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

// 8/29 現場調整：風櫃洞已逛完，接著完成市區行程後去潮間帶，再買蔥油餅回民宿。
const day1=document.querySelector('#day1');
const day1Timeline=day1?.querySelector('.timeline');
if(day1Timeline){
  const items=[...day1Timeline.querySelectorAll('.timeline-item')];
  const findItem=(keyword)=>items.find(item=>item.querySelector('.spot-title strong')?.textContent.includes(keyword));
  const setTime=(item,text)=>{ const el=item?.querySelector('.time'); if(el) el.textContent=text; };

  const wind=findItem('風櫃洞');
  const village=findItem('篤行十村');
  const lunch=findItem('蔡記饌蔬食坊');
  const snack=findItem('下午小吃時間');
  const hotel=findItem('民宿 Check-in');

  if(wind) setTime(wind,'～11:20｜已完成');

  // 改成：風櫃洞 → 篤行十村 → 午餐 → 潮間帶 → 蔥油餅 → 民宿。
  if(village && lunch) day1Timeline.insertBefore(village,lunch);

  if(village){
    setTime(village,'11:45–12:25');
    const p=village.querySelector('.spot-card > p');
    if(p) p.textContent='回馬公後先逛篤行十村，散步、拍照約 40 分鐘。';
  }
  if(lunch){
    setTime(lunch,'12:35–13:25');
    const p=lunch.querySelector('.spot-card > p');
    if(p) p.textContent='逛完篤行十村後吃午餐，依當下餓的程度調整份量。';
  }
  if(snack){
    setTime(snack,'13:30 後');
    const title=snack.querySelector('.spot-title strong');
    if(title) title.textContent='🦀 潮間帶玩一下 → 🧅 遊局口蔥油餅';
    const spot=snack.querySelector('.spot-card');
    const grid=snack.querySelector('.food-grid');
    if(spot && grid && !spot.querySelector('.live-update-note')){
      const p=document.createElement('p');
      p.className='live-update-note';
      p.textContent='先去海邊潮間帶玩、找小螃蟹；玩完再去買遊局口蔥油餅，買完直接回島嶼時光休息。';
      spot.insertBefore(p,grid);
    }
  }
  if(hotel){
    setTime(hotel,'買完蔥油餅後–17:30');
    const title=hotel.querySelector('.spot-title strong');
    if(title) title.textContent='🏨 島嶼時光｜提早回民宿休息';
    const p=hotel.querySelector('.spot-card > p');
    if(p) p.innerHTML='<strong>16:00 前：</strong>若還不能進房，就先在民宿大廳／公共空間坐著休息。<br><strong>16:00：</strong>正式入住。<br><strong>16:00–17:30：</strong>回房洗澡、躺一下，18:00 再出門吃飯。';
  }
}

// 今天下午只保留遊局口蔥油餅；建國炸粿與澎福素食煎餅先不吃。
document.querySelectorAll('#day1 .food-card').forEach(card=>{
  if(card.textContent.includes('建國炸粿') || card.textContent.includes('澎福素食')) card.remove();
});
document.querySelectorAll('#food li').forEach(li=>{
  if(li.textContent.includes('建國炸粿') || li.textContent.includes('澎福素食')) li.remove();
});
document.querySelectorAll('#overview .item-card p').forEach(p=>{
  if(p.textContent.includes('鐘記燒餅')){
    p.innerHTML=p.innerHTML
      .replace('蔡記饌蔬食坊 → 篤行十村','篤行十村 → 蔡記饌蔬食坊')
      .replace('建國炸粿／澎福素食／遊局口蔥油餅','潮間帶 → 遊局口蔥油餅')
      .replace('建國炸粿／遊局口蔥油餅','潮間帶 → 遊局口蔥油餅');
  }
});
