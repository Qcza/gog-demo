import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ButtonComponent } from './button.component';
import { ButtonSize, ButtonType, ButtonVariant } from './button.type';

const variants: ButtonVariant[] = ['primary', 'secondary', 'outlined'];
const sizes: ButtonSize[] = ['regular', 'small'];
const types: ButtonType[] = ['button', 'submit'];

describe('ButtonComponent', () => {
  let spectator: Spectator<ButtonComponent>;
  const createComponent = createComponentFactory(ButtonComponent);

  const label = 'test-label';

  beforeEach(() => {
    spectator = createComponent({
      props: {
        label,
      }
    });
  });

  it('should create component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display proper label', () => {
    expect(spectator.query('button')).toHaveText(label);
  })

  it('should emit click event', () => {
    let output: Event;
    const button = spectator.query('button') as Element;
    spectator.output<Event>('buttonClick').subscribe((event) => output = event);
    spectator.click(button);
    expect(output).toBeDefined();
  })

  it('should disable button', () => {
    spectator.setInput('disabled', true);
    const button = spectator.query('button') as Element;
    expect(button).toBeDisabled();
  })

  it('should inactivate button', () => {
    spectator.setInput('inactive', true);
    const button = spectator.query('button') as Element;
    expect(button).toHaveClass('inactive');
  })


  describe('Button variants', () => {
    variants.forEach((variant) => it(`should render ${variant} variant`, () => {
      spectator.setInput('variant', variant);
      const button = spectator.query('button');
      expect(button).toHaveClass(variant);
    }))
  })

  describe('Button size', () => {
    sizes.forEach((size) => it(`should render ${size} sized button`, () => {
      spectator.setInput('size', size);
      const button = spectator.query('button');
      expect(button).toHaveClass(size);
    }))
  })

  describe('Button type', () => {
    types.forEach((type) => it(`should render button of the ${type} type`, () => {
      spectator.setInput('type', type);
      const button = spectator.query('button');
      expect(button).toHaveAttribute('type', type);
    }))
  })
});
