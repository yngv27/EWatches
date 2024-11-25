
class _todo {
  constructor() {
    this.list = [];
    this.hdr="";
    this.height = 44;
  }
  footer() {return( "\n".padStart(this.height-this.list.length,"\n"));}
  aa(task) {this.a("A", task);}
  ab(task) {this.a("B", task);}
  a(pri,task) {this.list.push({task: task, pri: pri.toUpperCase() /*, id: this.list.length*/});this.ls();}
  p(id, pri){this.list[id].pri = pri.toUpperCase();this.ls();}
  ls(ceil) {
    this.sort();
    if(!ceil) ceil='Z'; else ceil=ceil.toUpperCase();
    let lastLevel = ' ';
    print(this.hdr); //"\n");
    this.list.filter((x)=>{ return x.pri <= ceil; }).forEach((t,i)=>{
      if(lastLevel != t.pri) { lastLevel = t.pri; print("-".padStart(48,"-")); }
      print(`${i.toString().padStart(2,' ')}  (${t.pri}) ${t.task}`);
    });
    print(this.footer());
  }
  d(id) {this.list.splice(id,1);this.ls();}
  top(id) {this.list.splice(0,0,this.list.splice(id,1)[0]); this.ls();}
  feh(id) {let t=this.list.splice(id,1); this.list.push(t[0]); this.ls();}
  sort() {
    this.list.sort((a,b)=>{return (a.pri >= b.pri ? 1 : -1);});
  }
}