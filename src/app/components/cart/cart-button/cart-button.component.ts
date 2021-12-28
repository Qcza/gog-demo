import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartButtonComponent {
  @Input() active: boolean;
  @Input() itemsNo = 0;

  @Output() buttonClick = new EventEmitter<Event>();

  clickHandler(e: Event): void {
    this.buttonClick.emit(e);
  }
}
