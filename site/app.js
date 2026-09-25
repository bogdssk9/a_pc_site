'use strict';
// Демонстрационные данные. Не являются наличием, ценами или гарантией совместимости.
// Порядок — от начального уровня к топовому: от него зависит подбор по бюджету ниже.
// price/image опциональны: заполните реальными значениями, когда они появятся — вёрстка их уже поддерживает.
const products = [
{id:'lite',name:'LITE',tier:'Точка входа',category:['gaming'],price:null,image:null,description:'Бюджетная сборка для киберспортивных дисциплин и нетребовательных игр.',specs:{'Процессор':'Intel Core i3-13100F','Видеокарта':'GeForce RTX 3050','Память':'16 ГБ DDR4','Накопитель':'SSD 512 ГБ'}},
{id:'start',name:'START',tier:'Точка старта',category:['gaming'],price:null,image:null,description:'Для повседневных задач и знакомства с миром ПК-гейминга.',specs:{'Процессор':'Intel Core i5-13400F','Видеокарта':'GeForce RTX 4060','Память':'16 ГБ DDR5','Накопитель':'SSD 1 ТБ'}},
{id:'studio',name:'STUDIO',tier:'Для творческих задач',category:['work'],price:null,image:null,description:'Монтаж, 3D и дизайн: ставка на процессор, память и надёжное хранилище.',specs:{'Процессор':'AMD Ryzen 7 7700','Видеокарта':'GeForce RTX 4060 Ti','Память':'32 ГБ DDR5','Накопитель':'SSD 1 ТБ + HDD 2 ТБ'}},
{id:'pro',name:'PRO',tier:'Больше возможностей',category:['gaming','work'],price:null,image:null,description:'Универсальная конфигурация для игр, монтажа и творческих задач.',specs:{'Процессор':'Intel Core i7-13700F','Видеокарта':'GeForce RTX 4070 SUPER','Память':'32 ГБ DDR5','Накопитель':'SSD 1 ТБ'}},
{id:'ultra',name:'ULTRA',tier:'Масштаб твоих идей',category:['gaming','work'],price:null,image:null,description:'Производительный вариант для требовательных игр и проектов.',specs:{'Процессор':'AMD Ryzen 7 7800X3D','Видеокарта':'GeForce RTX 4080 SUPER','Память':'32 ГБ DDR5','Накопитель':'SSD 2 ТБ'}},
{id:'titan',name:'TITAN',tier:'Без компромиссов',category:['gaming','work'],price:null,image:null,description:'Флагманская сборка для 4K, стриминга и самых тяжёлых проектов.',specs:{'Процессор':'Intel Core i9-14900K','Видеокарта':'GeForce RTX 4090','Память':'64 ГБ DDR5','Накопитель':'SSD 2 ТБ NVMe'}}
];
const cards=document.querySelector('#cards');
const dialog=document.querySelector('#details');
const requestText=document.querySelector('#request-text');
const money=value=>new Intl.NumberFormat('ru-RU').format(value)+' ₽';
const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const specHTML=entries=>entries.map(([key,value])=>`<div><dt>${escapeHTML(key)}</dt><dd>${escapeHTML(value)}</dd></div>`).join('');
const priceHTML=product=>product.price!=null?`<span class="price">${money(product.price)}</span>`:'<span class="muted small">Цена по запросу</span>';
const visualStyle=product=>product.image?` style="background:linear-gradient(180deg,#00000005,#000000c0),url('${encodeURI(product.image)}') center/cover"`:'';
cards.innerHTML=products.map((product,index)=>`<article class="card" data-id="${product.id}"><div class="card-visual"${visualStyle(product)}><span class="card-tier">${escapeHTML(product.tier)}</span><span class="card-number" aria-hidden="true">0${index+1}</span><strong>ANGEL <span class="orange">${product.name}</span></strong></div><div class="card-content"><p>${escapeHTML(product.description)}</p><dl class="specs">${specHTML(Object.entries(product.specs))}</dl><div class="card-bottom">${priceHTML(product)}<button class="text-btn" type="button" data-details="${product.id}" aria-label="Подробнее об ANGEL ${product.name}">Подробнее ↗</button></div></div></article>`).join('');
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
const filter=button.dataset.filter;
document.querySelectorAll('.filter').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
products.forEach(product=>{cards.querySelector(`[data-id="${product.id}"]`).hidden=filter!=='all'&&!product.category.includes(filter);});
}));
function showDialog(){document.querySelector('#copy-status').textContent='';dialog.showModal();document.body.classList.add('lock');}
function openDetails(id,context=''){
const product=products.find(item=>item.id===id);if(!product)return;
document.querySelector('#dialog-title').textContent='ANGEL '+product.name;
const priceEntry=product.price!=null?[['Цена',money(product.price)]]:[];
document.querySelector('#dialog-specs').innerHTML=specHTML([...priceEntry,...Object.entries(product.specs)]);
requestText.value=`Здравствуйте! Интересует подбор компьютера на основе ANGEL ${product.name}.\n${context}\nПодскажите актуальную стоимость, состав, сроки и условия гарантии.`.replace(/\n\n/g,'\n');showDialog();
}
cards.addEventListener('click',event=>{const button=event.target.closest('[data-details]');if(button)openDetails(button.dataset.details);});
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>document.body.classList.remove('lock'));
dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))dialog.close();});
document.querySelector('#copy').addEventListener('click',async()=>{
const status=document.querySelector('#copy-status');try{if(!navigator.clipboard)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(requestText.value);status.textContent='Скопировано. Откройте Telegram и вставьте текст.';}catch{requestText.focus();requestText.select();status.textContent='Текст выделен. Скопируйте его через меню или Ctrl+C.';}
});
const budget=document.querySelector('#budget');
const budgetValue=document.querySelector('#budget-value');
const result=document.querySelector('#selection-result');
budget.addEventListener('input',()=>{budgetValue.value=money(Number(budget.value));result.replaceChildren();});
document.querySelector('#purpose').addEventListener('change',()=>result.replaceChildren());
document.querySelector('#picker-form').addEventListener('submit',event=>{
event.preventDefault();const amount=Number(budget.value);const purpose=document.querySelector('#purpose');
const budgetMin=Number(budget.min),budgetMax=Number(budget.max);
const bucket=Math.min(products.length-1,Math.floor((amount-budgetMin)/(budgetMax-budgetMin)*products.length));
const product=products[bucket];
if(purpose.value!=='gaming'&&product.id==='start'){
result.innerHTML='<strong>Индивидуальный подбор</strong><p>Для рабочих задач в этом бюджете лучше уточнить программы и подобрать комплектующие отдельно.</p><button type="button" class="text-btn" id="discuss">Подготовить обращение ↗</button>';
document.querySelector('#discuss').onclick=()=>{document.querySelector('#dialog-title').textContent='Индивидуальный подбор';document.querySelector('#dialog-specs').replaceChildren();requestText.value=`Здравствуйте! Нужен компьютер для задач: ${purpose.selectedOptions[0].textContent}. Бюджет: ${money(amount)}.\nМои программы: \nПомогите подобрать конфигурацию и уточнить стоимость.`;showDialog();};return;
}
result.innerHTML=`<strong>Ориентир — ANGEL ${product.name}</strong><p>Пример класса конфигурации. Соответствие бюджету и программам нужно подтвердить с менеджером.</p><button type="button" class="text-btn" id="discuss">Обсудить конфигурацию ↗</button>`;
document.querySelector('#discuss').onclick=()=>openDetails(product.id,`Мои задачи: ${purpose.selectedOptions[0].textContent}. Бюджет: ${money(amount)}.`);
});
const menu=document.querySelector('.menu');const navigation=document.querySelector('#navigation');
menu.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');}});
