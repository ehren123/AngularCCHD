import { TestResultEnum, ResultEnum, IterationStatusEnum } from '../enums/enums';

export class ScreenIterationModel{

    iterationStatusEnum: IterationStatusEnum = IterationStatusEnum.inProgress;
    readonly iteration: number; // First iteration is 0 to match array index.
    private _handValue: number = null;
    private _footValue: number = null;

    constructor(iteration: number){
        this.iteration = iteration;
    }

    // get iterationStatusEnum(): IterationStatusEnum{
    //     return this.iterationStatusEnum
    // }

    // Get iteration status text for humans.
    getIterationStatusText(): string{
        console.group("getIterationStatusText");
        switch(this.iterationStatusEnum){
            case IterationStatusEnum.error :{
                let result = "There is a problem with evaluation (blame the devs)" + this.iteration + ".";
                console.log(result);
                return result;
            }
            case IterationStatusEnum.inProgress:{
                let result = "Evaluation " + (this.iteration + 1) + " in progress."
                console.log(result);
                return result;
            }
            case IterationStatusEnum.fail:{
                let result = "Evaluation " + (this.iteration + 1) + " resulted in a conclusive refer."
                console.log(result);
                return result;
            }
            case IterationStatusEnum.pass:{
                let result = "Evaluation " + (this.iteration + 1) + " resulted in a conclusive pass."
                console.log(result);
                return result;
            }
            case IterationStatusEnum.inconclusive:{
                let result = "Evaluation " + (this.iteration + 1) + " result is inconclusive, another evaluation required."
                console.log(result);
                return result;
            }
        }
    }

    // Reset all values.
    public reset(){
        this._handValue = null;
        this._footValue = null;
        this.iterationStatusEnum = IterationStatusEnum.inProgress;
    }

    // Attempt to set hand, returns true if set. Returns true or false for success or failure.
    public setHandValue(handStr: string): boolean{

        console.log("setHandValue: " + handStr);

        // Validate set in correct ranges.
        if(parseInt(handStr, 10)){
            this._handValue = parseInt(handStr, 10);
            console.log("handValueSetTo: " + this._handValue);
            return true;
        }
        return false;
    }

    // Attempt to set foot, returns true if set. Returns true or false for success or failure.
    public setFootValue(footStr: string): boolean{

        console.log("setFootValue: " + footStr);

        // Validate set in correct ranges.
        if(parseInt(footStr, 10)){
            this._footValue = parseInt(footStr, 10);
            console.log("handValueSetTo: " + this._footValue);
            return true;
        }
        return false;
    }

    public getHandValue(): number{
        return this._handValue;
    };

    public getFootValue(): number{
        return this._footValue;
    };


    // Used by view to check validity of input.
    public validateLimbInput(limbStr: string): boolean{

        console.log("validateLimbInput");

        // False if input not intable.
        if(!parseInt(limbStr, 10)){
            return false;
        }

        let limb: number = parseInt(limbStr, 10);

        return (limb >= 10 && limb < 100);
    }

    // Used be view to check if hand and foot values are valid.
    public validateLimbIterationCompleted(): boolean{

        let result: boolean =  (this._handValue >= 10
        && this._handValue <= 100
        && this._footValue >= 10
        && this._footValue <= 100);
        console.log("validateLimbIterationCompleted: " + result);
        return result;
    }

    // First and second iterations. Return true when completed. False mean error.
    public updateIterationStatus(): boolean{

        console.log("updateIterationStatus");

        // Don't proceed if data not in valid ranges.
        if(!this.validateLimbIterationCompleted()){
            return false;
        }

        let handResultEnum: ResultEnum = this.checkLimbResultEnum(this._handValue);
        let footResultEnum: ResultEnum = this.checkLimbResultEnum(this._footValue);
        let limbDifferenceResultEnum: ResultEnum = this.checkLimbDifference(this._handValue, this._footValue);

        // Check a valid iteration is selected, and then set isLastIteration.
        let isLastIteration: boolean;
        switch(this.iteration){
            case 0: {
                isLastIteration = false;
                break;
            }
            case 1:{
                isLastIteration = false;
                break;
            }
            case 2:{
                isLastIteration = true;
                break;
            }
            // Safety net for bad programming.
            default:{
                this.iterationStatusEnum = IterationStatusEnum.error;
                return false;
            }
        }

        // Check for errors state.
        if (handResultEnum === ResultEnum.error || footResultEnum === ResultEnum.error){
            this.iterationStatusEnum = IterationStatusEnum.error;
            console.log("iterationStatusEnum error");
            return false;
        }

        // If either foot or hand are a failure state, iteration state is failure.
        if(handResultEnum === ResultEnum.fail || footResultEnum === ResultEnum.fail){
            this.iterationStatusEnum = IterationStatusEnum.fail;
            console.log("iterationStatusEnum fail");
            return true;
        }

        // Either hand or foot pass AND difference is less than 3.
        if((handResultEnum === ResultEnum.pass
            || footResultEnum === ResultEnum.pass)
            && limbDifferenceResultEnum === ResultEnum.pass ){
                this.iterationStatusEnum = IterationStatusEnum.pass;
                console.log("iterationStatusEnum pass");
                return true;
        }

        // Inconclusive results split in two groups, first two iterations, and final (third) iteration.
        if (handResultEnum === ResultEnum.inconclusive && handResultEnum === ResultEnum.inconclusive){
            if(isLastIteration){
                this.iterationStatusEnum = IterationStatusEnum.fail;
                console.log("statusEnumFail");
            }else{
                this.iterationStatusEnum = IterationStatusEnum.inconclusive;
                console.log("iterationStatusEnum inconclusive");

            }
            return true;
        }

        if (limbDifferenceResultEnum == ResultEnum.inconclusive){
            if(isLastIteration){
                this.iterationStatusEnum = IterationStatusEnum.fail;
                console.log("status enum fail");
            }else{
                console.log("status enum inconclusive");
                this.iterationStatusEnum = IterationStatusEnum.inconclusive;
            }
            return true;
        }

        // Safety net for bad programming.
        this.iterationStatusEnum = IterationStatusEnum.error;
        return false;
    }

    private checkLimbResultEnum(limbValue: number): ResultEnum{

        console.log("checkLimbResultEnum");

        // Perform screen on validated data.
        switch (true) {
            case limbValue < 90:{
                return ResultEnum.fail;
            }
            case limbValue >= 95:{
                return ResultEnum.pass;
            }
            default:{
                return ResultEnum.inconclusive;
            }
        }

    }

    // Compare difference between hand and foot. Return a result enum.
    public checkLimbDifference(hand: number, foot: number): ResultEnum{

        console.log("checkLimbDifference");

        if (Math.abs(hand - foot) > 3){
            console.log("checkLimbDifference inconclusive");
            return ResultEnum.inconclusive;

        }
        else{
            console.log("checkLimbDifference pass");
            return ResultEnum.pass;
        }
    }

    // Identify if current iteration is completed.
    public isInconclusive(): boolean{
        return this.iterationStatusEnum === IterationStatusEnum.inconclusive;
    }
}


