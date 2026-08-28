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
