// import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { ServicesService } from '@services/services.service';
// import { AppService } from '@services/app.service';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';

// @Component({
//     selector: '.m-wrapper',
//     templateUrl: './applicant-list.component.html',
//     styleUrls: ['./applicant-list.component.scss'],
//     encapsulation: ViewEncapsulation.None
// })
// export class ApplicantListComponent implements OnInit {

//     dataTable;
//     data;
//     rowData;
//     customConfig: {};
//     isReload = false;
//     id;
//     applicantData;
//     role;

//     constructor(
//         private _services: ServicesService,
//         private _app: AppService,
//     ) { this.role = this._services.getCurrentUserRole(); }


//     ngOnInit() {
//         this._app.getDataJSON().subscribe(data => {
//             this.applicantData = data.filter(obj => {
//                 return obj.status === 'applicant';
//             });
//             this.initTable();
//         })
//     }


//     filter(filterData) {
//         this.dataTable.columns(7).search(filterData, true, false).draw();
//     }


//     initTable() {
//         let that = this;
//         this.customConfig = {
//             buttons: [
//                 {
//                     text: 'New',
//                     className: 'btn-primary pass-btn',
//                     action: function () {
//                         that.filter('New');
//                     },
//                     init: function (api, node, config) {
//                         $(node).removeClass('btn-secondary')
//                     }
//                 },
//                 {
//                     text: 'Interested',
//                     className: 'btn-success pass-btn',
//                     action: function () {
//                         that.filter('^interested$');
//                     },
//                     init: function (api, node, config) {
//                         $(node).removeClass('btn-secondary')
//                     }
//                 },
//                 {
//                     text: 'Not Interested',
//                     className: 'btn-danger fail-btn',
//                     action: function () {
//                         that.filter('Not Interested');
//                     },
//                     init: function (api, node, config) {
//                         $(node).removeClass('btn-secondary')
//                     }
//                 },
//                 {
//                     text: 'All',
//                     className: 'btn-secondary all-btn',
//                     action: function () {
//                         that.filter('');
//                     },
//                     init: function (api, node, config) {
//                         $(node).removeClass('btn-secondary')
//                     }
//                 }
//             ],
//             dom: "<'row'<'col-xl-5 col-sm-6'f><'col-xl-3 col-sm-2'B>><'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>",

//             //   ajax: {

//             //       url: this._services.getApplicantData(),
//             //   },
//             ajax: null,
//             serverSide: false,
//             data: this.applicantData,
//             columns: [
//                 {
//                     title: this._services.translate.instant('Id'),
//                     width: 10,
//                     data: 'id',
//                     render: function (data, type, row) {
//                         return data ? data : '-';
//                     }
//                 },
//                 {
//                     title: this._services.translate.instant('Job Id'),
//                     width: 90,
//                     data: 'jobID',
//                     render: function (data, type, row) {
//                         return data ? data : '-';
//                     }
//                 },
//                 {


//                     title: this._services.translate.instant('Name'),
//                     width: 200,
//                     data: 'name',
//                     render: function (data, type, row) {
//                         return data ? data : '-';
//                     }
//                 },
//                 {
//                     title: this._services.translate.instant('Email'),
//                     width: 200,
//                     data: 'email',
//                     render: function (data, type, row) {
//                         return data ? data : '-';
//                     }
//                 },
//                 {
//                     title: this._services.translate.instant('Phone'),
//                     width: 100,
//                     data: 'phone',
//                     render: function (data, type, row) {
//                         return data ? data : '-';
//                     }
//                 },

//                 {
//                     title: this._services.translate.instant('Education'),
//                     width: 100,
//                     data: 'education',
//                     render: function (data, type, row) {
//                         return data ? data : '-';
//                     }
//                 },
//                 {
//                     title: this._services.translate.instant('Experience'),
//                     width: 100,
//                     data: 'experience',
//                     render: function (data, type, row) {
//                         return data ? data : '-';
//                     }
//                 },
//                 {
//                     title: this._services.translate.instant('Interviewer Remark'),
//                     width: 150,
//                     data: 'interviewer_remark',
//                     render: function (data, type, row) {
//                         if(!data) {
//                             data = 'New';
//                         } else {
//                             if(data == 'interested') {
//                                 data = 'Interested';
//                             } else {
//                                 data = 'Not Interested';
//                             }
//                         }
//                         return data;
//                     }
//                 },
//                 {
//                     title: this._services.translate.instant('Summary'),
//                     width: 200,
//                     data: 'summary',
//                     render: function (data, type, row) {
//                         return data ? data : '-';
//                     }
//                 },
//                 {
//                     title: this._services.translate.instant('CV'),
//                     width: 15,
//                     data: 'cv',
//                     render: function (data, type, row) {
//                         return data ? data : '-';
//                     }
//                 },
//                 {
//                     title: this._services.translate.instant('DATATABLE.action'),
//                     width: 200
//                 }
//             ],
//             columnDefs: [
//                 {
//                     className: "dt-center", targets: "_all"
//                 },
//                 {
//                     targets: -1,
//                     orderable: !1,
//                     data: null,
//                     render: function (data, type, row) {
//                         const edit = `
//                         <a data-id="${data.id}" data-status="${row.isAvailable}" class="m-portlet__nav-link btn m-btn m-btn--hover-primary m-btn--icon 
// 								m-btn--icon-only m-btn--pill btn-more" title="${that._services.translate.instant('Details')}">
// 								<i class="la la-comment"></i>
// 							</a>
//                           <a data-id="${data.id}" data-status="${row.isAvailable}" class="m-portlet__nav-link btn m-btn m-btn--hover-primary m-btn--icon 
// 								m-btn--icon-only m-btn--pill btn-edit" title="${that._services.translate.instant('Edit Details')}">
// 								<i class="la la-edit"></i>
// 							</a>
//                       `
//                         return edit;
//                     }
//                 }
//             ]
//         }
//         this.dataTable = ($('#datatable') as any).DataTable(this._services.dataTableGlobalConfig(this.customConfig, '#datatable'));
//         this.dataTable.on('xhr', (e, settings, json) => {
//             this._services.ENCRYPTION ? this.data = this._services.decryption(json.data).data : this.data = json.data.data;
//         }

//         );
//         if (this.isReload === false) {
//             this.isReload = true;
//             this.initTableEvents();
//         }
//     }

//     initTableEvents() {
//         let that = this;
//         this.dataTable.on("click", ".btn-edit", function () {
//             that.id = $(this).data('id');
//             let rowObj = that.applicantData.filter(obj => {
//                 return obj.id === that.id;
//             });
//             that.rowData = rowObj[0];
//             that._services.router.navigate(['applicant/applicant/form', 'edit'], { queryParams: that.rowData });
//             // that._services.router.navigate(['job-description/job-description/form', 'edit'], { queryParams: that._services.encryption(that.rowData, true) });
//             // that._services.router.navigate(['seller/seller/form', 'edit'], { queryParams: { 'name': that._services.encryption(name, true), 'dob': that._services.encryption(dob, true) } });
//         });

//         this.dataTable.on("click", ".btn-more", function () {
//             that.id = $(this).data('id');
//             let rowObj = that.applicantData.filter(obj => {
//                 return obj.id === that.id;
//             });
//             that.rowData = rowObj[0];
//             that._services.router.navigate(['applicant/applicant/detail'], { queryParams: that.rowData });
//         });

//     }

//     dataTableReload() {
//         this._services.showLoader();
//         if (this.dataTable) {
//             this.dataTable.draw();
//         } else {
//             this.initTable();
//         }
//         // this.dataTable.destroy();
//         // this.initTable();

//         // Note: .draw() will trigger datatable to call api to update the status, current state will remain 
//         // use destroy and reinit if when to update the whole datatable
//     }

// }
