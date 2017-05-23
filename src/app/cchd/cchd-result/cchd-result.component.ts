import {Component, OnInit, EventEmitter} from '@angular/core';
import {CchdEvalService} from "../services/cchd-eval.service";




// Provide a user message to explain current result. Listens to cchd.
@Component({
    selector: 'app-cchd-result',
    templateUrl: './cchd-result.component.html',
    styleUrls: ['./cchd-result.component.css']
})
export class CchdResultComponent implements OnInit {

    statusMessages: string[] = ["Enter values to begin test"];



    constructor(private _cchdEvalService: CchdEvalService) {
        _cchdEvalService.statusMessages$.subscribe(value => this.statusMessages = value);
    }

    ngOnInit() {
    }

}
