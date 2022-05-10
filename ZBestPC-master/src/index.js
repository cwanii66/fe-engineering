import './css/public.css';
import './css/index.css';

import 'jquery';
import './js/public';
import './js/nav';

// treeshaking触发条件
// 1. 通过解构获取方法，可以触发treeshaking
// 2. 调用的npm包必须使用ESM规范  ！！
import { get } from 'lodash-es';

// import _ from 'lodash';
// console.log(get({ a: 1 }, 'a'));