class ReferenceModelElement {
    public "ID" : string;
    public "Klassifizierung" : string;	
    public "Typ" : string;
    public "Geschoss" : string;	
    public "Lage" : string;
    public "Dämmperimeter" : string;	
    public "Ausrichtung" : string;	
    public "Unter_Terrain" : string;	
    public "Tiefe_UT" : string;	
    public "Brutto_Fläche" : string;	
    public "Netto_Fläche" : string;	
    public "Fläche_Öffnungen" : string;	
    public "Breite_FT" : string;	
    public "Höhe_FT" : string;
    
    public fillFromCsvRow(source: any) {
        Object.assign(this, source);
    }
}

export default ReferenceModelElement;