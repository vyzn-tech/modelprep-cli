class OverrideElement {
    public property : string = "";
    public value: string = "";
    
    public fillFromCsvRow(source: any) {
        Object.assign(this, source);
    }
}

export default OverrideElement;