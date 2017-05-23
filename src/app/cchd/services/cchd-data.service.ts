import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {ScreenIterationModel} from "../models/ScreenIterationModel";
import {TestResultEnum} from "../enums/enums";

@Injectable()
export class CchdDataService implements OnInit {


  // Get test status from cchd result.
  private _testResultEnumSource = new BehaviorSubject<TestResultEnum>(TestResultEnum.inProgress);
  testResultEnumModel$ = this._testResultEnumSource.asObservable();

  constructor(){}

  ngOnInit(){
  }


  changeTestResultEnum(testResultEnum: TestResultEnum){
      this._testResultEnumSource.next(testResultEnum);
  }

  hello(){
      console.log("hello");
  }

}
