import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp',
  templateUrl: './otpcomponent.html',
  standalone: true,           // Needed if using imports array
  imports: [CommonModule, FormsModule]
})
export class OtpComponent {
  otp = '';
}
