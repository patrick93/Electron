module electron {
    "use strict";

    export interface IBaseDataService {
        delete(id: number): ng.IPromise<Entity>;
        getById(id: number): ng.IPromise<Entity>;
        get(): ng.IPromise<Entity[]>;
        save(user: Entity): ng.IPromise<Entity>;
    }

    export class BaseDataService implements IBaseDataService {
        protected apiUrl: string = "http://localhost:3000/";

        constructor(protected $http: ng.IHttpService, protected $q: ng.IQService, private path: string) {
            this.apiUrl += path;
        }

        get(): ng.IPromise<Entity[]> {
            var defer: ng.IDeferred<Entity[]> = this.$q.defer();
            this.$http.get(this.apiUrl).success((data: Entity[]): void => {
                defer.resolve(data);
            }).error((message: string): void => {
                defer.reject(message);
            })
            return defer.promise;
        }

        getById(id: number): ng.IPromise<Entity> {
            var defer: ng.IDeferred<Entity> = this.$q.defer();
            this.$http.get(this.apiUrl + "/" + id).success((data: Entity): void => {
                defer.resolve(data);
            }).error((message: string): void => {
                defer.reject(message);
            })
            return defer.promise;
        }

        delete(id: number): ng.IPromise<Entity> {
            var defer: ng.IDeferred<Entity> = this.$q.defer();
            this.$http.delete(this.apiUrl + "/" + id).success((data: Entity): void => {
                defer.resolve(data);
            }).error((message: string): void => {
                defer.reject(message);
            })
            return defer.promise;
        }

        save(user: Entity): ng.IPromise<Entity> {
            return Entity.HasId(user) ? this.edit(user) : this.add(user);
        }

        private edit(user: Entity): ng.IPromise<Entity> {
            var defer: ng.IDeferred<Entity> = this.$q.defer();
            this.$http.put(this.apiUrl + "/" + user.id, user).success((data: Entity): void => {
                defer.resolve(data);
            }).error((message: string): void => {
                defer.reject(message);
            });
            return defer.promise;
        }

        private add(user: Entity): ng.IPromise<Entity> {
            var defer: ng.IDeferred<Entity> = this.$q.defer();
            this.$http.post(this.apiUrl, user).success((data: Entity): void => {
                defer.resolve(data);
            }).error((message: string): void => {
                defer.reject(message);
            });
            return defer.promise;
        }
    }
}
