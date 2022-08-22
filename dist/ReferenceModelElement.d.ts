declare class ReferenceModelElement {
    "ID": string;
    "Klassifizierung": string;
    "Typ": string;
    "Geschoss": string;
    "Lage": string;
    "Dämmperimeter": string;
    "Ausrichtung": string;
    "Unter_Terrain": string;
    "Tiefe_UT": string;
    "Brutto_Fläche": string;
    "Netto_Fläche": string;
    "Fläche_Öffnungen": string;
    "Breite_FT": string;
    "Höhe_FT": string;
    fillFromCsvRow(source: any): void;
}
export default ReferenceModelElement;
