import { RecomendModel } from "./interface/recomend.model";

export class StaredModel{
    constructor(public id:string, public recomendation: RecomendModel, public user: string){

    }
}