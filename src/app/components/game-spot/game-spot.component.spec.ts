import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { GameSpotComponent } from './game-spot.component';
import { CommonModule } from '@angular/common';
import { TypographyComponent } from '../typography/typography.component';
import { generateDaily } from '../../../mockups/Product';
import { ButtonComponent } from '../button/button.component';

const product = generateDaily();

describe('GameSpotComponent', () => {
  let spectator: Spectator<GameSpotComponent>;
  const createComponent = createComponentFactory({
    component: GameSpotComponent,
    imports: [CommonModule],
    declarations: [TypographyComponent, ButtonComponent]
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        product,
      }
    });
  });

  it('should create component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display proper title', () => {
    const expected = 'game of the week';
    const title = spectator.query('div.title');
    expect(title).toHaveText(expected)
  })

  it('should display proper image', () => {
    const expected = product.imageUrl;
    const image = spectator.query('img');
    expect(image).toHaveAttribute('src', expected);
  })

  it('should contain secret button', () => {
    const expected = 'A secret button that you should totally implement';
    const button = spectator.query('button');
    expect(button).toHaveText(expected);
  })
});
