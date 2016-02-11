module electron {
    "use strict";

    interface IAddModalUserScope {
        User: IUser,
        save(): void,
        cancel(): void
    }

    export class AddModalUserController implements IAddModalUserScope {
        User: IUser;
        
        static $inject = ['$mdDialog'];
        constructor(private $mdDialog: angular.material.IDialogService){

        }

        save(): void {
            this.$mdDialog.hide(this.User);
        }

        cancel(): void {
            this.$mdDialog.cancel();
        }
    }

    angular.module("electron").controller("AddModalUserController", AddModalUserController);
}