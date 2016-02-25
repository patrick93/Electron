module electron{
    "use strict";

    export abstract class BaseModalController extends electron.BaseController {
        constructor(protected $mdDialog: angular.material.IDialogService,
                    protected ColumnFactory: IColumnFactory,
                    protected DataService: IBaseDataService,
                    protected title: string,
                    private modalTemplateUrl: string,
                    private modalController: Function
                ) {
            super($mdDialog, ColumnFactory, DataService, title);
        }

        add(): void {
            this.showModal();
        }

        edit(id: number): void {
            this.showModal(id);
        }

        showModal(id?: number): void {
            this.$mdDialog.show({
                controller: this.modalController,
                controllerAs: "modalCtrl",
                templateUrl: this.modalTemplateUrl,
                locals: {id: id}
            }).then(() => {
                this.get();
            }, () => {
                console.log("canceled")
            });
        }
    }
}
