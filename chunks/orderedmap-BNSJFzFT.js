var s,u;function f(){if(u)return s;u=1;function e(t){this.content=t}return e.prototype={constructor:e,find:function(t){for(var n=0;n<this.content.length;n+=2)if(this.content[n]===t)return n;return-1},get:function(t){var n=this.find(t);return n==-1?void 0:this.content[n+1]},update:function(t,n,r){var c=r&&r!=t?this.remove(r):this,o=c.find(t),i=c.content.slice();return o==-1?i.push(r||t,n):(i[o+1]=n,r&&(i[o]=r)),new e(i)},remove:function(t){var n=this.find(t);if(n==-1)return this;var r=this.content.slice();return r.splice(n,2),new e(r)},addToStart:function(t,n){return new e([t,n].concat(this.remove(t).content))},addToEnd:function(t,n){var r=this.remove(t).content.slice();return r.push(t,n),new e(r)},addBefore:function(t,n,r){var c=this.remove(n),o=c.content.slice(),i=c.find(t);return o.splice(i==-1?o.length:i,0,n,r),new e(o)},forEach:function(t){for(var n=0;n<this.content.length;n+=2)t(this.content[n],this.content[n+1])},prepend:function(t){return t=e.from(t),t.size?new e(t.content.concat(this.subtract(t).content)):this},append:function(t){return t=e.from(t),t.size?new e(this.subtract(t).content.concat(t.content)):this},subtract:function(t){var n=this;t=e.from(t);for(var r=0;r<t.content.length;r+=2)n=n.remove(t.content[r]);return n},toObject:function(){var t={};return this.forEach(function(n,r){t[n]=r}),t},get size(){return this.content.length>>1}},e.from=function(t){if(t instanceof e)return t;var n=[];if(t)for(var r in t)n.push(r,t[r]);return new e(n)},s=e,s}export{f as r};
