import{f as q,r as F,R as D,a as $,l as V,c as B}from"./prosemirror-transform-BGNlAVvU.js";import{a as C,F as A}from"./prosemirror-model-q0pe22p9.js";import{S as I,N as x,A as T,T as z}from"./prosemirror-state-gAnMHYNe.js";const E=(t,e)=>t.selection.empty?!1:(e&&e(t.tr.deleteSelection().scrollIntoView()),!0);function H(t,e){let{$cursor:n}=t.selection;return!n||(e?!e.endOfTextblock("backward",t):n.parentOffset>0)?null:n}const J=(t,e,n)=>{let r=H(t,n);if(!r)return!1;let o=j(r);if(!o){let i=r.blockRange(),f=i&&V(i);return f==null?!1:(e&&e(t.tr.lift(i,f).scrollIntoView()),!0)}let l=o.nodeBefore;if(W(t,o,e,-1))return!0;if(r.parent.content.size==0&&(S(l,"end")||x.isSelectable(l)))for(let i=r.depth;;i--){let f=F(t.doc,r.before(i),r.after(i),C.empty);if(f&&f.slice.size<f.to-f.from){if(e){let s=t.tr.step(f);s.setSelection(S(l,"end")?I.findFrom(s.doc.resolve(s.mapping.map(o.pos,-1)),-1):x.create(s.doc,o.pos-l.nodeSize)),e(s.scrollIntoView())}return!0}if(i==1||r.node(i-1).childCount>1)break}return l.isAtom&&o.depth==r.depth-1?(e&&e(t.tr.delete(o.pos-l.nodeSize,o.pos).scrollIntoView()),!0):!1};function S(t,e,n=!1){for(let r=t;r;r=e=="start"?r.firstChild:r.lastChild){if(r.isTextblock)return!0;if(n&&r.childCount!=1)return!1}return!1}const G=(t,e,n)=>{let{$head:r,empty:o}=t.selection,l=r;if(!o)return!1;if(r.parent.isTextblock){if(n?!n.endOfTextblock("backward",t):r.parentOffset>0)return!1;l=j(r)}let i=l&&l.nodeBefore;return!i||!x.isSelectable(i)?!1:(e&&e(t.tr.setSelection(x.create(t.doc,l.pos-i.nodeSize)).scrollIntoView()),!0)};function j(t){if(!t.parent.type.spec.isolating)for(let e=t.depth-1;e>=0;e--){if(t.index(e)>0)return t.doc.resolve(t.before(e+1));if(t.node(e).type.spec.isolating)break}return null}function L(t,e){let{$cursor:n}=t.selection;return!n||(e?!e.endOfTextblock("forward",t):n.parentOffset<n.parent.content.size)?null:n}const Q=(t,e,n)=>{let r=L(t,n);if(!r)return!1;let o=N(r);if(!o)return!1;let l=o.nodeAfter;if(W(t,o,e,1))return!0;if(r.parent.content.size==0&&(S(l,"start")||x.isSelectable(l))){let i=F(t.doc,r.before(),r.after(),C.empty);if(i&&i.slice.size<i.to-i.from){if(e){let f=t.tr.step(i);f.setSelection(S(l,"start")?I.findFrom(f.doc.resolve(f.mapping.map(o.pos)),1):x.create(f.doc,f.mapping.map(o.pos))),e(f.scrollIntoView())}return!0}}return l.isAtom&&o.depth==r.depth-1?(e&&e(t.tr.delete(o.pos,o.pos+l.nodeSize).scrollIntoView()),!0):!1},U=(t,e,n)=>{let{$head:r,empty:o}=t.selection,l=r;if(!o)return!1;if(r.parent.isTextblock){if(n?!n.endOfTextblock("forward",t):r.parentOffset<r.parent.content.size)return!1;l=N(r)}let i=l&&l.nodeAfter;return!i||!x.isSelectable(i)?!1:(e&&e(t.tr.setSelection(x.create(t.doc,l.pos)).scrollIntoView()),!0)};function N(t){if(!t.parent.type.spec.isolating)for(let e=t.depth-1;e>=0;e--){let n=t.node(e);if(t.index(e)+1<n.childCount)return t.doc.resolve(t.after(e+1));if(n.type.spec.isolating)break}return null}const X=(t,e)=>{let{$head:n,$anchor:r}=t.selection;return!n.parent.type.spec.code||!n.sameParent(r)?!1:(e&&e(t.tr.insertText(`
`).scrollIntoView()),!0)};function R(t){for(let e=0;e<t.edgeCount;e++){let{type:n}=t.edge(e);if(n.isTextblock&&!n.hasRequiredAttrs())return n}return null}const Y=(t,e)=>{let{$head:n,$anchor:r}=t.selection;if(!n.parent.type.spec.code||!n.sameParent(r))return!1;let o=n.node(-1),l=n.indexAfter(-1),i=R(o.contentMatchAt(l));if(!i||!o.canReplaceWith(l,l,i))return!1;if(e){let f=n.after(),s=t.tr.replaceWith(f,f,i.createAndFill());s.setSelection(I.near(s.doc.resolve(f),1)),e(s.scrollIntoView())}return!0},Z=(t,e)=>{let n=t.selection,{$from:r,$to:o}=n;if(n instanceof T||r.parent.inlineContent||o.parent.inlineContent)return!1;let l=R(o.parent.contentMatchAt(o.indexAfter()));if(!l||!l.isTextblock)return!1;if(e){let i=(!r.parentOffset&&o.index()<o.parent.childCount?r:o).pos,f=t.tr.insert(i,l.createAndFill());f.setSelection(z.create(f.doc,i+1)),e(f.scrollIntoView())}return!0},_=(t,e)=>{let{$cursor:n}=t.selection;if(!n||n.parent.content.size)return!1;if(n.depth>1&&n.after()!=n.end(-1)){let l=n.before();if(B(t.doc,l))return e&&e(t.tr.split(l).scrollIntoView()),!0}let r=n.blockRange(),o=r&&V(r);return o==null?!1:(e&&e(t.tr.lift(r,o).scrollIntoView()),!0)};function ee(t){return(e,n)=>{let{$from:r,$to:o}=e.selection;if(e.selection instanceof x&&e.selection.node.isBlock)return!r.parentOffset||!B(e.doc,r.pos)?!1:(n&&n(e.tr.split(r.pos).scrollIntoView()),!0);if(!r.depth)return!1;let l=[],i,f,s=!1,g=!1;for(let c=r.depth;;c--)if(r.node(c).isBlock){s=r.end(c)==r.pos+(r.depth-c),g=r.start(c)==r.pos-(r.depth-c),f=R(r.node(c-1).contentMatchAt(r.indexAfter(c-1))),l.unshift(s&&f?{type:f}:null),i=c;break}else{if(c==1)return!1;l.unshift(null)}let a=e.tr;(e.selection instanceof z||e.selection instanceof T)&&a.deleteSelection();let p=a.mapping.map(r.pos),b=B(a.doc,p,l.length,l);if(b||(l[0]=f?{type:f}:null,b=B(a.doc,p,l.length,l)),a.split(p,l.length,l),!s&&g&&r.node(i).type!=f){let c=a.mapping.map(r.before(i)),u=a.doc.resolve(c);f&&r.node(i-1).canReplaceWith(u.index(),u.index()+1,f)&&a.setNodeMarkup(a.mapping.map(r.before(i)),f)}return n&&n(a.scrollIntoView()),!0}}const te=ee(),re=(t,e)=>(e&&e(t.tr.setSelection(new T(t.doc))),!0);function ne(t,e,n){let r=e.nodeBefore,o=e.nodeAfter,l=e.index();return!r||!o||!r.type.compatibleContent(o.type)?!1:!r.content.size&&e.parent.canReplace(l-1,l)?(n&&n(t.tr.delete(e.pos-r.nodeSize,e.pos).scrollIntoView()),!0):!e.parent.canReplace(l,l+1)||!(o.isTextblock||$(t.doc,e.pos))?!1:(n&&n(t.tr.join(e.pos).scrollIntoView()),!0)}function W(t,e,n,r){let o=e.nodeBefore,l=e.nodeAfter,i,f,s=o.type.spec.isolating||l.type.spec.isolating;if(!s&&ne(t,e,n))return!0;let g=!s&&e.parent.canReplace(e.index(),e.index()+1);if(g&&(i=(f=o.contentMatchAt(o.childCount)).findWrapping(l.type))&&f.matchType(i[0]||l.type).validEnd){if(n){let c=e.pos+l.nodeSize,u=A.empty;for(let k=i.length-1;k>=0;k--)u=A.from(i[k].create(null,u));u=A.from(o.copy(u));let d=t.tr.step(new D(e.pos-1,c,e.pos,c,new C(u,1,0),i.length,!0)),m=d.doc.resolve(c+2*i.length);m.nodeAfter&&m.nodeAfter.type==o.type&&$(d.doc,m.pos)&&d.join(m.pos),n(d.scrollIntoView())}return!0}let a=l.type.spec.isolating||r>0&&s?null:I.findFrom(e,1),p=a&&a.$from.blockRange(a.$to),b=p&&V(p);if(b!=null&&b>=e.depth)return n&&n(t.tr.lift(p,b).scrollIntoView()),!0;if(g&&S(l,"start",!0)&&S(o,"end")){let c=o,u=[];for(;u.push(c),!c.isTextblock;)c=c.lastChild;let d=l,m=1;for(;!d.isTextblock;d=d.firstChild)m++;if(c.canReplace(c.childCount,c.childCount,d.content)){if(n){let k=A.empty;for(let y=u.length-1;y>=0;y--)k=A.from(u[y].copy(k));let h=t.tr.step(new D(e.pos-u.length,e.pos+l.nodeSize,e.pos+m,e.pos+l.nodeSize-m,new C(k,u.length,0),0,!0));n(h.scrollIntoView())}return!0}}return!1}function P(t){return function(e,n){let r=e.selection,o=t<0?r.$from:r.$to,l=o.depth;for(;o.node(l).isInline;){if(!l)return!1;l--}return o.node(l).isTextblock?(n&&n(e.tr.setSelection(z.create(e.doc,t<0?o.start(l):o.end(l)))),!0):!1}}const le=P(-1),oe=P(1);function ue(t,e=null){return function(n,r){let{$from:o,$to:l}=n.selection,i=o.blockRange(l),f=i&&q(i,t,e);return f?(r&&r(n.tr.wrap(i,f).scrollIntoView()),!0):!1}}function pe(t,e=null){return function(n,r){let o=!1;for(let l=0;l<n.selection.ranges.length&&!o;l++){let{$from:{pos:i},$to:{pos:f}}=n.selection.ranges[l];n.doc.nodesBetween(i,f,(s,g)=>{if(o)return!1;if(!(!s.isTextblock||s.hasMarkup(t,e)))if(s.type==t)o=!0;else{let a=n.doc.resolve(g),p=a.index();o=a.parent.canReplaceWith(p,p+1,t)}})}if(!o)return!1;if(r){let l=n.tr;for(let i=0;i<n.selection.ranges.length;i++){let{$from:{pos:f},$to:{pos:s}}=n.selection.ranges[i];l.setBlockType(f,s,t,e)}r(l.scrollIntoView())}return!0}}function ie(t,e,n,r){for(let o=0;o<e.length;o++){let{$from:l,$to:i}=e[o],f=l.depth==0?t.inlineContent&&t.type.allowsMarkType(n):!1;if(t.nodesBetween(l.pos,i.pos,(s,g)=>{if(f||!r)return!1;f=s.inlineContent&&s.type.allowsMarkType(n)}),f)return!0}return!1}function de(t,e=null,n){let r=n!==!1;return function(o,l){let{empty:i,$cursor:f,ranges:s}=o.selection;if(i&&!f||!ie(o.doc,s,t,r))return!1;if(l)if(f)t.isInSet(o.storedMarks||f.marks())?l(o.tr.removeStoredMark(t)):l(o.tr.addStoredMark(t.create(e)));else{let g,a=o.tr;g=!s.some(p=>o.doc.rangeHasMark(p.$from.pos,p.$to.pos,t));for(let p=0;p<s.length;p++){let{$from:b,$to:c}=s[p];if(!g)a.removeMark(b.pos,c.pos,t);else{let u=b.pos,d=c.pos,m=b.nodeAfter,k=c.nodeBefore,h=m&&m.isText?/^\s*/.exec(m.text)[0].length:0,y=k&&k.isText?/\s*$/.exec(k.text)[0].length:0;u+h<d&&(u+=h,d-=y),a.addMark(u,d,t.create(e))}}l(a.scrollIntoView())}return!0}}function v(...t){return function(e,n,r){for(let o=0;o<t.length;o++)if(t[o](e,n,r))return!0;return!1}}let M=v(E,J,G),O=v(E,Q,U);const w={Enter:v(X,Z,_,te),"Mod-Enter":Y,Backspace:M,"Mod-Backspace":M,"Shift-Backspace":M,Delete:O,"Mod-Delete":O,"Mod-a":re},K={"Ctrl-h":w.Backspace,"Alt-Backspace":w["Mod-Backspace"],"Ctrl-d":w.Delete,"Ctrl-Alt-Backspace":w["Mod-Delete"],"Alt-Delete":w["Mod-Delete"],"Alt-d":w["Mod-Delete"],"Ctrl-a":le,"Ctrl-e":oe};for(let t in w)K[t]=w[t];const fe=typeof navigator<"u"?/Mac|iP(hone|[oa]d)/.test(navigator.platform):typeof os<"u"&&os.platform?os.platform()=="darwin":!1,me=fe?K:w;export{re as a,me as b,v as c,E as d,Y as e,Q as j,X as n,pe as s,de as t,ue as w};