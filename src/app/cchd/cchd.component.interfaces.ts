import {ScreenIterationModel} from "./models/ScreenIterationModel";

// Model for CchdComponentModel
export interface ICchdComponentModel{
    screenIterationModels: ScreenIterationModel[];
    currentIteration: number;
}
