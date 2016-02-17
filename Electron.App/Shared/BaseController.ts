module electron {
    "use strict";

    interface IBaseController {

    }

    export abstract class BaseController implements IBaseController {
        columns: Columns[];
        dataGrid: IUser[];

        constructor(protected $mdDialog: angular.material.IDialogService,
                    protected ColumnFactory: IColumnFactory,
                    protected UserDataService: IUserDataService,
                    protected title: string) {
            this.setColumns();
            this.get();
        }

        private setColumns(): void {
            this.columns = [
                this.ColumnFactory.makeAddColumn(() => { this.showModal(); },
                                                    (user:IUser) => {this.showModal(user.id)},
                                                    20)];
            this.columns = this.columns.concat(this.setBaseColumns());
            this.columns.push(this.ColumnFactory.makeDeleteColumn((user:IUser) => {this.delete(user)}, 20));
        }

        abstract setBaseColumns(): Columns[];

        showModal(id?: number): void {
            this.$mdDialog.show({
                controller: AddModalUserController,
                controllerAs: "modalCtrl",
                templateUrl: "Electron.App/Home/AddModalUser.html",
                locals: {id: id}
            }).then((user: IUser) => {
                this.get();
            }, () => {
                console.log("canceled")
            });
        }

        delete(user: IUser): void {
            var confirm: angular.material.IConfirmDialog = this.$mdDialog.confirm()
                .title("Atenção")
                .textContent("Tem certeza que quer deletar?")
                .ok("Confirmar")
                .cancel("Cancelar");

            this.$mdDialog.show(confirm).then(() => {
                this.deleteFromGrid(user);
            }, () => {
                console.log("canceled")
            });
        }

        private deleteFromGrid(user: IUser): void {
            this.UserDataService.delete(user.id).then((user: IUser): void => {
                console.log("Usuario deletado");
                this.get();
            }, (message: string): void => {
                console.log(message);
            });
        }

        get(): void {
            this.UserDataService.get().then((data: IUser[]): void => {
                this.dataGrid = data;
            }, (message: string): void => {
                console.log(message);
            })
        }
    }
}
