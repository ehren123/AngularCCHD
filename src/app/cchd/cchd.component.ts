/*
* Each completed CCHD test, which is completed by obtaining two values,
 * one from a foot, and one from a hand is an "iteration". The test itself
 * has more complex rules involving which hand and/or which foot can be used
 * as a valid sample. From a programming point of view this is irrelevant.
 *
 * Each iteration requires on sample from a foot and one sample from a hand.
 *
 * Enums and interfaces are either contained in the current folder or in "./ts".
 *
 * This component is meant to accept values in accordance with CCHD techniques.
 *
 * It was written to follow recommendations from a physician out of Ontario Canada.
 *
 * No guarantees are provided in terms of reliability of this algorithm.
 *
 * It should only be used as a proof of concept.
 *
  * *
* */


import {Component} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ScreenIterationModel} from "./models/ScreenIterationModel";
import {CchdEvalService} from "./services/cchd-eval.service";
import {IterationStatusEnum} from "./enums/enums";



@Component({
    selector: 'app-cchd',
    templateUrl: './cchd.component.html',
    styleUrls: ['./cchd.component.css']
})
export class CchdComponent {

    // Screen iteration model. Iteration based on position in array. 0 Is first item.
    private _screenIterationModels: ScreenIterationModel[] = [];

    private footValid: boolean;
    private handValid: boolean;

    private _handOneStr: string;
    private _footOneStr: string;
    private _handTwoStr: string;
    private _footTwoStr: string;
    private _handThreeStr: string;
    private _footThreeStr: string;

    private _isHandOneValid: boolean = false;
    private _isFootOneValid: boolean = false;
    private _isHandTwoValid: boolean = false;
    private _isFootTwoValid: boolean = false;
    private _isHandThreeValid: boolean = false;
    private _isFootThreeValid: boolean = false;

    hasSecondTest: boolean = false;
    hasThirdTest: boolean = false;

     constructor(private _cchdEvalService: CchdEvalService) {
        // Add iterations to array.
        this._screenIterationModels.push(new ScreenIterationModel(0));
        this._screenIterationModels.push(new ScreenIterationModel(1));
        this._screenIterationModels.push(new ScreenIterationModel(2));
    }

    onChangeHandOne(handOneStr: string) {
        // Set value;
        this._handOneStr = handOneStr;
        // Attempt setting value. Setter in model returns boolean if valid input.
        this._isHandOneValid = this._screenIterationModels[0].setHandValue(handOneStr);
        if (this._isHandOneValid && this._isFootOneValid){
            // Run and verify!
            if(this._screenIterationModels[0].updateIterationStatus()){
                // Perform updates
                this.updateAll();
            }
        }
    }

    onChangeFootOne(footOneStr: string) {
        this._footOneStr = footOneStr;
        // Attempt setting value. Setter in model returns boolean if valid input.
        this._isFootOneValid = this._screenIterationModels[0].setFootValue(footOneStr);
        // Run and verify!
        if(this._screenIterationModels[0].updateIterationStatus()){
            // Perform updates
            this.updateAll();
        }
    }

    onChangeHandTwo(handTwoStr: string) {
        // Set value;
        this._handTwoStr = handTwoStr;
        // Attempt setting value. Setter in model returns boolean if valid input.
        this._isHandTwoValid = this._screenIterationModels[1].setHandValue(handTwoStr);
        if (this._isHandTwoValid && this._isFootTwoValid){
            // Run and verify!
            if(this._screenIterationModels[1].updateIterationStatus()){
                // Perform updates
                this.updateAll();
            }
        }
    }

    onChangeFootTwo(footTwoStr: string) {
        // Set value;
        this._footTwoStr = footTwoStr;
        // Attempt setting value. Setter in model returns boolean if valid input.
        this._isFootTwoValid = this._screenIterationModels[1].setFootValue(footTwoStr);
        if (this._isHandTwoValid && this._isFootTwoValid){
            // Run and verify!
            if(this._screenIterationModels[1].updateIterationStatus()){
                // Perform updates
                this.updateAll();
            }
        }
    }

    onChangeHandThree(handThreeStr: string) {
        // Set value;
        this._handThreeStr = handThreeStr;
        // Attempt setting value. Setter in model returns boolean if valid input.
        this._isHandThreeValid = this._screenIterationModels[2].setHandValue(handThreeStr);
        if (this._isHandThreeValid && this._isFootThreeValid){
            // Run and verify!
            if(this._screenIterationModels[2].updateIterationStatus()){
                // Perform updates
                this.updateAll();
            }
        }
    }

    onChangeFootThree(footThreeStr: string) {
        // Set value;
        this._footThreeStr = footThreeStr;
        // Attempt setting value. Setter in model returns boolean if valid input.
        this._isFootThreeValid = this._screenIterationModels[2].setFootValue(footThreeStr);
        if (this._isHandThreeValid && this._isFootThreeValid){
            // Run and verify!
            if(this._screenIterationModels[2].updateIterationStatus()){
                // Perform updates
                this.updateAll();
            }
        }
    }

    // Validate Limb Input
    private validateLimbInput(limbInput: string): boolean{
        return this._screenIterationModels[0].validateLimbInput(limbInput);
    }

    // Update external and internal data.
    private updateAll(){
        this._cchdEvalService
            .changeScreenIterationModels(this._screenIterationModels);
        this.updateInputs();
    }

    // Adjust number of fields according to current action.
    private updateInputs(){
        // Show additional fields when first or second test status is inconclusive.
        this.hasSecondTest = this._screenIterationModels[0].isInconclusive();
        this.hasThirdTest = this._screenIterationModels[1].isInconclusive();
    }

}



