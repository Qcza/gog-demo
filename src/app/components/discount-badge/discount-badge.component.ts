import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-discount-badge',
  templateUrl: './discount-badge.component.html',
  styleUrls: ['./discount-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountBadgeComponent {
  percentage: string;

  @Input() set value(discount: string) {
    this.percentage = `-${(Number(discount) * 100).toFixed()}%`
  };
}
