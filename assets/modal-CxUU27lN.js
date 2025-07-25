import{a as m}from"./vendor-DGDcxXwr.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const c of e)if(c.type==="childList")for(const n of c.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const c={};return e.integrity&&(c.integrity=e.integrity),e.referrerPolicy&&(c.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?c.credentials="include":e.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(e){if(e.ep)return;e.ep=!0;const c=s(e);fetch(e.href,c)}})();const M="https://dummyjson.com/products/category-list",x="https://dummyjson.com/products",N="https://dummyjson.com/products/category",j="https://dummyjson.com/products/search";let q=1;const i=12,h="cart",_="wishlist",U=document.querySelector(".categories"),L=document.querySelector(".products"),y=document.querySelector(".not-found"),A=document.querySelector(".search-form"),F=document.querySelector(".search-form__btn-clear"),J=document.querySelector(".load-more-btn"),l=document.querySelector(".modal"),$=document.querySelector(".modal-product"),E=document.querySelector(".modal__close-btn"),d=document.querySelector(".modal-product__btn--cart"),u=document.querySelector(".modal-product__btn--wishlist"),W=document.querySelector(".cart-summary__btn"),k=document.querySelector("[data-price]"),D=document.querySelector("[data-count]"),H=async t=>(await m.get(t)).data,K=async(t,o="",s=1)=>{const r=await m.get(`${t}/${o}`,{params:{limit:i,skip:(s-1)*i}});return console.log(r.data),r.data},f=async t=>(await m.get(`https://dummyjson.com/products/${t}`)).data,Y=async(t,o)=>(await m.get(t,{params:{q:o,limit:i,skip:(q-1)*i}})).data;function G(t){return t.map(o=>`
        <li class="categories__item">
            <button class="categories__btn" type="button">${o}</button>
        </li>
        `).join("")}function R(t){return t.map(({id:o,title:s,thumbnail:r,brand:e,category:c,price:n})=>`
        <li class="products__item" data-id="${o}">
            <img class="products__image" src="${r}" alt="${s}"/>
            <p class="products__title">${s}</p>
            <p class="products__brand"><span class="products__brand--bold">Brand:</span>${e}</p>
            <p class="products__category">Category: ${c}</p>
            <p class="products__price">Price: ${n}$</p>
        </li>
        `).join("")}function w({title:t,images:o,description:s,shippingInformation:r,returnPolicy:e,price:c,tags:n}){const O=n.map(T=>`
        <li class="modal-product__tags-item">${T}</li>
        `).join("");return`
        <img class="modal-product__img" src="${o[0]}" alt="${t}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${t}</p>
        <ul class="modal-product__tags">${O}</ul>
        <p class="modal-product__description">${s}</p>
        <p class="modal-product__shipping-information">Shipping: ${r}</p>
        <p class="modal-product__return-policy">Return Policy: ${e}</p>
        <p class="modal-product__price">Price: ${c}$</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>
        `}function I(t){L.innerHTML=R(t),t.length?y.classList.remove("not-found--visible"):y.classList.add("not-found--visible")}function z(){document.querySelectorAll(".categories__btn").forEach(t=>t.classList.remove("categories__btn--active"))}function g(t){const o=document.querySelector(`[data-${t}-count]`),s=JSON.parse(localStorage.getItem(t))||[];o.textContent=s.length}async function Q(t,o){{const s=JSON.parse(localStorage.getItem(t))||[];try{const r=await Promise.all(s.map(({id:e})=>f(e)));I(r,L),g(_)}catch(r){console.error("Не вдалося завантажити список бажаного:",r)}o(),p()}}async function b(t,o,s,r){let e=JSON.parse(localStorage.getItem(o))||[];if(e.findIndex(({id:n})=>n===t)===-1)try{const n=await f(t);e.push(n),localStorage.setItem(o,JSON.stringify(e)),s.textContent=`Remove from ${r}`,g(o)}catch(n){console.log(n.message)}else e=e.filter(({id:n})=>n!==t),localStorage.setItem(o,JSON.stringify(e)),s.textContent=`Add to ${r}`,g(o)}E.addEventListener("click",p);l.addEventListener("click",t=>{t.target===l&&p()});let a=null;async function V(t){const s=t.target.closest(".products__item");if(s){a=+s.dataset.id;try{const r=await f(a);$.innerHTML=w(r),l.classList.add("modal--is-open"),S(d,h,"Cart"),S(u,_,"Wishlist"),document.addEventListener("keydown",v),d.addEventListener("click",C),u.addEventListener("click",P)}catch(r){console.log(r.message)}}}function p(){l.classList.remove("modal--is-open"),$.innerHTML="",document.removeEventListener("keydown",v),d.removeEventListener("click",C),u.removeEventListener("click",P)}function v(t){t.key==="Escape"&&p()}function S(t,o,s){const e=(JSON.parse(localStorage.getItem(o))||[]).some(({id:c})=>c===a);t.textContent=e?`Remove from ${s}`:`Add to ${s}`}function C(){b(a,h,d,"Cart")}function P(){b(a,_,u,"Wishlist")}export{h as C,x as P,_ as W,u as a,F as b,U as c,Q as d,H as e,M as f,f as g,G as h,K as i,R as j,q as k,J as l,d as m,W as n,V as o,L as p,k as q,I as r,A as s,D as t,g as u,z as v,N as w,Y as x,j as y};
//# sourceMappingURL=modal-CxUU27lN.js.map
