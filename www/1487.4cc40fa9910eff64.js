"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1487],{1487:(Z,u,a)=>{a.r(u),a.d(u,{SettingsPageModule:()=>_});var S=a(6814),f=a(6223),h=a(9864),l=a(878),s=a(6800),L=a(5861),g=a(9421),e=a(9212),v=a(553),M=a(6709),C=a(5514);class m{}m.GET_LOCALIZATION_BY_SHOW_BY_FIELD_APP_SCRIPT=v.N.appScriptApiURL+"?sheetid="+v.N.SpreadsheetId+"&visualize=chart&showby={SHOW_BY}&sheetname=Vehicles";let A=(()=>{var n;class i{constructor(t,o){this.securityService=t,this.networkService=o,this.showBy=new Array,this.LoadMetaData()}LoadMetaData(){}loadVisualization(t,o,c){this.networkService.get(m.GET_LOCALIZATION_BY_SHOW_BY_FIELD_APP_SCRIPT.replace("{SHOW_BY}",t),d=>{o(d)},()=>{c()})}}return(n=i).\u0275fac=function(t){return new(t||n)(e.LFG(M.I),e.LFG(C.S))},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),i})();var p=a(5889),O=a(643);function I(n,i){if(1&n){const r=e.EpF();e.TgZ(0,"ion-item"),e._UZ(1,"ion-icon",6),e._uU(2),e.ALo(3,"translate"),e.TgZ(4,"ion-button",3),e.NdJ("click",function(){e.CHM(r);const o=e.oxw();return e.KtG(o.reloadMetaDataButtonClicked())}),e._UZ(5,"ion-icon",7),e.qZA()()}2&n&&(e.xp6(2),e.hij(" ",e.lcZ(3,1,"SETTINGS_PAGE.REFRESHMETADATA")," "))}const T=[{path:"",component:(()=>{var n;class i{constructor(t,o,c,d,U){this.router=t,this.loadingController=o,this.visualizationService=c,this.localStorageService=d,this.languageService=U,this.languageSelected="en",this.languageSelectedLabel="English",this.loggedInUser=new g.n(JSON.parse("{}")),this.router.events.forEach(G=>{G instanceof s.m2&&this.serveBasedOnUserRole()})}serveBasedOnUserRole(){var t;this.loggedInUser=null!==(t=this.localStorageService.StoredPreference.LoggedInUser)&&void 0!==t?t:new g.n({})}loadLocalizationDetails(){var t;this.languageSelected=null!==(t=this.localStorageService.StoredPreference.SelectedLanguage)&&void 0!==t?t:"en",this.updateSelectedLanguageLabel()}ngAfterViewInit(){var t;this.loadLocalizationDetails(),this.loggedInUser=null!==(t=this.localStorageService.StoredPreference.LoggedInUser)&&void 0!==t?t:new g.n({})}ngOnInit(){var t;this.loggedInUser=null!==(t=this.localStorageService.StoredPreference.LoggedInUser)&&void 0!==t?t:new g.n({})}languageChangeButtonClicked(){this.languageService.presentLanguageSelctionMenu(()=>{this.initializeLoader("SETTINGS_PAGE.CHANGING_LANGUAGE_MESSAGE"),setTimeout(()=>{this.updateSelectedLanguageLabel()},3e3)})}reloadMetaDataButtonClicked(){this.resetMetaData()}resetMetaData(){this.visualizationService.showBy=new Array}updateSelectedLanguageLabel(){var t;this.languageSelected=null!==(t=this.localStorageService.StoredPreference.SelectedLanguage)&&void 0!==t?t:"en",this.languageService.getLanguageList().forEach(o=>{o.value===this.languageSelected&&(this.languageSelectedLabel=o.label)})}initializeLoader(t){var o=this;return(0,L.Z)(function*(){o.loading=yield o.loadingController.create({message:o.languageService.translate(t),duration:4e3}),o.loading.present()})()}}return(n=i).\u0275fac=function(t){return new(t||n)(e.Y36(s.F0),e.Y36(l.HT),e.Y36(A),e.Y36(p.n),e.Y36(O.T))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-settings"]],decls:18,vars:8,consts:[["name","options-outline","slot","start"],["name","language","slot","start"],["slot","end"],["slot","end",3,"click"],["name","pencil","slot","icon-only"],[4,"ngIf"],["name","reload-outline","slot","start"],["name","play-circle-outline","slot","icon-only"]],template:function(t,o){1&t&&(e.TgZ(0,"ion-content")(1,"ion-card")(2,"ion-card-header")(3,"ion-item"),e._UZ(4,"ion-icon",0),e._uU(5),e.ALo(6,"translate"),e.qZA()(),e.TgZ(7,"ion-card-content")(8,"ion-list")(9,"ion-item"),e._UZ(10,"ion-icon",1),e._uU(11),e.ALo(12,"translate"),e.TgZ(13,"ion-label",2),e._uU(14),e.qZA(),e.TgZ(15,"ion-button",3),e.NdJ("click",function(){return o.languageChangeButtonClicked()}),e._UZ(16,"ion-icon",4),e.qZA()(),e.YNc(17,I,6,3,"ion-item",5),e.qZA()()()()),2&t&&(e.xp6(5),e.hij(" ",e.lcZ(6,4,"SETTINGS_PAGE.PREFERENCE")," "),e.xp6(6),e.hij(" ",e.lcZ(12,6,"SETTINGS_PAGE.LANGUAGE")," "),e.xp6(3),e.hij(" ",o.languageSelectedLabel,""),e.xp6(3),e.Q6J("ngIf","Admin"===o.loggedInUser.Role||"SuperAdmin"===o.loggedInUser.Role))},dependencies:[S.O5,l.YG,l.PM,l.FN,l.Zi,l.W2,l.gu,l.Ie,l.Q$,l.q_,h.X$],styles:["[_nghost-%COMP%]   ion-content[_ngcontent-%COMP%]{--background: url(/assets/bg20.JPG) 0 0/100% 100% no-repeat ;background-size:cover;color:#000;--overflow: hidden}[_nghost-%COMP%]   ion-card[_ngcontent-%COMP%], [_nghost-%COMP%]   ion-item[_ngcontent-%COMP%], [_nghost-%COMP%]   ion-icon[_ngcontent-%COMP%], [_nghost-%COMP%]   ion-list[_ngcontent-%COMP%], [_nghost-%COMP%]   ion-card-header[_ngcontent-%COMP%], [_nghost-%COMP%]   ion-list-header[_ngcontent-%COMP%], [_nghost-%COMP%]   ion-card-content[_ngcontent-%COMP%], [_nghost-%COMP%]   on-label[_ngcontent-%COMP%]{align-items:center;justify-content:center;background:none;color:#000}.toolbar-backgorund[_ngcontent-%COMP%]{--background: linear-gradient(180deg, var(--ion-color-dark), var(--ion-color-medium-contrast));color:#000}"]}),i})()}];let E=(()=>{var n;class i{}return(n=i).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[s.Bz.forChild(T),s.Bz]}),i})(),_=(()=>{var n;class i{}return(n=i).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[S.ez,f.u5,l.Pc,E,h.aw.forChild()]}),i})()}}]);