import { Injectable } from '@angular/core';
import {IterationStatusEnum, TestResultEnum} from "../enums/enums";
import {ScreenIterationModel} from "../models/ScreenIterationModel";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";
import {ICchdResult} from "./cchd-eval.service.interfaces";

@Injectable()
export class CchdEvalService {

    private _screenIterationModels: ScreenIterationModel[];

    // Passing screen iteration models from cchd component to cchd result.
    private _statusMessagesSource = new BehaviorSubject<string[]>(
        ["Enter values to begin test."]);
    statusMessages$ = this._statusMessagesSource.asObservable();

    private _statusMessages: string[] = [];

    private _testResultEnum: TestResultEnum;
    private _maxIterations: number = -1;
    private _isTestCompleted: boolean = false;

    private subscriptions: Subscription[] = [];

    constructor(){
    }

    changeScreenIterationModels(screenIterationModels: ScreenIterationModel[]){
        this._screenIterationModels = screenIterationModels;
        this.doEvaluation();
        this._statusMessagesSource.next(this._statusMessages);
    }

    // Perform all evaluations on screen iteration model.
    doEvaluation() {
        this._maxIterations = this.evaluateMaxIterationNumber();
        this._isTestCompleted = this.checkIfCompleted();
        this._testResultEnum = this.checkTestStatus();
        this.updateStatusMessage();
    }

    // Reset iterations optional number, otherwise reset all.
    resetScreenIterations(current?: number){

        // Reset screen iterations after current.
        let i: number;
        if(current){
            i = current + 1;

        }else{
            i = 0;
        }

        // Reset iteration models starting at i.
        for(; i<this._screenIterationModels.length; i++){
            this._screenIterationModels[i].reset();
        }
    }

    // Identify the current max iteration.
    evaluateMaxIterationNumber(): number{

        let maxCompletedIteration = -1;

        // Check highest iteration and return value;
        for(let i = this._screenIterationModels.length - 1; i >= 0; i--){
            if(this._screenIterationModels[i].iterationStatusEnum === IterationStatusEnum.fail
                || this._screenIterationModels[i].iterationStatusEnum === IterationStatusEnum.inconclusive
                || this._screenIterationModels[i].iterationStatusEnum === IterationStatusEnum.pass){
                maxCompletedIteration = i;
                break;
            }
        }
        return maxCompletedIteration;
    }


    // Check if evaluation is completed. Defaults to inProgress.
    checkIfCompleted(): boolean{
        for(let i = 0; i < this._screenIterationModels.length; i++){
            if(this._screenIterationModels[i].iterationStatusEnum === IterationStatusEnum.pass
                || this._screenIterationModels[i].iterationStatusEnum === IterationStatusEnum.fail){
                return true;
            }
        }
        return false;
    }

    // Get a test result enum.
    checkTestStatus(): TestResultEnum{

        //Check for errors.
        for(let i = 0; i <= 2; i++){
            if(this._screenIterationModels[i].iterationStatusEnum === IterationStatusEnum.error){
                return TestResultEnum.error;
            }
        }

        // If any screen iterations are failure, test result is a refer.
        for(let i = 0; i < this._screenIterationModels.length; i++){
            if(this._screenIterationModels[i].iterationStatusEnum === IterationStatusEnum.fail){
                return TestResultEnum.refer;
            }
        }

        // If any screen iterations are pass, test result is a pass
        for(let i = 0; i < this._screenIterationModels.length; i++){
            if(this._screenIterationModels[i].iterationStatusEnum === IterationStatusEnum.pass){
                return TestResultEnum.pass;
            }
        }
        return TestResultEnum.inProgress;
    }

    updateStatusMessage() {
        this._statusMessages = [];
        if (this._isTestCompleted) {
            this._statusMessages.push("Test completed!");
        }

        // Add test results.
        switch (this._testResultEnum) {

            case TestResultEnum.inProgress: {
                this._statusMessages.push("Test in progress.");
                break;
            }
            case TestResultEnum.error: {
                this._statusMessages.push("Error in test (blame the devs.)");
                break;
            }
            case TestResultEnum.refer: {
                this._statusMessages.push("Refer patient for further screening.");
                break;
            }
            case TestResultEnum.pass: {
                this._statusMessages.push("Patient passed test.");
                break;
            }
        }

        // Add status message from ScreenIterationModel
        this._statusMessages.push(this._screenIterationModels[this._maxIterations].getIterationStatusText());
    }
}
