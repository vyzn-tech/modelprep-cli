import ReferenceModelElement from "./ReferenceModelElement";
declare class ProductElement {
    ID: string;
    fill(source: ReferenceModelElement, productsMapping: {
        [key: string]: string;
    }): void;
}
export default ProductElement;
