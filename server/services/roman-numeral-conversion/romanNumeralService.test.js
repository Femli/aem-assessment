import RomanNumeralService from "./romanNumeralService.js";

describe("romanNumeralService Class", () => {
    let conversionService;
    beforeEach(() => {
        conversionService = new RomanNumeralService();
    });
    afterEach(() => {
        conversionService = null;
    });
    describe("converter() Method", () => {
        test.each([
            ['1', 'I'], //lower limit
            ['2', 'II'],
            ['3', 'III'],
            ['4', 'IV'],
            ['5', 'V'],
            ['6', 'VI'],
            ['7', 'VII'],
            ['8', 'VIII'],
            ['9', 'IX'],
        ])("should convert single-digit numbers correctly: %s to %s", (inputTest, expected) => {
            const result = conversionService.converter(inputTest);
            expect(result).toBe(expected);
        });
        test.each([
            ['10', 'X'],
            ['20', 'XX'],
            ['30', 'XXX'],
            ['40', 'XL'],
            ['50', 'L'],
            ['60', 'LX'],
            ['70', 'LXX'],
            ['80', 'LXXX'],
            ['90', 'XC'],
        ])("should convert double-digit numbers correctly: %s to %s", (inputTest, expected) => {
            const result = conversionService.converter(inputTest);
            expect(result).toBe(expected);
        });
        test.each([
            ['100', 'C'],
            ['200', 'CC'],
            ['300', 'CCC'],
            ['400', 'CD'],
            ['500', 'D'],
            ['600', 'DC'],
            ['700', 'DCC'],
            ['800', 'DCCC'],
            ['900', 'CM'],
        ])("should convert triple-digit numbers correctly: %s to %s", (inputTest, expected) => {
            const result = conversionService.converter(inputTest);
            expect(result).toBe(expected);
        });
        test.each([
            ['1000', 'M'],
            ['2000', 'MM'],
            ['3000', 'MMM'],
            ['3999', 'MMMCMXCIX'], //upper-limit
        ])("should convert quadruple-digit numbers correctly: %s to %s", (inputTest, expected) => {
            const result = conversionService.converter(inputTest);
            expect(result).toBe(expected);
        });
    });
});