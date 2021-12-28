import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TypographyComponent } from './typography.component';
import { TypographyVariant, TypographyWeight } from './typography.type';

const variants: TypographyVariant[] = ['label', 'bg-label', 'sm-label', 'xsm-label'];
const weights: TypographyWeight[] = ['regular', 'semi-bold', 'bold'];

describe('TypographyComponent', () => {
  let spectator: Spectator<TypographyComponent>;
  const createComponent = createComponentFactory(TypographyComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should set custom color', () => {
    const expected = 'pink';
    spectator.setInput('color', expected);
    const typography = spectator.query('span');
    expect(typography).toHaveStyle({color: expected});
  })

  it('should set custom line-height', () => {
    const expected = '33px';
    spectator.setInput('lineHeight', expected);
    const typography = spectator.query('span');
    expect(typography).toHaveStyle({lineHeight: expected});
  })

  it('should set custom font-size', () => {
    const expected = '9px';
    spectator.setInput('fontSize', expected);
    const typography = spectator.query('span');
    expect(typography).toHaveStyle({fontSize: expected});
  })

  describe('Typography variant', () => {
    variants.forEach((variant) => it(`should render ${variant} variant` , () => {
      spectator.setInput('variant', variant);
      const typography = spectator.query('span');
      expect(typography).toHaveClass(variant);
    }))
  })

  describe('Font weight', () => {
    weights.forEach((weight) => it(`should render font with the ${weight} weight`, () => {
      spectator.setInput('fontWeight', weight);
      const typography = spectator.query('span');
      expect(typography).toHaveClass(weight)
    }))
  })
});
