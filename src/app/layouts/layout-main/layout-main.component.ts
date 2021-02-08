import {Component, OnDestroy, OnInit} from '@angular/core';
import {from, Observable} from 'rxjs';
import {HiddenHavService} from '../../services/nav/hidden-hav.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {concatMap, first, switchMap} from 'rxjs/operators';
import {StoreService} from '../../services/store/store.service';

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-main.component.scss']
})
export class LayoutMainComponent implements OnInit, OnDestroy {

  public navHidden: Observable<boolean> = this.hiddenHavService.getHiddenState();
  // subscribe;

  constructor(private hiddenHavService: HiddenHavService,
              private authFireBase: AngularFireAuth,
              private db: AngularFireDatabase,
              private storeService: StoreService) { }

  ngOnInit(): void {
    // this.subscribe = from(this.authFireBase.currentUser)
    //   .pipe(
    //     switchMap(user => this.db.object(`/users/${user.uid}/info`).valueChanges()),
    //   )
    //   .subscribe(user => {
    //     this.storeService.setUserInfo(user);
    //   });
  }

  ngOnDestroy(): void {
    // this.subscribe.unsubscribe();
  }

}
