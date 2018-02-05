import {should, expect} from 'chai';
should();
import {styleName} from './styleName';


describe('styleName', () => {

  it('should combine strings', () => {
    expect(styleName('chunkA', 'chunkB')).to.be.eq('chunkA-chunkB');
  });

  it('should combine tuples', () => {
    expect(
      styleName(['chunkA', true], ['chunkB', false], ['chunkC', true])
    ).to.be.eq('chunkA-chunkC');
  });

  it('should combine string and tuples', () => {
    expect(styleName('chunkA', ['chunkB', false], ['chunkC', true])).to.be.eq('chunkA-chunkC');
  });

  it('should return empty string when no valid chunk', () => {
    expect(styleName(['chunkA', false], ['', true], '')).to.be.eq('');
  });
});

