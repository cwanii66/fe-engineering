import { ButtonX } from "./Button";

const { useState, useEffect } = window.React;
const createElement = window.React.createElement;

function ChapterX() {
  return <div>this is chapter</div>;
}

function Container() {
  const [name, setName] = useState("chris");
  const [init, setInit] = useState(true);
  useEffect(() => {
    if (!init) {
      // console.log('init', init);
      setName("chriswong");
      setInit(true);
    }
  }, [init]);
  return (
    <div onClick={() => setInit(false)}>
      <div>hello {name}</div>
      <ButtonX />
      <ChapterX />
    </div>
  );
}
// 3. 生成vdom
const container = document.querySelector("#container");
const root = window.ReactDOM.createRoot(container);
const vdom = createElement(Container);
// 4. 渲染vdom
root.render(vdom);
