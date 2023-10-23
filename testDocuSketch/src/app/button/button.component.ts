import { Component, OnInit } from '@angular/core';
import  * as icons  from '@fortawesome/free-solid-svg-icons';
import  {IconDefinition, IconPack, IconPrefix, faCoffee}  from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable, switchMap, take, timer } from 'rxjs';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  currentIcon = faCoffee;
  icons: (IconDefinition | IconPrefix | IconPack)[] = []; 
  private iconSubject = new BehaviorSubject<IconDefinition | undefined>(this.currentIcon);

  private getIcon(): number {
    return Math.floor(Math.random() * (this.icons.length));
  }

  ngOnInit() {
    this.icons = Object.values(icons);
  }

  changeIcon(): void {
    this.iconSubject.next(undefined); 
    this.delayedIcon().subscribe((icon) => {
    this.currentIcon = this.icons[icon] as IconDefinition;
    });
  }

  private delayedIcon(): Observable<number> {
    return this.iconSubject.pipe(
      switchMap(() => timer(3000).pipe(take(1))),
      switchMap(() => [this.getIcon()])
    );
  }
}
