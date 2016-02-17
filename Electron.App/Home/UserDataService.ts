module electron {
    "use strict";

    export interface IUserDataService {
        delete(id: number): ng.IPromise<IUser>;
        getById(id: number): ng.IPromise<IUser>;
        get(): ng.IPromise<IUser[]>;
        save(user: IUser): ng.IPromise<IUser>;
    }

    class UserDataService implements IUserDataService {
        apiUrl: string = "http://localhost:3000/users";

        static $inject = ['$http', '$q'];
        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {

        }

        get(): ng.IPromise<IUser[]> {
            var defer: ng.IDeferred<IUser[]> = this.$q.defer();
            this.$http.get(this.apiUrl).success((data: IUser[]): void => {
                defer.resolve(data);
            }).error((message: string): void => {
                defer.reject(message);
            })
            return defer.promise;
        }

        getById(id: number): ng.IPromise<IUser> {
            var defer: ng.IDeferred<IUser> = this.$q.defer();
            this.$http.get(this.apiUrl + "/" + id).success((data: IUser): void => {
                defer.resolve(data);
            }).error((message: string): void => {
                defer.reject(message);
            })
            return defer.promise;
        }

        delete(id: number): ng.IPromise<IUser> {
            var defer: ng.IDeferred<IUser> = this.$q.defer();
            this.$http.delete(this.apiUrl + "/" + id).success((data: IUser): void => {
                defer.resolve(data);
            }).error((message: string): void => {
                defer.reject(message);
            })
            return defer.promise;
        }

        save(user: IUser): ng.IPromise<IUser> {
            return Entity.HasId(user) ? this.edit(user) : this.add(user);
        }

        private edit(user: IUser): ng.IPromise<IUser> {
            var defer: ng.IDeferred<IUser> = this.$q.defer();
            this.$http.put(this.apiUrl + "/" + user.id, user).success((data: IUser): void => {
                defer.resolve(data);
            }).error((message: string): void => {
                defer.reject(message);
            });
            return defer.promise;
        }

        private add(user: IUser): ng.IPromise<IUser> {
            var defer: ng.IDeferred<IUser> = this.$q.defer();
            this.$http.post(this.apiUrl, user).success((data: IUser): void => {
                defer.resolve(data);
            }).error((message: string): void => {
                defer.reject(message);
            });
            return defer.promise;
        }
    }

    angular.module("electron").service("UserDataService", UserDataService);
}
