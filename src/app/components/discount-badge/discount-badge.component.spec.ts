import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { DiscountBadgeComponent } from './discount-badge.component';
import { CommonModule } from '@angular/common';
import { TypographyComponent } from '../typography/typography.component';

describe('DiscountBadgeComponent', () => {
  let spectator: Spectator<DiscountBadgeComponent>;
  const createComponent = createComponentFactory({
    component: DiscountBadgeComponent,
    imports: [CommonModule],
    declarations: [TypographyComponent]
  });

  const value = '0.22';

  beforeEach(() => {
    spectator = createComponent({
      props: {
        value,
      }
    });
  });

  it('should create component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display proper value', () => {
    const expected = `-${Number(value) * 100}%`;
    const badge = spectator.query('div.discount-badge');
    expect(badge).toHaveText(expected);
  });
});
