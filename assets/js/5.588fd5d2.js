(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{379:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},380:function(t,e,n){"use strict";var i=n(0),r=n(382).trim;i({target:"String",proto:!0,forced:n(383)("trim")},{trim:function(){return r(this)}})},382:function(t,e,n){var i=n(26),r="["+n(379)+"]",s=RegExp("^"+r+r+"*"),u=RegExp(r+r+"*$"),a=function(t){return function(e){var n=String(i(e));return 1&t&&(n=n.replace(s,"")),2&t&&(n=n.replace(u,"")),n}};t.exports={start:a(1),end:a(2),trim:a(3)}},383:function(t,e,n){var i=n(2),r=n(379);t.exports=function(t){return i((function(){return!!r[t]()||"​᠎"!="​᠎"[t]()||r[t].name!==t}))}},410:function(t,e,n){},441:function(t,e,n){"use strict";var i=n(0),r=n(121),s=n(57),u=n(22),a=n(12),l=n(124),o=n(58),c=n(59)("splice"),f=Math.max,p=Math.min;i({target:"Array",proto:!0,forced:!c},{splice:function(t,e){var n,i,c,h,g,d,v=a(this),m=u(v.length),k=r(t,m),y=arguments.length;if(0===y?n=i=0:1===y?(n=0,i=m-k):(n=y-2,i=p(f(s(e),0),m-k)),m+n-i>9007199254740991)throw TypeError("Maximum allowed length exceeded");for(c=l(v,i),h=0;h<i;h++)(g=k+h)in v&&o(c,h,v[g]);if(c.length=i,n<i){for(h=k;h<m-i;h++)d=h+n,(g=h+i)in v?v[d]=v[g]:delete v[d];for(h=m;h>m-i+n;h--)delete v[h-1]}else if(n>i)for(h=m-i;h>k;h--)d=h+n-1,(g=h+i-1)in v?v[d]=v[g]:delete v[d];for(h=0;h<n;h++)v[h+k]=arguments[h+2];return v.length=m-i+n,c}})},442:function(t,e,n){"use strict";n(410)},448:function(t,e,n){"use strict";n.r(e);n(380),n(54),n(78),n(56),n(32),n(215),n(216),n(117),n(118),n(441);var i={name:"TagsInput",props:{value:{type:Array,require:!0,default:function(){return[]}},relativeOpts:{type:Array,default:function(){return["110","114","119","120"]}}},data:function(){return{current:"",selectedItem:null,tags:[]}},watch:{value:{deep:!0,immediate:!0,handler:function(){this.tags=this.value.slice()}}},computed:{relativeTagOpts:function(){var t=this.current.trim();return t?this.relativeOpts.filter((function(e){return e.includes(t)})):[]}},methods:{focus:function(){var t=this;this.$nextTick((function(){t.$refs.input.focus()}))},handleClick:function(t){t.preventDefault();var e=this.calcLatestTag(t),n=e&&e.ele;if(n){var i=this.$refs.input;if(e.isRight)n.nextSibling.before(i);else n.before(i)}this.focus()},calcLatestTag:function(t){if(!(this.tags.length<=1||["INPUT","SPAN","I"].includes(t.target.tagName))){var e,n=t.clientX,i=t.clientY,r=this.$refs.tag,s=[],u=!0;return r.forEach((function(t){var r=t.getBoundingClientRect(),u=r.top,a=r.left,l=r.height;u<=i&&u+l>=i&&(s.push(t),a<=n&&(e=t))})),e||s.length&&(e=s[0],u=!1),{isRight:u,ele:e}}},add:function(){var t=this,e=this.relativeTagOpts[this.selectedItem]||this.current;if(e){this.selectedItem=null,this.current="";var n=this.$refs.input.previousElementSibling,i=n?+n.dataset.tagIndex:-1;n&&i>=this.tags.length-1?this.tags.push(e):(this.tags.splice(i+1,0,e),this.$nextTick((function(){t.moveRight()}))),this.emitParent(),this.focus()}},del:function(){var t=this;if(!this.current.length&&this.tags.length){var e=this.$refs.input.previousElementSibling;if(e){var n=+e.dataset.tagIndex;n>=this.tags.length-1?this.tags.pop():(this.tags.splice(n,1),this.$nextTick((function(){t.moveLeft()}))),this.emitParent()}}},preToMoveLeft:function(){this.current.length||this.moveLeft()},moveLeft:function(){var t=this.$refs.input,e=t.previousElementSibling;e&&(e.before(t),this.focus())},moveRight:function(){var t=this.$refs.input,e=t.nextElementSibling;e&&(t.before(e),this.focus())},preToMoveRight:function(){this.current.length||this.moveRight()},selectItem:function(t,e){t.preventDefault(),this.selectedItem=this.getSelectedIndex(e)},getSelectedIndex:function(t){var e=this.relativeTagOpts,n=this.selectedItem,i=e.length-1;return 0===e.length?null:null===n?0:"before"===t&&0===n?i:"after"===t&&n===i?0:"after"===t?n+1:n-1},isSelected:function(t){return this.selectedItem===t},emitParent:function(){this.$emit("input",this.tags)}}},r=(n(442),n(53)),s={components:{TagsInput:Object(r.a)(i,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"muli-tags",on:{click:t.handleClick}},[t._l(t.tags,(function(e,i){return n("span",{key:i+"-"+e,ref:"tag",refInFor:!0,staticClass:"tag",attrs:{"data-tag-index":i}},[n("i",{staticClass:"label"},[t._v(t._s(e))])])})),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.current,expression:"current"}],ref:"input",staticClass:"input",attrs:{type:"text",size:t.current.length||1},domProps:{value:t.current},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.add.apply(null,arguments)},keydown:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"delete",[8,46],e.key,["Backspace","Delete","Del"])?null:t.del.apply(null,arguments)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])||"button"in e&&0!==e.button?null:t.preToMoveLeft.apply(null,arguments)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"right",39,e.key,["Right","ArrowRight"])||"button"in e&&2!==e.button?null:t.preToMoveRight.apply(null,arguments)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?null:t.selectItem(e,"before")},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?null:t.selectItem(e,"after")}],blur:t.add,click:function(t){t.stopPropagation()},input:function(e){e.target.composing||(t.current=e.target.value)}}}),t._v(" "),n("div",{staticClass:"tip",on:{mouseout:function(e){t.selectedItem=null}}},t._l(t.relativeTagOpts,(function(e,i){return n("div",{key:i,staticClass:"tip-item",class:t.isSelected(i)?"tip-selected":"",on:{mouseover:function(e){t.selectedItem=i}}},[n("span",{staticClass:"tip-text"},[t._v(t._s(e))]),t._v(" "),t.isSelected(i)?n("span",{staticClass:"enter"},[t._v("回车选中")]):t._e()])})),0)],2)}),[],!1,null,"ae21cff8",null).exports},data:function(){return{tags:["111","222","333","尤水就下"],content:'\n                <tags-input v-model="tags"></tags-input>\n            '.replace(/\t+| +/g,"").trim()}}},u=Object(r.a)(s,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("tags-input",{model:{value:t.tags,callback:function(e){t.tags=e},expression:"tags"}}),t._v(" "),n("pre",[n("code",[t._v(t._s(t.content))])])],1)}),[],!1,null,null,null);e.default=u.exports}}]);