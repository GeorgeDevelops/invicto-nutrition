import massgainer from "./../images/demo/mass-gainer.png";
import bcaa from "./../images/demo/bcaa.png";
import ruleone from "./../images/demo/rule-one.png";
import nitrotech from "./../images/demo/nitrotech.png";
import whey from "./../images/demo/body-fortress.png";
import atlas from "./../images/demo/atlas-gainer.png";
import c4 from "./../images/demo/c4.png";

export const products = [
    { _id: Math.random() * 999, name: "Super Mass Gainer", brand: { id: 5, name: "dymatize" }, image: [massgainer, nitrotech], stock: 5, price: 3_900, mass_unit: { amount: 12, measure: "Lb" }, category: { id: 11, name: "aumento de peso" } },
    { _id: Math.random() * 999, name: "BCAA Amino acidos", brand: { id: 9, name: "muscle pharm" }, image: [bcaa], stock: 0, price: 1_500, mass_unit: { amount: 60, measure: "Servidas" }, category: { id: 2, name: "aminoacidos" } },
    { _id: Math.random() * 999, name: "rule 1 R1 whey blend", brand: { id: 4, name: "rule 1 proteins" }, image: [ruleone], stock: 5, price: 2600, mass_unit: { amount: 6, measure: "Lb" }, category: { id: 11, name: "aumento de peso" } },
    { _id: Math.random() * 999, name: "Super Mass Gainer", brand: { id: 5, name: "dymatize" }, image: [massgainer], stock: 5, price: 3_900, mass_unit: { amount: 12, measure: "Lb" }, category: { id: 11, name: "aumento de peso" } },
    { _id: Math.random() * 999, name: "BCAA Amino acidos", brand: { id: 9, name: "muscle pharm" }, image: [bcaa], stock: 0, price: 1_500, mass_unit: { amount: 60, measure: "Servidas" }, category: { id: 2, name: "aminoacidos" } },
    { _id: Math.random() * 999, name: "rule 1 R1 whey blend", brand: { id: 4, name: "rule 1 proteins" }, image: [ruleone], stock: 5, price: 2600, mass_unit: { amount: 6, measure: "Lb" }, category: { id: 11, name: "aumento de peso" } },
    { _id: Math.random() * 999, name: "nitrotech ripped", brand: { id: 3, name: "muscletech" }, image: [nitrotech], stock: 0, price: 3_700, mass_unit: { amount: 4, measure: "Lb" }, category: { id: 13, name: "perdida de peso" } },
    { _id: Math.random() * 999, name: "whey protein", brand: { id: 8, name: "body fortress" }, image: [whey], stock: 1, price: 2_600, mass_unit: { amount: 2, measure: "Lb" }, category: { id: 12, name: "aumento masa muscular" } },
    { _id: Math.random() * 999, name: "whey protein", brand: { id: 8, name: "body fortress" }, image: [whey], stock: 1, price: 2_600, mass_unit: { amount: 2, measure: "Lb" }, category: { id: 12, name: "aumento masa muscular" } },
    { _id: Math.random() * 999, name: "Atlas Gainer", brand: { id: 16, name: "patriot nutrition" }, image: [atlas], stock: 6, price: 2_400, mass_unit: { amount: 8, measure: "Lb" }, category: { id: 11, name: "aumento de peso" } },
    { _id: Math.random() * 999, name: "C4 sport pre-workout", brand: { id: 7, name: "cellucor" }, image: [c4], stock: 3, price: 1_800, mass_unit: { amount: 60, measure: "Servidas" }, category: { id: 17, name: "preworkout" } },
    { _id: Math.random() * 999, name: "Protein shaker", brand: { id: 0, name: "accesorios" }, image: [c4], stock: 3, price: 200, mass_unit: { amount: 170, measure: "OZ" }, category: { id: 1, name: "accesorios" } },
    { _id: Math.random() * 999, name: "Protein shaker", brand: { id: 0, name: "accesorios" }, image: [c4], stock: 3, price: 200, mass_unit: { amount: 170, measure: "OZ" }, category: { id: 1, name: "accesorios" } }
];

