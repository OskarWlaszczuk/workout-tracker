export const generateHtmlElement = (elementConfig) => {
    const element = document.createElement(elementConfig.name);

    if (elementConfig.contentText) {
        element.textContent = elementConfig.contentText;
    }

    elementConfig.attributes?.forEach(attribute => {
        element.setAttribute(attribute.name, attribute.value);
    });

    elementConfig.children?.forEach(child => {
        element.appendChild(child)
    });

    return element;
};