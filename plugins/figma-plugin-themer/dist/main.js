!function(){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */function t(t,n,e,i){return new(e||(e=Promise))((function(o,c){function u(t){try{f(i.next(t))}catch(t){c(t)}}function a(t){try{f(i.throw(t))}catch(t){c(t)}}function f(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(u,a)}f((i=i.apply(t,n||[])).next())}))}figma.showUI(__html__,{width:240,height:200}),figma.ui.onmessage=n=>t(void 0,void 0,void 0,(function*(){"apply-theme"===n.type&&(yield function(n,e){return t(this,void 0,void 0,(function*(){console.log("apply-theme",n,e)}))}(n.message.theme,n.message.target))}))}();
