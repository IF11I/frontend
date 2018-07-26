import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

/**
 * Component for displaying a confirmation dialog with the options 'Yes' and 'No'.
 *
 * @author Nils Weber
 */
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>) { }
}
