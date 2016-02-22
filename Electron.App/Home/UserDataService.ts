module electron {
    "use strict";

    export interface IUserDataService {
        delete(id: number): ng.IPromise<IUser>;
        getById(id: number): ng.IPromise<IUser>;
        get(): ng.IPromise<IUser[]>;
        save(user: IUser): ng.IPromise<IUser>;
    }

    class UserDataService extends electron.BaseDataService implements IUserDataService {
        static $inject = ['$http', '$q'];
        constructor(protected $http: ng.IHttpService, protected $q: ng.IQService) {
            super($http, $q, "users");
        }
    }

    angular.module("electron").service("UserDataService", UserDataService);
}
