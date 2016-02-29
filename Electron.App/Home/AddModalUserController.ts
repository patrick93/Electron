module electron {
    "use strict";


    export class AddModalUserController extends electron.BaseModalController<IUser> {

        static $inject = ['$mdDialog', 'id', 'UserDataService'];
        constructor(protected $mdDialog: angular.material.IDialogService,
                    id: number,
                    protected UserDataService:IUserDataService){
            super($mdDialog, id, UserDataService);
        }
    }

    angular.module("electron").controller("AddModalUserController", AddModalUserController);
}
