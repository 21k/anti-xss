var tool={};
module.exports=tool;
       
/**
 *
 * @param str - 编码html
 */
tool.en = function(str) {
    str = (str || '').toString();
    var character = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        '\'': '&#039;'
    };
    return function() {
        return str.replace(/[<>&"']/g, function(c) {
            return character[c];
        });
    }();
};

/**
 * @param htmlStr string
 * @param whiteTags optional String 'a div p span'
 * @param spliter optional String ' '
 */
tool.secHtml = function(htmlStr, whiteTags, spliter) {
    var rootTagName = Math.random().toString(36).replace('0.', 'random');
    var dom = (new DOMParser)
        .parseFromString('<' + rootTagName + '>' + (htmlStr || '') + '</' + rootTagName + '>', 'text/html')
        .getElementsByTagName(rootTagName)[0];
    var attrFilterRules = [
        {
            name: 'rull-style',
            attrs: ['style'],
            reg: /expression\(.*\)/i,
            replaceValue: ''

        },
        {
            name: 'rull-href',
            attrs: ['src', 'href'],
            reg: /^(javascript|vbscript|jscript|ecmascript):|data:text\/html/i,
            replaceValue: ''

        },
        {
            name: 'rule-onevent',
            attrs: (function() {
                var tags = [];
                for (var attr in dom) {
                    if (attr.indexOf('on') === 0) {
                        tags.push(attr);
                    }
                }
                return tags;
            })(),
            replaceValue: ''

        }
    ];
    if (spliter === void 0) {
        spliter = /\s+/g;
    }
    if (whiteTags === void 0) {
        whiteTags = ['A', 'ADDRESS', 'B', 'BIG', 'BLOCKQUOTE', 'BR', 'CAPTION', 'CENTER', 'CITE', 'CODE', 'DD',
            'DEL', 'DIV', 'DL', 'DT', 'EM', 'FONT', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'HR', 'I', 'IMG', 'KBD',
            'LI', 'NOBR', 'OL', 'P', 'PRE', 'S', 'SECTION', 'SMALL', 'SPAN', 'STRIKE', 'STRONG', 'STRONG', 'SUB',
            'SUP', 'SVG', 'TABLE', 'TBODY', 'TD', 'TFOOT', 'TH', 'THEAD', 'TR', 'U', 'UL', 'VAR'];
    } else {
        whiteTags = whiteTags.split(spliter).map(function(tag) {
            return tag.toUpperCase();
        });
    }
    var toArray = function(obj) {
        return [].slice.apply(obj);
    };
    toArray(dom.querySelectorAll('*')).forEach(function(node, i) {
        if (whiteTags.indexOf(node.tagName) > -1) {
            toArray(node.attributes).forEach(function(attr) {
                attrFilterRules.some(function(rule) {
                    var tagMatched = rule.attrs.indexOf(attr.nodeName) > -1;
                    if (tagMatched) {
                        if ((rule.reg && rule.reg.test(attr.nodeValue.replace(/\s/g, ''))) || !rule.reg) {
                            attr.nodeValue = rule.replaceValue;
                        }
                    }
                    return tagMatched;
                });
            });
        } else {
            node.outerHTML = tool.en(node.outerHTML);
        }
    });
    return dom.innerHTML;
};
