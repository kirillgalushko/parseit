import{d as K,s as B,c as Ee}from"./chunks/pinia-iDF033Xk.js";import{f as d,h as m,v as j,r as k,o as z,w as Z,a0 as xe,j as _,q as f,t as c,u as a,O as h,l as s,i as A,W as me,a1 as ge,p as ne,c as $,M as _e,N as we,K as b,a2 as W,x as X,m as w,P as S,k as Ce,D as ve,a3 as De}from"./chunks/@vue-BmnzspB4.js";import{j as be}from"./chunks/js-yaml-mbYHt68G.js";import{j as ae,D as P,L as G,T as I,k as V,y as Oe,a as Le,d as He,b as Ae,c as Re,o as ke,t as je,e as Ue,Q as Ne,O as Be,F as U,C as ze,f as Ze,g as We,h as Ge,i as qe,I as Qe,l as Ke,z as Xe,Y as Je,m as ye,E as Pe,W as N,n as Ye,G as et,V as tt,B as ie,p as nt,q as at,r as rt,H as ot,_ as st,s as le,u as it,N as ce,v as lt,$ as ct,w as dt}from"./chunks/@gui-D1A8Ghzd.js";import{r as ut}from"./chunks/@mozilla-DKYphB57.js";import{T as pt}from"./chunks/turndown-BfpucfJx.js";import{T as ht,c as Se,V as ft}from"./chunks/@toast-ui-CeGiykNX.js";/* empty css                       */import"./chunks/prosemirror-model-BL7fTrkh.js";import"./chunks/orderedmap-BNSJFzFT.js";import"./chunks/prosemirror-view-BZzE4jED.js";import"./chunks/prosemirror-state-D-8NX-8X.js";import"./chunks/prosemirror-transform-AOGtR5Bz.js";import"./chunks/prosemirror-keymap-DaqYb0DD.js";import"./chunks/w3c-keyname-Bp0GZ_VH.js";import"./chunks/prosemirror-commands-CXLqjhDU.js";import"./chunks/prosemirror-inputrules-CbDHmz6J.js";import"./chunks/prosemirror-history-DC__KuP8.js";import"./chunks/rope-sequence-Cxv9J64N.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const y=(e,t)=>{const n=e.__vccOpts||e;for(const[r,o]of t)n[r]=o;return n},mt={},gt={class:j(["loader"])};function _t(e,t){return d(),m("div",gt)}const wt=y(mt,[["render",_t],["__scopeId","data-v-5c41d99b"]]),J=".archive",Fe="Сохранено",Ct={vaultPath:null,theme:"dark"},vt={_initialized:!1,...Ct},de=e=>Object.fromEntries(Object.entries(e).filter(([t])=>!t.startsWith("_"))),L=K("settings",{state:()=>vt,actions:{async init(){const e=await window.api.getSettings();this.$patch(e),this._initialized=!0},async saveSettings(e){await window.api.setSettings(de(e)),this.$patch(e)},async setSettingsItem(e,t){const n={...this.$state,[e]:t};await window.api.setSettings(de(n)),this.$patch(n)}}}),te=e=>{var t;return(t=e==null?void 0:e.folderPath)==null?void 0:t.includes(J)},bt=e=>{var t;return(t=e==null?void 0:e.filePath)==null?void 0:t.includes(J)},O=K("foldersStore",{state:()=>({folders:[],selectedFolder:null,_initialized:!1}),actions:{async init(){const e=L();if(e.vaultPath){const t=await window.api.getAllFolders(e.vaultPath);this.folders=t,t.length&&(this.selectedFolder=t.find(n=>!te(n))??null)}this._initialized=!0},async updateFolders(){const e=L();if(e.vaultPath){const t=await window.api.getAllFolders(e.vaultPath);this.folders=t}this.selectedFolder&&!this.folders.find(t=>{var n;return t.folderPath===((n=this.selectedFolder)==null?void 0:n.folderPath)})&&(this.selectedFolder=null)},setSelectedFolder(e){this.selectedFolder=e}}});function At(e){const t=e.match(/^-{3}\r?\n([\s\S]*?)\r?\n-{3}/);if(!t)return{meta:null,content:e};const n=t[1],r=e.replace(t[0],"").trim();return{meta:be.load(n),body:r}}const ue=e=>{const{meta:t,body:n}=At(e.content);return{id:e.filePath,name:e.name,markdown:e.content,filePath:e.filePath,body:n||e.content,excerpt:(n||e.content).slice(0,250),url:t==null?void 0:t.url,faviconUrl:t==null?void 0:t.faviconUrl,domain:t==null?void 0:t.domain,createdAt:t==null?void 0:t.createdAt,author:t==null?void 0:t.author,siteName:t==null?void 0:t.siteName}},F=K("articleStore",{state:()=>({articles:[],selectedArticle:null,articleView:"reader",_initialized:!1}),actions:{async init(){const e=O();if(e.selectedFolder){const n=(await window.api.getAllFiles(e.selectedFolder.folderPath)).map(ue);this.articles=n}this._initialized=!0},async updateArticles(){const e=O();if(e.selectedFolder){const r=(await window.api.getAllFiles(e.selectedFolder.folderPath)).map(ue);this.articles=r}const t=this.articles.find(n=>{var r;return n.id===((r=this.selectedArticle)==null?void 0:r.id)});this.selectedArticle&&t?this.selectedArticle=t:this.selectedArticle=null},addArticle(e){this.articles.push(e)},createArticle(e,t){var r,o;const n=O();(r=n.selectedFolder)!=null&&r.folderPath.includes(J)?window.api.createAppFile(e,t):window.api.createAppFile(e,t,(o=n.selectedFolder)==null?void 0:o.name)},async removeArticle(e){return window.api.deleteFile(e.filePath)},async archiveArticle(e){return window.api.archiveFile(e.filePath)},async recoverArticle(e){return window.api.recoverFile(e.filePath)},async updateArticle(e){return window.api.writeFile(e.filePath,e.markdown)},setSelectedArticle(e){this.selectedArticle=e},setArticleView(e){this.articleView=e}}}),kt=()=>{const e=L(),t=O(),n=F(),r=[e,t,n],o=k(!1),i=async()=>{for(const l of r)l._initialized||await l.init();o.value=!0};return z(()=>i()),{isInitialized:o}},pe=e=>`${e}-theme`;function yt(){const e=L(),t=()=>{document.body.classList.remove("light-theme","dark-theme"),document.body.classList.add(pe(e.theme))};Z(()=>e.theme,t,{immediate:!0}),z(t),xe(()=>{document.body.classList.remove(pe(e.theme))})}const Pt=()=>{const e=O(),t=F(),n=()=>{window.api.onFilesUpdated(()=>{e.updateFolders(),t.updateArticles()})};Z(()=>e.selectedFolder,()=>{t.updateArticles()}),z(()=>{n()})},re=()=>!!(window!=null&&window.electron),St=_({__name:"AddVaultModal",setup(e){const t=L(),n=async()=>{if(re()){const r=await window.api.createAppVault();r&&t.setSettingsItem("vaultPath",r)}};return(r,o)=>(d(),f(a(ae),{isOpened:!a(t).vaultPath,title:"Создайте хранилище"},{default:c(()=>[o[1]||(o[1]=h(" Для работы приложения выберите, где разместить хранилище. ")),s(a(P),{default:3,direction:"vertical"}),s(a(V),{direction:"row",gap:2,stretched:""},{default:c(()=>[s(a(G),{readonly:"",placeholder:"/Documents",stretched:"",onClick:n}),s(a(I),{mode:"accent",onClick:n},{default:c(()=>o[0]||(o[0]=[h(" Создать ")])),_:1})]),_:1})]),_:1},8,["isOpened"]))}}),Ft=e=>{e.querySelectorAll("img").forEach(n=>{n.hasAttribute("src")&&n.hasAttribute("srcset")&&n.removeAttribute("srcset")})},Me=e=>{const t=new URL(e);return`${t.protocol}//${t.host}`},Mt=async e=>await window.api.fetchHtml(e),Tt=async e=>Mt(e),$t=e=>new DOMParser().parseFromString(e,"text/html"),It=(e,t)=>{const n=Me(e),r=u=>{if(u){const p=u.getAttribute("href");if(p)return p.startsWith("/")?`${n}${p}`:p}return""},o=t.querySelector('link[rel="icon"][type="image/svg+xml"], link[rel="apple-touch-icon"][type="image/svg+xml"]');if(o)return r(o);const i=t.querySelector('link[rel="icon"][type="image/png"], link[rel="apple-touch-icon"][type="image/png"]');if(i)return r(i);const l=t.querySelector('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]');return l?r(l):`${n}/favicon.ico`},Vt=async e=>{const t=$t(e);return Ft(t),t},Et=async e=>{try{const t=Me(e),n=await Tt(e),r=await Vt(n),o=It(e,r);return{...new ut.Readability(r).parse(),originalHtml:n,domain:t,faviconUrl:o,originalUrl:e}}catch(t){console.error("Ошибка при извлечении контента:",t);return}};function xt(e,t){return`---
${be.dump(e)}---

${t}`}function Dt(e,t){return`
${e.title?`# ${e.title}

`:""}
${e.byline?`> Автор: ${e.byline}

`:""}
`+t}const Ot=e=>{const n=new pt({headingStyle:"atx"}).turndown(e.content),r=Dt(e,n),o={url:e.originalUrl,faviconUrl:e.faviconUrl,domain:e.domain,createdAt:new Date().toISOString(),siteName:e.siteName,author:e.byline};return xt(o,r)},Te=()=>{const e=k(!1),t=k(""),n=F(),r=async i=>{const l=await Et(i);if(l){const u=Ot(l),p=l.title||l.excerpt||l.domain;if(p)n.createArticle(p,u);else throw new Error("No name found for webpage")}};return{articleUrl:t,addArticle:async()=>{t.value&&(e.value=!0,await r(t.value),e.value=!1,t.value="")},parsePageAndCreateArticle:r,isLoading:e}},Lt=_({__name:"AddArticleModal",props:{onClose:{type:Function}},setup(e){const{addArticle:t,articleUrl:n,isLoading:r}=Te(),o=e,i=async()=>{await t(),o.onClose()};return(l,u)=>(d(),f(a(ae),ne(l.$attrs,{onClose:o.onClose,showCloseButton:"",title:"Сохранить статью"}),{footer:c(()=>[s(a(I),{onClick:o.onClose},{default:c(()=>u[2]||(u[2]=[h(" Закрыть ")])),_:1},8,["onClick"]),s(a(I),{isLoading:a(r),disabled:a(r),mode:"accent",type:"submit",onClick:i,form:"add-article-modal"},{default:c(()=>u[3]||(u[3]=[h(" Сохранить ")])),_:1},8,["isLoading","disabled"])]),default:c(()=>[A("form",{id:"add-article-modal",onSubmit:ge(i,["prevent"])},[u[1]||(u[1]=h(" Введите url статьи и нажмите Enter ")),s(a(P),{default:3,direction:"vertical"}),s(a(G),{modelValue:a(n),"onUpdate:modelValue":u[0]||(u[0]=p=>me(n)?n.value=p:null)},null,8,["modelValue"])],32)]),_:1},16,["onClose"]))}}),$e=e=>{const t=F(),{confirm:n,...r}=Oe(),o=()=>{var C;window.open((C=e.value)==null?void 0:C.url,"_blank")},i=async()=>{if(e.value)try{await n({title:"Удалить статью?",description:"Эти изменения нельзя будет отменить."}),t.removeArticle(e.value)}catch{}},l=()=>{e.value&&t.archiveArticle(e.value)},u=()=>{e.value&&t.recoverArticle(e.value)},g=bt(e.value)?{type:"button",name:"Восстановить файл",icon:He,actionHandler:u}:{type:"button",name:"Архивировать",icon:Ae,actionHandler:l},v=$(()=>{var C;return!!((C=e.value)!=null&&C.url)}),H={type:"button",name:"Открыть в новой вкладке",icon:Re,actionHandler:o};return{actions:$(()=>[...v.value?[H]:[],g,{type:"button",name:"Удалить",icon:Le,actionHandler:i}]),confirmModalData:r}},Ht=_({__name:"ArticleCardContextMenu",props:{article:{},data:{}},setup(e){const t=e,{actions:n,confirmModalData:r}=$e(t.article);return(o,i)=>(d(),m(b,null,[s(a(ke),_e(we(a(r))),null,16),s(a(Ne),ne(o.$attrs,{data:t.data}),{default:c(()=>[s(a(je),null,{default:c(()=>[(d(!0),m(b,null,W(a(n),l=>(d(),f(a(Ue),{onClick:l.actionHandler},{default:c(()=>[l.icon?(d(),f(X(l.icon),{key:0})):w("",!0),h(" "+S(l.name),1)]),_:2},1032,["onClick"]))),256))]),_:1})]),_:1},16,["data"])],64))}}),Rt=["src"],jt=_({__name:"Favicon",props:{src:{}},setup(e){const t=e;return(n,r)=>(d(),m("img",{src:t.src,class:"favicon"},null,8,Rt))}}),Ut=y(jt,[["__scopeId","data-v-4f25ab1c"]]),Nt=["innerHTML"],Bt=_({__name:"HighlightText",props:{text:{},searchQuery:{}},setup(e){const t=e,n=k("");function r(o,i){if(!i)return o;const l=new RegExp(`(${i})`,"gi");return o.replace(l,'<span class="global-search-highlight">$1</span>')}return Z(()=>t.searchQuery||t.text,()=>{n.value=r(t.text,t.searchQuery)},{immediate:!0}),(o,i)=>(d(),m("div",{innerHTML:n.value},null,8,Nt))}});var T=(e=>(e.Newest="newest",e.Oldest="oldest",e.Atoz="atoz",e.Ztoa="ztoa",e))(T||{});const zt={searchQuery:"",filteredArticles:[],sorting:"newest"},Zt=(e,t)=>[t.id,t.markdown,t.name].some(n=>n.includes(e)),Y=K("searchArticles",{state:()=>zt,actions:{setQuery(e){const t=F();this.searchQuery=e;const n=t.articles.filter(r=>Zt(e,r));this.filteredArticles=n},setSorting(e){this.sorting=e}}});function Wt(e,t,n=3,r=3){if(!t)return null;const o=e.split(/\s+/),i=t.toLowerCase(),l=o.findIndex(g=>g.toLowerCase().includes(i));if(l===-1)return null;const u=Math.max(0,l-n),p=Math.min(o.length,l+r+1);return o.slice(u,p).join(" ")}const Gt=_({__name:"ArticleCard",props:{article:{},onClick:{type:Function}},setup(e){const t=e,n=F(),{searchQuery:r}=B(Y()),o=$(()=>Wt(t.article.body,r.value,2,15)),{contextMenuData:i,targetRef:l}=Be();return(u,p)=>{var g;return d(),m(b,null,[A("div",{ref_key:"targetRef",ref:l},[s(a(ze),{background:((g=a(n).selectedArticle)==null?void 0:g.id)===t.article.id?"secondary":"default",interactive:"",stretched:"",onClick:t.onClick},{default:c(()=>[s(a(U),{ellipsis:"",typography:"title-4"},{default:c(()=>[h(S(u.article.name),1)]),_:1}),s(a(P),{direction:"vertical",default:2}),s(a(U),{ellipsis:"",clamp:2,typography:"paragraph-2"},{default:c(()=>[s(Bt,{text:o.value||u.article.excerpt,searchQuery:a(r)},null,8,["text","searchQuery"])]),_:1}),s(a(P),{direction:"vertical",default:2}),s(a(V),{direction:"row",gap:2,stretched:""},{default:c(()=>[u.article.faviconUrl?(d(),f(Ut,{key:0,src:u.article.faviconUrl},null,8,["src"])):w("",!0),s(a(U),{ellipsis:"",typography:"label-3",color:"secondary"},{default:c(()=>[h(S(u.article.siteName||u.article.domain),1)]),_:1})]),_:1})]),_:1},8,["background","onClick"])],512),s(Ht,{data:a(i),article:k(u.article)},null,8,["data","article"])],64)}}}),qt={},Qt={class:j(["header"])};function Kt(e,t){return d(),m("div",Qt,[Ce(e.$slots,"default",{},void 0,!0)])}const Ie=y(qt,[["render",Kt],["__scopeId","data-v-1631cf3f"]]),Xt=_({__name:"SearchInput",setup(e){const t=Y(),n=$({get:()=>t.searchQuery,set:r=>{t.setQuery(r)}});return(r,o)=>(d(),f(a(G),{modelValue:n.value,"onUpdate:modelValue":o[0]||(o[0]=i=>n.value=i),placeholder:"Поиск по статьям"},null,8,["modelValue"]))}}),Jt=_({__name:"Sorting",setup(e){const t=Y(),n={[T.Newest]:{title:"Сначала новые",icon:Ze},[T.Oldest]:{title:"Сначала старые",icon:We},[T.Atoz]:{title:"От А до Я",icon:Ge},[T.Ztoa]:{title:"От Я до А",icon:qe}},r=o=>{t.setSorting(o)};return(o,i)=>(d(),f(a(Xe),{placement:"bottom-end",popperHideTriggers:l=>[...l,"click"]},{popper:c(()=>[s(a(Qe),null,{default:c(()=>[(d(!0),m(b,null,W(Object.entries(n),([l,u])=>(d(),f(a(Je),{onClick:()=>r(l)},{default:c(()=>[(d(),f(X(u.icon))),h(" "+S(u.title),1)]),_:2},1032,["onClick"]))),256))]),_:1})]),default:c(()=>[s(a(I),{squared:"",mode:"default"},{default:c(()=>[s(a(Ke))]),_:1})]),_:1},8,["popperHideTriggers"]))}});function he(e,t){return[...e].sort((n,r)=>{switch(t){case T.Atoz:return n.name.localeCompare(r.name);case T.Ztoa:return r.name.localeCompare(n.name);case T.Newest:{const o=n.createdAt?new Date(n.createdAt).getTime():0;return(r.createdAt?new Date(r.createdAt).getTime():0)-o}case T.Oldest:{const o=n.createdAt?new Date(n.createdAt).getTime():0,i=r.createdAt?new Date(r.createdAt).getTime():0;return o-i}default:return 0}})}const Yt={class:"header-content"},en={class:"articles-list"},tn=_({__name:"ArticlesSidebar",setup(e){const t=O(),n=F(),{searchQuery:r,filteredArticles:o,sorting:i}=B(Y()),l=k(!1),u=se=>{n.setSelectedArticle(se)},p=()=>{l.value=!0},g=()=>{l.value=!1},v=$(()=>r.value?he(o.value,i.value):he(n.articles,i.value)),{elementRef:H,width:E}=ye(),C=$(()=>E.value<220);return(se,Nn)=>(d(),f(a(Pe),{width:300,"max-width":"40vw",padding:8},{default:c(()=>[A("div",{ref_key:"elementRef",ref:H,class:"sidebar-content"},[s(Lt,{isOpened:l.value,onClose:g},null,8,["isOpened"]),s(Ie,null,{default:c(()=>[A("div",Yt,[s(a(N),{class:"ellipsis"},{popper:c(()=>{var M;return[h(S((M=a(t).selectedFolder)==null?void 0:M.name),1)]}),default:c(()=>{var M;return[A("span",null,S((M=a(t).selectedFolder)==null?void 0:M.name),1)]}),_:1}),s(a(I),{squared:C.value,mode:"accent",onClick:p},{default:c(()=>[s(a(Ye)),C.value?w("",!0):(d(),m(b,{key:0},[h("Добавить ")],64))]),_:1},8,["squared"])])]),_:1}),s(a(P),{direction:"vertical",default:4}),s(a(V),{direction:"row",gap:2,stretched:""},{default:c(()=>[s(Xt),s(Jt)]),_:1}),s(a(P),{direction:"vertical",default:4}),A("div",en,[s(a(V),{stretched:"",gap:2,direction:"column"},{default:c(()=>[(d(!0),m(b,null,W(v.value,M=>(d(),m("div",{key:M.name},[s(Gt,{article:M,onClick:()=>u(M)},null,8,["article","onClick"])]))),128))]),_:1})])],512)]),_:1}))}}),nn=y(tn,[["__scopeId","data-v-62b4af49"]]);function an(e,t){let n=null;return(...r)=>{n&&clearTimeout(n),n=setTimeout(()=>e(...r),t)}}const rn={key:0,class:"editor-status"},on=_({__name:"Editor",props:{article:{}},setup(e){const t=e,n=F(),r=k(),o=k(),i=k(null),l=an(async g=>{await n.updateArticle({...t.article,markdown:g}),o.value=!1},200),u=async g=>{o.value=!0,await l(g)},p=()=>{i.value=new ht({el:r.value,height:"100%",previewStyle:"vertical",initialEditType:"wysiwyg",hideModeSwitch:!0,linkAttributes:{target:"_blank",rel:"noopener noreferrer"},language:"ru-RU",frontMatter:!0,initialValue:t.article.markdown,usageStatistics:!1,theme:"dark",events:{change:()=>{var g;u((g=i.value)==null?void 0:g.getMarkdown())}},plugins:[Se]})};return z(()=>{p()}),Z(()=>t.article.markdown,()=>{var v;((v=i.value)==null?void 0:v.getMarkdown())!==t.article.markdown&&!o.value&&p()}),(g,v)=>(d(),m(b,null,[A("div",{ref_key:"editorRef",ref:r},null,512),o.value?(d(),m("div",rn,[s(a(et)),v[0]||(v[0]=h(" Сохранение "))])):w("",!0)],64))}}),sn=y(on,[["__scopeId","data-v-bf6a95d5"]]),ln=_({__name:"PlaceholderView",setup(e){const{articleUrl:t,addArticle:n,isLoading:r}=Te();return(o,i)=>(d(),m("form",{onSubmit:i[1]||(i[1]=ge((...l)=>a(n)&&a(n)(...l),["prevent"])),class:j(["placeholder"])},[s(a(U),{typography:"title-3"},{default:c(()=>i[2]||(i[2]=[h("Добавьте статью")])),_:1}),s(a(U),{typography:"paragraph-1",color:"secondary"},{default:c(()=>i[3]||(i[3]=[h("Введите url статьи и нажмите Enter")])),_:1}),s(a(P),{direction:"vertical",default:3}),s(a(V),{direction:"column",gap:3},{default:c(()=>[s(a(G),{modelValue:a(t),"onUpdate:modelValue":i[0]||(i[0]=l=>me(t)?t.value=l:null),placeholder:"https://..."},null,8,["modelValue"]),s(a(I),{isLoading:a(r),disabled:a(r),mode:"accent",type:"submit",onClick:a(n)},{default:c(()=>i[4]||(i[4]=[h("Добавить статью")])),_:1},8,["isLoading","disabled","onClick"])]),_:1})],32))}}),cn=y(ln,[["__scopeId","data-v-5124a0d9"]]),dn=_({__name:"Toolbar",setup(e){const t=F(),{selectedArticle:n}=B(t),{actions:r,confirmModalData:o}=$e(n),i=H=>{t.setArticleView(H)},l=()=>{t.setSelectedArticle(null)},u=$(()=>[...r.value,{type:"separator"},{type:"button",name:"Закрыть",icon:rt,actionHandler:l}]),{elementRef:p,width:g}=ye(),v=$(()=>g.value<414);return(H,E)=>(d(),m(b,null,[s(a(ke),_e(we(a(o))),null,16),A("div",{ref_key:"elementRef",ref:p,class:j(["toolbar"])},[s(a(V),{alignItems:"center",direction:"row",gap:2},{default:c(()=>[s(a(tt),{value:a(t).articleView,onChange:i},{default:c(()=>[s(a(N),null,{popper:c(()=>E[0]||(E[0]=[h(" Режим чтения ")])),default:c(()=>[s(a(ie),{name:"reader"},{default:c(()=>[v.value?w("",!0):(d(),m(b,{key:0},[h("Режим чтения")],64)),v.value?(d(),f(a(nt),{key:1,class:"tab-icon"})):w("",!0)]),_:1})]),_:1}),s(a(N),null,{popper:c(()=>E[1]||(E[1]=[h(" Редактор ")])),default:c(()=>[s(a(ie),{name:"editor"},{default:c(()=>[v.value?w("",!0):(d(),m(b,{key:0},[h("Редактор")],64)),v.value?(d(),f(a(at),{key:1,class:"tab-icon"})):w("",!0)]),_:1})]),_:1})]),_:1},8,["value"])]),_:1}),s(a(V),{alignItems:"center",direction:"row"},{default:c(()=>[(d(!0),m(b,null,W(u.value,C=>(d(),m("div",null,[C.type==="button"?(d(),f(a(N),{key:0},{popper:c(()=>[h(S(C.name),1)]),default:c(()=>[s(a(I),{onClick:C.actionHandler,mode:"ghost",squared:""},{default:c(()=>[C.icon?(d(),f(X(C.icon),{key:0})):w("",!0)]),_:2},1032,["onClick"])]),_:2},1024)):w("",!0),C.type==="separator"?(d(),f(a(ot),{key:1,direction:"vertical"})):w("",!0)]))),256))]),_:1})],512)],64))}}),un=y(dn,[["__scopeId","data-v-cb2a8a40"]]),pn=_({__name:"Viewer",props:{article:{}},setup(e){const t=e,n=k(),r=k(null),o=()=>{r.value=new ft({el:n.value,height:"100%",previewStyle:"vertical",hideModeSwitch:!0,linkAttributes:{target:"_blank",rel:"noopener noreferrer"},language:"ru-RU",frontMatter:!0,initialValue:t.article.markdown,usageStatistics:!1,theme:"dark",plugins:[Se]})};return z(()=>{o()}),Z(()=>t.article.markdown,()=>{var l,u;((u=(l=r.value)==null?void 0:l.getMarkdown)==null?void 0:u.call(l))!==t.article.markdown&&o()}),(i,l)=>(d(),m("div",{class:"toastui-viewer",ref_key:"viewerRef",ref:n},null,512))}}),hn={class:j(["article"])},fn={class:"article-content"},mn=_({__name:"ArticleView",setup(e){const{articleView:t,selectedArticle:n}=B(F());return(r,o)=>(d(),m("div",hn,[a(n)?(d(),f(un,{key:0})):w("",!0),A("div",fn,[a(n)?w("",!0):(d(),f(cn,{key:0})),a(n)&&a(t)==="editor"?(d(),f(sn,{key:1,article:a(n)},null,8,["article"])):w("",!0),a(n)&&a(t)==="reader"?(d(),f(pn,{key:2,article:a(n)},null,8,["article"])):w("",!0)])]))}}),gn=y(mn,[["__scopeId","data-v-3bb84db9"]]),_n=_({__name:"FolderFilesCount",setup(e){const t=ve("sidebar-width");return(n,r)=>(a(t)||0)>180?(d(),f(a(st),{key:0,mode:"ghost"},{default:c(()=>[Ce(n.$slots,"default")]),_:3})):w("",!0)}}),wn=`<svg width="23" height="25" viewBox="0 0 23 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 21.2391C11.5 21.5153 11.7244 21.7402 12.0003 21.729C18.1195 21.4814 23 16.7142 23 10.8696C23 4.86647 17.8513 0 11.5 0C5.14873 0 0 4.86647 0 10.8696V24.5C0 24.7761 0.223858 25 0.5 25H5.25C5.52614 25 5.75 24.7761 5.75 24.5V10.8696C5.75 7.86802 8.32436 5.43478 11.5 5.43478C14.6756 5.43478 17.25 7.86802 17.25 10.8696C17.25 13.7119 14.9414 16.0447 11.9998 16.2841C11.7246 16.3065 11.5 16.5282 11.5 16.8043V21.2391Z" />
</svg>
`,Cn=`<svg width="77" height="25" viewBox="0 0 77 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 21.2391C11.5 21.5153 11.7244 21.7402 12.0003 21.729C18.1195 21.4814 23 16.7142 23 10.8696C23 4.86647 17.8513 0 11.5 0C5.14873 0 0 4.86647 0 10.8696V24.5C0 24.7761 0.223858 25 0.5 25H5.25C5.52614 25 5.75 24.7761 5.75 24.5V10.8696C5.75 7.86802 8.32436 5.43478 11.5 5.43478C14.6756 5.43478 17.25 7.86802 17.25 10.8696C17.25 13.7119 14.9414 16.0447 11.9998 16.2841C11.7246 16.3065 11.5 16.5282 11.5 16.8043V21.2391Z" />
<path d="M28.7585 18.1662C28.1321 18.1662 27.576 18.0618 27.0902 17.853C26.6087 17.6399 26.2273 17.3203 25.946 16.8942C25.669 16.4638 25.5305 15.9247 25.5305 15.277C25.5305 14.7315 25.6264 14.2713 25.8182 13.8963C26.0099 13.5213 26.2741 13.2166 26.6108 12.9822C26.9474 12.7479 27.3352 12.571 27.7741 12.4517C28.2131 12.3281 28.6818 12.245 29.1804 12.2024C29.7386 12.1513 30.1882 12.098 30.5291 12.0426C30.87 11.983 31.1172 11.8999 31.2706 11.7933C31.4283 11.6825 31.5071 11.527 31.5071 11.3267V11.2947C31.5071 10.9666 31.3942 10.7131 31.1683 10.5341C30.9425 10.3551 30.6378 10.2656 30.2543 10.2656C29.8409 10.2656 29.5085 10.3551 29.2571 10.5341C29.0502 10.6814 28.9053 10.8748 28.8225 11.1145C28.7909 11.206 28.7073 11.2731 28.6105 11.2696L26.1172 11.1812C25.9985 11.177 25.909 11.0705 25.9328 10.9541C26.0367 10.4454 26.2435 9.98585 26.5533 9.57529C26.9112 9.10228 27.4013 8.73154 28.0234 8.46307C28.6499 8.19034 29.402 8.05398 30.2798 8.05398C30.9062 8.05398 31.4837 8.12855 32.0121 8.2777C32.5405 8.42259 33.0007 8.63566 33.3927 8.91691C33.7848 9.19389 34.0874 9.5348 34.3004 9.93963C34.5177 10.3445 34.6264 10.8068 34.6264 11.3267V17.8C34.6264 17.9105 34.5369 18 34.4264 18H31.8861C31.7756 18 31.6861 17.9105 31.6861 17.8V16.6799C31.6861 16.6535 31.6647 16.6321 31.6383 16.6321V16.6321C31.6205 16.6321 31.6042 16.642 31.5958 16.6576C31.4231 16.9789 31.2039 17.2517 30.9382 17.4759C30.6697 17.706 30.3523 17.8786 29.9858 17.9936C29.6236 18.1087 29.2145 18.1662 28.7585 18.1662ZM29.7237 16.1207C30.0604 16.1207 30.3629 16.0526 30.6314 15.9162C30.9041 15.7798 31.1214 15.5923 31.2834 15.3537C31.4453 15.1108 31.5263 14.8295 31.5263 14.5099V13.9072C31.5263 13.7569 31.3632 13.6544 31.2196 13.6987C31.2132 13.7006 31.2068 13.7026 31.2003 13.7045C31.0767 13.7429 30.9403 13.7791 30.7912 13.8132C30.642 13.8473 30.4886 13.8771 30.331 13.9027C30.1733 13.9283 30.022 13.9517 29.8771 13.973C29.5831 14.0199 29.3317 14.0923 29.1229 14.1903C28.9183 14.2884 28.7606 14.4162 28.6499 14.5739C28.5433 14.7273 28.49 14.9105 28.49 15.1236C28.49 15.4474 28.6051 15.6946 28.8352 15.8651C29.0696 16.0355 29.3658 16.1207 29.7237 16.1207Z" />
<path d="M36.7376 18C36.6272 18 36.5376 17.9105 36.5376 17.8V8.38182C36.5376 8.27136 36.6272 8.18182 36.7376 8.18182H39.3739C39.4843 8.18182 39.5739 8.27136 39.5739 8.38182V9.91352C39.5739 9.94559 39.5999 9.97159 39.6319 9.97159V9.97159C39.658 9.97159 39.6809 9.95407 39.6881 9.92897C39.868 9.3027 40.1559 8.83538 40.5518 8.52699C40.9567 8.20739 41.4275 8.04759 41.9645 8.04759C42.1094 8.04759 42.2585 8.05824 42.4119 8.07955C42.5106 8.09051 42.6048 8.10588 42.6947 8.12565C42.7816 8.14477 42.8402 8.22386 42.8402 8.31284V10.5993C42.8402 10.7365 42.7041 10.8354 42.5696 10.8082C42.4746 10.7889 42.3688 10.7721 42.2521 10.7578C42.0135 10.728 41.8004 10.7131 41.6129 10.7131C41.2422 10.7131 40.9077 10.7962 40.6094 10.9624C40.3153 11.1243 40.0831 11.3523 39.9126 11.6463C39.7464 11.9361 39.6633 12.277 39.6633 12.669V17.8C39.6633 17.9105 39.5738 18 39.4633 18H36.7376Z" />
<path d="M52.6622 10.9693C52.6781 11.0831 52.5888 11.1823 52.474 11.1853L49.9931 11.2516C49.8918 11.2544 49.8066 11.18 49.7763 11.0833C49.7341 10.9481 49.6662 10.8247 49.5726 10.7131C49.4405 10.5511 49.2679 10.4254 49.0549 10.3359C48.8461 10.2422 48.6032 10.1953 48.3262 10.1953C47.9639 10.1953 47.655 10.2678 47.3993 10.4126C47.1479 10.5575 47.0243 10.7536 47.0286 11.0007C47.0243 11.1925 47.101 11.3587 47.2587 11.4993C47.4206 11.6399 47.7083 11.7528 48.1216 11.8381L50.0137 12.196C50.9938 12.3835 51.7225 12.6946 52.1997 13.1293C52.6813 13.5639 52.9242 14.1392 52.9284 14.8551C52.9242 15.5284 52.7239 16.1143 52.3276 16.6129C51.9355 17.1115 51.3986 17.4993 50.7168 17.7763C50.035 18.049 49.2551 18.1854 48.3773 18.1854C46.9753 18.1854 45.8695 17.8977 45.0598 17.3224C44.3154 16.7868 43.8658 16.0836 43.7112 15.213C43.6906 15.097 43.7809 14.9932 43.8986 14.9903L46.5968 14.9233C46.6947 14.9208 46.7783 14.9902 46.8074 15.0837C46.8938 15.3618 47.057 15.5796 47.297 15.7372C47.5826 15.9247 47.9469 16.0185 48.3901 16.0185C48.7907 16.0185 49.1166 15.9439 49.3681 15.7947C49.6195 15.6456 49.7473 15.4474 49.7516 15.2003C49.7473 14.9787 49.6493 14.8018 49.4576 14.6697C49.2658 14.5334 48.9654 14.4268 48.5563 14.3501L46.8432 14.0242C45.8588 13.8452 45.1259 13.5149 44.6443 13.0334C44.1628 12.5476 43.9242 11.9297 43.9284 11.1797C43.9242 10.5234 44.0989 9.96307 44.4526 9.49858C44.8063 9.02983 45.3091 8.67188 45.9611 8.42472C46.6131 8.17756 47.3823 8.05398 48.2686 8.05398C49.5982 8.05398 50.6465 8.3331 51.4135 8.89134C52.1243 9.40468 52.5405 10.0973 52.6622 10.9693Z" />
<path d="M59.0568 18.1854C58.0298 18.1854 57.1435 17.983 56.3977 17.5781C55.6562 17.169 55.0852 16.5874 54.6847 15.8331C54.2883 15.0746 54.0902 14.1733 54.0902 13.1293C54.0902 12.1151 54.2905 11.2287 54.691 10.4702C55.0916 9.70739 55.6562 9.11506 56.3849 8.69318C57.1136 8.26705 57.9723 8.05398 58.9609 8.05398C59.6598 8.05398 60.299 8.16264 60.8785 8.37997C61.4581 8.5973 61.9588 8.91904 62.3807 9.34517C62.8026 9.77131 63.1307 10.2976 63.3651 10.924C63.5994 11.5462 63.7166 12.2599 63.7166 13.0653V13.6452C63.7166 13.7556 63.6271 13.8452 63.5166 13.8452H55.3832C55.2728 13.8452 55.1832 13.7556 55.1832 13.6452V12.2298C55.1832 12.1194 55.2728 12.0298 55.3832 12.0298H60.6057C60.7171 12.0298 60.8082 11.9385 60.796 11.8277C60.7681 11.5761 60.6933 11.3474 60.5717 11.1413C60.4183 10.8814 60.2074 10.679 59.9389 10.5341C59.6747 10.3849 59.37 10.3104 59.0249 10.3104C58.6754 10.3104 58.3622 10.3892 58.0852 10.5469C57.8082 10.7003 57.5888 10.9112 57.4268 11.1797C57.2649 11.4439 57.1797 11.7443 57.1712 12.081V13.9283C57.1712 14.3288 57.25 14.6804 57.4077 14.983C57.5653 15.2813 57.7891 15.5135 58.0788 15.6797C58.3686 15.8459 58.7138 15.929 59.1143 15.929C59.3913 15.929 59.6428 15.8906 59.8686 15.8139C60.0945 15.7372 60.2883 15.6243 60.4503 15.4751C60.5784 15.3572 60.6811 15.2179 60.7586 15.0572C60.7958 14.9801 60.8722 14.9271 60.9578 14.9296L63.4512 15.0018C63.5739 15.0053 63.6648 15.1177 63.6355 15.2368C63.5003 15.7854 63.2546 16.2697 62.8984 16.6896C62.4979 17.1626 61.9716 17.5313 61.3196 17.7955C60.6676 18.0554 59.9133 18.1854 59.0568 18.1854Z" />
<path d="M65.513 18C65.4026 18 65.313 17.9105 65.313 17.8V8.38182C65.313 8.27136 65.4026 8.18182 65.513 8.18182H68.2387C68.3492 8.18182 68.4387 8.27136 68.4387 8.38182V17.8C68.4387 17.9105 68.3492 18 68.2387 18H65.513ZM66.8791 7.03765C66.4402 7.03765 66.063 6.89276 65.7477 6.60299C65.4323 6.30895 65.2747 5.95526 65.2747 5.54191C65.2747 5.13281 65.4323 4.78338 65.7477 4.49361C66.063 4.19958 66.4402 4.05256 66.8791 4.05256C67.3223 4.05256 67.6994 4.19958 68.0105 4.49361C68.3258 4.78338 68.4835 5.13281 68.4835 5.54191C68.4835 5.95526 68.3258 6.30895 68.0105 6.60299C67.6994 6.89276 67.3223 7.03765 66.8791 7.03765Z" />
<path d="M75.7702 8.18182C75.8806 8.18182 75.9702 8.27136 75.9702 8.38182V10.283C75.9702 10.3934 75.8806 10.483 75.7702 10.483H69.9763C69.8658 10.483 69.7763 10.3934 69.7763 10.283V8.38182C69.7763 8.27136 69.8658 8.18182 69.9763 8.18182H75.7702ZM71.0739 6.02955C71.0739 5.91909 71.1634 5.82955 71.2739 5.82955H73.9996C74.11 5.82955 74.1996 5.91909 74.1996 6.02955V14.9126C74.1996 15.1044 74.2294 15.2599 74.2891 15.3793C74.353 15.4943 74.4446 15.5774 74.5639 15.6286C74.6832 15.6754 74.826 15.6989 74.9922 15.6989C75.1115 15.6989 75.2372 15.6882 75.3693 15.6669C75.4064 15.6599 75.441 15.6533 75.4731 15.647C75.5844 15.625 75.6955 15.6953 75.7188 15.8064L76.1109 17.6772C76.1325 17.7798 76.071 17.8817 75.9695 17.9081C75.8445 17.9406 75.6935 17.9777 75.5163 18.0192C75.2479 18.0831 74.9261 18.1236 74.5511 18.1406C73.8182 18.1747 73.1896 18.0895 72.6655 17.8849C72.1456 17.6761 71.7472 17.3523 71.4702 16.9134C71.1974 16.4744 71.0653 15.9226 71.0739 15.2578V6.02955Z" />
</svg>
`,vn=["innerHTML"],bn=_({__name:"Logo",setup(e){const t=ve("sidebar-is-compact");return(n,r)=>(d(),m("div",{class:j(["logo",{compact:a(t)}]),innerHTML:a(t)?a(wn):a(Cn)},null,10,vn))}}),An=y(bn,[["__scopeId","data-v-8afbc5ea"]]),kn=_({__name:"SettingsModal",setup(e){const t=L(),{vaultPath:n}=B(t),r=async()=>{if(re()){const i=await window.api.createAppVault();i&&t.setSettingsItem("vaultPath",i)}},o=i=>{t.setSettingsItem("theme",i.value)};return(i,l)=>(d(),f(a(ae),ne(i.$attrs,{showCloseButton:"",title:"Настройки"}),{default:c(()=>[l[1]||(l[1]=h(" Выбрать папку как хранилище ")),s(a(P),{default:2,direction:"vertical"}),s(a(V),{direction:"row",gap:2,stretched:""},{default:c(()=>[s(a(N),{class:"tooltip-wrapper"},{popper:c(()=>[h(S(a(n)),1)]),default:c(()=>[s(a(G),{"v-model":a(n),placeholder:a(n)},null,8,["v-model","placeholder"])]),_:1}),s(a(I),{onClick:r},{default:c(()=>l[0]||(l[0]=[h("Выбрать папку")])),_:1})]),_:1}),s(a(P),{default:4,direction:"vertical"}),l[2]||(l[2]=h(" Тема оформления: ")),s(a(P),{default:2,direction:"vertical"}),s(a(it),{value:a(t).theme,onChange:o},{default:c(()=>[s(a(le),{value:"dark",label:"Тёмная тема"}),s(a(le),{value:"light",label:"Светлая тема"})]),_:1},8,["value"])]),_:1},16))}}),yn=y(kn,[["__scopeId","data-v-c9f59dd7"]]),Pn={class:"sidebar-content"},Sn={class:"folders-list"},Fn=_({__name:"FoldersSidebar",setup(e){const t=O(),n=k(!1),r=$(()=>{let l=null;const u=[];for(const p of t.folders)te(p)?l=p:u.push(p);return l&&u.push(l),u}),o=()=>{n.value=!0},i=()=>{n.value=!1};return(l,u)=>(d(),f(a(Pe),{compactWidth:120,width:150,minWidth:"80px",maxWidth:"300px",padding:8},{default:c(()=>[A("div",Pn,[s(Ie,null,{default:c(()=>[s(An)]),_:1}),s(a(P),{direction:"vertical",default:4}),A("div",Sn,[s(a(ct),null,{default:c(()=>[(d(!0),m(b,null,W(r.value,p=>{var g;return d(),f(a(ce),{selected:((g=a(t).selectedFolder)==null?void 0:g.folderPath)===p.folderPath,onClick:()=>a(t).setSelectedFolder(p)},{left:c(()=>[(d(),f(X(a(te)(p)?a(Ae):a(dt))))]),right:c(()=>[s(_n,null,{default:c(()=>[h(S(p.filesCount),1)]),_:2},1024)]),default:c(()=>[h(" "+S(p.name)+" ",1)]),_:2},1032,["selected","onClick"])}),256)),s(a(ce),{onClick:o},{left:c(()=>[s(a(lt))]),default:c(()=>[u[0]||(u[0]=h(" Настройки "))]),_:1})]),_:1})]),s(yn,{isOpened:n.value,onClose:i},null,8,["isOpened"])])]),_:1}))}}),Mn=y(Fn,[["__scopeId","data-v-77379b2e"]]),Tn={class:"app-layout"},$n=_({__name:"LoadedApp",setup(e){return(t,n)=>(d(),m(b,null,[s(St),A("div",Tn,[s(Mn),s(nn),s(gn)])],64))}}),In=y($n,[["__scopeId","data-v-9174d508"]]),Vn=_({__name:"App",setup(e){yt();const{isInitialized:t}=kt(),n=L();return Pt(),(r,o)=>(d(),m(b,null,[!a(t)||!a(n).vaultPath?(d(),f(wt,{key:0})):w("",!0),a(t)?(d(),f(In,{key:1})):w("",!0)],64))}}),En=`# Parseit

Parseit — это настольное приложение для парсинга веб-страниц по URL и сохранения их в виде статей в формате Markdown. Статьи сохраняются локально в файловой системе, после чего их можно редактировать и управлять ими.

## Использованные технологии

- <img src="https://vuejs.org/images/logo.png" width="14"> **Vue 3** — фронтенд.
- <img src="https://www.electronjs.org/assets/img/logo.svg" width="14"/> **Electron** — сборка настольного приложения, взаимодействие с операционной системой.
- <img src="https://vitejs.dev/logo.svg" width="14"/> **Vite** — сборка проекта для разработки.
- <img src="https://github.com/kirillgalushko/gui/raw/main/src/stories/assets/gui.svg" width="14"/> **GUI** — собственная [библиотека компонентов](https://github.com/kirillgalushko/gui), созданная для Parseit. Не использует готовые UI Kit's.
- <img src="https://pinia.vuejs.org/logo.svg" width="14"/> **Pinia** — управление состоянием Vue приложения.
- 🐶 **Husky** — pre-commit хуки.
- <img src="https://github.githubassets.com/favicons/favicon-dark.png" width="14"/> **Github Actions** — автоматическая сборка приложения после релиза.

## Разработка

### Запуск приложения

Для запуска Parseit в демо-режиме в браузере используйте команду:

\`\`\`bash
npm run dev
\`\`\`

Для запуска Parseit в режиме разработки Electron-приложения используйте команду:

\`\`\`bash
npm run dev-app
\`\`\`

### Релиз

Для релиза новой версии Parseit используйте команду:

\`\`\`bash
npm run release
\`\`\`

Эта команда предложит выбрать тип изменений \`major/minor/patch\`, автоматически обновит версию приложения в \`package.json\`. После создаст новый тег, что автоматически запустит сборку приложения с помощью **GitHub Actions**.

## Примечание

Это проект был создан с целью ознакомления с Vue 3 и не является production ready решением.
В нём намеренно упрощены и опущены некоторые важные аспекты разработки с целью экономии времени.
`,xn=`---
url: https://github.com/kirillgalushko/parseit
faviconUrl: ./icon.png
domain: https://github.com/kirillgalushko
createdAt: '2024-11-08T00:00:00.095Z'
siteName: Parseit
author: Кирилл Галушко
---

# Демо режим

Приложение запущено в **демо режиме** и имеет несколько ограничений для упрощения демонстрации функционала. В демо режиме вы сможете ознакомиться с интерфейсом и основными возможностями приложения, но для полноценной работы потребуется скачать десктопное приложение.

## Ограничения демо режима:

1. **Изменения не сохраняются**. Все действия, которые вы выполняете, сохраняются только в рамках текущей сессии. После перезагрузки страницы все данные будут сброшены.

2. **Получение реальных HTML-страниц не работает**. В этом режиме запросы к реальным страницам не выполняются. Вместо этого используется заранее подготовленный HTML-контент, что позволяет вам протестировать функционал без необходимости подключения к внешним источникам.

Для получения полноценного опыта и использования всех возможностей приложения, вам нужно скачать и установить **десктопное приложение**.

В десктопной версии:

- Вы можете загружать реальные HTML-страницы.
- Статьи сохраняются на локальном диске и доступны к просмотру и редактированию оффлайн.

Если вы хотите получить доступ к полному функционалу, пожалуйста, скачайте десктопное приложение [здесь](#).

## Как работает демо режим?

### Взаимодействие с Electron через Preload

Изначально Parseit работает как **Electron приложение**, которое использует механизм **preload** для взаимодействия между **Vue** и **Electron**.

**Preload** предоставляет возможность безопасного взаимодействия между веб-страницей (Vue) и нативным кодом (Electron), предоставляя доступ к окружению Node.js

### Методы в \`window.api\`

В **Preload** скрипте [определяются методы](https://github.com/kirillgalushko/parseit/blob/main/src/electron/preload/index.ts), которые затем становятся доступны через объект \`window.api\`. Эти методы используются во Vue приложении для работы с файловой системой, получения данных и выполнения других операций.

### Проверка наличия доступа к API

Когда Vue приложение запускается, оно сначала проверяет, доступен ли Electron API. Если доступ к реальному API отсутствует, подставляется [фейковый API](https://github.com/kirillgalushko/parseit/blob/main/src/web/utils/mockElectronApi.ts) с теми же методами. Этот фейковый API имитирует поведение реальных методов, но с ограничениями, характерными для работы в браузере.

\`\`\`js
// main.ts
if (!isDesktopApp()) {
  mockElectronApi()
}
\`\`\`

Таким образом, Vue приложение не зависит от того, с каким API оно работает (будь то Electron, Cordova или другое). Это позволяет поддерживать единый код и интерфейс, который можно адаптировать под различные среды.

### Демонстрация в браузере

В демо режиме приложение работает как **статический сайт**. Это значит, что вместо полноценного взаимодействия с системой и файлами, используются заглушки и фейковый контент.
`,Dn=`---
url: https://journal.tinkoff.ru/news/what-to-expect-of-new-us-president-2024/
faviconUrl: https://static2.tinkoffjournal.ru/favicons/apple-touch-icon.png
domain: https://journal.tinkoff.ru
createdAt: '2024-11-06T15:21:15.848Z'
siteName: Т⁠—⁠Ж
author: Михаил Городилов
---

# Дональд Трамп победил на выборах в США: что это значит для эконо­мики России и мира

> Автор: Михаил Городилов

Победителем стал республиканец Дональд Трамп, который уже занимал пост главы государства с 2016 по 2020 год. [Мы детально разбирали его экономическую программу](http://localhost:5174/usa-elections-2024-economics/) и сравнивали ее с программой кандидата от демократической партии Камалы Харрис. Теперь расскажем, какие последствия могут ждать американскую и мировую экономику, если предвыборные обещания будут реализованы на деле.

## Что Трамп будет делать с экономикой

В ходе предвыборной кампании Трамп пообещал ряд серьезных мер, которые могут повлиять на состояние американской и всей мировой экономики.

**Налоги.** Трамп заявлял, что собирается снизить ставку корпоративного налога с нынешних 21 до 15% для бизнеса, чье производство находится в США. Сейчас компании из американского биржевого индекса S&P 500 [платят 18—19% от прибыли](https://thedailyshot.com/2024/09/10/official-student-debt-delinquency-rates-are-about-to-surge/) — ставка получается ниже официальной за счет различных налоговых вычетов. О том, как они устроены, [Т⁠—⁠Ж рассказывал на примере разбора бизнеса Amazon.](http://localhost:5174/news/review-amazon/)

Также в программе Трампа было много обещаний снизить налоги для физических лиц. В частности, он намерен отменить налоги на социальные выплаты, на оплату сверхурочной работы и чаевые. Сокращение налогов для частных лиц, которое было введено как временная мера в предыдущее президентство Трампа, теперь хотят сделать постоянным.

Налоговые предложения Трампа грозят серьезно увеличить дефицит бюджета США. По оценкам аналитиков организации Tax Foundation и американского инвестбанка Piper Sandler, дефицит вырастет [на 3,2 трлн долларов в течение следующих 10 лет.](https://www.wsj.com/politics/policy/federal-debt-deficit-trump-harris-5a0d30d2?mod=hp_lead_pos1) Оценки журнала The Economist примерно такие же: [3 трлн долларов.](https://www.economist.com/finance-and-economics/2024/09/05/america-has-a-huge-deficit-which-candidate-would-make-it-worse)

**Тарифы.** В предвыборных речах Трамп обещал увеличить пошлины на товары из Китая с нынешних 12 до 60%. Тарифы на импорт из всех остальных стран могут вырасти до 20%, тогда как нынешний уровень [в среднем составляет 2%.](https://ustr.gov/issue-areas/industry-manufacturing/industrial-tariffs)

Повышением тарифов Трамп хочет стимулировать производство внутри страны. Но в реальности это может привести к росту инфляции: цены вырастут как для людей, так и для бизнеса, который пользуется импортом в качестве сырья.

Но главную цену заплатит американский бизнес: мигранты — это дешевая рабочая сила, их высылка приведет к удорожанию труда. На ценах товаров и услуг для рядовых потребителей это тоже скажется.

## Как реформы Трампа повлияют на экономику мира и РФ

Американская экономика сильно влияет на мировую из-за своего размера: [на США приходится больше четверти глобального ВВП.](https://data.worldbank.org/indicator/NY.GDP.MKTP.CD?most_recent_value_desc=true&year_high_desc=true) Поэтому и от действий американского президента зависит самочувствие не только экономики Штатов.

**Влияние на экономику.** Эксперты МВФ [попытались спрогнозировать эффект от реализации всех инициатив Трампа:](https://www.ft.com/content/b3620eb7-3bb7-43fd-a330-7aea80f65353) увеличения тарифов, продления режима снижения налогов, ограничения миграции и других мер. Также они учли возможные ответные шаги со стороны ЕС и КНР, которые могут повысить свои тарифы на американские товары.

Реализация такого сценария будет замедлять мировую экономику на 2—3% ежегодно на протяжении следующих трех лет. Поскольку глобальный ВВП [растет примерно на 3% в год](https://data.worldbank.org/indicator/NY.GDP.MKTP.KD.ZG), можно предположить, что мир ждет в лучшем случае стагнация, а в худшем — рецессия.

Для России это может означать снижение экспортных доходов, учитывая роль страны как одного из крупнейших мировых поставщиков ресурсов. Сокращение глобального спроса вызовет снижение цен на углеводороды и другие виды сырья.

**Влияние на финансовый рынок.** Рост дефицита бюджета, госдолга и инфляции может отразиться на ключевых финансовых активах. Так, [в Goldman Sachs пророчат заметное укрепление доллара](https://www.reuters.com/markets/currencies/goldman-sachs-says-euro-could-drop-10-under-trump-tariffs-tax-cuts-2024-10-22/) по отношению к другим мировым валютам в случае реализации широкомасштабных планов Трампа. Аналитики считают, что к этому приведет повышение ставки ФРС, которая будет вынуждена реагировать на рост цен.

Также высокая инфляция может привести к удорожанию золота, которое пользуется репутацией защитного актива. [В Saxo Bank считают](https://www.home.saxo/learn/guides/us-election/market-impact-of-democratic-vs-republican-wins), что при Трампе золото может вырасти в цене из-за большей неопределенности на рынке, которую инвесторы захотят переждать в надежных активах.

При этом такому рискованному активу, как криптовалюта, напротив, пророчат светлое будущее. Перед выборами Трамп публично поддерживал криптоиндустрию и даже обещал создать правительственный запас биткоинов. На новостях о его избрании президентом курс биткоина взлетел до рекордных высот, [преодолев отметку 75 000 $ за монету.](https://www.rbc.ru/crypto/news/67213a039a79471c020238b1)

Что касается рисков, то важно помнить о росте госдолга, который неминуемо ждет США при реализации даже части из экономических планов Трампа. Чем активнее страна будет наращивать долги, тем выше для нее будут риски оказаться неплатежеспособной — [летом 2023 года Штаты уже были в шаге от дефолта.](http://localhost:5174/news/usa-default/)

**Влияние на санкционную политику.** На президентский срок Джо Байдена пришлись самые серьезные санкции в отношении России, которые затрагивают ключевые отрасли экономики, включая энергетику, металлургию и финансы.

В ходе избирательной кампании Трамп [говорил о возможном ослаблении санкций против РФ.](https://tass.ru/mezhdunarodnaya-panorama/21379573) Но важно помнить, что власть президента в США серьезно ограничена Конгрессом, так что для реального потепления отношений одного желания президента может не хватить.

Новости, которые касаются инвесторов, — в нашем телеграм-канале. Подписывайтесь, чтобы быть в курсе происходящего: [@investnique](https://t.me/investnique)
`,On=`---
url: https://journal.tinkoff.ru/petstat/
faviconUrl: https://static2.tinkoffjournal.ru/favicons/apple-touch-icon.png
domain: https://journal.tinkoff.ru
createdAt: '2024-11-06T15:27:40.094Z'
siteName: Т⁠—⁠Ж
author: Сергей Антонов
---

# Каких домашних животных держат россияне

> Автор: Сергей Антонов

Официальная статистика ничего не знает про домашних питомцев, которых держат жители России.

Росстат дотошно учитывает количество сельскохозяйственных животных — свиней, коров, коз и так далее. Личные подсобные хозяйства — это часть экономики, поэтому государство за ними приглядывает. Но собаки, кошки, аквариумные рыбки и хомячки ему неинтересны.

Мы решили исправить это недоразумение и написали статистическую статью о домашних животных.

## Сколько в России домашних животных

Социологи ВЦИОМа говорят, что [домашние животные есть у 68% россиян.](https://wciom.ru/index.php?id=236&uid=10030) Если без сельхозживотных — у 61%. По данным всероссийской переписи населения 2020 года, в России насчитывается 66 млн домохозяйств. Если ориентироваться на эти числа, то получается, что в стране как минимум 40,3 млн питомцев — и это если считать, что в каждой семье живет одно животное. На самом деле животных больше.

Если верить данным производителя кормов и товаров для животных Mars Petcare, в 2021 году в России насчитывалось 40,8 млн домашних кошек и 22,6 млн собак. Такие животные были в 59% семей. С 2017 года количество питомцев у россиян выросло на 12,1 млн.

Кошки и собаки — самые популярные питомцы. По информации «Авито», в 2020 году на них приходилось 70% всех объявлений о продаже домашних животных: 42% — кошки, 28% — собаки. На третьем месте — кролики: 4,7%. На четвертом — попугаи: 1,1%. Замыкают рейтинг хомяки: 1% от общего числа объявлений.

По данным ВЦИОМа, кошки есть в 54% российских семей, собаки — в 38%. Хомяки, морские свинки, черепахи и другие мелкие животные — в 3%. Столько же респондентов сказали, что держат дома рыбок и птиц. 1% россиян держат экзотику вроде крокодилов, ящериц или обезьянок.

![Обложка статьи](https://opis-cdn.tinkoffjournal.ru/mercury/photo-liebe-tier__minicover.kilpjid0u3et.png)

![Источник: ВЦИОМ](https://opis-cdn.tinkoffjournal.ru/mercury/petstat-1desk-new.8xa5ji..png)

## Кошки против собак

Всего в мире, по данным Mars Petcare, 522 млн собак и 399 млн кошек. В 2016 году исследовательская компания GfK [провела большой опрос жителей 22 стран мира](https://www.gfk.com/insights/mans-best-friend-global-pet-ownership-and-feeding-trends), посвященный домашним животным. Оказалось, что почти везде собаки популярнее, чем кошки. В целом в мире в 33% семей есть собаки и только в 23% — кошки.

Исключение составили всего восемь государств, причем самой «кошачьей» страной оказалась Россия. По информации GfK, кошки есть в 57% российских семей, а собаки — в 29%. Для сравнения, в США эти показатели составляют 39 и 50%, в Китае — 10 и 25%, в Мексике — 24 и 26%.

![Обложка статьи](https://opis-cdn.tinkoffjournal.ru/mercury/mini___kittens.6assqly2ecg2.png)

![Источник: Gfk](https://opis-cdn.tinkoffjournal.ru/mercury/petstat-2desk-new.nywlvc..png)

**Среднестатистическая российская кошка,** если верить Mars Petcare, беспородная: например, 83% кошек в Москве — представители смешанных пород. Что касается питомцев с родословной, то самые популярные породы — британская короткошерстная, шотландская вислоухая, сибирская и мейн-кун.

**Среднестатистическая российская собака** — тоже представитель смешанной породы, таких питомцев 51%. А вот в Москве, наоборот, больше породистых собак — 62%. Самые популярные породы у жителей столицы, если верить Mars Petcare, — чихуахуа, йоркширский терьер и той-терьер.

Кобели, как и в случае с котами, в меньшинстве: их 37%. Стерилизуют и кастрируют своих питомцев владельцы редко, этой процедуре подвергали только каждую десятую собаку.

![Обложка статьи](https://opis-cdn.tinkoffjournal.ru/mercury/samoed_minicover.vngfaicwd5sa.png)

## Сколько тратят

Аналитическое агентство НАФИ в 2021 году [провело опрос владельцев домашних животных.](https://nafi.ru/projects/potrebitelskoe_povedenie/traty-rossiyan-na-domashnikh-zhivotnykh/) Средняя ежемесячная сумма расходов не превышает 2000 ₽. Свыше 5000 ₽ в месяц тратят только 4% хозяев. Наибольшие траты на домашних животных у жителей российских столиц.

Чаще всего хозяева питомцев тратятся на корм и медицинские услуги. Еще некоторые владельцы периодически покупают одежду, аксессуары, игрушки, а также платят за перевозку животных в транспорте, парикмахерские услуги, выгул, занятия с дрессировщиком.

По данным Т⁠-⁠Банка, ежемесячные расходы в категории «Животные» есть у 0,5% клиентов. Хотя бы раз в год такие траты есть у 36,7% клиентов. В категорию «Животные» попадают расходы на зоомагазины, ветклиники, груминг-салоны и так далее. Но надо понимать, что некоторые товары, например корма и наполнители, продаются и в обычных супермаркетах. Эти траты учитываются в категории «Супермаркеты», поэтому реальные суммы, скорее всего, больше.

![Обложка статьи](https://opis-cdn.tinkoffjournal.ru/mercury/mini__two-dogs.gz1bkdifwqsy.png)

Средний чек, если верить банковским данным, — 1010 ₽. Вот как выглядят ежемесячные расходы на домашних питомцев у клиентов Т⁠-⁠Банка с разным уровнем дохода — если учитывать только тех, у кого есть траты в категории «Животные».

![Источник: T-Bank Data](https://opis-cdn.tinkoffjournal.ru/mercury/petstat-3desk-new.lrpcvc..png)

## Как относятся к питомцам

В 2019 году Mars Petcare и «Яндекс-маркет» провели исследование того, как относятся к домашним животным жители крупных городов России. Почти три четверти опрошенных ответили, что любят своих питомцев и считают их членами семьи. Количество ответивших так владельцев кошек и собак было примерно одинаково.

Примерно 70% владельцев покупают для домашних животных специальный корм. В каждой десятой семье готовят для кошек или собак отдельную еду. Остальные дают питомцу и корм, и то, что едят сами.

Более 80% владельцев хотя бы раз в год посещают ветеринарного врача. Что касается вакцинации, то кошек прививает только каждый третий владелец, а собак — двое из трех.

По данным ВЦИОМа, чаще всего россияне покупают домашних питомцев или берут их у друзей или знакомых: по 30%. Четверть опрошенных подобрали животное на улице. Еще собак и кошек новым владельцам дарят или даже подбрасывают.

Что касается бездомных животных, то примерно половина россиян готовы взять питомца из приюта. Правда, чем старше человек, тем меньше у него такого желания.

![Обложка статьи](https://opis-cdn.tinkoffjournal.ru/mercury/readers-pets-minicover.8gls26pdsfk8.png)

Если верить исследованиям Mars Petcare, собак чаще берут у заводчика: так ответили больше половины опрошенных владельцев. А вот кошек, наоборот, чаще подбирают на улице.

![Источник: ВЦИОМ](https://opis-cdn.tinkoffjournal.ru/mercury/petstat-4desk-new.5jdmfh..png)
`,Ln=`---
url: https://habr.com/ru/articles/841708/
faviconUrl: https://assets.habr.com/habr-web/img/favicons/apple-touch-icon-76.png
domain: https://habr.com
createdAt: '2024-11-06T15:38:03.632Z'
siteName: Habr
author: acc0unt
---

# Зачем в iPhone чип, который убивает FaceID

> Автор: acc0unt

Начнём с начала: как система FaceID выглядит, и как она работает:

![Всё нужное для работы FaceID железо стоит именно в этом вырезе в экране](https://habrastorage.org/r/w1560/getpro/habr/upload_files/e76/f18/a87/e76f18a87fd2f5b3d8ecb9621a8c1ad6.png 'Всё нужное для работы FaceID железо стоит именно в этом вырезе в экране')

Всё нужное для работы FaceID железо стоит именно в этом вырезе в экране

![](https://habrastorage.org/r/w1560/getpro/habr/upload_files/db7/4d0/ddf/db74d0ddfea3651d1be8d7c34c54c992.png)

Аппаратно эта система состоит из пары камер - ИК и RGB, и двух видов ИК-излучателей - обычной подсветки, и специализированного прожектора точек.

Снимаем с iPhone X шкурку, убираем всё лишнее, и видим блок фронтальных камер в голом виде. ИК подсветка существует отдельно, но все остальные компоненты у нас в руках — они надёжно закреплены в этой металлической рамке.

Тут мы видим ИК камеру и прожектор ИК точек. Именно на этой инфракрасной парочке держится работа систем TrueDepth и FaceID. И главный герой сегодняшнего рассказа — как раз прожектор точек.

## Краткий принцип работы FaceID

![ Излучаемые iPhone X точки — фото отсюда.](https://habrastorage.org/r/w780q1/getpro/habr/upload_files/951/cf4/857/951cf4857843af19022b21c51fbc440e.jpg ' Излучаемые iPhone X точки — фото отсюда.')

Излучаемые iPhone X точки — фото [отсюда](https://commons.wikimedia.org/wiki/File:Apple_Face_ID_infrared_dot_projector.jpg).

Прожектор ИК точек делает именно то, о чём говорит его название — выплёвывает по команде в окружающий мир десятки тысяч инфракрасных точек. А ИК камера, которая и отдаёт эту команду, тут же фотографирует эти точки.

Зная оптические характеристики прожектора, камеры и расстояние между ними, ISP в процессоре iPhone может прикинуть, насколько далеко каждая точка находится. Математику процесса я и сам до конца не понимаю, и реверсить её будет тяжело — но снятие серии изображений с разными паттернами точек позволяет весьма точно угадать позицию каждой отдельной точки, и сделать таким образом цельную карту глубины. Без LIDAR и без ToF.

Именно карта глубины позволяет FaceID не обманываться распечатанными на принтере фотографиями. Фотография плоская — а лицо имеет рельеф, и для FaceID топографическая карта морды важнее её расцветки.

![Блок-схема референсной камеры PrimeSense](https://habrastorage.org/r/w1560/getpro/habr/upload_files/6c1/95c/2fa/6c195c2fa946750a8acacede75b5ce35.png 'Блок-схема референсной камеры PrimeSense')

Блок-схема референсной камеры PrimeSense

Впрочем, на расцветку лица система тоже смотрит. ИК камера аппаратно синхронизирована с RGB камерой, и лицо обе камеры снимают одновременно. А ещё iPhone может моргать не только ИК прожектором, но и ИК подсветкой — и снять всё лицо в ИК спектре.

Карта глубины сама по себе достаточно грубая, и анализ текстуры лица в ИК и RGB снимках нейросетью позволяет как уточнить глубину, так и лучше разбираться в деталях вроде мимики — причём как при свете дня, так и в темноте.

Если эта система кажется вам знакомой, то это, наверное, потому, что она напрямую выдрана из Kinect от Xbox 360. Только тот Kinect был огромной бандурой, а тут его ужали до размера выреза в экране смартфона.

Сделала это компания PrimeSense, которая и разработала технологии в основе Kinect 1 — а потом была куплена Apple за 350 миллионов долларов. Целиком — со всеми патентами, наработками, сотрудниками и иными потрохами.

## Разбираем кишки прожектора

![](https://habrastorage.org/r/w780q1/getpro/habr/upload_files/c38/503/482/c385034828bc34e1dca278592a8328dc.jpg)

Идём глубже в реверс: вынимаем прожектор точек из блока камер iPhone X и разбираем его на составные части. Состоит он из FPС-шлейфа, излучающей сборки и оптической сборки.

Шлейф полностью пассивный, и поэтому малоинтересный. Он припаивается к излучающей сборке, и выводит сигналы на FPC-разъём, который подключается к материнской плате iPhone X. Разъём с шагом контактов 0.35мм, кастомный (Apple засранцы), и похоже что сделан компанией JAE.

Посмотрим на основные компоненты оптики:

![Прожектор в разрезе: фото отсюда, подписи мои](https://habrastorage.org/r/w1560/getpro/habr/upload_files/ddc/433/714/ddc43371443eb98f7f32f7ddd5fdfd00.png 'Прожектор в разрезе: фото отсюда, подписи мои')

Прожектор в разрезе: фото [отсюда](https://medias.yolegroup.com/uploads/2017/12/Sample-Apple-iPhone-X-%E2%80%93-Infrared-Dot-Projector-.pdf), подписи мои

И посмотрим, что находится внутри излучателя:

![](https://habrastorage.org/r/w1560/getpro/habr/upload_files/c8e/1a9/01d/c8e1a901de1349b166ee696e2e3fbdc7.png)

И вот роль MOSFET и таинственного чипа меня заинтересовала. Почему? Потому что неясно, чем они там вообще занимаются.

Первый очевидный вариант — таинственный чип это память для серийного номера и данных калибровки. У чипа типичный для памяти интерфейс I2C, и память внутри точно есть. У прожекторов есть серийные номера, по которым можно в том числе определить дату производства — а если прожектор заменить целиком, то iPhone увидит несовпадение серийного номера и с заменой работать откажется. Но самый обычный I2C EEPROM встречается в крохотном WLCSP-4 корпусе — и его можно даже заблокировать от перезаписи, если очень хочется. Поэтому простой памятью чип быть не может. Он точно делает что-то ещё.

![ Распиновка прожектора от китайских мастеров из JCID. Надписи кривые, но в общем сходятся.](https://habrastorage.org/r/w1560/getpro/habr/upload_files/72f/49c/d61/72f49cd616d2b627e795cf450a8ba99d.png ' Распиновка прожектора от китайских мастеров из JCID. Надписи кривые, но в общем сходятся.')

Распиновка прожектора от китайских мастеров из [JCID](https://www.jcprogrammer.com/). Надписи кривые, но в общем сходятся.

Второй очевидный вариант — таинственный чип это драйвер лазеров, а MOSFET - его ключ. И да, MOSFET и правда управляется чипом. Вот только чем-то критически важным, как драйвер лазера, чип тоже быть не может.

Во-первых MOSFET стоит в разрыве общего катода лазерной сборки — а 4 раздельных анода выходят напрямую на шлейф и идут дальше в недра слоёной платы iPhone. И во-вторых я по ходу сбора данных для реверса натыкался на разные инструкции от китайских ремонтных мастеров.

![MOSFET заменяется на аккуратный проводок](https://habrastorage.org/r/w1560/getpro/habr/upload_files/cbf/e71/5a4/cbfe715a44f1fd6f0816b1895627c656.png 'MOSFET заменяется на аккуратный проводок')

MOSFET заменяется на аккуратный проводок

Сути вопроса они напрямую не прояснили, но во многих из этих инструкций говорилось: для ремонта «сломанного» прожектора нужно его разобрать, MOSFET снять, и заменить перемычкой между стоком и истоком. Прожектор в итоге с перемычкой внутри заработает, и функционал FaceID восстановится. А раз прожектор с перемычкой вместо MOSFET нормально работает, то что этот MOSFET там делал?

И меня осенило: в этом-то и была суть ремонта. MOSFET управляется чипом - поэтому по желанию чипа может разорвать цепь питания лазера, и сломать тем самым прожектор. А ремонт этот разрыв устраняет.

## Что в имени тебе моём

Раз стало ясно, что таинственный чип в паре с MOSFET мешает нормальной работе прожектора, то возникает вопрос — зачем он это делает? Зачем в прожектор ставят чип, который убивает прожектор?

За ответами я полез в прошивку блока ISP в процессоре iPhone – именно она и разговаривает по I2C с сенсорами камер и с прожектором.

Сначала я скачал образ прошивки iOS 15 для iPhone X, свеженький. Образы прошивки для iPhone — это по сути zip-файлы. Внутри я и нашёл искомую прошивку ISP — в виде файла \`\\Firmware\\isp_bni\\adc-nike-d22.im4p\`. Из сжатого im4p-файла извлёкся бинарник, в формате Mach-O с AArch64 кодом внутри. Mach-O, в отличие от типичного «образа прошивки для неизвестного микроконтроллера» — это задокументированный формат исполняемого файла, похожий на PE или ELF. Нет никаких гаданий про структуру файла, архитектуру процессора или адрес, по которому нужно загружать код. Просто кидаешь файл в Ghidra и всё само раскладывается по полочкам. Приятно.

![](https://habrastorage.org/r/w1560/getpro/habr/upload_files/b11/255/425/b11255425b037a927d696005b076a4be.png)

Потом инстинкт взял своё, и я решил распотрошить более старые прошивки. И в образе прошивки iOS 13 нашёл файл adc-nike-d22. Даже размер был почти такой же. Вот только в новой прошивке было больше кода — а в старой кода было меньше, зато были _символы_. Все имена функций на месте. Всегда проверяй старые версии!

В прошивке ISP есть много информации, включая то, как iPhone общается по I2C с разными чипами — с сенсорами камер, с PMU камер, с чипами управления вспышками и автофокусом. Оттуда же, спасибо символам, удалось извлечь «имена» разных составных частей системы — и часть из них соотносится с материалами из других частей прошивки, а так же от других реверсеров и ремонтников. Например, сенсор ИК камеры — это STMicroelectronics VD56G0 “Savage”. Вся система TrueDepth в коде называется “Pearl”, а её основным модулям даны имена персонажей из «Ромео и Джульета». ИК прожектор называется “Romeo”, ИК камера — “Juliet”, а ИК подсветка называется “Rosaline”. Драйвер лазеров, который живёт на материнской плате iPhone и запитывает как лазеры внутри “Romeo”, так и лазер внутри подсветки “Rosaline”, называется “Rigel“.

Интересующий нас таинственный чип? У него тоже есть имя. Его в коде называют “MamaBear”, кратко “MB”, и похоже что его функционал весьма прост. Он живёт на шине I2C. Он хранит в себе OTP-данные, включая серийный номер и разные калибровки. Он включает и выключает по команде MOSFET. И ещё он измеряет... ёмкость? Не температуру, к NTC-термистору он вообще не подключен, а именно ёмкость. Вот только ёмкость чего?

## Трагическая гибель Ромео

![](https://habrastorage.org/r/w1560/getpro/habr/upload_files/a9f/3e1/d4a/a9f3e1d4afad7610c386c779e96fab2b.png)

Ответ на этот вопрос нам опять помогают получить китайские схемы. В схеме от JCID видно, что в модуле “Romeo” есть три контакта для связи излучающей сборки с оптической сборкой. Один — земля, а ещё два идут напрямую в чип “MamaBear”. Эти контакты проходят по специальному переходнику на боку оптической сборки, и попадают на самую её верхушку — на дифракционный оптический элемент.

Дифракционный расщепитель луча неуправляемый, и на ток не реагирует. Но он имеет ёмкость. И с помощью тех трёх линий эту ёмкость можно измерять. Но зачем?

Дело в том, насколько важную роль играет этот дифракционный расщепитель. Рисунок точек, используемых прожектором, задаётся расположением крохотных лазеров-«ямок» на VСSEL-кристалле. А потом этот рисунок размножается дифракционным элементом, который из одного пучка лучей делает сотни пучков лучей.

![Сравнение расположения лазеров анода “SPARSE” и проецируемых точек](https://habrastorage.org/r/w1560/getpro/habr/upload_files/dd3/480/82e/dd348082e2abdbba2e3c15a6ece2ee6b.png 'Сравнение расположения лазеров анода “SPARSE” и проецируемых точек')

Сравнение расположения лазеров анода “SPARSE” и проецируемых точек

А значит, что будет, если этот дифракционный элемент оторвать?

Лучи не будут расщепляться. Вместо сотни пучков лазерных лучей будет один пучок — зато в сотню раз мощнее. А это всё-таки лазер. Инфракрасный лазер опаснее красного, потому что человек его не видит — и поэтому не станет инстинктивно отводить взгляд даже от опасно мощного источника света. И есть ненулевой шанс что характерный рисунок из точек окажется в таком случае выжжен у пользователя в сетчатке.

Для предотвращения этого и нужен чип-убийца. После включения он постоянно следит за ёмкостью дифракционного элемента — и если элемент оказывается выломан или повреждён, то ёмкость вылетает за пределы дозволенного, и чип тут же отрубает MOSFET и разрывает питание VCSEL. А так как элемент находится на самой верхушке оптической сборки, то повредить ударом остальную сборку, не сломав при этом его и не нарушив контакт, практически невозможно.

После аварийного отключения лазера чип выжигает себе в OTP флаг, который обозначает прожектор как дефектный — а значит, разорванное питание навсегда останется разорванным. Никакие команды из ISP больше не будут иметь над ним силы. MOSFET всегда будет закрыт, и прожектор больше не будет работать никогда.

Чип “MamaBear”, как намекает название – это чип защиты. Это “killswitch” для аварийной остановки лазера. **Он убивает прожектор чтобы не дать повреждённому лазерному устройству светить пользователю в глаза.** А модуль “Juliet”, оставшись без парного ему “Romeo”, теряет смысл жизни — и вся система TrueDepth приходит в негодность.

## Трудовые будни техножрецов

Но эта схема защиты имеет изъян. Дело в том, что прожектор точек стоит на верхнем крае устройства, и рядом с динамиком. Если внутрь iPhone попадает жидкость, то одно из самых частых для этого мест — именно там. А ёмкостные датчики чувствительны к проводящим ток жидкостям. Поэтому часто случается так, что FaceID ломается после падения устройства в воду — даже если попадание воды минимально, и никаких других повреждений нет. Просто “Romeo” не так понял ситуацию, и совершил Роскомнадзор зазря.

Такие устройства несут в ремонт. Часто в неофициальный ремонт. А так как iPhone сверяет серийные номера запчастей (привет, Apple), то просто махнуть весь блок камер на рабочий блок с донора нельзя. Телефон будет отторгать новый блок, и FaceID всё равно не заработает. Значит, надо каким-то образом чинить старый. Но как можно «воскресить» прожектор, который сам себя намеренно вывел из строя?

Производители неофициальных инструментов для ремонта придумали для этого целый ряд различных ритуалов. А пряморукие техножрецы-ремонтники им свято следуют, и проводят микрохирургию этой сложной и откалиброванной оптической системы. Прямизна рук нужна невообразимая — компоненты внутри размером в считанные миллиметры, а оптика крайне чувствительная. Если калибровка из-за хирургических вмешательств слишком сильно уплывёт, то работать система не будет. Инструментов для программной перекалибровки не существует (привет, Apple) — ты либо найдёшь способ попасть в оригинальные параметры, либо останешься без FaceID.

![«Высоковольтный» программатор](https://habrastorage.org/r/w1560/getpro/habr/upload_files/a65/900/f41/a65900f418443a3217df0b4b17286def.png '«Высоковольтный» программатор')

«Высоковольтный» программатор

Как это работает? Ну, первым делом надо считать данные OTP из оригинального чипа “MamaBear”.

Данные читаемы даже если прожектор считает себя неисправным. Для вычитки данных китайцы делают специальные «ремонтные» программаторы — которые поставляются с наборами разъёмов-переходников, и работают с целым рядом разных компонентов от разных моделей iPhone, включая и прожекторы.

А потом нужно сделать две вещи — разобраться с разрывающим питание MOSFET, и подменить оригинальный чип защиты. И тут есть множество разных методов.

![Шлейф с чипом-обманкой](https://habrastorage.org/r/w1560/getpro/habr/upload_files/3a1/510/dd6/3a1510dd62ed5c9a4a84cdfaa0ada7f7.png 'Шлейф с чипом-обманкой')

Шлейф с чипом-обманкой

Можно, например, кинуть вместо MOSFET перемычку, как на фотке выше в статье, а чип “MamaBear” подменить, отпаяв оригинальный FPC-шлейф и заменив его на специальный шлейф с китайским чипом-обманкой.

Оригинальный чип “MamaBear” при этом может оставаться внутри, и бессильно орать о том, что прожектор ни в коем случае не должен работать. Но у него больше нет MOSFET чтобы выключить прожектор принудительно, а iPhone со своей стороны видит только китайский чип — который отдаёт залитую программатором копию оригинальных данных, и рапортует о том, что прожектор точно-точно исправен.

![Выскабливаем старые кишки и ставим новые](https://habrastorage.org/r/w1560/getpro/habr/upload_files/a29/9d5/339/a299d5339991ef33f4c7d7a368695de5.png 'Выскабливаем старые кишки и ставим новые')

Выскабливаем старые кишки и ставим новые

А можно выдрать чип “MamaBear” целиком, и поставить на его штатное место китайскую замену два-в-одном — она и контакты MOSFET замыкает, и копию данных OTP в телефон отдаёт.

![Плата-переходник с чипом-обманкой](https://habrastorage.org/r/w1560/getpro/habr/upload_files/be6/5ea/cbf/be65eacbf1dd95aedd9733a0431a2691.png 'Плата-переходник с чипом-обманкой')

Плата-переходник с чипом-обманкой

Ну и есть вариант с минимумом пайки. «Переходник» с чипом-обманкой, который ставится между оригинальным шлейфом и материнской платой iPhone.

Проблему с MOSFET он не решает, но и к ней китайцы нашли оригинальный подход, сделав «высоковольтные» программаторы.

Знаете, как всякие ATtiny можно «раскирпичить» и перезаписать с помощью специального высоковольтного программатора? Тут ситуация совсем другая. Китайский высоковольтный программатор брутально и необратимо «программирует» MOSFET внутри прожектора в короткое замыкание между стоком и истоком.

На последнем этапе ремонта мы подключаем прожектор к программатору ещё раз, и заливаем в него сохранённый на первом этапе дамп. И прожектор готов работать, выдавая себя за оригинальный и немодифицированный.

Все эти разные приспособления делаются и продвигаются разными продавцами ремонтного оборудования. Всевозможные чипы-обманки работают только с «родными» программаторами, а в программаторах часто стоят DRM-фичи вроде привязки к аккаунту и ограниченного количества «ремонтов», за пополнение которых приходится платить.

Знают ли чинилы, что они своим ремонтом полностью уничтожают систему, придуманную Apple для защиты глаз пользователя? На самом деле нет. Они не реверсеры — они шаманы. Понимания принципов работы у них нет. У них есть ритуалы и есть результаты, и этого им хватает. А ушлые реверсеры из Китая неохотно делятся своими секретами с публикой. То, что я описал в этой статье, известно в полном объёме только инженерам Apple и десятку китайцев «в теме». И мне. И тебе, теперь.

## Почему Apple уроды

Знаете, я не могу слишком сильно винить инженеров Apple за то, что их “killswitch” слишком активен, и ломает прожекторы, которые вполне могли бы ещё поработать. Лазеры — тема опасная, и идея защитить пользователя от «худших сценариев» абсолютно здравая. Хоть реализация этой защиты и требует доработок.

Но **политика Apple по борьбе с неофициальными ремонтами — это худшее из всех зол**. Если бы блоки TrueDepth можно было спокойно менять с устройства на устройство, без оглядки на серийные номера, то в жутких извращённых ритуалах ремонта практически не было бы смысла. Зачем извращаться с микрохирургической пайкой и плясать с программаторами, если можно снять с очередного «донора» с битым экраном абсолютно рабочий блок TrueDepth, поставить его в телефон клиента, полностью восстановить функционал, и жить спокойно? Ремонтникам это было бы проще, а владельцам устройств — безопаснее.

Но история уродского антиремонтного поведения у Apple чётко показывает, что этому не бывать. Ну, если в США или в ЕС всяческие движения “Right to Repair” не сделают привязку запчастей по серийным номерам незаконной. А это сейчас возможно. В шутке про то, что Евросоюз добавляет в новые модели iPhone больше полезных фич чем Apple, очень высока доля правды. Так что будем следить за законодательными инициативами.
`,Hn=`---
url: https://github.com/kirillgalushko/parseit
faviconUrl: ./icon.png
domain: https://github.com/kirillgalushko
createdAt: '2024-11-08T00:00:00.095Z'
siteName: Parseit
author: Кирилл Галушко
---
`,Rn=`<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <title>Парсинг страниц</title>
  </head>
  <body>
    <article>
      <header>
        <div id="author">Parseit</div>
      </header>

      <section>
        <p>
          Приложение запущено в демо режиме и настоящий парсинг страниц отключен. Кстати, просто так
          получить <code>html</code> код внешней страницы из JavaScript не получится из-за
          <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS">CORS</a>. Для этого я
          написал небольшой прокси-сервер на <a href="https://expressjs.com/">Express</a>. В демо
          режиме он также недоступен, но при желании <strong>Parseit</strong> может полноценно
          работать в браузере.
        </p>
      </section>
    </article>
  </body>
</html>
`,Q={theme:"dark",vaultPath:"fake/vault/path"},D=Q.vaultPath+"/"+Fe,oe=Q.vaultPath+"/"+J,fe=[{name:Fe,folderPath:D,filesCount:0},{name:"Архив",folderPath:oe,filesCount:0}],x=[{name:"Демо режим",filePath:D+"/demo",content:xn,extension:".md"},{name:"Parseit",filePath:D+"/reademe",content:Hn+En,extension:".md"},{name:"Дональд Трамп победил",filePath:oe+"/example1",content:Dn,extension:".md"},{name:"Каких домашних животных держат россияне",filePath:D+"/example2",content:On,extension:".md"},{name:"Зачем в iPhone чип, который убивает FaceID",filePath:D+"/example3",content:Ln,extension:".md"}],q=e=>x.find(t=>t.filePath===e);let ee=0,R=()=>{};const jn=()=>{window.api={readFile:e=>{var t;return console.log(`Mock readFile called with path: ${e}`),Promise.resolve((t=q(e))==null?void 0:t.content)},writeFile:(e,t)=>{console.log(`Mock writeFile called with path: ${e}, content: ${t}`);const n=q(e);return n?n.content=t:x.push({name:"Новый файл",filePath:e,content:t,extension:".md"}),R(),Promise.resolve()},deleteFile:e=>{console.log(`Mock deleteFile called with path: ${e}`);const t=x.findIndex(n=>n.filePath===e);return t!==-1&&x.splice(t,1),R(),Promise.resolve()},archiveFile:e=>{console.log(`Mock archiveFile called with path: ${e}`);const t=q(e);return t&&(t.filePath=oe),R(),Promise.resolve()},recoverFile:e=>{console.log(`Mock recoverFile called with path: ${e}`);const t=q(e);return t&&(t.filePath=D),R(),Promise.resolve()},getAllFiles:e=>{console.log(`Mock getAllFiles called with directory: ${e}`);const t=x.filter(n=>n.filePath.includes(e));return Promise.resolve(t)},getAllFolders:e=>(console.log(`Mock getAllFolders called with directory: ${e}`),fe.forEach(t=>{t.filesCount=x.filter(n=>n.filePath.includes(t.folderPath)).length}),Promise.resolve(fe)),onFilesUpdated:e=>{console.log("Mock onFilesUpdated called"),R=e},createAppVault:()=>(console.log("Mock createAppVault called"),Promise.resolve(Q.vaultPath)),createAppFile:(e,t,n)=>{console.log(`Mock createAppFile called with fileName: ${e}, content: ${t}, folderName: ${n}`);const r=ee?` ${ee+1}`:"";return x.push({name:e+r,filePath:D+"/"+e+r,content:t,extension:".md"}),ee+=1,R(),Promise.resolve()},getSettings:()=>(console.log("Mock getSettings called"),Promise.resolve(Q)),setSettings:e=>(console.log("Mock setSettings called with settings:",e),Promise.resolve()),fetchHtml:e=>(console.log(`Mock fetchHtml called with url: ${e}`),Promise.resolve(Rn))}};re()||jn();const Ve=De(Vn),Un=Ee();Ve.use(Un);Ve.mount("#app");
