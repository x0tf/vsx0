module.exports=(()=>{var e={844:(e,t,n)=>{const o=n(311);e.exports=(e,t)=>new o(e,t)},311:(e,t,n)=>{const o=n(622),s=n(605),r=n(211),i=n(191),a=n(761),{URL:c}=n(835),u=n(58);e.exports=class{constructor(e,t="GET"){return this.url="string"==typeof e?new c(e):e,this.httpMethod=t,this.data=null,this.sendDataAs=null,this.reqHeaders={},this.streamEnabled=!1,this.compressionEnabled=!1,this.coreOptions={},this}query(e,t){return"object"==typeof e?Object.keys(e).forEach((t=>{this.url.searchParams.append(t,e[t])})):this.url.searchParams.append(e,t),this}path(e){return this.url.pathname=o.join(this.url.pathname,e),this}body(e,t){return this.sendDataAs="object"!=typeof e||t||Buffer.isBuffer(e)?t?t.toLowerCase():"buffer":"json",this.data="form"===this.sendDataAs?i.stringify(e):"json"===this.sendDataAs?JSON.stringify(e):e,this}header(e,t){return"object"==typeof e?Object.keys(e).forEach((t=>{this.reqHeaders[t.toLowerCase()]=e[t]})):this.reqHeaders[e.toLowerCase()]=t,this}method(e){return this.httpMethod=e,this}timeout(e){return this.coreOptions.timeout=e,this}async json(){return(await this.send()).json}async raw(){return(await this.send()).body}async text(){return(await this.send()).text}send(){return new Promise(((e,t)=>{this.data&&(this.reqHeaders.hasOwnProperty("content-type")||("json"===this.sendDataAs?this.reqHeaders["content-type"]="application/json":"form"===this.sendDataAs&&(this.reqHeaders["content-type"]="application/x-www-form-urlencoded")),this.reqHeaders.hasOwnProperty("content-length")||(this.reqHeaders["content-length"]=Buffer.byteLength(this.data)));const n={protocol:this.url.protocol,host:this.url.hostname,port:this.url.port,path:this.url.pathname+this.url.search,method:this.httpMethod,headers:this.reqHeaders,...this.coreOptions};let o;const i=n=>{let o,s=n;this.compressionEnabled&&("gzip"===n.headers["content-encoding"]?s=n.pipe(a.createGunzip()):"deflate"===n.headers["content-encoding"]&&(s=n.pipe(a.createInflate()))),this.streamEnabled?e(s):(o=new u(n),s.on("error",(e=>{t(e)})),s.on("data",(e=>{o._addChunk(e)})),s.on("end",(()=>{e(o)})))};if("http:"===this.url.protocol)o=s.request(n,i);else{if("https:"!==this.url.protocol)throw new Error(`Bad URL protocol: ${this.url.protocol}`);o=r.request(n,i)}o.on("error",(e=>{t(e)})),this.data&&o.write(this.data),o.end()}))}}},58:e=>{e.exports=class{constructor(e){this.coreRes=e,this.body=Buffer.alloc(0),this.headers=e.headers,this.statusCode=e.statusCode}_addChunk(e){this.body=Buffer.concat([this.body,e])}get json(){return JSON.parse(this.body)}get text(){return this.body.toString()}}},114:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function i(e){try{c(o.next(e))}catch(e){r(e)}}function a(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(700),r=n(487),i=n(976);t.default=(e,t,n,a="")=>o(void 0,void 0,void 0,(function*(){let o=s.default.createNewPaste.replace("%%namespace%%",e);""!==a&&(o=o+"/"+a);const c=yield r.default.POST(o,t,{key:"content",value:n});!c.error&&c.data?i.default.success(`Heres your link: ${s.default.baseUrl}/${e}/${c.data.key}`):i.default.warn("Something went wrong, please try again.")}))},112:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function i(e){try{c(o.next(e))}catch(e){r(e)}}function a(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.deactivate=t.activate=void 0;const s=n(447),r=n(114),i=n(470),a=n(225),c=n(816),u=n(636),d=n(549),l=n(976);t.activate=function(e){return o(this,void 0,void 0,(function*(){console.log('Congratulations, your extension "vsx0" is now active!');const t=d.commands.registerCommand("vsx0.paste",(()=>o(this,void 0,void 0,(function*(){const t=d.window.activeTextEditor;if(!t)return void l.default.error("No Editor open at the moment as it seems");const n=t.document.getText(t.selection);if(!n)return l.default.warn("No text selected");const o=yield e.secrets.get("x0_tokens");if(o){const t=JSON.parse(o),l=[];Object.keys(t).forEach((e=>l.push(e))),l.push("> Register a new namespace (Requires invite)","> Submit a new namespace and save it in memory.","> Modify an existing namespace (eg. when your token has changed)","> Reset token for existing namespace (if your token ever gets compromised)","> Delete an existing namespace (Does not delete the namespace from the server!)");const f=yield d.window.showQuickPick(l,{placeHolder:"Pick which namespace you want to use"});if(!f)return;if(f.includes("> Delete an existing namespace"))return yield s.default(e);if(f.includes("> Reset token"))return yield i.default(e);if(f.includes("> Modify an"))return yield u.default(e);if(f.includes("> Register"))return yield c.default(e);if(f.startsWith("> Submit a"))return yield a.default(e);const h=yield d.window.showInputBox({prompt:"Do you want to use a custom key for this paste? If so enter it now. If not just cancel this input",placeHolder:'"github" or "readme"for example.'});yield r.default(f,t[f],n,h)}else{l.default.warn("I was unable to find any saved namespaces.");const t=yield d.window.showQuickPick(["Register new namespace","Submit already existing namespace and token"]);t&&(t.startsWith("Submit")?yield a.default(e):t.startsWith("Register")&&(yield c.default(e)))}}))));e.subscriptions.push(t)}))},t.deactivate=function(){}},447:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function i(e){try{c(o.next(e))}catch(e){r(e)}}function a(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(635),r=n(549),i=n(976);t.default=e=>o(void 0,void 0,void 0,(function*(){const t=yield s.default.getAll(e),n=yield r.window.showQuickPick(Object.keys(t),{placeHolder:"Pick what namespace to delete from memory (will not be deleted from the server!)"});n&&(yield s.default.delete(e,n),i.default.success(`Deleted "${n}" from memory.`))}))},636:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function i(e){try{c(o.next(e))}catch(e){r(e)}}function a(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(635),r=n(549),i=n(976);t.default=e=>o(void 0,void 0,void 0,(function*(){const t=yield s.default.getAll(e),n=yield r.window.showQuickPick(Object.keys(t),{placeHolder:"Pick what namespace to modify"});if(!n)return;const o=yield r.window.showInputBox({prompt:`Enter the new token for "${n}"`,placeHolder:"asrighbaeeeehgkjalhgujgeruihjĝreuhgfre"});o&&(yield s.default.set(e,n,o),i.default.success(`Updated "${n}" and saved the new token`))}))},816:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function i(e){try{c(o.next(e))}catch(e){r(e)}}function a(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(635),r=n(549),i=n(700),a=n(487),c=n(976);t.default=e=>o(void 0,void 0,void 0,(function*(){const t=yield r.window.showInputBox({prompt:"Enter your desired name for the namespace now",placeHolder:'"vsx0"for example'});if(!t)return;const n=yield r.window.showInputBox({prompt:"Enter your invite. This is required to register a namespace."});if(!n)return;console.log(t,n);const o=yield a.default.POST(i.default.register.replace("%%namespace%%",t),"",{key:"invite",value:n});console.log(o),!o.data.error&&o.data.token&&(yield s.default.set(e,t,o.data.token),c.default.success(`Registered and saved "${t}" for you. Heres the token: "${o.data.token}" (Save it well!)`))}))},470:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function i(e){try{c(o.next(e))}catch(e){r(e)}}function a(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(635),r=n(549),i=n(700),a=n(487),c=n(976);t.default=e=>o(void 0,void 0,void 0,(function*(){const t=yield s.default.getAll(e),n=yield r.window.showQuickPick(Object.keys(t),{placeHolder:"Pick the namespace to reset"});if(!n)return;const o=yield a.default.POST(i.default.resetToken.replace("%%namespace%%",n),t[n],{});!o.error&&o.data.token&&(yield s.default.set(e,n,o.data.token),c.default.success(`Reset the namespace "${n}" for you. Heres the new token: "${o.data.token}"`))}))},225:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function i(e){try{c(o.next(e))}catch(e){r(e)}}function a(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(635),r=n(549),i=n(976);t.default=e=>o(void 0,void 0,void 0,(function*(){const t=yield r.window.showInputBox({prompt:"Enter your already existing namespace",placeHolder:"example"});if(!t)return;const n=yield r.window.showInputBox({prompt:"Enter the token now, it will look something like this: ",placeHolder:"fbaelzugfjwnwara7z4hg89guab4-afrg7euj4e.awf7gzb"});if(n)try{yield s.default.set(e,t,n),i.default.success(`Saved the namespace "${t}"!`)}catch(e){i.default.error("Something went wrong while trying to save your namespace, please try again.")}}))},700:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={baseUrl:"https://x0.tf/",register:"https://api.x0.tf/v1/namespaces/%%namespace%%",resetToken:"https://api.x0.tf/v1/namespaces/%%namespace%%/resetToken",createNewPaste:"https://api.x0.tf/v1/elements/%%namespace%%/paste"}},635:function(e,t){"use strict";var n=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function i(e){try{c(o.next(e))}catch(e){r(e)}}function a(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o={get:(e,t)=>n(void 0,void 0,void 0,(function*(){const n=yield e.secrets.get("x0_tokens");n&&(yield JSON.parse(n)[t])})),getAll:e=>n(void 0,void 0,void 0,(function*(){const t=yield e.secrets.get("x0_tokens");t&&(yield JSON.parse(t))})),set:(e,t,o)=>n(void 0,void 0,void 0,(function*(){const n=yield e.secrets.get("x0_tokens");if(n){const s=JSON.parse(n);return s[t]=o,yield e.secrets.delete("x0_tokens"),e.secrets.store("x0_tokens",JSON.stringify(s))}{const n={};return n[t]=o,e.secrets.store("x0_tokens",JSON.stringify(n))}})),delete:(e,t)=>n(void 0,void 0,void 0,(function*(){const n=yield e.secrets.get("x0_tokens");if(n){const o=JSON.parse(n);delete o[t];try{yield e.secrets.store("x0_tokens",JSON.stringify(o))}catch(e){return!1}return!0}return!1})),deleteAll:e=>n(void 0,void 0,void 0,(function*(){return e.secrets.delete("x0_tokens")}))};t.default=o},487:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,r){function i(e){try{c(o.next(e))}catch(e){r(e)}}function a(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=n(844),r={error:!1},i={POST:(e,t,{key:n,value:i})=>o(void 0,void 0,void 0,(function*(){console.log(e,t);const o={};o[n]=i;try{const n=yield s(e,"POST").header("Authorization","Bearer "+t).body(o,"json").send();return r.data=JSON.parse(n.body.toString()),r}catch(e){return console.error(e),r.error=!0,r.errortrace=e,r.errormsg=e.toString(),r}}))};t.default=i},976:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(549),s={info:e=>o.window.showInformationMessage(e),warn:e=>o.window.showWarningMessage(e),error:e=>o.window.showErrorMessage(e),success:e=>o.window.showInformationMessage("✅ "+e)};t.default=s},605:e=>{"use strict";e.exports=require("http")},211:e=>{"use strict";e.exports=require("https")},622:e=>{"use strict";e.exports=require("path")},191:e=>{"use strict";e.exports=require("querystring")},835:e=>{"use strict";e.exports=require("url")},549:e=>{"use strict";e.exports=require("vscode")},761:e=>{"use strict";e.exports=require("zlib")}},t={};return function n(o){if(t[o])return t[o].exports;var s=t[o]={exports:{}};return e[o].call(s.exports,s,s.exports,n),s.exports}(112)})();