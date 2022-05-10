import './css/public.css';
import './css/index.css';

import 'jquery';
import './js/public';
import './js/nav';

import { get } from 'lodash-es';

console.log(get({a:1}, 'a'));





// treeshaking触发条件
// 1. 通过解构获取方法，可以触发treeshaking
// 2. 调用的npm包必须使用ESM规范  ！！(可以静态分析)
// 3. mode = production 才会同文件treeshaking
// 4. 一定注意解构