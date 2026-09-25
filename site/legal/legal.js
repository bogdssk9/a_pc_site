(() => {
  'use strict';
  const source = document.currentScript;
  const base = new URL('.', source ? source.src : location.href);
  const url = name => new URL(name + '.html', base).href;
  function init() {
    if (document.getElementById('angel-cookie-note')) return;
    const style = document.createElement('style');
    style.textContent = `#angel-legal-links{display:flex;flex-wrap:wrap;gap:12px 24px;max-width:1240px;margin:20px auto;padding:0 24px;font:14px/1.6 Arial,sans-serif}#angel-legal-links a{color:#c6c8ca;text-decoration:underline;text-underline-offset:4px}#angel-cookie-note{position:sticky;top:0;z-index:50;box-sizing:border-box;background:#1b1d1f;color:#eee;border-bottom:1px solid #434548;padding:20px 24px;font:14px/1.6 Arial,sans-serif}#angel-cookie-note .inner{max-width:1192px;margin:auto;display:flex;align-items:center;gap:24px;justify-content:space-between}#angel-cookie-note p{margin:0;max-width:900px}#angel-cookie-note a{color:#ffffff}#angel-cookie-note button{background:#ffffff;border:0;border-radius:4px;padding:12px 24px;font:700 14px Arial,sans-serif;color:#111;cursor:pointer;flex-shrink:0}#angel-cookie-note[hidden]{display:none}#angel-cookie-note a:focus-visible,#angel-cookie-note button:focus-visible,#angel-legal-links a:focus-visible{outline:3px solid #ffffff;outline-offset:4px}@media(max-width:640px){#angel-cookie-note .inner{align-items:flex-start;flex-direction:column;gap:16px}#angel-legal-links{flex-direction:column}}`;
    document.head.append(style);
    const footer = document.querySelector('footer') || document.body;
    const existingLinks = document.getElementById('angel-legal-links');
    const links = existingLinks || document.createElement('nav');
    links.id = 'angel-legal-links';
    links.setAttribute('aria-label','Правовая информация');
    if (!existingLinks) for (const [slug,title] of [['privacy','Политика обработки персональных данных'],['terms','Пользовательское соглашение'],['cookies','Информация о cookies']]) {
      const a = document.createElement('a'); a.href=url(slug); a.textContent=title; links.append(a);
    }
    if (!existingLinks) footer.append(links);
    const note=document.createElement('aside'); note.id='angel-cookie-note';
    note.setAttribute('aria-label','Информация о cookies');
    const inner=document.createElement('div');inner.className='inner';
    const text=document.createElement('p');
    text.textContent='Яндекс Метрика не подключена. Код страницы не сохраняет cookies. Фон загружается с внешнего сервера Яндекса. Закрытие уведомления не является согласием на обработку данных. ';
    const more=document.createElement('a');more.href=url('cookies');more.textContent='Подробнее';text.append(more);
    const close=document.createElement('button');close.type='button';close.textContent='Понятно';
    close.addEventListener('click',()=>{note.hidden=true;});
    inner.append(text,close);note.append(inner);
    const insertTarget = document.querySelector('main') || document.body.firstElementChild || footer;
    document.body.insertBefore(note, insertTarget);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
