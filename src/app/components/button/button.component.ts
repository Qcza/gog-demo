import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonSize, ButtonType, ButtonVariant } from './button.type';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'regular';
  @Input() type: ButtonType = 'button';
  @Input() label: string;
  @Input() disabled: boolean;
  @Input() inactive: boolean;

  @Output() buttonClick = new EventEmitter<Event>();

  clickHandler(e: Event): void {
    this.buttonClick.emit(e);
  }
}
