(this.webpackJsonpshinsetsu=this.webpackJsonpshinsetsu||[]).push([[0],{121:function(t,e,n){"use strict";n.r(e);var s=n(1),a=n(0),i=n.n(a),r=n(33),o=n.n(r),c=(n(60),n(12)),l=(n(61),n(5)),u=n(3),d=n(6),m=n(9),h=n(8),x=n(7),f=n.p+"static/media/shinsetsu-square.7dd6f5e2.png",p=n.p+"static/media/shinsetsu-text.9f84c9e4.png",b=function(t){var e="".concat(Math.floor(t.value/6e4)<10?"0":"").concat(Math.floor(t.value/6e4),":").concat(Math.floor(t.value%6e4/1e3)<10?"0":"").concat(Math.floor(t.value%6e4/1e3));return Object(s.jsx)("div",{className:"rounded-lg bg-white w-40 h-12",children:Object(s.jsx)("div",{className:"text-3xl text-center leading-none py-2 font-bold text-funky-text",children:e})})},j=function(t){var e=Object(a.useContext)(y).timer,n=Object(u.b)((function(){return{value:0}})),i=Object(c.a)(n,2),r=i[0],o=i[1],d=Object(u.b)({opacity:t.contentsLoaded?1:0}),m=r.value.interpolate((function(t){return"translate(0px, -".concat(104*t,"px)")})),h=r.value.interpolate((function(t){return 1-t})),x=r.value.interpolate((function(t){return"translate(-".concat(86*t,"px, ").concat(104*t,"px)")})),j=r.value.interpolate((function(t){return"translate(".concat(30*t,"px, 0px)")}));return t.contentScrolled&&o({value:1}),t.contentScrolled||o({value:0}),Object(s.jsxs)(u.a.div,{className:"flex flex-col w-full py-6 items-center",style:{transform:m},children:[Object(s.jsx)(u.a.img,{src:f,alt:"shinsetsu logo",style:{width:48,transform:x}}),Object(s.jsx)(u.a.img,{alt:"shinsetsu",src:p,style:{height:20,opacity:h},className:"mt-3"}),Object(s.jsx)(u.a.div,{className:"mt-6",style:Object(l.a)(Object(l.a)({},{transform:j}),d),children:Object(s.jsx)(b,{value:e})})]})};function g(){var t=null,e=null,n=document;return"undefined"!==typeof n.hidden?(t="hidden",e="visibilitychange"):"undefined"!==typeof n.msHidden?(t="msHidden",e="msvisibilitychange"):"undefined"!==typeof n.webkitHidden&&(t="webkitHidden",e="webkitvisibilitychange"),{hidden:t,visibilityChange:e}}var v,O,S=3e5;!function(t){t[t.ONGOING=0]="ONGOING",t[t.PAUSED=1]="PAUSED",t[t.WAITING_NEXT=2]="WAITING_NEXT",t[t.LOADING=3]="LOADING"}(v||(v={})),function(t){t.SESSION_STATE="sessionState"}(O||(O={}));var T=function(t){Object(h.a)(n,t);var e=Object(x.a)(n);function n(t){var s;return Object(d.a)(this,n),(s=e.call(this,t)).timer=null,s.nextTimer=null,s.persistState=function(t){!function(t){var e=N(),n=e?Object(l.a)(Object(l.a)({},e),t):t;window.localStorage.setItem(O.SESSION_STATE,JSON.stringify(n))}(t),s.setState((function(e){return Object(l.a)(Object(l.a)({},e),t)}))},s.startSession=function(){s.stopNextTimer();var t=Date.now();s.persistState({startSessionTime:t,active:!0,status:v.ONGOING})},s.endSession=function(){s.stopTimer();var t=Date.now()+6e5;s.persistState({nextSessionTime:t,active:!1,timer:0,status:v.WAITING_NEXT})},s.startTimer=function(){s.state.status!==v.WAITING_NEXT&&(s.timer=setInterval(s.updateTime,1e3))},s.stopTimer=function(){s.timer&&(console.log("clear"),clearInterval(s.timer)),s.timer=null},s.startNextTimer=function(){console.log("starting next 2"),s.state.status===v.WAITING_NEXT&&(console.log("starting next"),s.nextTimer=setInterval(s.updateNextTime,1e3))},s.stopNextTimer=function(){s.nextTimer&&(console.log("clear"),clearInterval(s.nextTimer)),s.nextTimer=null},s.updateTime=function(){console.log("TIMER",s.state.timer,s.timer),s.state.timer+1e3>=S?s.endSession():s.persistState({active:!0,timer:s.state.timer+1e3})},s.updateNextTime=function(){console.log("NEXT TIMER",s.state.nextTimer,s.state.nextSessionTime?s.state.nextSessionTime-Date.now():null),s.state.nextSessionTime&&(Date.now()>=s.state.nextSessionTime?s.startSession():s.persistState({active:!1,nextTimer:s.state.nextSessionTime-Date.now()}))},s.onVisibilityChange=function(t){"hidden"===document.visibilityState&&s.state.status===v.ONGOING&&(console.log("SHOULD PAUSE",t),s.timer&&s.stopTimer(),s.persistState({status:v.PAUSED})),"visible"===document.visibilityState&&s.state.status!==v.WAITING_NEXT&&(console.log("SHOULD RESTART",t),s.timer||s.startTimer(),s.persistState({status:v.ONGOING,startSessionTime:Date.now()-s.state.timer}))},s.state={active:!1,status:v.LOADING,timer:0,nextTimer:0,duration:S,nextSessionTime:null,startSessionTime:null,contentsLoaded:!1,contentsCallback:function(){return s.setState({contentsLoaded:!0,status:v.ONGOING})}},s}return Object(m.a)(n,[{key:"componentDidMount",value:function(){var t=g().visibilityChange;t&&"undefined"!==typeof document.addEventListener&&document.addEventListener(t,this.onVisibilityChange);var e=N();if(console.log("STORED",e),e)switch(void 0!==e.active&&null!==e.active||this.persistState({startSessionTime:Date.now(),nextSessionTime:null,active:!0,status:v.LOADING}),e.status){case v.PAUSED:case v.ONGOING:case v.LOADING:this.persistState({startSessionTime:Date.now()-e.timer,nextSessionTime:null,timer:e.timer,active:!0,status:v.LOADING});break;case v.WAITING_NEXT:!e.nextSessionTime||e.nextSessionTime&&Date.now()>e.nextSessionTime?this.persistState({startSessionTime:Date.now(),nextSessionTime:null,timer:0,active:!0,status:v.LOADING}):this.persistState(e)}e||this.persistState({active:!0,status:v.ONGOING})}},{key:"componentWillUnmount",value:function(){var t=g().visibilityChange;t&&"undefined"!==typeof document.addEventListener&&document.removeEventListener(t,this.onVisibilityChange),this.timer&&clearInterval(this.timer),this.nextTimer&&clearInterval(this.nextTimer)}},{key:"render",value:function(){return this.state.status===v.ONGOING&&this.state.contentsLoaded&&!this.timer&&this.startTimer(),this.state.status!==v.WAITING_NEXT||this.nextTimer||(console.log("starting next 3"),this.startNextTimer()),Object(s.jsx)(y.Provider,{value:this.state,children:this.state.active?this.props.children:Object(s.jsxs)("div",{className:"flex-1 flex-col items-center justify-center",style:{background:"linear-gradient(90deg, #efebfa, transparent)"},children:[Object(s.jsx)(j,{contentScrolled:!1,contentsLoaded:!1}),Object(s.jsxs)("div",{className:"flex flex-col items-center w-full",children:[Object(s.jsx)("div",{className:"mt-6 mb-2 text-black max-w-xs md:max-w-md text-center",style:{letterSpacing:"-0.3px"},children:"une petite pause avant de continuer ;)"}),Object(s.jsx)("div",{className:"mb-6 text-text-lt max-w-xs md:max-w-md text-center",style:{letterSpacing:"-0.3px"},children:"il sera bient\xf4t temps de contempler les montagnes \xe0 nouveau"}),Object(s.jsx)(b,{value:this.state.nextTimer})]})]})})}}]),n}(a.Component);function N(){var t=window.localStorage.getItem(O.SESSION_STATE);return t?JSON.parse(t):null}var y=i.a.createContext({active:!1,status:v.LOADING,timer:0,duration:18e4,contentsLoaded:!1,contentsCallback:function(){return console.log("")}}),w=function(t){var e=Object(a.useContext)(y),n=e.active,i=e.timer,r=e.duration,o=Object(u.b)({from:{opacity:0},to:{opacity:1}}),d=Object(u.b)((function(){return{progress:0,config:{duration:1e3}}})),m=Object(c.a)(d,2),h=m[0].progress;(0,m[1])({progress:i/r});var x=h.interpolate({range:[0,.2,.8,1],output:["#ff9696","#ffdaa7","#ffdaa7","#b09afe"]}),f=h.interpolate({range:[0,.2,.8,1],output:["#ffe6e6","#fff6ea","#fff6ea","#efebfa"]}),p=h.interpolate((function(t){return"translate(-".concat(t*(window.innerWidth+64),"px,").concat(.3*Math.pow(2*t-1,2)*window.innerHeight,"px)")})),b={background:"linear-gradient(".concat(270-180*h.getValue(),"deg, ").concat(f.getValue(),", transparent)")};return Object(s.jsxs)(u.a.div,{className:"flex min-h-full w-full flex-col overflow-hidden",style:Object(l.a)(Object(l.a)({},b),o),children:[n?Object(s.jsx)(u.a.div,{className:"absolute rounded-2xl w-8 h-8",style:{right:-32,top:32,transform:p,backgroundColor:x}}):null,t.children]})},I=n(15),A=i.a.createContext({scrolling:!1,shouldReload:!1,deactivateReload:function(){console.log("")}}),G=function(t){return Object(s.jsxs)("div",{className:"block mb-4 rounded bg-white border border-yellow-border",children:[Object(s.jsx)("div",{className:"font-yogasanspro py-4 px-3  font-bold text-black",children:L(t.timestamp)}),Object(s.jsx)("img",{src:t.images.src,alt:t.description,style:{objectFit:"contain"}}),Object(s.jsx)("div",{className:"font-yogasanspro py-3 px-3 text-md overflow-hidden",style:{maxHeight:"8.5rem",letterSpacing:"-0.3px"},children:t.description})]})};function L(t){var e=Date.now(),n=1e3*t,s=new Intl.RelativeTimeFormat("fr");if(e-n<36e5){var a=Math.round((n-e)/6e4);return s.format(a,"minutes")}if(e-n<864e6){var i=Math.round((n-e)/36e5);return s.format(i,"hours")}var r=Math.round((n-e)/864e5);return s.format(r,"days")}var E=n(25),C=n.n(E),k=function(t){var e=Object(a.useContext)(A).scrolling,n=Object(u.b)({top:e?250:354}).top,i=Object(u.b)({opacity:t.contentsLoaded?1:0}).opacity;return console.log("TOP",n.getValue(),e),Object(s.jsxs)(u.a.div,{className:"lg:absolute lg:max-w-xs lg:left-0 lg:text-left lg:ml-8 lg:z-10 lg:mb-0 lg:p-0 lg:block lg:bg-transparent p-3 flex flex-col items-center bg-white rounded-sm mb-8 text-center",style:window.innerWidth>1024?{top:n,opacity:i}:{},children:[Object(s.jsx)("div",{className:"text-black font-yogasanspro font-bold flex-wrap text-xl",children:"shinsetsu pr\xe9sente les derniers posts sur le hashtag chamonix"}),Object(s.jsx)("div",{className:"text-text-lt flex-wrap mt-6",children:"shinsetsu signifie la neige fra\xeeche en japonais"}),Object(s.jsx)("div",{className:"text-text-lt flex-wrap ",children:"c'est un projet de d\xe9mo en react et typescript"})]})},D=function(t){var e=t.posts,n=t.contentsLoaded,i=Object(a.useState)([]),r=Object(c.a)(i,2),o=r[0],d=r[1],m=Object(a.useState)([]),h=Object(c.a)(m,2),x=h[0],f=h[1],p=Object(a.useContext)(A),b=p.shouldReload,j=p.deactivateReload,g=Object(u.b)({opacity:n?1:0}),v=Object(a.useCallback)((function(t){var n=[],a=[];e.forEach((function(e,i){i<t&&!x.includes(e.id)&&(n.push(Object(s.jsx)(G,Object(l.a)({},e),e.id)),a.push(e.id))})),d([].concat(Object(I.a)(o),n)),f([].concat(Object(I.a)(x),a))}),[e]);return Object(a.useEffect)((function(){v(o.length+9),j()}),[b]),e.length>0&&0===o.length&&v(o.length+9),n?Object(s.jsxs)(u.a.div,{className:"w-5/6 md:w-1/2 lg:w-1/3",style:g,children:[Object(s.jsx)("div",{className:"lg:hidden block",children:Object(s.jsx)(k,{contentsLoaded:n})}),o.length>0?Object(s.jsx)("div",{className:"text-xl font-yogasanspro tracking-tight lg:text-left text-center text-md px-1 pb-2",style:{letterSpacing:"-0.3px"},children:"\ud83c\udfd4 monogatari de la Montagne (#chamonix)"}):null,o]}):Object(s.jsxs)(u.a.div,{className:"flex flex-col items-center w-64",children:[Object(s.jsx)(C.a,{type:"Audio",color:"#9a82e6",height:32,width:32,timeout:5e3}),Object(s.jsx)("div",{className:"text-center mt-6 text-text-md",style:{letterSpacing:"-0.3px"},children:"la nuit venue, la neige fra\xeeche refl\xe9ta les astres dans un silencieux scintillement"})]})},_=n(26),R=n.n(_),M=n(52),P=n(53),W=n.n(P);function H(t){var e=U(t,"entry_data"),n=t.substring(e),s=["{"];try{for(var a=0,i=1,r=n.substring(U(n,"{")+1).split("");i>0;)"{"===r[a]&&(i+=1),"}"===r[a]&&(i-=1),i>0&&s.push(r[a]),a+=1;s.push("}")}catch(o){console.error(o)}return JSON.parse(s.join(""))}function X(t){var e=t.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges;return(e=e.map((function(t){var e=t.node,n=e.id,s=e.taken_at_timestamp,a="";try{a=e.edge_media_to_caption.edges[0].node.text}catch(i){console.error(i,e)}return{timestamp:s,images:e.thumbnail_resources.reduce((function(t,e){return t.config_width<e.config_width?e:t})),description:a,id:n}}))).sort((function(t,e){return e.timestamp-t.timestamp})),e}function U(t,e){var n=t.match(e);if(n&&n.index)return n.index;throw new Error("no data")}var F=function(t){Object(h.a)(n,t);var e=Object(x.a)(n);function n(t){var s;return Object(d.a)(this,n),(s=e.call(this,t)).state={posts:[],contentsLoaded:!1},s}return Object(m.a)(n,[{key:"componentDidMount",value:function(){var t=Object(M.a)(R.a.mark((function t(){var e,n,s;return R.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("INSTA CONTEXT",this.context),t.next=3,W()("https://instagram.com/explore/tags/".concat(this.props.hashtag,"/")).text();case 3:e=t.sent,n=H(e),s=X(n),this.setState({posts:s,contentsLoaded:!0}),this.context.contentsCallback();case 8:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){return this.props.render(this.state)}}]),n}(a.Component);F.contextType=y;var V=n(54),J=function(t){Object(h.a)(n,t);var e=Object(x.a)(n);function n(t){var s;return Object(d.a)(this,n),(s=e.call(this,t)).scrollContainer=null,s.reloadAnim=null,s.handleScroll=function(t){var e=s.scrollContainer?s.scrollContainer.scrollHeight-s.scrollContainer.clientHeight:null;t.currentTarget.scrollTop>16&&s.setState((function(t){return t.scrolling?null:(s.props.setContentScrolled(!0),{scrolling:!0})})),t.currentTarget.scrollTop<=16&&s.setState((function(t){return t.scrolling?(s.props.setContentScrolled(!1),{scrolling:!1}):null})),e&&t.currentTarget.scrollTop>=e-16&&(s.setState((function(t){return t.reloadAnim?null:{reloadAnim:!0}})),s.reloadAnim||(s.reloadAnim=setTimeout((function(){s.setState((function(t){return t.shouldReload?null:{shouldReload:!0,reloadAnim:!1}})),s.reloadAnim&&clearTimeout(s.reloadAnim)}),800)))},s.state={scrolling:!1,shouldReload:!1,reloadAnim:!1,deactivateReload:function(){return s.setState({shouldReload:!1})}},s}return Object(m.a)(n,[{key:"render",value:function(){var t=this;return Object(s.jsxs)(A.Provider,{value:this.state,children:[Object(s.jsx)("div",{className:"hidden lg:block",children:Object(s.jsx)(k,{contentsLoaded:this.props.contentsLoaded})}),Object(s.jsx)(V.Spring,{from:{transform:"translate(0px, 0px)"},to:{transform:"translate(0px, ".concat(this.state.scrolling?-104:0,"px)")},children:function(e){return Object(s.jsxs)("div",{className:"flex flex-col items-center overflow-y-auto pb-12",onScroll:t.handleScroll,ref:function(e){return t.scrollContainer=e},style:Object(l.a)(Object(l.a)({},e),{marginBottom:-104}),children:[t.props.children,t.state.reloadAnim?Object(s.jsx)("div",{className:"mt-6",children:Object(s.jsx)(C.a,{type:"Audio",color:"#9a82e6",height:32,width:32,timeout:5e3})}):null]})}})]})}}]),n}(a.Component),B=function(){var t=Object(a.useState)(!1),e=Object(c.a)(t,2),n=e[0],i=e[1];return Object(s.jsx)("div",{className:"h-screen w-full flex",children:Object(s.jsx)(T,{children:Object(s.jsx)(F,{hashtag:"chamonix",main:!0,render:function(t){var e=t.contentsLoaded,a=t.posts;return Object(s.jsxs)(w,{contentsLoaded:e,children:[Object(s.jsx)(j,{contentScrolled:n,contentsLoaded:e}),Object(s.jsx)(J,{setContentScrolled:i,contentsLoaded:e,children:Object(s.jsx)(D,{posts:a,contentsLoaded:e})})]})}})})})},q=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,122)).then((function(e){var n=e.getCLS,s=e.getFID,a=e.getFCP,i=e.getLCP,r=e.getTTFB;n(t),s(t),a(t),i(t),r(t)}))};o.a.render(Object(s.jsx)(i.a.StrictMode,{children:Object(s.jsx)(B,{})}),document.getElementById("root")),q()},60:function(t,e,n){},61:function(t,e,n){},92:function(t,e){},94:function(t,e){}},[[121,1,2]]]);
//# sourceMappingURL=main.5d9d2aaf.chunk.js.map