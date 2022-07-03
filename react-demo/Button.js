
export function ButtonX() {
    return React.createElement(
        "button",
        { onClick: function onClick() {
                return alert("click");
            } },
        "click me!"
    );
}