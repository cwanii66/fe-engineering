var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { ButtonX } from "./Button";

var _window$React = window.React,
    useState = _window$React.useState,
    useEffect = _window$React.useEffect;

var createElement = window.React.createElement;

function ChapterX() {
  return React.createElement(
    "div",
    null,
    "this is chapter"
  );
}

function Container() {
  var _useState = useState("chris"),
      _useState2 = _slicedToArray(_useState, 2),
      name = _useState2[0],
      setName = _useState2[1];

  var _useState3 = useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      init = _useState4[0],
      setInit = _useState4[1];

  useEffect(function () {
    if (!init) {
      // console.log('init', init);
      setName("chriswong");
      setInit(true);
    }
  }, [init]);
  return React.createElement(
    "div",
    { onClick: function onClick() {
        return setInit(false);
      } },
    React.createElement(
      "div",
      null,
      "hello ",
      name
    ),
    React.createElement(ButtonX, null),
    React.createElement(ChapterX, null)
  );
}
// 3. 生成vdom
var container = document.querySelector("#container");
var root = window.ReactDOM.createRoot(container);
var vdom = createElement(Container);
// 4. 渲染vdom
root.render(vdom);