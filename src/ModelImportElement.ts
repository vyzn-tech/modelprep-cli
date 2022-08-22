import OverrideElement from "./OverrideElement";
import ProductElement from "./ProductElement";
import ReferenceModelElement from "./ReferenceModelElement";
import ShadingFactorsElement from "./ShadingFactorsElement";

class ModelImportElement {
    public "GlobalId": string = "";
    public "Bauteil ID": string = "";
    public "Element ID": string = "";
    public "Element Type": string = "";	
    public "Bauteil Enerweb": string = "";
    public "Gebäude" : string = "";
    public "Ursprungsgeschoss Nummer" : string;
    public "Lage"	 : string = "";
    public "Berechnete Fläche (NRF)"	 : string = "";
    public "Netto-Oberflächenbereich Oberseite" : string = "";
    public "Brutto-Oberflächenbereich der Deckenunterseite"	 : string = "";
    public "Brutto-Wandoberflächenbereich an der Außenseite"	 : string = "";
    public "F/T Oberfläche der Öffnung auf der Anschlagseite"	 : string = "";
    public "Analytische Oberfläche der Öffnungen an der Innenseite"	 : string = "";
    public "Schale/Dach Öffnungsfläche" : string = "";
    public "Höhe"	 : string = "";
    public "Breite" : string = "";
    public "Tiefe_UT": string = "";
    public "Regulierung" : string = "";
    public "Bauweise"	 : string = "";
    public "Umbau-Status"	 : string = "";
    public "Element beheizt"	 : string = "";
    public "Raumkategorie"	 : string = "";
    public "Raumzonen"	 : string = "";
    public "Zugehöriger Raumname" : string = "";	
    public "Unter Terrain"	 : string = "";
    public "Dämmperimeter"	 : string = "";
    public "Verschattungsfaktor 1 Horizont"  : string = "";
    public "Verschattungsfaktor 2 Überhang" : string = ""; 
    public "Verschattungsfaktor 3 Seitenblende"  : string = "";
    public "Ausrichtung"	 : string = "";
    public "Wärmebrücke"	 : string = "";
    public "Länge Wärmebrücke"	 : string = "";
    public "Anzahl Wärmebrücke"	 : string = "";
    public "Chi/Psi-Wert"	 : string = "";
    public "b-Wert (Wärmebrücke)" : string = "";

    public fillFromCsvRow(source: any) {
        this.assignExistingProperties(source);
    }

    public fill(referenceModelRow : ReferenceModelElement, productElement : ProductElement) {
        this.GlobalId = referenceModelRow.ID;
        this["Element Type"] = referenceModelRow.Klassifizierung;
        this["Bauteil Enerweb"] = referenceModelRow.Klassifizierung;
        this["Ursprungsgeschoss Nummer"] = referenceModelRow.Geschoss;
        this.Lage = referenceModelRow.Lage;
        this.Höhe = referenceModelRow.Höhe_FT;
        this.Breite = referenceModelRow.Breite_FT;
        this["Netto-Oberflächenbereich Oberseite"] = referenceModelRow.Brutto_Fläche;
        this["Brutto-Wandoberflächenbereich an der Außenseite"] = referenceModelRow.Netto_Fläche;
        this["Analytische Oberfläche der Öffnungen an der Innenseite"] = referenceModelRow.Fläche_Öffnungen;
        this["Brutto-Oberflächenbereich der Deckenunterseite"] = referenceModelRow.Brutto_Fläche;
        this["F/T Oberfläche der Öffnung auf der Anschlagseite"] = referenceModelRow.Brutto_Fläche;
        this.Ausrichtung = referenceModelRow.Ausrichtung;
        //this["Umbau-Status"] = referenceModelRow.Umbaustatus
        //this.Raumzonen = referenceModelRow.Raumzonen;
        this.Dämmperimeter = referenceModelRow.Dämmperimeter;
        this["Unter Terrain"] = referenceModelRow.Unter_Terrain;
        this.Tiefe_UT = referenceModelRow.Tiefe_UT;

        this["Bauteil ID"] = productElement.ID;
        this["Element ID"] = productElement.ID;
    }

    public fillFromShadingFactors(shadingFactorElements: Array<ShadingFactorsElement>) {
        for(const shadingFactorsElement of shadingFactorElements) {
            if(this.GlobalId == shadingFactorsElement.GlobalId) {
                this.assignExistingProperties(shadingFactorElements);
            }
        }
    }

    public fillFromOverrides(overrides: Array<OverrideElement>) {
        for(const override of overrides) {
            const overrideObj = { [override.property] : override.value };
            this.assignExistingProperties(overrideObj);
        }
    }

    private assignExistingProperties(source: any) {
        var self : any = this;
        Object.keys(source).forEach(function(key) {
            if (self.hasOwnProperty(key)) {
                self[key] = source[key];
            }
        });
    }
}

export default ModelImportElement;