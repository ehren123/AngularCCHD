
import {TestResultEnum} from "../enums/enums";

// A cchd result.
export interface ICchdResult{
    statusMessages: string[];
    testResultEnum: TestResultEnum;
    maxIterations: number;
    isTestCompleted: boolean;
}
