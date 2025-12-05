const createCustomElement = ({ name, content, attributes }) => {
    const element = document.createElement(name);

    if (content.length) {
        element.append([...content])
    }

    // if (elementConfig.contentText) {
    //     element.textContent = elementConfig.contentText;
    // }

    attributes?.forEach(attribute => {
        element.setAttribute(attribute.name, attribute.value);
    });

    return element;
};

//do generowania custom elementów
export class CustomElement {
    constructor(elementConfig) {
        //wywołanie generateHtmlElement doda do prop 
        // element gotowy obiekt elementu HTML
        this.element = createCustomElement(elementConfig);
    }

    // render(parentElement) {
    //     parentElement.appendChild(this.element);
    //     return this;
    // }

    // addContent(childrenElements) {
    //     //użyć pojedynczej metody append + pozwolić, aby childrenElement mogło być typu string
    //     childrenElements.forEach(child => {
    //         this.element.appendChild(child);
    //     });

    //     return this;
    // }
};