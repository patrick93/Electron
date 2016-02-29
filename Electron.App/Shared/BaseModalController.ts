module electron {
    "use strict";

    export class BaseModalController<T extends Entity> {
        Entity: T;

        constructor(protected $mdDialog: angular.material.IDialogService,
                    id: number,
                    protected DataService:IBaseDataService){
            this.setEntity(id);
        }

        private setEntity(id: number) {
            if (id > 0) {
                this.DataService.getById(id).then((entity: T): void => {
                    this.Entity = entity;
                }, (message:string): void => {
                    console.log(message);
                });
            }
        }

        save(): void {
            this.DataService.save(this.Entity).then((data: Entity): void => {
                console.log("Usuario salvo")
                this.$mdDialog.hide(this.Entity);
            });
        }

        cancel(): void {
            this.$mdDialog.cancel();
        }
    }
}
