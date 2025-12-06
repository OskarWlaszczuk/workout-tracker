const createCustomElement = ({ name, content, attributes }) => {
    const element = document.createElement(name);

    if (content.length) {
        element.append(...content)
    }


    attributes?.forEach(attribute => {
        element.setAttribute(attribute.name, attribute.value);
    });

    return element;
};
export class CustomElement {
    constructor(elementConfig) {
        this.children = elementConfig.children
        this.element = createCustomElement({
            name: elementConfig.name,
            attributes: elementConfig.attributes,
            content: this.children.map(({ element }) => element)
        });
    }

    deleteChild(childId) {
        this.children = [
            ...this.children.filter(({ id }) => id !== childId),
        ]
    }

    editChildElement(childId, newChildElement) {
        const targetChildIndex = this.children.findIndex(({ id }) => id === childId);

        const updatedChild = {
            ...this.children.find(({ id }) => id === childId),
            element: newChildElement,
        };
        const childrenWithoutEditingChild = this.children.filter(({ id }) => id !== childId);

        const updatedChildren = [
            ...childrenWithoutEditingChild.slice(0, targetChildIndex),
            updatedChild,
            ...childrenWithoutEditingChild.slice(targetChildIndex)
        ];

        this.children = updatedChildren;
    }

    addChild(newContent) {
        console.log("adding child");

        this.element.append(...Array.from(this.element.children), newContent)

        return this
    }

    // addContent(childrenElements) {
    //     //użyć pojedynczej metody append + pozwolić, aby childrenElement mogło być typu string
    //     childrenElements.forEach(child => {
    //         this.element.appendChild(child);
    //     });

    //     return this;
    // }
};