class ModelImportElement {
    constructor() {
        this["GlobalId"] = "";
        this["Bauteil ID"] = "";
        this["Element ID"] = "";
        this["Element Type"] = "";
        this["Bauteil Enerweb"] = "";
        this["Gebäude"] = "";
        this["Lage"] = "";
        this["Berechnete Fläche (NRF)"] = "";
        this["Netto-Oberflächenbereich Oberseite"] = "";
        this["Brutto-Oberflächenbereich der Deckenunterseite"] = "";
        this["Brutto-Wandoberflächenbereich an der Außenseite"] = "";
        this["F/T Oberfläche der Öffnung auf der Anschlagseite"] = "";
        this["Analytische Oberfläche der Öffnungen an der Innenseite"] = "";
        this["Schale/Dach Öffnungsfläche"] = "";
        this["Höhe"] = "";
        this["Breite"] = "";
        this["Tiefe_UT"] = "";
        this["Regulierung"] = "";
        this["Bauweise"] = "";
        this["Umbau-Status"] = "";
        this["Element beheizt"] = "";
        this["Raumkategorie"] = "";
        this["Raumzonen"] = "";
        this["Zugehöriger Raumname"] = "";
        this["Unter Terrain"] = "";
        this["Dämmperimeter"] = "";
        this["Verschattungsfaktor 1 Horizont"] = "";
        this["Verschattungsfaktor 2 Überhang"] = "";
        this["Verschattungsfaktor 3 Seitenblende"] = "";
        this["Ausrichtung"] = "";
        this["Wärmebrücke"] = "";
        this["Länge Wärmebrücke"] = "";
        this["Anzahl Wärmebrücke"] = "";
        this["Chi/Psi-Wert"] = "";
        this["b-Wert (Wärmebrücke)"] = "";
    }
    fillFromCsvRow(source) {
        Object.assign(this, source);
    }
    fill(referenceModelRow, productElement) {
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
        this.Dämmperimeter = referenceModelRow.Dämmperimeter;
        this["Unter Terrain"] = referenceModelRow.Unter_Terrain;
        this.Tiefe_UT = referenceModelRow.Tiefe_UT;
        this["Bauteil ID"] = productElement.ID;
        this["Element ID"] = productElement.ID;
    }
    fillFromShadingFactors(shadingFactorElements) {
        for (const shadingFactorsElement of shadingFactorElements) {
            if (this.GlobalId == shadingFactorsElement.GlobalId) {
                Object.assign(this, shadingFactorElements);
            }
        }
    }
    fillFromOverrides(overrides) {
        for (const override of overrides) {
            const overrideObj = { [override.property]: override.value };
            Object.assign(this, overrideObj);
        }
    }
}
export default ModelImportElement;
//# sourceMappingURL=ModelImportElement.js.map