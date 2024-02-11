import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent} from "@coreui/angular";
import {StationsState} from "../../station/ngrx/station.reducers";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {EditStationAction, UpdateStationAction} from "../../station/ngrx/station.actions";
import {PointsState, PointsStateEnum} from "../ngrx/point.reducers";
import {EditPointAction, UpdatePointAction} from "../ngrx/point.actions";

@Component({
  selector: 'app-edit-point',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastBodyComponent, ToastComponent, ToastHeaderComponent, ToasterComponent],
  templateUrl: './edit-point.component.html',
  styleUrl: './edit-point.component.scss'
})
export class EditPointComponent {
  state:PointsState|null=null;
  formBuilt: boolean= false;
  pointID:number;
  pointFormGroup: FormGroup |null=null;
  readonly PointsStateEnum= PointsStateEnum;

  constructor(private activatedRoute: ActivatedRoute, private store:Store<any>, private router:Router,private fb:FormBuilder) {
    this.pointID=activatedRoute.snapshot.params['id'];
  }


  ngOnInit(): void {
    this.store.dispatch(new EditPointAction(this.pointID));
    this.store.subscribe(state=>{
      this.state= state.pointState;
      if(this.state?.dataState==PointsStateEnum.LOADED){
        if(this.state.currentPoint!=null){
          this.pointFormGroup=this.fb.group({
            id:[this.state.currentPoint.id],
            longitude:[this.state.currentPoint.longitude,Validators.required],
            latitude:[this.state.currentPoint.latitude,Validators.required],
          });
          this.formBuilt=true;
        }
      }

    });
  }

  onUpdatePoint() {
    if(this.pointFormGroup?.invalid)return
    this.store.dispatch(new UpdatePointAction(this.pointFormGroup?.value));
  }

}
