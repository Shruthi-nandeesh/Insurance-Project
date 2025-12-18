import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {

  paymentMethod: 'card' | 'upi' | 'qr' = 'card';
  policyNo = '';

  amount = 12000;
  minExpiry = '';

  card = {
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  };

  upiId = '';
  aadhaarFile?: File;

  error = '';
  success = '';

  showReceipt = false;
  paymentDate!: Date;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.policyNo = params['policyNo'];
    });

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    this.minExpiry = `${year}-${month}`;
  }

  selectMethod(method: 'card' | 'upi' | 'qr') {
    this.paymentMethod = method;
    this.error = '';
    this.success = '';
  }

  onFileChange(event: any) {
    this.aadhaarFile = event.target.files[0];
  }

  pay() {
    this.error = '';
    this.success = '';

    if (!this.aadhaarFile) {
      this.error = 'Aadhaar document is required';
      return;
    }

    if (this.paymentMethod === 'card') {
      if (!/^\d{16}$/.test(this.card.number)) {
        this.error = 'Invalid card number';
        return;
      }
      if (!/^\d{3}$/.test(this.card.cvv)) {
        this.error = 'Invalid CVV';
        return;
      }
    }

    if (this.paymentMethod === 'upi') {
      if (!this.upiId.includes('@')) {
        this.error = 'Invalid UPI ID';
        return;
      }
    }

    this.paymentDate = new Date();
    this.success = 'Payment Successful 🎉';
    this.showReceipt = true;
  }

  downloadReceipt() {
    const receipt = document.getElementById('receipt-pdf');
    if (!receipt) return;

    // 🔥 Hide buttons for PDF
    receipt.classList.add('hide-for-pdf');

    html2canvas(receipt).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`Receipt_${this.policyNo}.pdf`);

      // 🔥 Show buttons back
      receipt.classList.remove('hide-for-pdf');
    });
  }

  continue() {
    this.router.navigate(['/dashboard']);
  }
}
