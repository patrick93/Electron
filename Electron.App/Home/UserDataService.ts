module electron {
    "use strict";

    export interface IUserDataService extends IBaseDataService{
    }

    class UserDataService extends electron.BaseDataService implements IUserDataService {
        static $inject = ['$http', '$q'];
        constructor(protected $http: ng.IHttpService, protected $q: ng.IQService) {
            super($http, $q, "users");
        }
    }

    angular.module("electron").service("UserDataService", UserDataService);
}
