class OverrideElement {
    constructor() {
        this.property = "";
        this.value = "";
    }
    fillFromCsvRow(source) {
        Object.assign(this, source);
    }
}
export default OverrideElement;
//# sourceMappingURL=OverrideElement.js.map