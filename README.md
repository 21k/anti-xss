# anti-xss
a client side richtext  xss filter  based on jquery


```{typescript}
export function en(str) {
    str = (str || "").toString();
    const character = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return function () {
        return str.replace(/[<>&"']/g,
            function (c) {
                return character[c];
            }
        );
    }();
}


export function filterHtml(s, whiteTags = ["var","p", "div", "span", "img", "a", "strong", "em", "ol", "li", "i", "pre", "br", "sub", "sup", "ul", "section", "h1", "h2", "h3", "h4", "h5", "h6", "b", "u", "s", "del", "strong", "big", "small", "strike", "kbd", "code", "address", "cite", "dl", "dd", "dt", "caption", "font", "hr", "nobr", "center", "table","thead", "tfoot","tr", "td", "tbody", "th", "blockquote"]) {
    let $$ = window["jQuery"];
    let vDom = $$("<section>" + s + "</section>");
    let onEvent = /on(a(bort|fterprint)|b(eforeprint|eforeunload|lur)|c(anplay|anplaythrough|hange|lick|ontextmenu)|d(blclick|rag|ragend|ragenter|ragleave|ragover|ragstart|rop|urationchange)|e(mptied|nded|rror|rror)|f(ocus|ormchange|orminput)|h(aschange)|i(nput|nvalid)|k(eydown|eypress|eyup)|l(oad|oadeddata|oadedmetadata|oadstart)|m(essage|ousedown|ousemove|ouseout|ouseover|ouseup|ousewheel)|o(ffline|nline)|p(agehide|ageshow|ause|lay|laying|opstate|rogress)|r(atechange|eadystatechange|edo|eset|esize)|s(croll|eeked|eeking|elect|talled|torage|ubmit|uspend)|t(imeupdate)|u(ndo|nload)|v(olumechange)|w(aiting))/g;
    whiteTags = whiteTags.map(tag=>tag.toLowerCase());
    vDom.find("*").each((index, node)=> {
        if (whiteTags.indexOf(node.tagName.toLowerCase()) > -1) {
            $$(node.attributes).each((index, attr)=> {
                if (["src", "href"].indexOf(attr.nodeName) > -1) {
                    if (!/^(https?:\/\/|\/\/)/.test(attr.nodeValue)) {
                        attr.nodeValue = ""
                    }
                }
                if (onEvent.test(attr.nodeName)) {
                    attr.nodeValue = ""
                }
            })
        }
        else {
            node.outerHTML = en(node.outerHTML)
        }
    });
    return vDom.html()
}
```

