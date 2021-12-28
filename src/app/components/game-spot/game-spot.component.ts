import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DailyProduct } from '../../../models/Product';

@Component({
  selector: 'app-game-spot',
  templateUrl: './game-spot.component.html',
  styleUrls: ['./game-spot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSpotComponent {
  @Input() product: DailyProduct;
}
