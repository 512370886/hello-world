编码函数 escape  encodeURI  encodeURIComponent  对应解码函数  unescape  decodeURI  decodeURIComponent

 

escape()：

采用unicode字符集对指定的字符串除0-255以外进行编码。所有的空格符、标点符号、特殊字符以及更多有联系非ASCII字符都将被转化成%xx格式的字符编码(xx等于该字符在字符集表里面的编码的16进制数字) 比如: 空格符对应的编码是%20。

该方法不会对 ASCII 字母和数字进行编码(0-9，a-z，A-Z)，也不会对下面这些 ASCII 标点符号进行编码： * @ - _ + . / 。其他所有的字符都会被转义序列替换。

也就是说escape不编码字符有69个：*，+，-，.，/，@，_，0-9，a-z，A-Z

 

encodeURI()：

采用UTF-8编码格式把字符串作为 URI 进行编码。 该方法不会对 ASCII 字母和数字进行编码(0-9，a-z，A-Z)，也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 

该方法的目的是对 URI 进行完整的编码，因此对以下在 URI 中具有特殊含义的 ASCII 标点符号，encodeURI() 函数是不会进行转义的：;/?:@&=+$,#

也就是说encodeURI不编码字符有82个：!，#，$，&，'，(，)，*，+，,，-，.，/，:，;，=，?，@，_，~，0-9，a-z，A-Z

提示：如果 URI 组件中含有分隔符，比如 ? 和 #，则应当使用 encodeURIComponent() 方法分别对各组件进行编码。

 

encodeURIComponent() ：

采用UTF-8编码格式把字符串作为 URI 组件进行编码。

该方法不会对 ASCII 字母和数字进行编码(0-9，a-z，A-Z)，也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 

其他字符（比如 ：;/?:@&=+$,# 这些用于分隔 URI 组件的标点符号），都是由一个或多个十六进制的转义序列替换的。

也就是说encodeURIComponent不编码字符有71个：!， '，(，)，*，-，.，_，~，0-9，a-z，A-Z

提示：请注意 encodeURIComponent() 函数 与 encodeURI() 函数的区别之处，前者假定它的参数是 URI 的一部分（比如协议、主机名、路径或查询字符串）。因此 encodeURIComponent() 函数将转义用于分隔 URI 各个部分的标点符号。

 

注意： encodeURI和encodeURIComponent会把字符串编码成UTF-8的格式。

 

总结：

1 传递参数时 使用 encodeURIComponent

2 进行url跳转时可以整体使用encodeURI

3 js使用数据时使用escape