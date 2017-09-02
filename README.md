# anti-xss
a client side richtext  xss filter  based on DOMParser


1、parse string to dom tree
```javascript
    var rootTagName = Math.random().toString(36).replace('0.', 'random');
    var dom = (new DOMParser)
        .parseFromString('<' + rootTagName + '>' + (htmlStr || '') + '</' + rootTagName + '>', 'text/html')
        .getElementsByTagName(rootTagName)[0];
```
2、use white tag lists and black attrributes lists
```javascript
var whiteTags = ['A', 'ADDRESS', 'B', 'BIG', 'BLOCKQUOTE', 'BR', 'CAPTION', 'CENTER', 'CITE', 'CODE', 'DD',
            'DEL', 'DIV', 'DL', 'DT', 'EM', 'FONT', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'HR', 'I', 'IMG', 'KBD',
            'LI', 'NOBR', 'OL', 'P', 'PRE', 'S', 'SECTION', 'SMALL', 'SPAN', 'STRIKE', 'STRONG', 'STRONG', 'SUB',
            'SUP', 'SVG', 'TABLE', 'TBODY', 'TD', 'TFOOT', 'TH', 'THEAD', 'TR', 'U', 'UL', 'VAR'];
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
```
