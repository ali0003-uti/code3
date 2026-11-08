
// ===== STS token core (ported from the vendor's STSDll.dll, verified against it) =====
const STS = (function(){
const PC1=[57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4], PC2=[14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32], SHIFTS=[1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1], IP=[58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7], FP=[40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25], SBOX=[[14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7, 0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8, 4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0, 15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13], [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10, 3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5, 0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15, 13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9], [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8, 13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1, 13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7, 1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12], [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15, 13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9, 10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4, 3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14], [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9, 14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6, 4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14, 11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3], [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11, 10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8, 9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6, 4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13], [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1, 13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6, 1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2, 6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12], [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7, 1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2, 7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8, 2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]], EXP=[32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15, 16, 17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27, 28, 29, 28, 29, 30, 31, 32, 1], PBOX=[16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14, 32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25];
const T1=[14, 10, 7, 9, 12, 3, 2, 5, 13, 0, 15, 1, 4, 8, 6, 11], T2=[12, 8, 2, 13, 7, 6, 1, 3, 11, 5, 9, 15, 0, 4, 10, 14], T3=[26, 45, 14, 47, 8, 59, 34, 57, 0, 1, 17, 15, 11, 39, 60, 40, 5, 13, 28, 41, 30, 23, 31, 48, 29, 46, 19, 49, 33, 54, 52, 51, 25, 63, 20, 32, 4, 7, 3, 62, 16, 53, 38, 37, 61, 12, 36, 6, 50, 9, 58, 27, 43, 56, 22, 2, 35, 44, 21, 24, 18, 10, 42, 55];

function hexToBytes(h){ h=h.replace(/\s+/g,''); const o=[]; for(let i=0;i<h.length;i+=2) o.push(parseInt(h.substr(i,2),16)); return o; }
function bytesToHex(b){ return b.map(x=>x.toString(16).padStart(2,'0')).join('').toUpperCase(); }
function toBits(b){ const o=[]; for(let i=0;i<b.length*8;i++) o.push((b[i>>3]>>(7-(i&7)))&1); return o; }
function fromBits(bt){ const o=new Array(bt.length>>3).fill(0); for(let i=0;i<bt.length;i++) if(bt[i]) o[i>>3]|=0x80>>(i&7); return o; }
const perm=(bits,t)=>t.map(i=>bits[i-1]);

function subkeys(key){
  const k=perm(toBits(key),PC1); let c=k.slice(0,28), d=k.slice(28); const out=[];
  for(let r=0;r<16;r++){ const s=SHIFTS[r]; c=c.slice(s).concat(c.slice(0,s)); d=d.slice(s).concat(d.slice(0,s)); out.push(perm(c.concat(d),PC2)); }
  return out;
}
function des(block,key,encrypt){
  const ks=subkeys(key); const sk=encrypt?ks:ks.slice().reverse();
  const b=perm(toBits(block),IP); let L=b.slice(0,32), R=b.slice(32);
  for(let r=0;r<16;r++){
    const e=perm(R,EXP).map((x,i)=>x^sk[r][i]); const f=[];
    for(let s=0;s<8;s++){
      const g=e.slice(s*6,s*6+6); const row=(g[0]<<1)|g[5]; const col=(g[1]<<3)|(g[2]<<2)|(g[3]<<1)|g[4];
      const v=SBOX[s][row*16+col]; f.push((v>>3)&1,(v>>2)&1,(v>>1)&1,v&1);
    }
    const p=perm(f,PBOX); const nr=L.map((x,i)=>x^p[i]); L=R; R=nr;
  }
  return fromBits(perm(R.concat(L),FP));
}
function staEncrypt(data,key){
  data=data.slice(); let k=toBits(key.map(x=>x^0xff));
  k=k.slice(64-12).concat(k.slice(0,64-12));
  for(let r=0;r<16;r++){
    for(let i=0;i<16;i++){
      const byte=data[i>>1]; let keep,nib,sh;
      if(i%2===0){ keep=byte&0x0f; nib=byte>>4; sh=4; } else { keep=byte&0xf0; nib=byte&0x0f; sh=0; }
      const t=(k[4*i]===1)?T2:T1; data[i>>1]=(keep|(t[nib]<<sh))&255;
    }
    const b=toBits(data), p=new Array(64).fill(0);
    for(let i=0;i<64;i++) p[63-T3[i]]=b[i];
    data=fromBits(p); k=k.slice(1).concat(k.slice(0,1));
  }
  return data;
}
function crc16(bs){ let c=0xFFFF; for(const b of bs){ let t=(c^b)&255; for(let i=0;i<8;i++) t=(t&1)?((t>>1)^0xA001):(t>>1); c=(c>>8)^t; } return c&0xFFFF; }
function encAmount(kwh){
  let a=Number(kwh); const rte=x=>{const f=Math.floor(x), d=x-f; if(d>0.5) return f+1; if(d<0.5) return f; return (f%2===0)?f:f+1;};
  if(a<1638.4) a=a*10;
  else if(a<18022.4){ a=rte((Math.floor(a+0.5)*10-16380)/10)+16384; }
  else if(a<=181862.4){ a=rte((Math.floor(a+5.5)-18022.4)/10)+32768; }
  else { a=rte((Math.floor(a+50.5)-181862.4)/100)+49152; }
  return rte(a);
}
function makeMeterKey(p){ // p: iin,drn,kt,sgc,ti,krn,vk1,vk2,dkga
  const pan=hexToBytes((p.iin.slice(1)+p.drn).slice(0,16));
  const cb=hexToBytes(p.kt+p.sgc+p.ti+p.krn+'FFFFFF');
  const x=cb.map((v,i)=>v^pan[i]); const vk1=hexToBytes(p.vk1).slice(0,8);
  let o;
  if(p.dkga==='1'){ o=des(vk1,x,true).map((v,i)=>v^vk1[i]); }
  else if(p.dkga==='2'){ o=des(x,vk1,true).map((v,i)=>v^x[i]^vk1[i]); }
  else if(p.dkga==='3'){ const vk2=hexToBytes(p.vk2).slice(0,8); o=des(x,vk1,true); o=des(o,vk2,false); o=des(o,vk1,true); o=o.map((v,i)=>v^x[i]); }
  else throw new Error('DKGA');
  return bytesToHex(o);
}
function tokenCreate(cls,sub,rnd,tid,kwh,keyHex){
  const amt=encAmount(kwh);
  const b=[cls&3,((sub&15)<<4)|(rnd&15),(tid>>>16)&255,(tid>>>8)&255,tid&255,(amt>>8)&255,amt&255];
  let c=crc16(b); c=((c&255)<<8)|(c>>8);
  const enc=staEncrypt(b.slice(1).concat([c>>8,c&255]),hexToBytes(keyHex));
  let v=BigInt('0x'+bytesToHex(enc));
  const top2=(v>>27n)&3n;
  v=(v&~(3n<<27n))|(BigInt(cls&3)<<27n);
  return ((top2<<64n)|v).toString().padStart(20,'0');
}
const fmt=t=>t.replace(/(\d{4})(?=\d)/g,'$1 ');
return {hexToBytes,bytesToHex,des,staEncrypt,crc16,encAmount,makeMeterKey,tokenCreate,fmt};
})();
if(typeof module!=='undefined') module.exports=STS;
