import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs';

import { ResponseMessage } from 'src/app/model/response-message';

/**
 * A service for handling a `ResponseMessage` returned by an `Observable`.
 *
 * @author Nils Weber
 */
@Injectable({
  providedIn: 'root'
})
export class StatusDialogService {

  /** Prefix for successful messages. */
  private successPrefix = 'Success: ';

  /** SnackBar configuration for successful messages. */
  private successMessageConfig = { duration: 2000 };

  /** Prefix for error messages. */
  private errorPrefix = 'Error: ';

  /** SnackBar configuration for error messages. */
  private errorMessageConfig = { duration: 5000 };


  constructor(private snackBar: MatSnackBar) { }


  /**
   * Displays the given `ResponseMessage` in a dialog.
   *
   * @param responseMessage The `ResponseMessage` to display.
   *
   * @author Nils Weber
   */
  public displayResponse(responseMessage: ResponseMessage) {
    const prefix = responseMessage.isSuccessful ? this.successPrefix : this.errorPrefix;
    const config = responseMessage.isSuccessful ? this.successMessageConfig : this.errorMessageConfig;
    this.snackBar.open(prefix + responseMessage.messageText, 'OK', config);
  }


  /**
   * Displays the given `Error` in a dialog.
   *
   * @param error The `Error` to display.
   *
   * @author Nils Weber
   */
  public displayError(error: Error) {
    this.snackBar.open(this.errorPrefix + error.message, 'OK', this.errorMessageConfig);
  }

}
