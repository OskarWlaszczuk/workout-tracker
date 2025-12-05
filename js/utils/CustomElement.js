const createCustomElement = (elementConfig) => {
    const element = document.createElement(elementConfig.name);

    if (elementConfig.contentText) {
        element.textContent = elementConfig.contentText;
    }

    elementConfig.attributes?.forEach(attribute => {
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

    render(parentElement) {
        parentElement.appendChild(this.element);
        return this;
    }

    addContent(childrenElements) {
        childrenElements.forEach(child => {
            this.element.appendChild(child);
        });

        return this;
    }
};