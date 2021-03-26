import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/auth";
import {from, Observable, of} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/database";
import {delay, map, switchMap} from "rxjs/operators";
import {ToastService} from "../plugins/toast/toast.service";
import {StoreService} from "../services/store/store.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public createForm: FormGroup;

  public loadCreate: boolean = false;
  public loadEdit: boolean = false;

  categories$ = from(this.authFireBase.currentUser)
  .pipe(
    map(user => user.uid),
    switchMap(uid => this.db.object(`/users/${uid}/categories`).snapshotChanges()
        .pipe(
          map(changes => {
            const cat = changes.payload.val();
            return Object.keys(cat).map(key => ({...cat[key], id: key}))
          }),
          switchMap(cat => of(this.store.setCategories(cat))
            .pipe(
              switchMap(val => this.store.getCategories())
            )
        )
      )
    )
  );

  editForm$: Observable<any>;

  constructor(private authFireBase: AngularFireAuth,
              private db: AngularFireDatabase,
              private store: StoreService,
              private toastService: ToastService) { }

  ngOnInit(): void {
    this.initCreateForm();
  }

  initCreateForm() {
    this.createForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required
      ]),
      limit: new FormControl(100, [
        Validators.required,
        Validators.pattern('[0-9]+$'),
        Validators.min(100)
      ])
    });
  }

  initEditForm(select) {
    this.editForm$ = of(select).pipe(
      delay(0),
      map(select => {
        return {
            form: new FormGroup({
              select: new FormControl(select.title, [
                Validators.required
              ]),
              editLimit: new FormControl(select.limit, [
                Validators.required,
                Validators.pattern('[0-9]+$'),
                Validators.min(100)
              ])
            }),
            id: select.id
        };
      })
    )
  }

  submitCreate() {
    if (this.createForm.invalid) {
      const controls = this.createForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.initCreate();
  }

  private initCreate() {
    const {title, limit} = this.createForm.value;
    from(this.authFireBase.currentUser)
      .pipe(
        map(user => user.uid),
        switchMap(uid => this.db.list(`/users/${uid}/categories`).push({title, limit}))
      )
      .subscribe(cat => {
        const category = {title, limit, id: cat.key};
        this.toastService.show({type: 'success', text: 'Новая категория добавлена'});
        this.createForm.reset({limit: 100});
      }, err => {
        this.toastService.show({type: 'warning', text: err.message});
      })
  }

  submitEdit(editForm, id) {
    if (editForm.invalid) {
      const controls = editForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.initEdit({title: editForm.value.select, limit: editForm.value.editLimit, id});
  }

  private initEdit(select): void {
    from(this.authFireBase.currentUser)
      .pipe(
        map(user => user.uid),
        switchMap(uid => this.db.list(`/users/${uid}/categories`).update(select.id, {title: select.title, limit: select.limit}))
      )
      .subscribe(cat => {
        this.toastService.show({type: 'success', text: 'Категория успешно обновлена'});
      }, err => {
        this.toastService.show({type: 'warning', text: err.message});
      })
  }

  onChangedSelect($event: any) {
    this.initEditForm($event);
  }

}
