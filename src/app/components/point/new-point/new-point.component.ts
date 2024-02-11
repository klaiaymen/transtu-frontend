import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent} from "@coreui/angular";
import {Store} from "@ngrx/store";
import {PointsState, PointsStateEnum} from "../ngrx/point.reducers";
import {NewPointAction, SavePointAction} from "../ngrx/point.actions";

@Component({
  selector: 'app-new-point',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastBodyComponent, ToastComponent, ToastHeaderComponent, ToasterComponent],
  templateUrl: './new-point.component.html',
  styleUrl: './new-point.component.scss'
})
export class NewPointComponent implements OnInit{
  pointFormGroup:  FormGroup|null=null;
  state:PointsState|null=null;
  readonly PointsStateEnum= PointsStateEnum;
  submitted: boolean=false;

  constructor(private store:Store<any>, private fb:FormBuilder) {
  }

  ngOnInit(): void {
    this.store.dispatch(new NewPointAction({}))
    this.store.subscribe(state=>{
      this.state=state.pointState;
      if(this.state?.dataState==PointsStateEnum.NEW){
        this.pointFormGroup=this.fb.group({
          longitude:['',Validators.required],
          latitude:['',Validators.required],
        })
      }
    })
  }

  onSavePoint() {
    this.submitted=true;
    if(!this.pointFormGroup?.valid) return
    this.store.dispatch(new SavePointAction(this.pointFormGroup?.value));
  }

  newPoint() {
    this.store.dispatch(new NewPointAction({}));
  }

}
