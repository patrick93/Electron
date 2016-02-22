module electron {
    "use strict";

    interface IAddModalUserScope {
        User: IUser,
        save(): void,
        cancel(): void
    }

    export class AddModalUserController implements IAddModalUserScope {
        User: IUser;

        static $inject = ['$mdDialog', 'id', 'UserDataService'];
        constructor(private $mdDialog: angular.material.IDialogService,
                    id: number,
                    private UserDataService:IUserDataService){
            this.setUser(id);
        }

        private setUser(id: number) {
            if (id > 0) {
                this.UserDataService.getById(id).then((user: IUser): void => {
                    this.User = user;
                }, (message:string): void => {
                    console.log(message);
                });
            }
        }

        save(): void {
            this.UserDataService.save(this.User).then((data: IUser): void => {
                console.log("Usuario salvo")
                this.$mdDialog.hide(this.User);
            });
        }

        cancel(): void {
            this.$mdDialog.cancel();
        }
    }

    angular.module("electron").controller("AddModalUserController", AddModalUserController);
}
