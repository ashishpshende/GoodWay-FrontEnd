"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6410],{6410:(O,u,l)=>{l.r(u),l.d(u,{CreateParcelPageModule:()=>T});var s=l(6814),d=l(6223),t=l(878),p=l(6800),P=l(8356),e=l(9212),h=l(6530),f=l(643),A=l(8278),M=l(3864),C=l(9864);function m(n,c){if(1&n&&(e.TgZ(0,"ion-select-option",11),e._uU(1),e.qZA()),2&n){const g=c.$implicit;e.s9C("value",g),e.xp6(),e.hij(" ",g," ")}}const Z=[{path:"",component:(()=>{var n;class c{constructor(r,o,i,a,L,E,v){this.loadingCtrl=r,this.userService=o,this.alertController=i,this.languageService=a,this.parcelService=L,this.router=E,this.loaderService=v,this.cnTypes=[],this.parcel=new P.S({}),this.cnTypes=["TBB","Standard","Fragile"]}ngOnInit(){}goToParcelList(){const r={queryParams:{ts:(new Date).getMilliseconds()}};this.router.navigate(["home/parcel-list"],r)}saveButtonClicked(){this.loaderService.customLoader("Saving Parcel...",1e4),this.parcel.createdOn=(0,s.p6)(new Date,"dd-MM-yyyy hh:mm:ss","en-US","+0530"),this.parcel.updatedOn=(0,s.p6)(new Date,"dd-MM-yyyy hh:mm:ss","en-US","+0530"),this.parcelService.save(this.parcel,r=>{this.goToParcelList(),this.loaderService.dismissLoader()},()=>{this.loaderService.dismissLoader()})}}return(n=c).\u0275fac=function(r){return new(r||n)(e.Y36(t.HT),e.Y36(h.K),e.Y36(t.Br),e.Y36(f.T),e.Y36(A.V),e.Y36(p.F0),e.Y36(M.D))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-create-parcel"]],decls:99,vars:72,consts:[[1,"text-center"],["name","list-outline","slot","start"],["size","6"],["autocomplete","nope",1,"value",3,"ngModel","placeholder","ngModelChange"],["size","6",1,"value"],["multiple","false","cancelText","Cancel","okText","Select",3,"ngModel","placeholder","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],["autocomplete","nope",3,"ngModel","placeholder","ngModelChange"],["expand","block",3,"click"],["slot","start","name","close"],["slot","start","name","save"],[3,"value"]],template:function(r,o){1&r&&(e.TgZ(0,"ion-content")(1,"ion-card")(2,"ion-card-header",0)(3,"ion-item"),e._UZ(4,"ion-icon",1),e._uU(5),e.ALo(6,"translate"),e.qZA()(),e.TgZ(7,"ion-card-content")(8,"ion-list")(9,"ion-item")(10,"ion-grid")(11,"ion-row")(12,"ion-col",2),e._uU(13),e.ALo(14,"translate"),e.qZA(),e.TgZ(15,"ion-col",2)(16,"ion-input",3),e.NdJ("ngModelChange",function(a){return o.parcel.cnNo=a}),e.ALo(17,"translate"),e.qZA()()()()(),e.TgZ(18,"ion-item")(19,"ion-grid")(20,"ion-row")(21,"ion-col",2),e._uU(22),e.ALo(23,"translate"),e.qZA(),e.TgZ(24,"ion-col",4)(25,"ion-select",5),e.NdJ("ngModelChange",function(a){return o.parcel.cnType=a}),e.ALo(26,"translate"),e.YNc(27,m,2,2,"ion-select-option",6),e.qZA()()()()()()()(),e.TgZ(28,"ion-card")(29,"ion-card-header")(30,"ion-item"),e._UZ(31,"ion-icon",1),e._uU(32),e.ALo(33,"translate"),e.qZA()(),e.TgZ(34,"ion-card-content")(35,"ion-list")(36,"ion-item")(37,"ion-grid")(38,"ion-row")(39,"ion-col",2),e._uU(40),e.ALo(41,"translate"),e.qZA(),e.TgZ(42,"ion-col",2)(43,"ion-input",3),e.NdJ("ngModelChange",function(a){return o.parcel.quantity=a}),e.ALo(44,"translate"),e.qZA()()(),e.TgZ(45,"ion-row")(46,"ion-col",2),e._uU(47),e.ALo(48,"translate"),e.qZA(),e.TgZ(49,"ion-col",2)(50,"ion-input",3),e.NdJ("ngModelChange",function(a){return o.parcel.weight=a}),e.ALo(51,"translate"),e.qZA()()()()()()()(),e.TgZ(52,"ion-card")(53,"ion-card-header",0)(54,"ion-item"),e._UZ(55,"ion-icon",1),e._uU(56),e.ALo(57,"translate"),e.qZA()(),e.TgZ(58,"ion-card-content")(59,"ion-list")(60,"ion-item")(61,"ion-grid")(62,"ion-row")(63,"ion-col"),e._uU(64),e.ALo(65,"translate"),e.qZA(),e.TgZ(66,"ion-col",4)(67,"ion-input",7),e.NdJ("ngModelChange",function(a){return o.parcel.from=a}),e.ALo(68,"translate"),e.qZA()()(),e.TgZ(69,"ion-row")(70,"ion-col"),e._uU(71),e.ALo(72,"translate"),e.qZA(),e.TgZ(73,"ion-col",4)(74,"ion-input",7),e.NdJ("ngModelChange",function(a){return o.parcel.to=a}),e.ALo(75,"translate"),e.qZA()()(),e.TgZ(76,"ion-row")(77,"ion-col"),e._uU(78),e.ALo(79,"translate"),e.qZA(),e.TgZ(80,"ion-col",4)(81,"ion-input",7),e.NdJ("ngModelChange",function(a){return o.parcel.receiver=a}),e.ALo(82,"translate"),e.qZA()()(),e.TgZ(83,"ion-row")(84,"ion-col"),e._uU(85),e.ALo(86,"translate"),e.qZA(),e.TgZ(87,"ion-col",4)(88,"ion-input",7),e.NdJ("ngModelChange",function(a){return o.parcel.mobile=a}),e.ALo(89,"translate"),e.qZA()()()()()()()()(),e.TgZ(90,"ion-footer")(91,"ion-button",8),e.NdJ("click",function(){return o.goToParcelList()}),e._UZ(92,"ion-icon",9),e._uU(93),e.ALo(94,"translate"),e.qZA(),e.TgZ(95,"ion-button",8),e.NdJ("click",function(){return o.saveButtonClicked()}),e._UZ(96,"ion-icon",10),e._uU(97),e.ALo(98,"translate"),e.qZA()()),2&r&&(e.xp6(5),e.hij(" ",e.lcZ(6,30,"PARCEL_CREATE.BASIC_DETAILS")," "),e.xp6(8),e.hij("",e.lcZ(14,32,"PARCEL.CN_NO")," "),e.xp6(3),e.MGl("placeholder"," ",e.lcZ(17,34,"PARCEL.CN_NO"),""),e.Q6J("ngModel",o.parcel.cnNo),e.xp6(6),e.hij("",e.lcZ(23,36,"PARCEL.CN_TYPE")," "),e.xp6(3),e.MGl("placeholder"," ",e.lcZ(26,38,"PARCEL.CN_TYPE"),""),e.Q6J("ngModel",o.parcel.cnType),e.xp6(2),e.Q6J("ngForOf",o.cnTypes),e.xp6(5),e.hij(" ",e.lcZ(33,40,"PARCEL_CREATE.PACKAGE_DETAILS")," "),e.xp6(8),e.hij("",e.lcZ(41,42,"PARCEL.QUANTITY")," "),e.xp6(3),e.MGl("placeholder"," ",e.lcZ(44,44,"PARCEL.QUANTITY"),""),e.Q6J("ngModel",o.parcel.quantity),e.xp6(4),e.hij("",e.lcZ(48,46,"PARCEL.WEIGHT")," "),e.xp6(3),e.MGl("placeholder"," ",e.lcZ(51,48,"PARCEL.WEIGHT"),""),e.Q6J("ngModel",o.parcel.weight),e.xp6(6),e.hij(" ",e.lcZ(57,50,"PARCEL_CREATE.ADDRESS_DETAILS")," "),e.xp6(8),e.hij("",e.lcZ(65,52,"PARCEL.FROM")," "),e.xp6(3),e.MGl("placeholder"," ",e.lcZ(68,54,"PARCEL.FROM"),""),e.Q6J("ngModel",o.parcel.from),e.xp6(4),e.hij("",e.lcZ(72,56,"PARCEL.TO")," "),e.xp6(3),e.MGl("placeholder"," ",e.lcZ(75,58,"PARCEL.TO"),""),e.Q6J("ngModel",o.parcel.to),e.xp6(4),e.hij("",e.lcZ(79,60,"PARCEL.RECEIVER")," "),e.xp6(3),e.MGl("placeholder"," ",e.lcZ(82,62,"PARCEL.RECEIVER"),""),e.Q6J("ngModel",o.parcel.receiver),e.xp6(4),e.hij("",e.lcZ(86,64,"PARCEL.MOBILE")," "),e.xp6(3),e.MGl("placeholder"," ",e.lcZ(89,66,"PARCEL.MOBILE"),""),e.Q6J("ngModel",o.parcel.mobile),e.xp6(5),e.hij(" ",e.lcZ(94,68,"BUTTONS.CANCEL")," "),e.xp6(4),e.hij(" ",e.lcZ(98,70,"BUTTONS.SAVE"),"\n"))},dependencies:[s.sg,d.JJ,d.On,t.YG,t.PM,t.FN,t.Zi,t.wI,t.W2,t.fr,t.jY,t.gu,t.pK,t.Ie,t.q_,t.Nd,t.t9,t.n0,t.QI,t.j9,C.X$],styles:["[_nghost-%COMP%]   ion-content[_ngcontent-%COMP%]{--background: url(/assets/bg20.JPG) 0 0/100% 100% no-repeat;background-size:cover;background-color:#f0f8ff}.toolbar-backgorund[_ngcontent-%COMP%]{background-color:#f0f8ff}.user-profile-pic[_ngcontent-%COMP%]{width:60px;height:60px;display:block;margin-top:20px;margin-left:auto;margin-right:auto;background-color:#f0f8ff}ion-note[_ngcontent-%COMP%]{display:inline-block;font-size:16px;background-color:#f0f8ff;color:#000}ion-select[_ngcontent-%COMP%]{max-width:100%!important;width:100%!important;padding-left:0!important}ion-item.selected[_ngcontent-%COMP%]{background-color:#f0f8ff;color:#000}ion-card[_ngcontent-%COMP%]{color:#2c1d1d;background-color:#f0f8ff;padding:0;margin:0;border-radius:10px}ion-card-content[_ngcontent-%COMP%]{background-color:#f0f8ff;color:#130d0d}.user-results[_ngcontent-%COMP%], .user-results-list-header[_ngcontent-%COMP%]{background-color:#f0f8ff}.user-result-cell[_ngcontent-%COMP%]{background-color:#7fffd4;margin-top:10px}.list-image[_ngcontent-%COMP%], .user-icon[_ngcontent-%COMP%]{font-size:50px;color:#1f0707}.value[_ngcontent-%COMP%]{font-size:small;font-weight:200;padding-top:5px}.text-center[_ngcontent-%COMP%]{text-align:center;align-items:center}.bottom-area[_ngcontent-%COMP%]{position:fixed;left:0;bottom:0;right:0;background-color:gray;height:45px;margin-bottom:0}.bottom-button[_ngcontent-%COMP%]{border-width:1px;border-color:#3e2c2c;color:#fff;font-size:larger;font-weight:800;border-style:solid;width:50%;margin:5px auto auto}.custom-card[_ngcontent-%COMP%]{height:300px}.field-list[_ngcontent-%COMP%]{padding-left:10px}"]}),c})()}];let _=(()=>{var n;class c{}return(n=c).\u0275fac=function(r){return new(r||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[p.Bz.forChild(Z),p.Bz]}),c})(),T=(()=>{var n;class c{}return(n=c).\u0275fac=function(r){return new(r||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[s.ez,d.u5,t.Pc,_,C.aw.forChild()]}),c})()}}]);