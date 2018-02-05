import {expect} from 'chai';
import {pixelValue, valueFromPixel} from './pixelValue';


describe('pixelValue', () => {

  it('returns undefined when value is not defined', () => {
    expect(pixelValue(undefined)).to.be.undefined;
    expect(pixelValue(null)).to.be.undefined;
    expect(pixelValue(NaN)).to.be.undefined;
  });

  it('returns value + px', () => {
    expect(pixelValue(17)).to.be.eq('17px');
    expect(pixelValue(0)).to.be.eq('0px');
    expect(pixelValue(-1)).to.be.eq('-1px');
  });

  it('returns value + addition + px', () => {
    expect(pixelValue(17, 3)).to.be.eq('20px');
    expect(pixelValue(0, -4)).to.be.eq('-4px');
    expect(pixelValue(-1, 15)).to.be.eq('14px');
  });

});

describe('valueFromPixel', () => {

  it('returns 0 when the value is null or undefined', () => {
    expect(valueFromPixel(null)).to.be.eq(0);
    expect(valueFromPixel(undefined)).to.be.eq(0);
  });

  it('returns 0 if the string is NaN', () => {
    expect(valueFromPixel('px')).to.be.eq(0);
    expect(valueFromPixel(' ')).to.be.eq(0);
    expect(valueFromPixel('px10.5px')).to.be.eq(0);
  });

  it('returns float value of a string if it is neither NaN nor undefined nor null', () => {
    expect(valueFromPixel('10.5 px')).to.be.eq(10.5);
    expect(valueFromPixel('11.5px')).to.be.eq(11.5);
    expect(valueFromPixel('13  px')).to.be.eq(13);
  });

});
