class ProductElement {
    constructor() {
        this.ID = "";
    }
    fill(source, productsMapping) {
        this.ID = productsMapping[source.Typ];
        if (this.ID == undefined) {
            console.warn(`Could not map product with ID '${source.ID}' (Dämmperimeter=${source.Dämmperimeter})`);
            this.ID = source.Typ;
        }
    }
}
export default ProductElement;
//# sourceMappingURL=ProductElement.js.map