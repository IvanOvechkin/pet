import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, of} from "rxjs";
import {delay, map, tap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AppState} from "../store/state/app.state";
import {selectCategories} from "../store/selectors/app.selectors";
import {createCategory, editCategory, getCategories} from "../store/actions/app.actions";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public createForm: FormGroup;

  public loadCreate: boolean = false;
  public loadEdit: boolean = false;

  categories$ = this.store.select(selectCategories).pipe(
    tap(val => {
      this.loadCreate = false;
      this.loadEdit = false;
    })
  );

  editForm$: Observable<any>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(getCategories());
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

    this.loadCreate = true;
    this.store.dispatch(createCategory({category: this.createForm.value}));
    this.createForm.reset({limit: 100});
  }

  submitEdit(editForm, id) {
    if (editForm.invalid) {
      const controls = editForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.loadEdit = true;
    this.store.dispatch(editCategory({category: {limit: editForm.value.editLimit, title: editForm.value.select, id}}));
  }

  onChangedSelect($event: any) {
    this.initEditForm($event);
  }

}
