import { Component, OnInit } from '@angular/core';
import { InfoPanelComponent } from '../info-panel/info-panel.component';
import { ServerConnect } from './ServerConnect';
import { HttpClient } from '@angular/common/http';
import { from, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  channelData!: string[]; // Объявите свойство для передачи данных
  fishingChannelsData!: string[];
  fishingSitesData!: string[];
  keyWordsData!: string[];
  serverConnect!: ServerConnect;
  newChannelName: string = ''; // Добавьте переменную для хранения имени нового канала
  newKeyWord: string = '';
  private dataSubscription!: Subscription;

  constructor(private http: HttpClient) {
    this.serverConnect = new ServerConnect(http);
    this.Refresh();
  }
  onChannelNameChange() {
    this.newChannelName = this.newChannelName.replace(/[^a-zA-Z0-9_]/g, '');
    if (!this.newChannelName) {
      // Если строка пуста (состоит только из пробелов), можно сделать какое-то действие, например, очистить значение
      this.newChannelName = '';
    }
    if (!this.newKeyWord.match(/\S/)) {
      this.newKeyWord = '';
    }
  }
  public async deleteChannel(name: string, flag: number) {
    try {
      if (flag == 0) {
        await this.serverConnect
          .delete('ChannelData', name)
          .subscribe((response) => {
            this.ngOnDestroy();
          });
        await this.Refresh();
      } else if (flag == 1) {
        await this.serverConnect
          .delete('FinshingChannelsData', name)
          .subscribe((response) => {});
        await this.Refresh();
      } else if (flag == 2) {
        await this.serverConnect
          .delete('FinshingSitesData', name)
          .subscribe((response) => {});
        await this.Refresh();
      } else if (flag == 3) {
        await this.serverConnect
          .delete('KeyWordsData', name)
          .subscribe((response) => {});
        await this.Refresh();
      }
    } catch (error) {
      console.error('Ошибка при удалении канала', error);
    }
  }
  public async addChannel(flag: number) {
    if (this.newChannelName.length > 0 || this.newKeyWord.length > 0) {
      if (flag == 0) {
        try {
          const response: any = await from(
            this.serverConnect.insertData(
              'ChannelData',
              this.newChannelName.trim()
            )
          ).toPromise();
          await this.Refresh();
        } catch (error) {
          console.error('Ошибка при добавлении канала', error);
        }
      } else if (flag == 1) {
        try {
          const response: any = await from(
            this.serverConnect.insertData(
              'KeyWordsData',
              this.newKeyWord.trim()
            )
          ).toPromise();

          await this.Refresh();
        } catch (error) {
          console.error('Ошибка при добавлении канала', error);
        }
      }
    }
    this.newChannelName = '';
    this.newKeyWord = '';
  }
  public async sendRequest() {
    try {
      const response: any = await from(this.serverConnect.search()).toPromise();
      console.log(response);
      await this.Refresh();
    } catch (error) {
      // Обработка ошибок при выполнении запроса
      console.error(error);
    }
  }
  public async Refresh() {
    this.dataSubscription = this.serverConnect
      .getAll()
      .subscribe((response: any) => {
        this.channelData = response.ChannelData;
        this.fishingChannelsData = response.FinshingChannelsData;
        this.fishingSitesData = response.FinshingSitesData;
        this.keyWordsData = response.KeyWordsData;
        this.ngOnDestroy();
      });
  }
  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
