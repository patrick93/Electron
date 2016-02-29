module electron {
    "use strict";

    export interface IOperacaoDataService extends IBaseDataService {
    }

    class OperacaoDataService extends electron.BaseDataService {
        static $inject = ['$http', '$q'];
        constructor(protected $http: ng.IHttpService, protected $q: ng.IQService) {
            super($http, $q, "operacoes");
        }
    }

    angular.module("electron").service("OperacaoDataService", OperacaoDataService);

}
