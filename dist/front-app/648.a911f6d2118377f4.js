"use strict";(self.webpackChunkFront_app=self.webpackChunkFront_app||[]).push([[648],{3648:(w,p,r)=>{r.r(p),r.d(p,{ScannerModule:()=>J});var l=r(6895),a=r(9030),c=r(1663),o=r(4650),f=r(529);let v=(()=>{class t{constructor(e){this.httpClient=e}findQRcodeById(e){return console.log("Buscando "+e),this.httpClient.get(c.M5+"/qrcode/"+e+"/false",c.ob)}}return t.\u0275fac=function(e){return new(e||t)(o.LFG(f.eN))},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var u=r(9211),m=r(9325),g=r(9176),h=r(9726),S=r(1142);function C(t,i){1&t&&o._UZ(0,"spa-load")}function q(t,i){1&t&&(o.TgZ(0,"span",12),o._uU(1," thermostat "),o.qZA())}function Z(t,i){1&t&&(o.TgZ(0,"span",13),o._uU(1," sell "),o.qZA())}function x(t,i){if(1&t&&(o.TgZ(0,"p",14),o._uU(1),o.ALo(2,"moeda"),o.qZA()),2&t){const e=o.oxw(2);o.xp6(1),o.Oqu(o.lcZ(2,1,e.qrcode.preco))}}function y(t,i){1&t&&(o.TgZ(0,"h5",15),o._uU(1,"Super desconto"),o.qZA())}function I(t,i){if(1&t&&(o.TgZ(0,"div"),o.YNc(1,q,2,0,"span",3),o.YNc(2,Z,2,0,"span",4),o._UZ(3,"br"),o.TgZ(4,"div",5),o._UZ(5,"img",6),o.qZA(),o.TgZ(6,"div",7)(7,"h5"),o._uU(8),o.qZA(),o.TgZ(9,"span"),o._uU(10,"Bohemia"),o.qZA(),o.TgZ(11,"div",8)(12,"h2",9),o._uU(13),o.ALo(14,"moeda"),o.ALo(15,"moeda"),o.qZA(),o.YNc(16,x,3,3,"p",10),o.YNc(17,y,2,0,"h5",11),o.qZA()()()),2&t){const e=o.oxw();o.xp6(1),o.Q6J("ngIf",e.qrcode.produto.estoque.estoqueAtual<10),o.xp6(1),o.Q6J("ngIf",e.qrcode.desconto/e.qrcode.preco>.2),o.xp6(3),o.cQ8("src","",e.HOST,"/produto/imagem/",e.qrcode.produto.codigo,"/300/",e.qrcode.produto.imageOriginal.id,"",o.LSH),o.xp6(3),o.Oqu(e.qrcode.produto.descricao),o.xp6(5),o.Oqu(e.qrcode.desconto>0?o.lcZ(14,9,e.qrcode.preco-e.qrcode.desconto):o.lcZ(15,11,e.qrcode.preco)),o.xp6(3),o.Q6J("ngIf",e.qrcode.desconto>0),o.xp6(1),o.Q6J("ngIf",e.qrcode.desconto/e.qrcode.preco>.7)}}function T(t,i){1&t&&(o.TgZ(0,"div")(1,"div",7)(2,"div",16)(3,"p",17)(4,"span",18),o._uU(5," sick "),o.qZA()(),o.TgZ(6,"h3",19),o._uU(7,"Ooops, produto sem estoque"),o.qZA()()()())}let P=(()=>{class t{constructor(e,n,s,d){this.activeRoute=e,this.qrcodeService=n,this.pedidoService=s,this.router=d,this.nameButton="Comprar",this.qrcode={},this.produtos=[],this.parceiro={},this.HOST=c.M5,this.isLoad=!0,this.isStock=!0}ngOnInit(){this.buscaProduto()}buscaProduto(){try{this.activeRoute.params.subscribe(e=>{this.qrcodeService.findQRcodeById(e.qrcode).subscribe(s=>{localStorage.setItem("qrcode",JSON.stringify(s)),localStorage.setItem("parceiro",JSON.stringify(s.parceiro)),this.qrcode=s,console.log(JSON.stringify(this.qrcode)),(this.qrcode.produto.estoque.estoqueAtual<=0||"ATIVO"!=this.qrcode.status.toString())&&(this.isStock=!1,this.nameButton="Escanear"),this.isLoad=!1}),null!=localStorage.getItem("parceiro")&&(this.parceiro=JSON.parse(localStorage.getItem("parceiro")))},e=>{alert()})}catch{console.log("Error")}}ngOnDestroy(){}enviar(){"Comprar"==this.nameButton?(this.pedidoService.adicionar(this.qrcode),this.router.navigate(["/cart"])):this.router.navigate(["/scan"])}}return t.\u0275fac=function(e){return new(e||t)(o.Y36(a.gz),o.Y36(v),o.Y36(u.$),o.Y36(a.F0))},t.\u0275cmp=o.Xpm({type:t,selectors:[["spa-produto"]],decls:6,vars:6,consts:[[4,"ngIf"],[1,"container","text-center","box-center"],[3,"nameButton","isView","isViewIcons","eventFooter"],["class","material-symbols-outlined svg2",4,"ngIf"],["class","material-symbols-outlined svg",4,"ngIf"],[1,"container"],[1,"img-fluid","mx-auto","d-block","image",2,"width","70%",3,"src"],[1,"container","p-4"],[1,"mt-2"],[1,"display-3",2,"letter-spacing","2px"],["class","text-decoration-line-through text-warning h5","style","letter-spacing: 2px;font-family: initial",4,"ngIf"],["class","text-success",4,"ngIf"],[1,"material-symbols-outlined","svg2"],[1,"material-symbols-outlined","svg"],[1,"text-decoration-line-through","text-warning","h5",2,"letter-spacing","2px","font-family","initial"],[1,"text-success"],[1,"container",2,"color","#ffd9d9","padding-top","40%"],[1,"text-center"],[1,"material-symbols-outlined","big"],["id","status-pagamento",1,"text-center"]],template:function(e,n){1&e&&(o._UZ(0,"spa-top"),o.YNc(1,C,1,0,"spa-load",0),o.TgZ(2,"div",1),o.YNc(3,I,18,13,"div",0),o.YNc(4,T,8,0,"div",0),o.qZA(),o.TgZ(5,"spa-footer",2),o.NdJ("eventFooter",function(){return n.enviar()}),o.qZA()),2&e&&(o.xp6(1),o.Q6J("ngIf",n.isLoad),o.xp6(2),o.Q6J("ngIf",!n.isLoad&&n.isStock),o.xp6(1),o.Q6J("ngIf",!n.isStock),o.xp6(1),o.Q6J("nameButton",n.nameButton)("isView",!n.isLoad)("isViewIcons",n.isStock))},dependencies:[l.O5,m.c,g.P,h.y,S.Y],styles:['.svg[_ngcontent-%COMP%]{position:absolute;color:#e7dc92;margin-right:2px;right:0;font-size:42px}.svg2[_ngcontent-%COMP%]{padding-top:11px;position:absolute;color:#ffe3e3;margin-left:4px;left:0;font-size:50px}.svg[_ngcontent-%COMP%]{padding-top:15px;font-variation-settings:"FILL" 1}']}),t})();var A=r(553),O=r(6067);const Q=[{path:"",component:(()=>{class t{constructor(e,n,s,d){this.mensagemService=e,this.pedidoService=n,this.routerService=s,this.router=d,this.isViewIcons=!1}ngOnDestroy(){stop()}ngOnInit(){this.pedidoService.isEmpty()||(this.isViewIcons=!0),initScan()}enviar(){this.voltar()}voltar(){if("/"==this.routerService.previosPage)if(null!=localStorage.getItem("qrcode")){var e=JSON.parse(localStorage.getItem("qrcode"));this.router.navigate(["/scan/"+e.id])}else this.pedidoService.isEmpty()?this.mensagemService.sendMesage(["alert","Ooopa, quase l\xe1.","Scanei um qrcode para continuar."],!1,!0,8e3):this.router.navigate(["/cart"]);else this.router.navigate([this.routerService.previosPage]);console.log("URL "+this.routerService.previosPage)}redirec(){var e=qrcode();console.log("URL "+e),e.length>20&&this.router.navigate(["/scan/"+e.substring(e.lastIndexOf("/"))])}}return t.\u0275fac=function(e){return new(e||t)(o.Y36(A.w),o.Y36(u.$),o.Y36(O.c),o.Y36(a.F0))},t.\u0275cmp=o.Xpm({type:t,selectors:[["spa-qr-code"]],decls:6,vars:6,consts:[[3,"setViewParceiro"],["id","eventBT",3,"click"],["id","canvas","width","500"],["id","icon",1,"d-flex","justify-content-center"],["src","assets/img/scan-load.gif",1,"rounded","mx-auto","d-block",2,"width","50%"],[3,"nameButton","isViewCest","isView","color","colorIcons","eventVoltar","eventFooter"]],template:function(e,n){1&e&&(o._UZ(0,"spa-top",0),o.TgZ(1,"div",1),o.NdJ("click",function(){return n.redirec()}),o.qZA(),o._UZ(2,"canvas",2),o.TgZ(3,"div",3),o._UZ(4,"img",4),o.qZA(),o.TgZ(5,"spa-footer",5),o.NdJ("eventVoltar",function(){return n.voltar()})("eventFooter",function(){return n.enviar()}),o.qZA()),2&e&&(o.Q6J("setViewParceiro",!1),o.xp6(5),o.Q6J("nameButton","Voltar")("isViewCest",n.isViewIcons)("isView",!1)("color","#fccf07aa")("colorIcons","#fccf07"))},dependencies:[m.c,g.P],styles:['#canvas[_ngcontent-%COMP%]{width:100%;height:100vh;background-color:#000;z-index:1;position:absolute}#icon[_ngcontent-%COMP%]{position:absolute;z-index:2;color:#0ff;width:100%;height:80vh;display:flex!important;flex-direction:row!important;justify-content:center!important;align-items:center!important;padding-top:25%!important;margin:auto!important}.material-symbols-outlined[_ngcontent-%COMP%]{color:#fdcf06!important;font-variation-settings:"FILL" 0,"wght" 100,"GRAD" -25,"opsz" 20}']}),t})()},{path:":qrcode",component:P}];let _=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[a.Bz.forChild(Q),a.Bz]}),t})(),J=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[l.ez,_]}),t})()}}]);