import{r as t,s as e,c as a,d as s,o,a as l,b as u,t as c,f as n,g as r,F as d,u as i}from"./vendor.d81e73b6.js";import{b as g,r as b,n as m,P as f,A as p}from"./index.cf72bfb1.js";const y={name:"BugDetailsPage",setup(){const s=t({newBug:{}});return e((async()=>{try{await g.getById(b.currentRoute.value.params.id),await m.getById(b.currentRoute.value.params.id)}catch(t){f.toast(t)}})),{state:s,account:a((()=>p.account)),user:a((()=>p.user)),bug:a((()=>p.activeBug)),notes:a((()=>p.notes)),async closeBug(){await f.confirm("Are you sure?","this can't be undone!","warning","Close forever")&&g.close(this.bug.id),s.newBug={}},formatDate(t){const e=t.slice(0,10).split("-");return`${e[1]} / ${e[2]} / ${e[0]}`}}}},v={key:0,class:"BugDetailsPage flex-grow-1 row justify-content-center"},B={class:"col-md-5 mt-3 d-flex flex-column"},x=u("div",null,"Title:",-1),h={class:"ul"},k={key:0,class:"mt-auto"},w={class:"col-md-4 d-flex align-items-end"},A=u("img",{src:"/assets/computerBug.4aafb2bc.png",alt:"Computer Bug"},null,-1),C={class:"col-md-3 d-flex flex-column mt-3"},D={key:0},N=u("br",null,null,-1),I={class:"mt-auto"},R=n(" Status:"),j={key:0,class:"text-success text-large font-weight-bold ml-2"},P={key:1,class:"text-danger font-weight-bold text-large ml-2"},$={class:"col-11 border bthick border-info pb-5 mt-2 mb-5 bg-secondary"},E=u("b",{class:"mr-4"},"Description: ",-1),F={class:"col-12 d-flex"},L=u("h2",{class:"mt-auto"}," Notes: ",-1),M={class:"col-11 border bthick border-info mt-2 pb-4 bg-secondary"},O={class:"row"},S={key:0},T={key:1,class:"col-11"},q=n(" Nothing to show here... "),z=u("br",null,null,-1),G=u("i",{class:"mdi mdi-comment-processing"},null,-1),H=n(" add a note! ");y.render=function(t,e,a,g,b,m){const f=s("EditBug"),p=s("CreateNote"),y=s("NoteItem");return g.bug.id?(o(),l("div",v,[u("div",B,[x,u("h1",h,c(g.bug.title),1),g.bug.creator?(o(),l("div",k,[u("img",{src:g.bug.creator.picture,alt:"picture",class:"mr-3 my-2"},null,8,["src"]),n(" "+c(g.bug.creator.name),1)])):r("",!0),g.bug.closed||g.bug.creatorId!==g.account.id?r("",!0):(o(),l("button",{key:1,class:"btn btn-warning mx-auto mt-auto mb-2","data-toggle":"modal","data-target":"#editBugModal"+g.bug.id}," Edit Bug Report ",8,["data-target"])),u(f,{bug:g.bug},null,8,["bug"])]),u("div",w,[A,g.bug.closed||g.bug.creatorId!==g.account.id?r("",!0):(o(),l("button",{key:0,class:"btn btn-danger ml-3 mb-2",onClick:e[1]||(e[1]=(...t)=>g.closeBug&&g.closeBug(...t))}," Close Bug Report "))]),u("div",C,[g.bug.createdAt?(o(),l("div",D,[u("span",null,"Created: "+c(g.formatDate(g.bug.createdAt)),1),N,u("span",null,"Last modified: "+c(g.formatDate(g.bug.updatedAt)),1)])):r("",!0),u("div",I,[R,g.bug.closed?r("",!0):(o(),l("span",j,"Open")),g.bug.closed?(o(),l("span",P,"Closed")):r("",!0)])]),u("div",$,[E,n(" "+c(g.bug.description),1)]),u("div",F,[L,g.user.isAuthenticated?(o(),l("button",{key:0,class:"btn btn-success px-5 ml-4 mt-auto mb-2","data-toggle":"modal","data-target":"#createNewNote"+g.bug.id}," Add ",8,["data-target"])):r("",!0)]),u(p,{bug:g.bug},null,8,["bug"]),u("div",M,[u("div",O,[0==!g.notes.length?(o(),l("div",S,[(o(!0),l(d,null,i(g.notes,(t=>(o(),l("div",{key:t.id},[u(y,{note:t},null,8,["note"])])))),128))])):(o(),l("div",T,[q,z,G,H]))])])])):r("",!0)};export default y;