import { Component, Inject } from '@angular/core';
import { RENDERING_PROPERTIES } from '@sitecore-jss/sitecore-jss-angular';
import { JssService } from '../../jss.service';
import { LayoutService } from '../../layoutService/layout.service';
import { MatDialog } from '@angular/material';
import { ModalContentComponent } from '../modal-content/modal-content.component';

@Component({
  selector: 'app-download-callout',
  templateUrl: './download-callout.component.html',
  styleUrls: ['./download-callout.component.css']
})
export class DownloadCalloutComponent {

  constructor(
    @Inject(RENDERING_PROPERTIES) public rendering: any,
    private jssService: JssService,
    private layoutService: LayoutService,
    private dialog: MatDialog,
  ) { }

  openDownloadDialog() {
    const jssState = this.jssService.state.getValue();
    this.layoutService.getItemData('/content/forms/download', jssState.language).subscribe((itemData) => {
      this.dialog.open(ModalContentComponent, {
        data: itemData
      });
    });
  }

}
