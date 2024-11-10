import{a as w,R as ie,F as g,M as se,c as le}from"./prosemirror-model-q0pe22p9.js";const Q=65535,U=Math.pow(2,16);function oe(i,e){return i+e*U}function H(i){return i&Q}function ae(i){return(i-(i&Q))/U}const V=1,X=2,A=4,Y=8;class L{constructor(e,t,r){this.pos=e,this.delInfo=t,this.recover=r}get deleted(){return(this.delInfo&Y)>0}get deletedBefore(){return(this.delInfo&(V|A))>0}get deletedAfter(){return(this.delInfo&(X|A))>0}get deletedAcross(){return(this.delInfo&A)>0}}class S{constructor(e,t=!1){if(this.ranges=e,this.inverted=t,!e.length&&S.empty)return S.empty}recover(e){let t=0,r=H(e);if(!this.inverted)for(let n=0;n<r;n++)t+=this.ranges[n*3+2]-this.ranges[n*3+1];return this.ranges[r*3]+t+ae(e)}mapResult(e,t=1){return this._map(e,t,!1)}map(e,t=1){return this._map(e,t,!0)}_map(e,t,r){let n=0,s=this.inverted?2:1,l=this.inverted?1:2;for(let o=0;o<this.ranges.length;o+=3){let a=this.ranges[o]-(this.inverted?n:0);if(a>e)break;let h=this.ranges[o+s],p=this.ranges[o+l],c=a+h;if(e<=c){let f=h?e==a?-1:e==c?1:t:t,d=a+n+(f<0?0:p);if(r)return d;let u=e==(t<0?a:c)?null:oe(o/3,e-a),m=e==a?X:e==c?V:A;return(t<0?e!=a:e!=c)&&(m|=Y),new L(d,m,u)}n+=p-h}return r?e+n:new L(e+n,0,null)}touches(e,t){let r=0,n=H(t),s=this.inverted?2:1,l=this.inverted?1:2;for(let o=0;o<this.ranges.length;o+=3){let a=this.ranges[o]-(this.inverted?r:0);if(a>e)break;let h=this.ranges[o+s],p=a+h;if(e<=p&&o==n*3)return!0;r+=this.ranges[o+l]-h}return!1}forEach(e){let t=this.inverted?2:1,r=this.inverted?1:2;for(let n=0,s=0;n<this.ranges.length;n+=3){let l=this.ranges[n],o=l-(this.inverted?s:0),a=l+(this.inverted?0:s),h=this.ranges[n+t],p=this.ranges[n+r];e(o,o+h,a,a+p),s+=p-h}}invert(){return new S(this.ranges,!this.inverted)}toString(){return(this.inverted?"-":"")+JSON.stringify(this.ranges)}static offset(e){return e==0?S.empty:new S(e<0?[0,-e,0]:[0,0,e])}}S.empty=new S([]);class z{constructor(e=[],t,r=0,n=e.length){this.maps=e,this.mirror=t,this.from=r,this.to=n}slice(e=0,t=this.maps.length){return new z(this.maps,this.mirror,e,t)}copy(){return new z(this.maps.slice(),this.mirror&&this.mirror.slice(),this.from,this.to)}appendMap(e,t){this.to=this.maps.push(e),t!=null&&this.setMirror(this.maps.length-1,t)}appendMapping(e){for(let t=0,r=this.maps.length;t<e.maps.length;t++){let n=e.getMirror(t);this.appendMap(e.maps[t],n!=null&&n<t?r+n:void 0)}}getMirror(e){if(this.mirror){for(let t=0;t<this.mirror.length;t++)if(this.mirror[t]==e)return this.mirror[t+(t%2?-1:1)]}}setMirror(e,t){this.mirror||(this.mirror=[]),this.mirror.push(e,t)}appendMappingInverted(e){for(let t=e.maps.length-1,r=this.maps.length+e.maps.length;t>=0;t--){let n=e.getMirror(t);this.appendMap(e.maps[t].invert(),n!=null&&n>t?r-n-1:void 0)}}invert(){let e=new z;return e.appendMappingInverted(this),e}map(e,t=1){if(this.mirror)return this._map(e,t,!0);for(let r=this.from;r<this.to;r++)e=this.maps[r].map(e,t);return e}mapResult(e,t=1){return this._map(e,t,!1)}_map(e,t,r){let n=0;for(let s=this.from;s<this.to;s++){let l=this.maps[s],o=l.mapResult(e,t);if(o.recover!=null){let a=this.getMirror(s);if(a!=null&&a>s&&a<this.to){s=a,e=this.maps[a].recover(o.recover);continue}}n|=o.delInfo,e=o.pos}return r?e:new L(e,n,null)}}const B=Object.create(null);class k{getMap(){return S.empty}merge(e){return null}static fromJSON(e,t){if(!t||!t.stepType)throw new RangeError("Invalid input for Step.fromJSON");let r=B[t.stepType];if(!r)throw new RangeError(`No step type ${t.stepType} defined`);return r.fromJSON(e,t)}static jsonID(e,t){if(e in B)throw new RangeError("Duplicate use of step JSON ID "+e);return B[e]=t,t.prototype.jsonID=e,t}}class y{constructor(e,t){this.doc=e,this.failed=t}static ok(e){return new y(e,null)}static fail(e){return new y(null,e)}static fromReplace(e,t,r,n){try{return y.ok(e.replace(t,r,n))}catch(s){if(s instanceof ie)return y.fail(s.message);throw s}}}function P(i,e,t){let r=[];for(let n=0;n<i.childCount;n++){let s=i.child(n);s.content.size&&(s=s.copy(P(s.content,e,s))),s.isInline&&(s=e(s,t,n)),r.push(s)}return g.fromArray(r)}class C extends k{constructor(e,t,r){super(),this.from=e,this.to=t,this.mark=r}apply(e){let t=e.slice(this.from,this.to),r=e.resolve(this.from),n=r.node(r.sharedDepth(this.to)),s=new w(P(t.content,(l,o)=>!l.isAtom||!o.type.allowsMarkType(this.mark.type)?l:l.mark(this.mark.addToSet(l.marks)),n),t.openStart,t.openEnd);return y.fromReplace(e,this.from,this.to,s)}invert(){return new b(this.from,this.to,this.mark)}map(e){let t=e.mapResult(this.from,1),r=e.mapResult(this.to,-1);return t.deleted&&r.deleted||t.pos>=r.pos?null:new C(t.pos,r.pos,this.mark)}merge(e){return e instanceof C&&e.mark.eq(this.mark)&&this.from<=e.to&&this.to>=e.from?new C(Math.min(this.from,e.from),Math.max(this.to,e.to),this.mark):null}toJSON(){return{stepType:"addMark",mark:this.mark.toJSON(),from:this.from,to:this.to}}static fromJSON(e,t){if(typeof t.from!="number"||typeof t.to!="number")throw new RangeError("Invalid input for AddMarkStep.fromJSON");return new C(t.from,t.to,e.markFromJSON(t.mark))}}k.jsonID("addMark",C);class b extends k{constructor(e,t,r){super(),this.from=e,this.to=t,this.mark=r}apply(e){let t=e.slice(this.from,this.to),r=new w(P(t.content,n=>n.mark(this.mark.removeFromSet(n.marks)),e),t.openStart,t.openEnd);return y.fromReplace(e,this.from,this.to,r)}invert(){return new C(this.from,this.to,this.mark)}map(e){let t=e.mapResult(this.from,1),r=e.mapResult(this.to,-1);return t.deleted&&r.deleted||t.pos>=r.pos?null:new b(t.pos,r.pos,this.mark)}merge(e){return e instanceof b&&e.mark.eq(this.mark)&&this.from<=e.to&&this.to>=e.from?new b(Math.min(this.from,e.from),Math.max(this.to,e.to),this.mark):null}toJSON(){return{stepType:"removeMark",mark:this.mark.toJSON(),from:this.from,to:this.to}}static fromJSON(e,t){if(typeof t.from!="number"||typeof t.to!="number")throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");return new b(t.from,t.to,e.markFromJSON(t.mark))}}k.jsonID("removeMark",b);class N extends k{constructor(e,t){super(),this.pos=e,this.mark=t}apply(e){let t=e.nodeAt(this.pos);if(!t)return y.fail("No node at mark step's position");let r=t.type.create(t.attrs,null,this.mark.addToSet(t.marks));return y.fromReplace(e,this.pos,this.pos+1,new w(g.from(r),0,t.isLeaf?0:1))}invert(e){let t=e.nodeAt(this.pos);if(t){let r=this.mark.addToSet(t.marks);if(r.length==t.marks.length){for(let n=0;n<t.marks.length;n++)if(!t.marks[n].isInSet(r))return new N(this.pos,t.marks[n]);return new N(this.pos,this.mark)}}return new E(this.pos,this.mark)}map(e){let t=e.mapResult(this.pos,1);return t.deletedAfter?null:new N(t.pos,this.mark)}toJSON(){return{stepType:"addNodeMark",pos:this.pos,mark:this.mark.toJSON()}}static fromJSON(e,t){if(typeof t.pos!="number")throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");return new N(t.pos,e.markFromJSON(t.mark))}}k.jsonID("addNodeMark",N);class E extends k{constructor(e,t){super(),this.pos=e,this.mark=t}apply(e){let t=e.nodeAt(this.pos);if(!t)return y.fail("No node at mark step's position");let r=t.type.create(t.attrs,null,this.mark.removeFromSet(t.marks));return y.fromReplace(e,this.pos,this.pos+1,new w(g.from(r),0,t.isLeaf?0:1))}invert(e){let t=e.nodeAt(this.pos);return!t||!this.mark.isInSet(t.marks)?this:new N(this.pos,this.mark)}map(e){let t=e.mapResult(this.pos,1);return t.deletedAfter?null:new E(t.pos,this.mark)}toJSON(){return{stepType:"removeNodeMark",pos:this.pos,mark:this.mark.toJSON()}}static fromJSON(e,t){if(typeof t.pos!="number")throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");return new E(t.pos,e.markFromJSON(t.mark))}}k.jsonID("removeNodeMark",E);class v extends k{constructor(e,t,r,n=!1){super(),this.from=e,this.to=t,this.slice=r,this.structure=n}apply(e){return this.structure&&q(e,this.from,this.to)?y.fail("Structure replace would overwrite content"):y.fromReplace(e,this.from,this.to,this.slice)}getMap(){return new S([this.from,this.to-this.from,this.slice.size])}invert(e){return new v(this.from,this.from+this.slice.size,e.slice(this.from,this.to))}map(e){let t=e.mapResult(this.from,1),r=e.mapResult(this.to,-1);return t.deletedAcross&&r.deletedAcross?null:new v(t.pos,Math.max(t.pos,r.pos),this.slice)}merge(e){if(!(e instanceof v)||e.structure||this.structure)return null;if(this.from+this.slice.size==e.from&&!this.slice.openEnd&&!e.slice.openStart){let t=this.slice.size+e.slice.size==0?w.empty:new w(this.slice.content.append(e.slice.content),this.slice.openStart,e.slice.openEnd);return new v(this.from,this.to+(e.to-e.from),t,this.structure)}else if(e.to==this.from&&!this.slice.openStart&&!e.slice.openEnd){let t=this.slice.size+e.slice.size==0?w.empty:new w(e.slice.content.append(this.slice.content),e.slice.openStart,this.slice.openEnd);return new v(e.from,this.to,t,this.structure)}else return null}toJSON(){let e={stepType:"replace",from:this.from,to:this.to};return this.slice.size&&(e.slice=this.slice.toJSON()),this.structure&&(e.structure=!0),e}static fromJSON(e,t){if(typeof t.from!="number"||typeof t.to!="number")throw new RangeError("Invalid input for ReplaceStep.fromJSON");return new v(t.from,t.to,w.fromJSON(e,t.slice),!!t.structure)}}k.jsonID("replace",v);class M extends k{constructor(e,t,r,n,s,l,o=!1){super(),this.from=e,this.to=t,this.gapFrom=r,this.gapTo=n,this.slice=s,this.insert=l,this.structure=o}apply(e){if(this.structure&&(q(e,this.from,this.gapFrom)||q(e,this.gapTo,this.to)))return y.fail("Structure gap-replace would overwrite content");let t=e.slice(this.gapFrom,this.gapTo);if(t.openStart||t.openEnd)return y.fail("Gap is not a flat range");let r=this.slice.insertAt(this.insert,t.content);return r?y.fromReplace(e,this.from,this.to,r):y.fail("Content does not fit in gap")}getMap(){return new S([this.from,this.gapFrom-this.from,this.insert,this.gapTo,this.to-this.gapTo,this.slice.size-this.insert])}invert(e){let t=this.gapTo-this.gapFrom;return new M(this.from,this.from+this.slice.size+t,this.from+this.insert,this.from+this.insert+t,e.slice(this.from,this.to).removeBetween(this.gapFrom-this.from,this.gapTo-this.from),this.gapFrom-this.from,this.structure)}map(e){let t=e.mapResult(this.from,1),r=e.mapResult(this.to,-1),n=this.from==this.gapFrom?t.pos:e.map(this.gapFrom,-1),s=this.to==this.gapTo?r.pos:e.map(this.gapTo,1);return t.deletedAcross&&r.deletedAcross||n<t.pos||s>r.pos?null:new M(t.pos,r.pos,n,s,this.slice,this.insert,this.structure)}toJSON(){let e={stepType:"replaceAround",from:this.from,to:this.to,gapFrom:this.gapFrom,gapTo:this.gapTo,insert:this.insert};return this.slice.size&&(e.slice=this.slice.toJSON()),this.structure&&(e.structure=!0),e}static fromJSON(e,t){if(typeof t.from!="number"||typeof t.to!="number"||typeof t.gapFrom!="number"||typeof t.gapTo!="number"||typeof t.insert!="number")throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");return new M(t.from,t.to,t.gapFrom,t.gapTo,w.fromJSON(e,t.slice),t.insert,!!t.structure)}}k.jsonID("replaceAround",M);function q(i,e,t){let r=i.resolve(e),n=t-e,s=r.depth;for(;n>0&&s>0&&r.indexAfter(s)==r.node(s).childCount;)s--,n--;if(n>0){let l=r.node(s).maybeChild(r.indexAfter(s));for(;n>0;){if(!l||l.isLeaf)return!0;l=l.firstChild,n--}}return!1}function he(i,e,t,r){let n=[],s=[],l,o;i.doc.nodesBetween(e,t,(a,h,p)=>{if(!a.isInline)return;let c=a.marks;if(!r.isInSet(c)&&p.type.allowsMarkType(r.type)){let f=Math.max(h,e),d=Math.min(h+a.nodeSize,t),u=r.addToSet(c);for(let m=0;m<c.length;m++)c[m].isInSet(u)||(l&&l.to==f&&l.mark.eq(c[m])?l.to=d:n.push(l=new b(f,d,c[m])));o&&o.to==f?o.to=d:s.push(o=new C(f,d,r))}}),n.forEach(a=>i.step(a)),s.forEach(a=>i.step(a))}function pe(i,e,t,r){let n=[],s=0;i.doc.nodesBetween(e,t,(l,o)=>{if(!l.isInline)return;s++;let a=null;if(r instanceof le){let h=l.marks,p;for(;p=r.isInSet(h);)(a||(a=[])).push(p),h=p.removeFromSet(h)}else r?r.isInSet(l.marks)&&(a=[r]):a=l.marks;if(a&&a.length){let h=Math.min(o+l.nodeSize,t);for(let p=0;p<a.length;p++){let c=a[p],f;for(let d=0;d<n.length;d++){let u=n[d];u.step==s-1&&c.eq(n[d].style)&&(f=u)}f?(f.to=h,f.step=s):n.push({style:c,from:Math.max(o,e),to:h,step:s})}}}),n.forEach(l=>i.step(new b(l.from,l.to,l.style)))}function $(i,e,t,r=t.contentMatch,n=!0){let s=i.doc.nodeAt(e),l=[],o=e+1;for(let a=0;a<s.childCount;a++){let h=s.child(a),p=o+h.nodeSize,c=r.matchType(h.type);if(!c)l.push(new v(o,p,w.empty));else{r=c;for(let f=0;f<h.marks.length;f++)t.allowsMarkType(h.marks[f].type)||i.step(new b(o,p,h.marks[f]));if(n&&h.isText&&t.whitespace!="pre"){let f,d=/\r?\n|\r/g,u;for(;f=d.exec(h.text);)u||(u=new w(g.from(t.schema.text(" ",t.allowedMarks(h.marks))),0,0)),l.push(new v(o+f.index,o+f.index+f[0].length,u))}}o=p}if(!r.validEnd){let a=r.fillBefore(g.empty,!0);i.replace(o,o,new w(a,0,0))}for(let a=l.length-1;a>=0;a--)i.step(l[a])}function fe(i,e,t){return(e==0||i.canReplace(e,i.childCount))&&(t==i.childCount||i.canReplace(0,t))}function Fe(i){let t=i.parent.content.cutByIndex(i.startIndex,i.endIndex);for(let r=i.depth;;--r){let n=i.$from.node(r),s=i.$from.index(r),l=i.$to.indexAfter(r);if(r<i.depth&&n.canReplace(s,l,t))return r;if(r==0||n.type.spec.isolating||!fe(n,s,l))break}return null}function ce(i,e,t){let{$from:r,$to:n,depth:s}=e,l=r.before(s+1),o=n.after(s+1),a=l,h=o,p=g.empty,c=0;for(let u=s,m=!1;u>t;u--)m||r.index(u)>0?(m=!0,p=g.from(r.node(u).copy(p)),c++):a--;let f=g.empty,d=0;for(let u=s,m=!1;u>t;u--)m||n.after(u+1)<n.end(u)?(m=!0,f=g.from(n.node(u).copy(f)),d++):h++;i.step(new M(a,h,l,o,new w(p.append(f),c,d),p.size-c,!0))}function ze(i,e,t=null,r=i){let n=de(i,e),s=n&&ue(r,e);return s?n.map(K).concat({type:e,attrs:t}).concat(s.map(K)):null}function K(i){return{type:i,attrs:null}}function de(i,e){let{parent:t,startIndex:r,endIndex:n}=i,s=t.contentMatchAt(r).findWrapping(e);if(!s)return null;let l=s.length?s[0]:e;return t.canReplaceWith(r,n,l)?s:null}function ue(i,e){let{parent:t,startIndex:r,endIndex:n}=i,s=t.child(r),l=e.contentMatch.findWrapping(s.type);if(!l)return null;let a=(l.length?l[l.length-1]:e).contentMatch;for(let h=r;a&&h<n;h++)a=a.matchType(t.child(h).type);return!a||!a.validEnd?null:l}function me(i,e,t){let r=g.empty;for(let l=t.length-1;l>=0;l--){if(r.size){let o=t[l].type.contentMatch.matchFragment(r);if(!o||!o.validEnd)throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper")}r=g.from(t[l].type.create(t[l].attrs,r))}let n=e.start,s=e.end;i.step(new M(n,s,n,s,new w(r,0,0),t.length,!0))}function we(i,e,t,r,n){if(!r.isTextblock)throw new RangeError("Type given to setBlockType should be a textblock");let s=i.steps.length;i.doc.nodesBetween(e,t,(l,o)=>{let a=typeof n=="function"?n(l):n;if(l.isTextblock&&!l.hasMarkup(r,a)&&ge(i.doc,i.mapping.slice(s).map(o),r)){let h=null;if(r.schema.linebreakReplacement){let d=r.whitespace=="pre",u=!!r.contentMatch.matchType(r.schema.linebreakReplacement);d&&!u?h=!1:!d&&u&&(h=!0)}h===!1&&j(i,l,o,s),$(i,i.mapping.slice(s).map(o,1),r,void 0,h===null);let p=i.mapping.slice(s),c=p.map(o,1),f=p.map(o+l.nodeSize,1);return i.step(new M(c,f,c+1,f-1,new w(g.from(r.create(a,null,l.marks)),0,0),1,!0)),h===!0&&Z(i,l,o,s),!1}})}function Z(i,e,t,r){e.forEach((n,s)=>{if(n.isText){let l,o=/\r?\n|\r/g;for(;l=o.exec(n.text);){let a=i.mapping.slice(r).map(t+1+s+l.index);i.replaceWith(a,a+1,e.type.schema.linebreakReplacement.create())}}})}function j(i,e,t,r){e.forEach((n,s)=>{if(n.type==n.type.schema.linebreakReplacement){let l=i.mapping.slice(r).map(t+1+s);i.replaceWith(l,l+1,e.type.schema.text(`
`))}})}function ge(i,e,t){let r=i.resolve(e),n=r.index();return r.parent.canReplaceWith(n,n+1,t)}function ye(i,e,t,r,n){let s=i.doc.nodeAt(e);if(!s)throw new RangeError("No node at given position");t||(t=s.type);let l=t.create(r,null,n||s.marks);if(s.isLeaf)return i.replaceWith(e,e+s.nodeSize,l);if(!t.validContent(s.content))throw new RangeError("Invalid content for node type "+t.name);i.step(new M(e,e+s.nodeSize,e+1,e+s.nodeSize-1,new w(g.from(l),0,0),1,!0))}function Je(i,e,t=1,r){let n=i.resolve(e),s=n.depth-t,l=r&&r[r.length-1]||n.parent;if(s<0||n.parent.type.spec.isolating||!n.parent.canReplace(n.index(),n.parent.childCount)||!l.type.validContent(n.parent.content.cutByIndex(n.index(),n.parent.childCount)))return!1;for(let h=n.depth-1,p=t-2;h>s;h--,p--){let c=n.node(h),f=n.index(h);if(c.type.spec.isolating)return!1;let d=c.content.cutByIndex(f,c.childCount),u=r&&r[p+1];u&&(d=d.replaceChild(0,u.type.create(u.attrs)));let m=r&&r[p]||c;if(!c.canReplace(f+1,c.childCount)||!m.type.validContent(d))return!1}let o=n.indexAfter(s),a=r&&r[0];return n.node(s).canReplaceWith(o,o,a?a.type:n.node(s+1).type)}function ke(i,e,t=1,r){let n=i.doc.resolve(e),s=g.empty,l=g.empty;for(let o=n.depth,a=n.depth-t,h=t-1;o>a;o--,h--){s=g.from(n.node(o).copy(s));let p=r&&r[h];l=g.from(p?p.type.create(p.attrs,l):n.node(o).copy(l))}i.step(new v(e,e,new w(s.append(l),t,t),!0))}function Ae(i,e){let t=i.resolve(e),r=t.index();return xe(t.nodeBefore,t.nodeAfter)&&t.parent.canReplace(r,r+1)}function ve(i,e){e.content.size||i.type.compatibleContent(e.type);let t=i.contentMatchAt(i.childCount),{linebreakReplacement:r}=i.type.schema;for(let n=0;n<e.childCount;n++){let s=e.child(n),l=s.type==r?i.type.schema.nodes.text:s.type;if(t=t.matchType(l),!t||!i.type.allowsMarks(s.marks))return!1}return t.validEnd}function xe(i,e){return!!(i&&e&&!i.isLeaf&&ve(i,e))}function Se(i,e,t){let r=null,{linebreakReplacement:n}=i.doc.type.schema,s=i.doc.resolve(e-t),l=s.node().type;if(n&&l.inlineContent){let p=l.whitespace=="pre",c=!!l.contentMatch.matchType(n);p&&!c?r=!1:!p&&c&&(r=!0)}let o=i.steps.length;if(r===!1){let p=i.doc.resolve(e+t);j(i,p.node(),p.before(),o)}l.inlineContent&&$(i,e+t-1,l,s.node().contentMatchAt(s.index()),r==null);let a=i.mapping.slice(o),h=a.map(e-t);if(i.step(new v(h,a.map(e+t,-1),w.empty,!0)),r===!0){let p=i.doc.resolve(h);Z(i,p.node(),p.before(),i.steps.length)}return i}function be(i,e,t){let r=i.resolve(e);if(r.parent.canReplaceWith(r.index(),r.index(),t))return e;if(r.parentOffset==0)for(let n=r.depth-1;n>=0;n--){let s=r.index(n);if(r.node(n).canReplaceWith(s,s,t))return r.before(n+1);if(s>0)return null}if(r.parentOffset==r.parent.content.size)for(let n=r.depth-1;n>=0;n--){let s=r.indexAfter(n);if(r.node(n).canReplaceWith(s,s,t))return r.after(n+1);if(s<r.node(n).childCount)return null}return null}function Be(i,e,t){let r=i.resolve(e);if(!t.content.size)return e;let n=t.content;for(let s=0;s<t.openStart;s++)n=n.firstChild.content;for(let s=1;s<=(t.openStart==0&&t.size?2:1);s++)for(let l=r.depth;l>=0;l--){let o=l==r.depth?0:r.pos<=(r.start(l+1)+r.end(l+1))/2?-1:1,a=r.index(l)+(o>0?1:0),h=r.node(l),p=!1;if(s==1)p=h.canReplace(a,a,n);else{let c=h.contentMatchAt(a).findWrapping(n.firstChild.type);p=c&&h.canReplaceWith(a,a,c[0])}if(p)return o==0?r.pos:o<0?r.before(l+1):r.after(l+1)}return null}function Me(i,e,t=e,r=w.empty){if(e==t&&!r.size)return null;let n=i.resolve(e),s=i.resolve(t);return _(n,s,r)?new v(e,t,r):new Ce(n,s,r).fit()}function _(i,e,t){return!t.openStart&&!t.openEnd&&i.start()==e.start()&&i.parent.canReplace(i.index(),e.index(),t.content)}class Ce{constructor(e,t,r){this.$from=e,this.$to=t,this.unplaced=r,this.frontier=[],this.placed=g.empty;for(let n=0;n<=e.depth;n++){let s=e.node(n);this.frontier.push({type:s.type,match:s.contentMatchAt(e.indexAfter(n))})}for(let n=e.depth;n>0;n--)this.placed=g.from(e.node(n).copy(this.placed))}get depth(){return this.frontier.length-1}fit(){for(;this.unplaced.size;){let h=this.findFittable();h?this.placeNodes(h):this.openMore()||this.dropNode()}let e=this.mustMoveInline(),t=this.placed.size-this.depth-this.$from.depth,r=this.$from,n=this.close(e<0?this.$to:r.doc.resolve(e));if(!n)return null;let s=this.placed,l=r.depth,o=n.depth;for(;l&&o&&s.childCount==1;)s=s.firstChild.content,l--,o--;let a=new w(s,l,o);return e>-1?new M(r.pos,e,this.$to.pos,this.$to.end(),a,t):a.size||r.pos!=this.$to.pos?new v(r.pos,n.pos,a):null}findFittable(){let e=this.unplaced.openStart;for(let t=this.unplaced.content,r=0,n=this.unplaced.openEnd;r<e;r++){let s=t.firstChild;if(t.childCount>1&&(n=0),s.type.spec.isolating&&n<=r){e=r;break}t=s.content}for(let t=1;t<=2;t++)for(let r=t==1?e:this.unplaced.openStart;r>=0;r--){let n,s=null;r?(s=W(this.unplaced.content,r-1).firstChild,n=s.content):n=this.unplaced.content;let l=n.firstChild;for(let o=this.depth;o>=0;o--){let{type:a,match:h}=this.frontier[o],p,c=null;if(t==1&&(l?h.matchType(l.type)||(c=h.fillBefore(g.from(l),!1)):s&&a.compatibleContent(s.type)))return{sliceDepth:r,frontierDepth:o,parent:s,inject:c};if(t==2&&l&&(p=h.findWrapping(l.type)))return{sliceDepth:r,frontierDepth:o,parent:s,wrap:p};if(s&&h.matchType(s.type))break}}}openMore(){let{content:e,openStart:t,openEnd:r}=this.unplaced,n=W(e,t);return!n.childCount||n.firstChild.isLeaf?!1:(this.unplaced=new w(e,t+1,Math.max(r,n.size+t>=e.size-r?t+1:0)),!0)}dropNode(){let{content:e,openStart:t,openEnd:r}=this.unplaced,n=W(e,t);if(n.childCount<=1&&t>0){let s=e.size-t<=t+n.size;this.unplaced=new w(O(e,t-1,1),t-1,s?t-1:r)}else this.unplaced=new w(O(e,t,1),t,r)}placeNodes({sliceDepth:e,frontierDepth:t,parent:r,inject:n,wrap:s}){for(;this.depth>t;)this.closeFrontierNode();if(s)for(let m=0;m<s.length;m++)this.openFrontierNode(s[m]);let l=this.unplaced,o=r?r.content:l.content,a=l.openStart-e,h=0,p=[],{match:c,type:f}=this.frontier[t];if(n){for(let m=0;m<n.childCount;m++)p.push(n.child(m));c=c.matchFragment(n)}let d=o.size+e-(l.content.size-l.openEnd);for(;h<o.childCount;){let m=o.child(h),x=c.matchType(m.type);if(!x)break;h++,(h>1||a==0||m.content.size)&&(c=x,p.push(ee(m.mark(f.allowedMarks(m.marks)),h==1?a:0,h==o.childCount?d:-1)))}let u=h==o.childCount;u||(d=-1),this.placed=F(this.placed,t,g.from(p)),this.frontier[t].match=c,u&&d<0&&r&&r.type==this.frontier[this.depth].type&&this.frontier.length>1&&this.closeFrontierNode();for(let m=0,x=o;m<d;m++){let I=x.lastChild;this.frontier.push({type:I.type,match:I.contentMatchAt(I.childCount)}),x=I.content}this.unplaced=u?e==0?w.empty:new w(O(l.content,e-1,1),e-1,d<0?l.openEnd:e-1):new w(O(l.content,e,h),l.openStart,l.openEnd)}mustMoveInline(){if(!this.$to.parent.isTextblock)return-1;let e=this.frontier[this.depth],t;if(!e.type.isTextblock||!D(this.$to,this.$to.depth,e.type,e.match,!1)||this.$to.depth==this.depth&&(t=this.findCloseLevel(this.$to))&&t.depth==this.depth)return-1;let{depth:r}=this.$to,n=this.$to.after(r);for(;r>1&&n==this.$to.end(--r);)++n;return n}findCloseLevel(e){e:for(let t=Math.min(this.depth,e.depth);t>=0;t--){let{match:r,type:n}=this.frontier[t],s=t<e.depth&&e.end(t+1)==e.pos+(e.depth-(t+1)),l=D(e,t,n,r,s);if(l){for(let o=t-1;o>=0;o--){let{match:a,type:h}=this.frontier[o],p=D(e,o,h,a,!0);if(!p||p.childCount)continue e}return{depth:t,fit:l,move:s?e.doc.resolve(e.after(t+1)):e}}}}close(e){let t=this.findCloseLevel(e);if(!t)return null;for(;this.depth>t.depth;)this.closeFrontierNode();t.fit.childCount&&(this.placed=F(this.placed,t.depth,t.fit)),e=t.move;for(let r=t.depth+1;r<=e.depth;r++){let n=e.node(r),s=n.type.contentMatch.fillBefore(n.content,!0,e.index(r));this.openFrontierNode(n.type,n.attrs,s)}return e}openFrontierNode(e,t=null,r){let n=this.frontier[this.depth];n.match=n.match.matchType(e),this.placed=F(this.placed,this.depth,g.from(e.create(t,r))),this.frontier.push({type:e,match:e.contentMatch})}closeFrontierNode(){let t=this.frontier.pop().match.fillBefore(g.empty,!0);t.childCount&&(this.placed=F(this.placed,this.frontier.length,t))}}function O(i,e,t){return e==0?i.cutByIndex(t,i.childCount):i.replaceChild(0,i.firstChild.copy(O(i.firstChild.content,e-1,t)))}function F(i,e,t){return e==0?i.append(t):i.replaceChild(i.childCount-1,i.lastChild.copy(F(i.lastChild.content,e-1,t)))}function W(i,e){for(let t=0;t<e;t++)i=i.firstChild.content;return i}function ee(i,e,t){if(e<=0)return i;let r=i.content;return e>1&&(r=r.replaceChild(0,ee(r.firstChild,e-1,r.childCount==1?t-1:0))),e>0&&(r=i.type.contentMatch.fillBefore(r).append(r),t<=0&&(r=r.append(i.type.contentMatch.matchFragment(r).fillBefore(g.empty,!0)))),i.copy(r)}function D(i,e,t,r,n){let s=i.node(e),l=n?i.indexAfter(e):i.index(e);if(l==s.childCount&&!t.compatibleContent(s.type))return null;let o=r.fillBefore(s.content,!0,l);return o&&!Ne(t,s.content,l)?o:null}function Ne(i,e,t){for(let r=t;r<e.childCount;r++)if(!i.allowsMarks(e.child(r).marks))return!0;return!1}function Ie(i){return i.spec.defining||i.spec.definingForContent}function Re(i,e,t,r){if(!r.size)return i.deleteRange(e,t);let n=i.doc.resolve(e),s=i.doc.resolve(t);if(_(n,s,r))return i.step(new v(e,t,r));let l=re(n,i.doc.resolve(t));l[l.length-1]==0&&l.pop();let o=-(n.depth+1);l.unshift(o);for(let f=n.depth,d=n.pos-1;f>0;f--,d--){let u=n.node(f).type.spec;if(u.defining||u.definingAsContext||u.isolating)break;l.indexOf(f)>-1?o=f:n.before(f)==d&&l.splice(1,0,-f)}let a=l.indexOf(o),h=[],p=r.openStart;for(let f=r.content,d=0;;d++){let u=f.firstChild;if(h.push(u),d==r.openStart)break;f=u.content}for(let f=p-1;f>=0;f--){let d=h[f],u=Ie(d.type);if(u&&!d.sameMarkup(n.node(Math.abs(o)-1)))p=f;else if(u||!d.type.isTextblock)break}for(let f=r.openStart;f>=0;f--){let d=(f+p+1)%(r.openStart+1),u=h[d];if(u)for(let m=0;m<l.length;m++){let x=l[(m+a)%l.length],I=!0;x<0&&(I=!1,x=-x);let ne=n.node(x-1),G=n.index(x-1);if(ne.canReplaceWith(G,G,u.type,u.marks))return i.replace(n.before(x),I?s.after(x):t,new w(te(r.content,0,r.openStart,d),d,r.openEnd))}}let c=i.steps.length;for(let f=l.length-1;f>=0&&(i.replace(e,t,r),!(i.steps.length>c));f--){let d=l[f];d<0||(e=n.before(d),t=s.after(d))}}function te(i,e,t,r,n){if(e<t){let s=i.firstChild;i=i.replaceChild(0,s.copy(te(s.content,e+1,t,r,s)))}if(e>r){let s=n.contentMatchAt(0),l=s.fillBefore(i).append(i);i=l.append(s.matchFragment(l).fillBefore(g.empty,!0))}return i}function Ee(i,e,t,r){if(!r.isInline&&e==t&&i.doc.resolve(e).parent.content.size){let n=be(i.doc,e,r.type);n!=null&&(e=t=n)}i.replaceRange(e,t,new w(g.from(r),0,0))}function Te(i,e,t){let r=i.doc.resolve(e),n=i.doc.resolve(t),s=re(r,n);for(let l=0;l<s.length;l++){let o=s[l],a=l==s.length-1;if(a&&o==0||r.node(o).type.contentMatch.validEnd)return i.delete(r.start(o),n.end(o));if(o>0&&(a||r.node(o-1).canReplace(r.index(o-1),n.indexAfter(o-1))))return i.delete(r.before(o),n.after(o))}for(let l=1;l<=r.depth&&l<=n.depth;l++)if(e-r.start(l)==r.depth-l&&t>r.end(l)&&n.end(l)-t!=n.depth-l&&r.start(l-1)==n.start(l-1)&&r.node(l-1).canReplace(r.index(l-1),n.index(l-1)))return i.delete(r.before(l),t);i.delete(e,t)}function re(i,e){let t=[],r=Math.min(i.depth,e.depth);for(let n=r;n>=0;n--){let s=i.start(n);if(s<i.pos-(i.depth-n)||e.end(n)>e.pos+(e.depth-n)||i.node(n).type.spec.isolating||e.node(n).type.spec.isolating)break;(s==e.start(n)||n==i.depth&&n==e.depth&&i.parent.inlineContent&&e.parent.inlineContent&&n&&e.start(n-1)==s-1)&&t.push(n)}return t}class R extends k{constructor(e,t,r){super(),this.pos=e,this.attr=t,this.value=r}apply(e){let t=e.nodeAt(this.pos);if(!t)return y.fail("No node at attribute step's position");let r=Object.create(null);for(let s in t.attrs)r[s]=t.attrs[s];r[this.attr]=this.value;let n=t.type.create(r,null,t.marks);return y.fromReplace(e,this.pos,this.pos+1,new w(g.from(n),0,t.isLeaf?0:1))}getMap(){return S.empty}invert(e){return new R(this.pos,this.attr,e.nodeAt(this.pos).attrs[this.attr])}map(e){let t=e.mapResult(this.pos,1);return t.deletedAfter?null:new R(t.pos,this.attr,this.value)}toJSON(){return{stepType:"attr",pos:this.pos,attr:this.attr,value:this.value}}static fromJSON(e,t){if(typeof t.pos!="number"||typeof t.attr!="string")throw new RangeError("Invalid input for AttrStep.fromJSON");return new R(t.pos,t.attr,t.value)}}k.jsonID("attr",R);class J extends k{constructor(e,t){super(),this.attr=e,this.value=t}apply(e){let t=Object.create(null);for(let n in e.attrs)t[n]=e.attrs[n];t[this.attr]=this.value;let r=e.type.create(t,e.content,e.marks);return y.ok(r)}getMap(){return S.empty}invert(e){return new J(this.attr,e.attrs[this.attr])}map(e){return this}toJSON(){return{stepType:"docAttr",attr:this.attr,value:this.value}}static fromJSON(e,t){if(typeof t.attr!="string")throw new RangeError("Invalid input for DocAttrStep.fromJSON");return new J(t.attr,t.value)}}k.jsonID("docAttr",J);let T=class extends Error{};T=function i(e){let t=Error.call(this,e);return t.__proto__=i.prototype,t};T.prototype=Object.create(Error.prototype);T.prototype.constructor=T;T.prototype.name="TransformError";class We{constructor(e){this.doc=e,this.steps=[],this.docs=[],this.mapping=new z}get before(){return this.docs.length?this.docs[0]:this.doc}step(e){let t=this.maybeStep(e);if(t.failed)throw new T(t.failed);return this}maybeStep(e){let t=e.apply(this.doc);return t.failed||this.addStep(e,t.doc),t}get docChanged(){return this.steps.length>0}addStep(e,t){this.docs.push(this.doc),this.steps.push(e),this.mapping.appendMap(e.getMap()),this.doc=t}replace(e,t=e,r=w.empty){let n=Me(this.doc,e,t,r);return n&&this.step(n),this}replaceWith(e,t,r){return this.replace(e,t,new w(g.from(r),0,0))}delete(e,t){return this.replace(e,t,w.empty)}insert(e,t){return this.replaceWith(e,e,t)}replaceRange(e,t,r){return Re(this,e,t,r),this}replaceRangeWith(e,t,r){return Ee(this,e,t,r),this}deleteRange(e,t){return Te(this,e,t),this}lift(e,t){return ce(this,e,t),this}join(e,t=1){return Se(this,e,t),this}wrap(e,t){return me(this,e,t),this}setBlockType(e,t=e,r,n=null){return we(this,e,t,r,n),this}setNodeMarkup(e,t,r=null,n){return ye(this,e,t,r,n),this}setNodeAttribute(e,t,r){return this.step(new R(e,t,r)),this}setDocAttribute(e,t){return this.step(new J(e,t)),this}addNodeMark(e,t){return this.step(new N(e,t)),this}removeNodeMark(e,t){if(!(t instanceof se)){let r=this.doc.nodeAt(e);if(!r)throw new RangeError("No node at position "+e);if(t=t.isInSet(r.marks),!t)return this}return this.step(new E(e,t)),this}split(e,t=1,r){return ke(this,e,t,r),this}addMark(e,t,r){return he(this,e,t,r),this}removeMark(e,t,r){return pe(this,e,t,r),this}clearIncompatible(e,t,r){return $(this,e,t,r),this}}export{z as M,M as R,S,We as T,Ae as a,v as b,Je as c,Be as d,ze as f,Fe as l,Me as r};
