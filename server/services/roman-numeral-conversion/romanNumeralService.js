class RomanNumeralService {
    #ArabicNumeral
    #RomanNumeral;
    #singleDigitMap = {
        '1': 'I',
        '2': 'II',
        '3': 'III',
        '5': 'V',
        '10': 'X',
    };
    #doubleDigitMap = {
        '1': 'X',
        '2': 'XX',
        '3': 'XXX',
        '5': 'L',
        '10': 'C'
    };
    #tripleDigitMap = {
        '1': 'C',
        '2': 'CC',
        '3': 'CCC',
        '5': 'D',
        '10': 'M'
    };
    #quadrupleDigitMap = {
        '1': 'M',
        '2': 'MM',
        '3': 'MMM',
        //only supporting up to 3999
    };
    #digitMapSelector = {
        '1': this.#singleDigitMap,
        '2': this.#doubleDigitMap,
        '3': this.#tripleDigitMap,
        '4': this.#quadrupleDigitMap
    };

    constructor() {
        this.#ArabicNumeral = null;
        this.#RomanNumeral = null;
    }

    converter(userInput) {
        this.#ArabicNumeral = String(userInput);
        this.#determineDigitMapper();
        return this.#RomanNumeral;
    }

    #determineDigitMapper() {
        const digits = this.#ArabicNumeral.length;
        this.#RomanNumeral = ''; //start with empty string for concatenation of digits
        for (let i = 0; i < digits; i++) {
            this.#RomanNumeral += this.#convertDigits(this.#digitMapSelector[digits - i], this.#ArabicNumeral[i]);
        }
    }

    #convertDigits(mapper, arabicNumber) {
        //first anything that's in the map
        if (Object.keys(mapper).includes(arabicNumber)) {
            return mapper[arabicNumber];
        } else if (['4', '9'].includes(arabicNumber)) {
            return mapper['1'] + mapper[`${parseInt(arabicNumber) + 1}`]
        } else if (['6', '7', '8'].includes(arabicNumber)) {
            return mapper['5'] + mapper[`${parseInt(arabicNumber) - 5}`]
        } else {
            return '';
        }
    }
}

export default RomanNumeralService;