import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TypographyVariant, TypographyWeight } from './typography.type';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyComponent {
  @Input() variant: TypographyVariant = 'label';
  @Input() fontWeight: TypographyWeight = 'regular';
  @Input() uppercase = true;
  @Input() underline = false;
  @Input() color?: string;
  @Input() fontSize?: string;
  @Input() lineHeight?: string;
}
