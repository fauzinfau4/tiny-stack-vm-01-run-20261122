import{readdirSync as R,readFileSync as F,mkdirSync as M,writeFileSync as W}from'fs'
let E=process.env,I=E.MAKEFUN_INPUT_DIR||'/input',O=E.MAKEFUN_OUTPUT_DIR||'/output'
for(let d of R(I)){let p=F(I+'/'+d+'/program.bin'),u=F(I+'/'+d+'/input.bin'),stk=new Int32Array(256),Y=[],C=[],o=Buffer.alloc(65536),s=0,g=s,t=s,j=s,l=s,e=s,n=p.length,k=O+'/'+d
for(;;){if(++t>1e6|g<0|g>=n){e=t>1e6?10:9;break}
// Packed opcode table: each char (code minus 34) packs operand length in op>>4, stack operands in op>>2&3, net push in op&3.
let op=`"3c&(,-1        +++++++'+++'+++ +++             BFFB"           '*              &&#&`.charCodeAt(p[g])-34,len=op>>4,pop=op>>2&3,push=op&3
e=!(op>=0)?5:g+len>=n?9:0;if(e)break
let x=g+1+len,z=p[g]
e=s<pop?2:s-pop+push>256?3:0;if(e)break
g=x
if(z<8){if(z<3)stk[s++]=z==1?p.readInt8(x-1):p.readInt32LE(x-4);else if(z==3)s--;else if(z==4|z==6)stk[s]=stk[s+1-(z>>1)],s++;else if(z==5)[stk[s-1],stk[s-2]]=[stk[s-2],stk[s-1]];else if(z==7)[stk[s-3],stk[s-2],stk[s-1]]=[stk[s-2],stk[s-1],stk[s-3]];else break}
else if(z<35){if(z==23|z==27)stk[s-1]=z==23?-stk[s-1]:~stk[s-1];else{let b=stk[s-1],a=stk[s-2],A=a>>>0,B=b>>>0;if(z>18&&z<23&&!b){e=4;break}stk[s-2]=z<19?z==16?a+b:z==17?a-b:Math.imul(a,b):z<23?z==19?a/b:z==20?a%b:z==21?A/B:A%B:z<27?z==24?a&b:z==25?a|b:a^b:z<31?z==28?a<<b:z==29?a>>b:a>>>b:z==32?a==b:z==33?a<b:A<B;s--}}
else if(z<53){let y=p[x-2]|p[x-1]<<8,r=y<<16>>16;if(z==48)g=x+r;else if(z<51){if((z==49)==!stk[--s])g=x+r}else if(z==51){if(C.length==64){e=7;break}C.push(x);g=y}else{if(!C.length){e=8;break}g=C.pop()}}
else if(z<66){let a=stk[s-1];if(a<0|a>255){e=6;break}if(z==64)stk[s-1]=Y[a];else{s-=2;Y[a]=stk[s]}}
else{if(z==80){let h=''+stk[--s];if(l+h.length>65536){e=11;break}l+=o.write(h,l)}else if(z==81){if(l>>16){e=11;break}o[l++]=stk[--s]}else if(z==82)stk[s++]=u[j++]??-1;else{e=stk[--s]&255;break}}
}
M(k,{recursive:!0});W(k+'/stdout.bin',o.subarray(0,l));W(k+'/exit.txt',e+'\n')}
