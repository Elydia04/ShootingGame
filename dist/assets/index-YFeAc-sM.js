var Nl=Object.defineProperty;var Ul=(r,e,t)=>e in r?Nl(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var Do=(r,e,t)=>Ul(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ho="160",Ol=0,No=1,Fl=2,Oc=1,Fc=2,Mn=3,En=0,Nt=1,an=2,Fn=0,Ri=1,Uo=2,Oo=3,Fo=4,Bl=5,Qn=100,zl=101,kl=102,Bo=103,zo=104,Gl=200,Hl=201,Vl=202,Wl=203,Yr=204,Kr=205,Xl=206,ql=207,jl=208,Yl=209,Kl=210,$l=211,Zl=212,Jl=213,Ql=214,eh=0,th=1,nh=2,Xs=3,ih=4,sh=5,rh=6,oh=7,Bc=0,ah=1,ch=2,Bn=0,lh=1,hh=2,uh=3,zc=4,dh=5,fh=6,ko="attached",ph="detached",kc=300,Pi=301,Ii=302,$r=303,Zr=304,Qs=306,Di=1e3,$t=1001,qs=1002,vt=1003,Jr=1004,Vs=1005,Ft=1006,Gc=1007,si=1008,zn=1009,mh=1010,gh=1011,uo=1012,Hc=1013,Un=1014,bn=1015,is=1016,Vc=1017,Wc=1018,ti=1020,_h=1021,Zt=1023,xh=1024,yh=1025,ni=1026,Ni=1027,vh=1028,Xc=1029,Mh=1030,qc=1031,jc=1033,cr=33776,lr=33777,hr=33778,ur=33779,Go=35840,Ho=35841,Vo=35842,Wo=35843,Yc=36196,Xo=37492,qo=37496,jo=37808,Yo=37809,Ko=37810,$o=37811,Zo=37812,Jo=37813,Qo=37814,ea=37815,ta=37816,na=37817,ia=37818,sa=37819,ra=37820,oa=37821,dr=36492,aa=36494,ca=36495,Sh=36283,la=36284,ha=36285,ua=36286,ss=2300,Ui=2301,fr=2302,da=2400,fa=2401,pa=2402,bh=2500,wh=0,Kc=1,Qr=2,$c=3e3,ii=3001,Eh=3200,Th=3201,Zc=0,Ah=1,Jt="",st="srgb",pt="srgb-linear",fo="display-p3",er="display-p3-linear",js="linear",it="srgb",Ys="rec709",Ks="p3",li=7680,ma=519,Rh=512,Ch=513,Lh=514,Jc=515,Ph=516,Ih=517,Dh=518,Nh=519,eo=35044,ga="300 es",to=1035,wn=2e3,$s=2001;class ki{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const Tt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let _a=1234567;const Qi=Math.PI/180,Oi=180/Math.PI;function sn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Tt[r&255]+Tt[r>>8&255]+Tt[r>>16&255]+Tt[r>>24&255]+"-"+Tt[e&255]+Tt[e>>8&255]+"-"+Tt[e>>16&15|64]+Tt[e>>24&255]+"-"+Tt[t&63|128]+Tt[t>>8&255]+"-"+Tt[t>>16&255]+Tt[t>>24&255]+Tt[n&255]+Tt[n>>8&255]+Tt[n>>16&255]+Tt[n>>24&255]).toLowerCase()}function Rt(r,e,t){return Math.max(e,Math.min(t,r))}function po(r,e){return(r%e+e)%e}function Uh(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Oh(r,e,t){return r!==e?(t-r)/(e-r):0}function es(r,e,t){return(1-t)*r+t*e}function Fh(r,e,t,n){return es(r,e,1-Math.exp(-t*n))}function Bh(r,e=1){return e-Math.abs(po(r,e*2)-e)}function zh(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function kh(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Gh(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Hh(r,e){return r+Math.random()*(e-r)}function Vh(r){return r*(.5-Math.random())}function Wh(r){r!==void 0&&(_a=r);let e=_a+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Xh(r){return r*Qi}function qh(r){return r*Oi}function no(r){return(r&r-1)===0&&r!==0}function jh(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Zs(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Yh(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),l=s((e+n)/2),h=o((e+n)/2),u=s((e-n)/2),d=o((e-n)/2),f=s((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":r.set(a*h,c*u,c*d,a*l);break;case"YZY":r.set(c*d,a*h,c*u,a*l);break;case"ZXZ":r.set(c*u,c*d,a*h,a*l);break;case"XZX":r.set(a*h,c*g,c*f,a*l);break;case"YXY":r.set(c*f,a*h,c*g,a*l);break;case"ZYZ":r.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function cn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Je(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Kh={DEG2RAD:Qi,RAD2DEG:Oi,generateUUID:sn,clamp:Rt,euclideanModulo:po,mapLinear:Uh,inverseLerp:Oh,lerp:es,damp:Fh,pingpong:Bh,smoothstep:zh,smootherstep:kh,randInt:Gh,randFloat:Hh,randFloatSpread:Vh,seededRandom:Wh,degToRad:Xh,radToDeg:qh,isPowerOfTwo:no,ceilPowerOfTwo:jh,floorPowerOfTwo:Zs,setQuaternionFromProperEuler:Yh,normalize:Je,denormalize:cn};class je{constructor(e=0,t=0){je.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ve{constructor(e,t,n,i,s,o,a,c,l){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,c,l)}set(e,t,n,i,s,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=i[0],m=i[3],p=i[6],M=i[1],x=i[4],b=i[7],C=i[2],T=i[5],A=i[8];return s[0]=o*_+a*M+c*C,s[3]=o*m+a*x+c*T,s[6]=o*p+a*b+c*A,s[1]=l*_+h*M+u*C,s[4]=l*m+h*x+u*T,s[7]=l*p+h*b+u*A,s[2]=d*_+f*M+g*C,s[5]=d*m+f*x+g*T,s[8]=d*p+f*b+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*s*h+n*a*c+i*s*l-i*o*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*s,f=l*s-o*c,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(i*l-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(h*t-i*c)*_,e[5]=(i*s-a*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-i*l,i*c,-i*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(pr.makeScale(e,t)),this}rotate(e){return this.premultiply(pr.makeRotation(-e)),this}translate(e,t){return this.premultiply(pr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const pr=new Ve;function Qc(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function rs(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function $h(){const r=rs("canvas");return r.style.display="block",r}const xa={};function ts(r){r in xa||(xa[r]=!0,console.warn(r))}const ya=new Ve().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),va=new Ve().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ds={[pt]:{transfer:js,primaries:Ys,toReference:r=>r,fromReference:r=>r},[st]:{transfer:it,primaries:Ys,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[er]:{transfer:js,primaries:Ks,toReference:r=>r.applyMatrix3(va),fromReference:r=>r.applyMatrix3(ya)},[fo]:{transfer:it,primaries:Ks,toReference:r=>r.convertSRGBToLinear().applyMatrix3(va),fromReference:r=>r.applyMatrix3(ya).convertLinearToSRGB()}},Zh=new Set([pt,er]),Ye={enabled:!0,_workingColorSpace:pt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!Zh.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=ds[e].toReference,i=ds[t].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return ds[r].primaries},getTransfer:function(r){return r===Jt?js:ds[r].transfer}};function Ci(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function mr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let hi;class el{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{hi===void 0&&(hi=rs("canvas")),hi.width=e.width,hi.height=e.height;const n=hi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=hi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=rs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Ci(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ci(t[n]/255)*255):t[n]=Ci(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Jh=0;class tl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jh++}),this.uuid=sn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(gr(i[o].image)):s.push(gr(i[o]))}else s=gr(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function gr(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?el.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Qh=0;class wt extends ki{constructor(e=wt.DEFAULT_IMAGE,t=wt.DEFAULT_MAPPING,n=$t,i=$t,s=Ft,o=si,a=Zt,c=zn,l=wt.DEFAULT_ANISOTROPY,h=Jt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qh++}),this.uuid=sn(),this.name="",this.source=new tl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new je(0,0),this.repeat=new je(1,1),this.center=new je(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(ts("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===ii?st:Jt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==kc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Di:e.x=e.x-Math.floor(e.x);break;case $t:e.x=e.x<0?0:1;break;case qs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Di:e.y=e.y-Math.floor(e.y);break;case $t:e.y=e.y<0?0:1;break;case qs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ts("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===st?ii:$c}set encoding(e){ts("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ii?st:Jt}}wt.DEFAULT_IMAGE=null;wt.DEFAULT_MAPPING=kc;wt.DEFAULT_ANISOTROPY=1;class Qe{constructor(e=0,t=0,n=0,i=1){Qe.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(l+1)/2,b=(f+1)/2,C=(p+1)/2,T=(h+d)/4,A=(u+_)/4,k=(g+m)/4;return x>b&&x>C?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=T/n,s=A/n):b>C?b<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(b),n=T/i,s=k/i):C<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(C),n=A/s,i=k/s),this.set(n,i,s,t),this}let M=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-_)/M,this.z=(d-h)/M,this.w=Math.acos((l+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class eu extends ki{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Qe(0,0,e,t),this.scissorTest=!1,this.viewport=new Qe(0,0,e,t);const i={width:e,height:t,depth:1};n.encoding!==void 0&&(ts("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===ii?st:Jt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ft,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new wt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new tl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ri extends eu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class nl extends wt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=vt,this.minFilter=vt,this.wrapR=$t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class tu extends wt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=vt,this.minFilter=vt,this.wrapR=$t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3];const d=s[o+0],f=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==d||l!==f||h!==g){let m=1-a;const p=c*d+l*f+h*g+u*_,M=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const C=Math.sqrt(x),T=Math.atan2(C,p*M);m=Math.sin(m*T)/C,a=Math.sin(a*T)/C}const b=a*M;if(c=c*m+d*b,l=l*m+f*b,h=h*m+g*b,u=u*m+_*b,m===1-a){const C=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=C,l*=C,h*=C,u*=C}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[o],d=s[o+1],f=s[o+2],g=s[o+3];return e[t]=a*g+h*u+c*f-l*d,e[t+1]=c*g+h*d+l*u-a*f,e[t+2]=l*g+h*f+a*d-c*u,e[t+3]=h*g-a*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(s/2),d=c(n/2),f=c(i/2),g=c(s/2);switch(o){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(s-l)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Rt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+i*l-s*c,this._y=i*h+o*c+s*a-n*l,this._z=s*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(s),n*Math.cos(s),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,n=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ma.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ma.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*i-a*n),h=2*(a*t-s*i),u=2*(s*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-s*u,this.z=i+c*u+s*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=i*c-s*a,this.y=s*o-n*c,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return _r.copy(this).projectOnVector(e),this.sub(_r)}reflect(e){return this.sub(_r.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const _r=new R,Ma=new hn;class Tn{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Qt):Qt.fromBufferAttribute(s,o),Qt.applyMatrix4(e.matrixWorld),this.expandByPoint(Qt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),fs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),fs.copy(n.boundingBox)),fs.applyMatrix4(e.matrixWorld),this.union(fs)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Qt),Qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Xi),ps.subVectors(this.max,Xi),ui.subVectors(e.a,Xi),di.subVectors(e.b,Xi),fi.subVectors(e.c,Xi),Rn.subVectors(di,ui),Cn.subVectors(fi,di),Wn.subVectors(ui,fi);let t=[0,-Rn.z,Rn.y,0,-Cn.z,Cn.y,0,-Wn.z,Wn.y,Rn.z,0,-Rn.x,Cn.z,0,-Cn.x,Wn.z,0,-Wn.x,-Rn.y,Rn.x,0,-Cn.y,Cn.x,0,-Wn.y,Wn.x,0];return!xr(t,ui,di,fi,ps)||(t=[1,0,0,0,1,0,0,0,1],!xr(t,ui,di,fi,ps))?!1:(ms.crossVectors(Rn,Cn),t=[ms.x,ms.y,ms.z],xr(t,ui,di,fi,ps))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(pn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const pn=[new R,new R,new R,new R,new R,new R,new R,new R],Qt=new R,fs=new Tn,ui=new R,di=new R,fi=new R,Rn=new R,Cn=new R,Wn=new R,Xi=new R,ps=new R,ms=new R,Xn=new R;function xr(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Xn.fromArray(r,s);const a=i.x*Math.abs(Xn.x)+i.y*Math.abs(Xn.y)+i.z*Math.abs(Xn.z),c=e.dot(Xn),l=t.dot(Xn),h=n.dot(Xn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const nu=new Tn,qi=new R,yr=new R;class un{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):nu.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;qi.subVectors(e,this.center);const t=qi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(qi,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(yr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(qi.copy(e.center).add(yr)),this.expandByPoint(qi.copy(e.center).sub(yr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const mn=new R,vr=new R,gs=new R,Ln=new R,Mr=new R,_s=new R,Sr=new R;class as{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,mn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=mn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(mn.copy(this.origin).addScaledVector(this.direction,t),mn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){vr.copy(e).add(t).multiplyScalar(.5),gs.copy(t).sub(e).normalize(),Ln.copy(this.origin).sub(vr);const s=e.distanceTo(t)*.5,o=-this.direction.dot(gs),a=Ln.dot(this.direction),c=-Ln.dot(gs),l=Ln.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*c-a,d=o*a-c,g=s*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-s,-c),s),f=d*(d+2*c)+l):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(vr).addScaledVector(gs,d),f}intersectSphere(e,t){mn.subVectors(e.center,this.origin);const n=mn.dot(this.direction),i=mn.dot(mn)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,mn)!==null}intersectTriangle(e,t,n,i,s){Mr.subVectors(t,e),_s.subVectors(n,e),Sr.crossVectors(Mr,_s);let o=this.direction.dot(Sr),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ln.subVectors(this.origin,e);const c=a*this.direction.dot(_s.crossVectors(Ln,_s));if(c<0)return null;const l=a*this.direction.dot(Mr.cross(Ln));if(l<0||c+l>o)return null;const h=-a*Ln.dot(Sr);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class We{constructor(e,t,n,i,s,o,a,c,l,h,u,d,f,g,_,m){We.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,c,l,h,u,d,f,g,_,m)}set(e,t,n,i,s,o,a,c,l,h,u,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new We().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/pi.setFromMatrixColumn(e,0).length(),s=1/pi.setFromMatrixColumn(e,1).length(),o=1/pi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=o*h,f=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+g*l,t[5]=d-_*l,t[9]=-a*c,t[2]=_-d*l,t[6]=g+f*l,t[10]=o*c}else if(e.order==="YXZ"){const d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d+_*a,t[4]=g*a-f,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=_+d*a,t[10]=o*c}else if(e.order==="ZXY"){const d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const d=o*h,f=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=g*l-f,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=f*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const d=o*c,f=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*c,f=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(iu,e,su)}lookAt(e,t,n){const i=this.elements;return Ht.subVectors(e,t),Ht.lengthSq()===0&&(Ht.z=1),Ht.normalize(),Pn.crossVectors(n,Ht),Pn.lengthSq()===0&&(Math.abs(n.z)===1?Ht.x+=1e-4:Ht.z+=1e-4,Ht.normalize(),Pn.crossVectors(n,Ht)),Pn.normalize(),xs.crossVectors(Ht,Pn),i[0]=Pn.x,i[4]=xs.x,i[8]=Ht.x,i[1]=Pn.y,i[5]=xs.y,i[9]=Ht.y,i[2]=Pn.z,i[6]=xs.z,i[10]=Ht.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],M=n[3],x=n[7],b=n[11],C=n[15],T=i[0],A=i[4],k=i[8],v=i[12],E=i[1],z=i[5],H=i[9],J=i[13],P=i[2],N=i[6],G=i[10],Y=i[14],X=i[3],q=i[7],j=i[11],ne=i[15];return s[0]=o*T+a*E+c*P+l*X,s[4]=o*A+a*z+c*N+l*q,s[8]=o*k+a*H+c*G+l*j,s[12]=o*v+a*J+c*Y+l*ne,s[1]=h*T+u*E+d*P+f*X,s[5]=h*A+u*z+d*N+f*q,s[9]=h*k+u*H+d*G+f*j,s[13]=h*v+u*J+d*Y+f*ne,s[2]=g*T+_*E+m*P+p*X,s[6]=g*A+_*z+m*N+p*q,s[10]=g*k+_*H+m*G+p*j,s[14]=g*v+_*J+m*Y+p*ne,s[3]=M*T+x*E+b*P+C*X,s[7]=M*A+x*z+b*N+C*q,s[11]=M*k+x*H+b*G+C*j,s[15]=M*v+x*J+b*Y+C*ne,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+s*c*u-i*l*u-s*a*d+n*l*d+i*a*f-n*c*f)+_*(+t*c*f-t*l*d+s*o*d-i*o*f+i*l*h-s*c*h)+m*(+t*l*u-t*a*f-s*o*u+n*o*f+s*a*h-n*l*h)+p*(-i*a*h-t*c*u+t*a*d+i*o*u-n*o*d+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],M=u*m*l-_*d*l+_*c*f-a*m*f-u*c*p+a*d*p,x=g*d*l-h*m*l-g*c*f+o*m*f+h*c*p-o*d*p,b=h*_*l-g*u*l+g*a*f-o*_*f-h*a*p+o*u*p,C=g*u*c-h*_*c-g*a*d+o*_*d+h*a*m-o*u*m,T=t*M+n*x+i*b+s*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return e[0]=M*A,e[1]=(_*d*s-u*m*s-_*i*f+n*m*f+u*i*p-n*d*p)*A,e[2]=(a*m*s-_*c*s+_*i*l-n*m*l-a*i*p+n*c*p)*A,e[3]=(u*c*s-a*d*s-u*i*l+n*d*l+a*i*f-n*c*f)*A,e[4]=x*A,e[5]=(h*m*s-g*d*s+g*i*f-t*m*f-h*i*p+t*d*p)*A,e[6]=(g*c*s-o*m*s-g*i*l+t*m*l+o*i*p-t*c*p)*A,e[7]=(o*d*s-h*c*s+h*i*l-t*d*l-o*i*f+t*c*f)*A,e[8]=b*A,e[9]=(g*u*s-h*_*s-g*n*f+t*_*f+h*n*p-t*u*p)*A,e[10]=(o*_*s-g*a*s+g*n*l-t*_*l-o*n*p+t*a*p)*A,e[11]=(h*a*s-o*u*s-h*n*l+t*u*l+o*n*f-t*a*f)*A,e[12]=C*A,e[13]=(h*_*i-g*u*i+g*n*d-t*_*d-h*n*m+t*u*m)*A,e[14]=(g*a*i-o*_*i-g*n*c+t*_*c+o*n*m-t*a*m)*A,e[15]=(o*u*i-h*a*i+h*n*c-t*u*c-o*n*d+t*a*d)*A,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,c=e.z,l=s*o,h=s*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,h=o+o,u=a+a,d=s*l,f=s*h,g=s*u,_=o*h,m=o*u,p=a*u,M=c*l,x=c*h,b=c*u,C=n.x,T=n.y,A=n.z;return i[0]=(1-(_+p))*C,i[1]=(f+b)*C,i[2]=(g-x)*C,i[3]=0,i[4]=(f-b)*T,i[5]=(1-(d+p))*T,i[6]=(m+M)*T,i[7]=0,i[8]=(g+x)*A,i[9]=(m-M)*A,i[10]=(1-(d+_))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=pi.set(i[0],i[1],i[2]).length();const o=pi.set(i[4],i[5],i[6]).length(),a=pi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],en.copy(this);const l=1/s,h=1/o,u=1/a;return en.elements[0]*=l,en.elements[1]*=l,en.elements[2]*=l,en.elements[4]*=h,en.elements[5]*=h,en.elements[6]*=h,en.elements[8]*=u,en.elements[9]*=u,en.elements[10]*=u,t.setFromRotationMatrix(en),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=wn){const c=this.elements,l=2*s/(t-e),h=2*s/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let f,g;if(a===wn)f=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===$s)f=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=wn){const c=this.elements,l=1/(t-e),h=1/(n-i),u=1/(o-s),d=(t+e)*l,f=(n+i)*h;let g,_;if(a===wn)g=(o+s)*u,_=-2*u;else if(a===$s)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const pi=new R,en=new We,iu=new R(0,0,0),su=new R(1,1,1),Pn=new R,xs=new R,Ht=new R,Sa=new We,ba=new hn;class kn{constructor(e=0,t=0,n=0,i=kn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Rt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Rt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Rt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Rt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Sa.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Sa,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ba.setFromEuler(this),this.setFromQuaternion(ba,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}kn.DEFAULT_ORDER="XYZ";class mo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ru=0;const wa=new R,mi=new hn,gn=new We,ys=new R,ji=new R,ou=new R,au=new hn,Ea=new R(1,0,0),Ta=new R(0,1,0),Aa=new R(0,0,1),cu={type:"added"},lu={type:"removed"};class rt extends ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ru++}),this.uuid=sn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=rt.DEFAULT_UP.clone();const e=new R,t=new kn,n=new hn,i=new R(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new We},normalMatrix:{value:new Ve}}),this.matrix=new We,this.matrixWorld=new We,this.matrixAutoUpdate=rt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return mi.setFromAxisAngle(e,t),this.quaternion.multiply(mi),this}rotateOnWorldAxis(e,t){return mi.setFromAxisAngle(e,t),this.quaternion.premultiply(mi),this}rotateX(e){return this.rotateOnAxis(Ea,e)}rotateY(e){return this.rotateOnAxis(Ta,e)}rotateZ(e){return this.rotateOnAxis(Aa,e)}translateOnAxis(e,t){return wa.copy(e).applyQuaternion(this.quaternion),this.position.add(wa.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ea,e)}translateY(e){return this.translateOnAxis(Ta,e)}translateZ(e){return this.translateOnAxis(Aa,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(gn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ys.copy(e):ys.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ji.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gn.lookAt(ji,ys,this.up):gn.lookAt(ys,ji,this.up),this.quaternion.setFromRotationMatrix(gn),i&&(gn.extractRotation(i.matrixWorld),mi.setFromRotationMatrix(gn),this.quaternion.premultiply(mi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(cu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(lu)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),gn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),gn.multiply(e.parent.matrixWorld)),e.applyMatrix4(gn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ji,e,ou),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ji,au,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}rt.DEFAULT_UP=new R(0,1,0);rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const tn=new R,_n=new R,br=new R,xn=new R,gi=new R,_i=new R,Ra=new R,wr=new R,Er=new R,Tr=new R;let vs=!1;class nn{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),tn.subVectors(e,t),i.cross(tn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){tn.subVectors(i,t),_n.subVectors(n,t),br.subVectors(e,t);const o=tn.dot(tn),a=tn.dot(_n),c=tn.dot(br),l=_n.dot(_n),h=_n.dot(br),u=o*l-a*a;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,g=(o*h-a*c)*d;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,xn)===null?!1:xn.x>=0&&xn.y>=0&&xn.x+xn.y<=1}static getUV(e,t,n,i,s,o,a,c){return vs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),vs=!0),this.getInterpolation(e,t,n,i,s,o,a,c)}static getInterpolation(e,t,n,i,s,o,a,c){return this.getBarycoord(e,t,n,i,xn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,xn.x),c.addScaledVector(o,xn.y),c.addScaledVector(a,xn.z),c)}static isFrontFacing(e,t,n,i){return tn.subVectors(n,t),_n.subVectors(e,t),tn.cross(_n).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return tn.subVectors(this.c,this.b),_n.subVectors(this.a,this.b),tn.cross(_n).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return nn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return nn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,s){return vs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),vs=!0),nn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}getInterpolation(e,t,n,i,s){return nn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return nn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return nn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;gi.subVectors(i,n),_i.subVectors(s,n),wr.subVectors(e,n);const c=gi.dot(wr),l=_i.dot(wr);if(c<=0&&l<=0)return t.copy(n);Er.subVectors(e,i);const h=gi.dot(Er),u=_i.dot(Er);if(h>=0&&u<=h)return t.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(gi,o);Tr.subVectors(e,s);const f=gi.dot(Tr),g=_i.dot(Tr);if(g>=0&&f<=g)return t.copy(s);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(_i,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Ra.subVectors(s,i),a=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(Ra,a);const p=1/(m+_+d);return o=_*p,a=d*p,t.copy(n).addScaledVector(gi,o).addScaledVector(_i,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const il={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},In={h:0,s:0,l:0},Ms={h:0,s:0,l:0};function Ar(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Ee{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=st){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ye.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Ye.workingColorSpace){if(e=po(e,1),t=Rt(t,0,1),n=Rt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Ar(o,s,e+1/3),this.g=Ar(o,s,e),this.b=Ar(o,s,e-1/3)}return Ye.toWorkingColorSpace(this,i),this}setStyle(e,t=st){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=st){const n=il[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ci(e.r),this.g=Ci(e.g),this.b=Ci(e.b),this}copyLinearToSRGB(e){return this.r=mr(e.r),this.g=mr(e.g),this.b=mr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=st){return Ye.fromWorkingColorSpace(At.copy(this),e),Math.round(Rt(At.r*255,0,255))*65536+Math.round(Rt(At.g*255,0,255))*256+Math.round(Rt(At.b*255,0,255))}getHexString(e=st){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.fromWorkingColorSpace(At.copy(this),t);const n=At.r,i=At.g,s=At.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ye.workingColorSpace){return Ye.fromWorkingColorSpace(At.copy(this),t),e.r=At.r,e.g=At.g,e.b=At.b,e}getStyle(e=st){Ye.fromWorkingColorSpace(At.copy(this),e);const t=At.r,n=At.g,i=At.b;return e!==st?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(In),this.setHSL(In.h+e,In.s+t,In.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(In),e.getHSL(Ms);const n=es(In.h,Ms.h,t),i=es(In.s,Ms.s,t),s=es(In.l,Ms.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const At=new Ee;Ee.NAMES=il;let hu=0;class ln extends ki{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hu++}),this.uuid=sn(),this.name="",this.type="Material",this.blending=Ri,this.side=En,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yr,this.blendDst=Kr,this.blendEquation=Qn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ee(0,0,0),this.blendAlpha=0,this.depthFunc=Xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ma,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=li,this.stencilZFail=li,this.stencilZPass=li,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ri&&(n.blending=this.blending),this.side!==En&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Yr&&(n.blendSrc=this.blendSrc),this.blendDst!==Kr&&(n.blendDst=this.blendDst),this.blendEquation!==Qn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Xs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ma&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==li&&(n.stencilFail=this.stencilFail),this.stencilZFail!==li&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==li&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Bt extends ln{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Bc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ft=new R,Ss=new je;class Mt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=eo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=bn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ss.fromBufferAttribute(this,t),Ss.applyMatrix3(e),this.setXY(t,Ss.x,Ss.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix3(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix4(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyNormalMatrix(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.transformDirection(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=cn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Je(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=cn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=cn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=cn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=cn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),i=Je(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),i=Je(i,this.array),s=Je(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==eo&&(e.usage=this.usage),e}}class sl extends Mt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class rl extends Mt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ut extends Mt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let uu=0;const qt=new We,Rr=new rt,xi=new R,Vt=new Tn,Yi=new Tn,yt=new R;class kt extends ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:uu++}),this.uuid=sn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Qc(e)?rl:sl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ve().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return qt.makeRotationFromQuaternion(e),this.applyMatrix4(qt),this}rotateX(e){return qt.makeRotationX(e),this.applyMatrix4(qt),this}rotateY(e){return qt.makeRotationY(e),this.applyMatrix4(qt),this}rotateZ(e){return qt.makeRotationZ(e),this.applyMatrix4(qt),this}translate(e,t,n){return qt.makeTranslation(e,t,n),this.applyMatrix4(qt),this}scale(e,t,n){return qt.makeScale(e,t,n),this.applyMatrix4(qt),this}lookAt(e){return Rr.lookAt(e),Rr.updateMatrix(),this.applyMatrix4(Rr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xi).negate(),this.translate(xi.x,xi.y,xi.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Ut(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Tn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Vt.setFromBufferAttribute(s),this.morphTargetsRelative?(yt.addVectors(this.boundingBox.min,Vt.min),this.boundingBox.expandByPoint(yt),yt.addVectors(this.boundingBox.max,Vt.max),this.boundingBox.expandByPoint(yt)):(this.boundingBox.expandByPoint(Vt.min),this.boundingBox.expandByPoint(Vt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new un);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(Vt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Yi.setFromBufferAttribute(a),this.morphTargetsRelative?(yt.addVectors(Vt.min,Yi.min),Vt.expandByPoint(yt),yt.addVectors(Vt.max,Yi.max),Vt.expandByPoint(yt)):(Vt.expandByPoint(Yi.min),Vt.expandByPoint(Yi.max))}Vt.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)yt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(yt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)yt.fromBufferAttribute(a,l),c&&(xi.fromBufferAttribute(e,l),yt.add(xi)),i=Math.max(i,n.distanceToSquared(yt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,s=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mt(new Float32Array(4*a),4));const c=this.getAttribute("tangent").array,l=[],h=[];for(let E=0;E<a;E++)l[E]=new R,h[E]=new R;const u=new R,d=new R,f=new R,g=new je,_=new je,m=new je,p=new R,M=new R;function x(E,z,H){u.fromArray(i,E*3),d.fromArray(i,z*3),f.fromArray(i,H*3),g.fromArray(o,E*2),_.fromArray(o,z*2),m.fromArray(o,H*2),d.sub(u),f.sub(u),_.sub(g),m.sub(g);const J=1/(_.x*m.y-m.x*_.y);isFinite(J)&&(p.copy(d).multiplyScalar(m.y).addScaledVector(f,-_.y).multiplyScalar(J),M.copy(f).multiplyScalar(_.x).addScaledVector(d,-m.x).multiplyScalar(J),l[E].add(p),l[z].add(p),l[H].add(p),h[E].add(M),h[z].add(M),h[H].add(M))}let b=this.groups;b.length===0&&(b=[{start:0,count:n.length}]);for(let E=0,z=b.length;E<z;++E){const H=b[E],J=H.start,P=H.count;for(let N=J,G=J+P;N<G;N+=3)x(n[N+0],n[N+1],n[N+2])}const C=new R,T=new R,A=new R,k=new R;function v(E){A.fromArray(s,E*3),k.copy(A);const z=l[E];C.copy(z),C.sub(A.multiplyScalar(A.dot(z))).normalize(),T.crossVectors(k,z);const J=T.dot(h[E])<0?-1:1;c[E*4]=C.x,c[E*4+1]=C.y,c[E*4+2]=C.z,c[E*4+3]=J}for(let E=0,z=b.length;E<z;++E){const H=b[E],J=H.start,P=H.count;for(let N=J,G=J+P;N<G;N+=3)v(n[N+0]),v(n[N+1]),v(n[N+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Mt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new R,s=new R,o=new R,a=new R,c=new R,l=new R,h=new R,u=new R;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)yt.fromBufferAttribute(e,t),yt.normalize(),e.setXYZ(t,yt.x,yt.y,yt.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new Mt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new kt,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=e(c,n);t.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(t))}const s=e.morphAttributes;for(const l in s){const h=[],u=s[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ca=new We,qn=new as,bs=new un,La=new R,yi=new R,vi=new R,Mi=new R,Cr=new R,ws=new R,Es=new je,Ts=new je,As=new je,Pa=new R,Ia=new R,Da=new R,Rs=new R,Cs=new R;class W extends rt{constructor(e=new kt,t=new Bt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){ws.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=a[c],u=s[c];h!==0&&(Cr.fromBufferAttribute(u,e),o?ws.addScaledVector(Cr,h):ws.addScaledVector(Cr.sub(t),h))}t.add(ws)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),bs.copy(n.boundingSphere),bs.applyMatrix4(s),qn.copy(e.ray).recast(e.near),!(bs.containsPoint(qn.origin)===!1&&(qn.intersectSphere(bs,La)===null||qn.origin.distanceToSquared(La)>(e.far-e.near)**2))&&(Ca.copy(s).invert(),qn.copy(e.ray).applyMatrix4(Ca),!(n.boundingBox!==null&&qn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,qn)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),x=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let b=M,C=x;b<C;b+=3){const T=a.getX(b),A=a.getX(b+1),k=a.getX(b+2);i=Ls(this,p,e,n,l,h,u,T,A,k),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const M=a.getX(m),x=a.getX(m+1),b=a.getX(m+2);i=Ls(this,o,e,n,l,h,u,M,x,b),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),x=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let b=M,C=x;b<C;b+=3){const T=b,A=b+1,k=b+2;i=Ls(this,p,e,n,l,h,u,T,A,k),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const M=m,x=m+1,b=m+2;i=Ls(this,o,e,n,l,h,u,M,x,b),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function du(r,e,t,n,i,s,o,a){let c;if(e.side===Nt?c=n.intersectTriangle(o,s,i,!0,a):c=n.intersectTriangle(i,s,o,e.side===En,a),c===null)return null;Cs.copy(a),Cs.applyMatrix4(r.matrixWorld);const l=t.ray.origin.distanceTo(Cs);return l<t.near||l>t.far?null:{distance:l,point:Cs.clone(),object:r}}function Ls(r,e,t,n,i,s,o,a,c,l){r.getVertexPosition(a,yi),r.getVertexPosition(c,vi),r.getVertexPosition(l,Mi);const h=du(r,e,t,n,yi,vi,Mi,Rs);if(h){i&&(Es.fromBufferAttribute(i,a),Ts.fromBufferAttribute(i,c),As.fromBufferAttribute(i,l),h.uv=nn.getInterpolation(Rs,yi,vi,Mi,Es,Ts,As,new je)),s&&(Es.fromBufferAttribute(s,a),Ts.fromBufferAttribute(s,c),As.fromBufferAttribute(s,l),h.uv1=nn.getInterpolation(Rs,yi,vi,Mi,Es,Ts,As,new je),h.uv2=h.uv1),o&&(Pa.fromBufferAttribute(o,a),Ia.fromBufferAttribute(o,c),Da.fromBufferAttribute(o,l),h.normal=nn.getInterpolation(Rs,yi,vi,Mi,Pa,Ia,Da,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new R,materialIndex:0};nn.getNormal(yi,vi,Mi,u.normal),h.face=u}return h}class te extends kt{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Ut(l,3)),this.setAttribute("normal",new Ut(h,3)),this.setAttribute("uv",new Ut(u,2));function g(_,m,p,M,x,b,C,T,A,k,v){const E=b/A,z=C/k,H=b/2,J=C/2,P=T/2,N=A+1,G=k+1;let Y=0,X=0;const q=new R;for(let j=0;j<G;j++){const ne=j*z-J;for(let ie=0;ie<N;ie++){const V=ie*E-H;q[_]=V*M,q[m]=ne*x,q[p]=P,l.push(q.x,q.y,q.z),q[_]=0,q[m]=0,q[p]=T>0?1:-1,h.push(q.x,q.y,q.z),u.push(ie/A),u.push(1-j/k),Y+=1}}for(let j=0;j<k;j++)for(let ne=0;ne<A;ne++){const ie=d+ne+N*j,V=d+ne+N*(j+1),K=d+(ne+1)+N*(j+1),ce=d+(ne+1)+N*j;c.push(ie,V,ce),c.push(V,K,ce),X+=6}a.addGroup(f,X,v),f+=X,d+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new te(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Fi(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function It(r){const e={};for(let t=0;t<r.length;t++){const n=Fi(r[t]);for(const i in n)e[i]=n[i]}return e}function fu(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function ol(r){return r.getRenderTarget()===null?r.outputColorSpace:Ye.workingColorSpace}const pu={clone:Fi,merge:It};var mu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class oi extends ln{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mu,this.fragmentShader=gu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fi(e.uniforms),this.uniformsGroups=fu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class al extends rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new We,this.projectionMatrix=new We,this.projectionMatrixInverse=new We,this.coordinateSystem=wn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Dt extends al{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Oi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Qi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Oi*2*Math.atan(Math.tan(Qi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Qi*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*i/c,t-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Si=-90,bi=1;class _u extends rt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Dt(Si,bi,e,t);i.layers=this.layers,this.add(i);const s=new Dt(Si,bi,e,t);s.layers=this.layers,this.add(s);const o=new Dt(Si,bi,e,t);o.layers=this.layers,this.add(o);const a=new Dt(Si,bi,e,t);a.layers=this.layers,this.add(a);const c=new Dt(Si,bi,e,t);c.layers=this.layers,this.add(c);const l=new Dt(Si,bi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,c]=t;for(const l of t)this.remove(l);if(e===wn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===$s)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class cl extends wt{constructor(e,t,n,i,s,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:Pi,super(e,t,n,i,s,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class xu extends ri{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(ts("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ii?st:Jt),this.texture=new cl(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ft}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new te(5,5,5),s=new oi({name:"CubemapFromEquirect",uniforms:Fi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Nt,blending:Fn});s.uniforms.tEquirect.value=t;const o=new W(i,s),a=t.minFilter;return t.minFilter===si&&(t.minFilter=Ft),new _u(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}const Lr=new R,yu=new R,vu=new Ve;class Zn{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Lr.subVectors(n,t).cross(yu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Lr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||vu.getNormalMatrix(e),i=this.coplanarPoint(Lr).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const jn=new un,Ps=new R;class go{constructor(e=new Zn,t=new Zn,n=new Zn,i=new Zn,s=new Zn,o=new Zn){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=wn){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],c=i[3],l=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],_=i[10],m=i[11],p=i[12],M=i[13],x=i[14],b=i[15];if(n[0].setComponents(c-s,d-l,m-f,b-p).normalize(),n[1].setComponents(c+s,d+l,m+f,b+p).normalize(),n[2].setComponents(c+o,d+h,m+g,b+M).normalize(),n[3].setComponents(c-o,d-h,m-g,b-M).normalize(),n[4].setComponents(c-a,d-u,m-_,b-x).normalize(),t===wn)n[5].setComponents(c+a,d+u,m+_,b+x).normalize();else if(t===$s)n[5].setComponents(a,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),jn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),jn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(jn)}intersectsSprite(e){return jn.center.set(0,0,0),jn.radius=.7071067811865476,jn.applyMatrix4(e.matrixWorld),this.intersectsSphere(jn)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Ps.x=i.normal.x>0?e.max.x:e.min.x,Ps.y=i.normal.y>0?e.max.y:e.min.y,Ps.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ps)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ll(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Mu(r,e){const t=e.isWebGL2,n=new WeakMap;function i(l,h){const u=l.array,d=l.usage,f=u.byteLength,g=r.createBuffer();r.bindBuffer(h,g),r.bufferData(h,u,d),l.onUploadCallback();let _;if(u instanceof Float32Array)_=r.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)_=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=r.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=r.SHORT;else if(u instanceof Uint32Array)_=r.UNSIGNED_INT;else if(u instanceof Int32Array)_=r.INT;else if(u instanceof Int8Array)_=r.BYTE;else if(u instanceof Uint8Array)_=r.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:f}}function s(l,h,u){const d=h.array,f=h._updateRange,g=h.updateRanges;if(r.bindBuffer(u,l),f.count===-1&&g.length===0&&r.bufferSubData(u,0,d),g.length!==0){for(let _=0,m=g.length;_<m;_++){const p=g[_];t?r.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):r.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}f.count!==-1&&(t?r.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):r.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=n.get(l);h&&(r.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){const d=n.get(l);(!d||d.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const u=n.get(l);if(u===void 0)n.set(l,i(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(u.buffer,l,h),u.version=l.version}}return{get:o,remove:a,update:c}}class tr extends kt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=e/a,d=t/c,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const M=p*d-o;for(let x=0;x<l;x++){const b=x*u-s;g.push(b,-M,0),_.push(0,0,1),m.push(x/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<a;M++){const x=M+l*p,b=M+l*(p+1),C=M+1+l*(p+1),T=M+1+l*p;f.push(x,b,T),f.push(b,C,T)}this.setIndex(f),this.setAttribute("position",new Ut(g,3)),this.setAttribute("normal",new Ut(_,3)),this.setAttribute("uv",new Ut(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tr(e.width,e.height,e.widthSegments,e.heightSegments)}}var Su=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,wu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Eu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Tu=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Au=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ru=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Cu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Lu=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Pu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Iu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Du=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Nu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Uu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ou=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Fu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Bu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,zu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ku=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Gu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Hu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Vu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Wu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Xu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,qu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ju=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Yu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ku=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$u=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ju="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qu=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,ed=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,td=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,nd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,id=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,rd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,od=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ad=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ld=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,hd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,ud=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,md=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,gd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_d=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Md=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Sd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,bd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,wd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ed=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Td=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ad=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Rd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Cd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ld=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Id=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Nd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ud=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Od=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Fd=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Bd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,zd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,kd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Gd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Wd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Xd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Kd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$d=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Zd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Jd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ef=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,nf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,rf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,of=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,af=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,hf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,uf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,df=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ff=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,gf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,_f=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,xf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Mf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Sf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ef=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Af=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Cf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Lf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Pf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,If=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Df=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Uf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Of=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ff=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Gf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Vf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Wf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,jf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$f=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Zf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ep=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,tp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Fe={alphahash_fragment:Su,alphahash_pars_fragment:bu,alphamap_fragment:wu,alphamap_pars_fragment:Eu,alphatest_fragment:Tu,alphatest_pars_fragment:Au,aomap_fragment:Ru,aomap_pars_fragment:Cu,batching_pars_vertex:Lu,batching_vertex:Pu,begin_vertex:Iu,beginnormal_vertex:Du,bsdfs:Nu,iridescence_fragment:Uu,bumpmap_pars_fragment:Ou,clipping_planes_fragment:Fu,clipping_planes_pars_fragment:Bu,clipping_planes_pars_vertex:zu,clipping_planes_vertex:ku,color_fragment:Gu,color_pars_fragment:Hu,color_pars_vertex:Vu,color_vertex:Wu,common:Xu,cube_uv_reflection_fragment:qu,defaultnormal_vertex:ju,displacementmap_pars_vertex:Yu,displacementmap_vertex:Ku,emissivemap_fragment:$u,emissivemap_pars_fragment:Zu,colorspace_fragment:Ju,colorspace_pars_fragment:Qu,envmap_fragment:ed,envmap_common_pars_fragment:td,envmap_pars_fragment:nd,envmap_pars_vertex:id,envmap_physical_pars_fragment:md,envmap_vertex:sd,fog_vertex:rd,fog_pars_vertex:od,fog_fragment:ad,fog_pars_fragment:cd,gradientmap_pars_fragment:ld,lightmap_fragment:hd,lightmap_pars_fragment:ud,lights_lambert_fragment:dd,lights_lambert_pars_fragment:fd,lights_pars_begin:pd,lights_toon_fragment:gd,lights_toon_pars_fragment:_d,lights_phong_fragment:xd,lights_phong_pars_fragment:yd,lights_physical_fragment:vd,lights_physical_pars_fragment:Md,lights_fragment_begin:Sd,lights_fragment_maps:bd,lights_fragment_end:wd,logdepthbuf_fragment:Ed,logdepthbuf_pars_fragment:Td,logdepthbuf_pars_vertex:Ad,logdepthbuf_vertex:Rd,map_fragment:Cd,map_pars_fragment:Ld,map_particle_fragment:Pd,map_particle_pars_fragment:Id,metalnessmap_fragment:Dd,metalnessmap_pars_fragment:Nd,morphcolor_vertex:Ud,morphnormal_vertex:Od,morphtarget_pars_vertex:Fd,morphtarget_vertex:Bd,normal_fragment_begin:zd,normal_fragment_maps:kd,normal_pars_fragment:Gd,normal_pars_vertex:Hd,normal_vertex:Vd,normalmap_pars_fragment:Wd,clearcoat_normal_fragment_begin:Xd,clearcoat_normal_fragment_maps:qd,clearcoat_pars_fragment:jd,iridescence_pars_fragment:Yd,opaque_fragment:Kd,packing:$d,premultiplied_alpha_fragment:Zd,project_vertex:Jd,dithering_fragment:Qd,dithering_pars_fragment:ef,roughnessmap_fragment:tf,roughnessmap_pars_fragment:nf,shadowmap_pars_fragment:sf,shadowmap_pars_vertex:rf,shadowmap_vertex:of,shadowmask_pars_fragment:af,skinbase_vertex:cf,skinning_pars_vertex:lf,skinning_vertex:hf,skinnormal_vertex:uf,specularmap_fragment:df,specularmap_pars_fragment:ff,tonemapping_fragment:pf,tonemapping_pars_fragment:mf,transmission_fragment:gf,transmission_pars_fragment:_f,uv_pars_fragment:xf,uv_pars_vertex:yf,uv_vertex:vf,worldpos_vertex:Mf,background_vert:Sf,background_frag:bf,backgroundCube_vert:wf,backgroundCube_frag:Ef,cube_vert:Tf,cube_frag:Af,depth_vert:Rf,depth_frag:Cf,distanceRGBA_vert:Lf,distanceRGBA_frag:Pf,equirect_vert:If,equirect_frag:Df,linedashed_vert:Nf,linedashed_frag:Uf,meshbasic_vert:Of,meshbasic_frag:Ff,meshlambert_vert:Bf,meshlambert_frag:zf,meshmatcap_vert:kf,meshmatcap_frag:Gf,meshnormal_vert:Hf,meshnormal_frag:Vf,meshphong_vert:Wf,meshphong_frag:Xf,meshphysical_vert:qf,meshphysical_frag:jf,meshtoon_vert:Yf,meshtoon_frag:Kf,points_vert:$f,points_frag:Zf,shadow_vert:Jf,shadow_frag:Qf,sprite_vert:ep,sprite_frag:tp},re={common:{diffuse:{value:new Ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new je(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new Ee(16777215)},opacity:{value:1},center:{value:new je(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},on={basic:{uniforms:It([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:It([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Ee(0)}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:It([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Ee(0)},specular:{value:new Ee(1118481)},shininess:{value:30}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:It([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new Ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:It([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new Ee(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:It([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:It([re.points,re.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:It([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:It([re.common,re.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:It([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:It([re.sprite,re.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distanceRGBA:{uniforms:It([re.common,re.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distanceRGBA_vert,fragmentShader:Fe.distanceRGBA_frag},shadow:{uniforms:It([re.lights,re.fog,{color:{value:new Ee(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};on.physical={uniforms:It([on.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new je(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new Ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new je},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new Ee(0)},specularColor:{value:new Ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new je},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};const Is={r:0,b:0,g:0};function np(r,e,t,n,i,s,o){const a=new Ee(0);let c=s===!0?0:1,l,h,u=null,d=0,f=null;function g(m,p){let M=!1,x=p.isScene===!0?p.background:null;x&&x.isTexture&&(x=(p.backgroundBlurriness>0?t:e).get(x)),x===null?_(a,c):x&&x.isColor&&(_(x,1),M=!0);const b=r.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||M)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),x&&(x.isCubeTexture||x.mapping===Qs)?(h===void 0&&(h=new W(new te(1,1,1),new oi({name:"BackgroundCubeMaterial",uniforms:Fi(on.backgroundCube.uniforms),vertexShader:on.backgroundCube.vertexShader,fragmentShader:on.backgroundCube.fragmentShader,side:Nt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=Ye.getTransfer(x.colorSpace)!==it,(u!==x||d!==x.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,f=r.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new W(new tr(2,2),new oi({name:"BackgroundMaterial",uniforms:Fi(on.background.uniforms),vertexShader:on.background.vertexShader,fragmentShader:on.background.fragmentShader,side:En,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=Ye.getTransfer(x.colorSpace)!==it,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||f!==r.toneMapping)&&(l.material.needsUpdate=!0,u=x,d=x.version,f=r.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function _(m,p){m.getRGB(Is,ol(r)),n.buffers.color.setClear(Is.r,Is.g,Is.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),c=p,_(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,_(a,c)},render:g}}function ip(r,e,t,n){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},c=m(null);let l=c,h=!1;function u(P,N,G,Y,X){let q=!1;if(o){const j=_(Y,G,N);l!==j&&(l=j,f(l.object)),q=p(P,Y,G,X),q&&M(P,Y,G,X)}else{const j=N.wireframe===!0;(l.geometry!==Y.id||l.program!==G.id||l.wireframe!==j)&&(l.geometry=Y.id,l.program=G.id,l.wireframe=j,q=!0)}X!==null&&t.update(X,r.ELEMENT_ARRAY_BUFFER),(q||h)&&(h=!1,k(P,N,G,Y),X!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function d(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function f(P){return n.isWebGL2?r.bindVertexArray(P):s.bindVertexArrayOES(P)}function g(P){return n.isWebGL2?r.deleteVertexArray(P):s.deleteVertexArrayOES(P)}function _(P,N,G){const Y=G.wireframe===!0;let X=a[P.id];X===void 0&&(X={},a[P.id]=X);let q=X[N.id];q===void 0&&(q={},X[N.id]=q);let j=q[Y];return j===void 0&&(j=m(d()),q[Y]=j),j}function m(P){const N=[],G=[],Y=[];for(let X=0;X<i;X++)N[X]=0,G[X]=0,Y[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:G,attributeDivisors:Y,object:P,attributes:{},index:null}}function p(P,N,G,Y){const X=l.attributes,q=N.attributes;let j=0;const ne=G.getAttributes();for(const ie in ne)if(ne[ie].location>=0){const K=X[ie];let ce=q[ie];if(ce===void 0&&(ie==="instanceMatrix"&&P.instanceMatrix&&(ce=P.instanceMatrix),ie==="instanceColor"&&P.instanceColor&&(ce=P.instanceColor)),K===void 0||K.attribute!==ce||ce&&K.data!==ce.data)return!0;j++}return l.attributesNum!==j||l.index!==Y}function M(P,N,G,Y){const X={},q=N.attributes;let j=0;const ne=G.getAttributes();for(const ie in ne)if(ne[ie].location>=0){let K=q[ie];K===void 0&&(ie==="instanceMatrix"&&P.instanceMatrix&&(K=P.instanceMatrix),ie==="instanceColor"&&P.instanceColor&&(K=P.instanceColor));const ce={};ce.attribute=K,K&&K.data&&(ce.data=K.data),X[ie]=ce,j++}l.attributes=X,l.attributesNum=j,l.index=Y}function x(){const P=l.newAttributes;for(let N=0,G=P.length;N<G;N++)P[N]=0}function b(P){C(P,0)}function C(P,N){const G=l.newAttributes,Y=l.enabledAttributes,X=l.attributeDivisors;G[P]=1,Y[P]===0&&(r.enableVertexAttribArray(P),Y[P]=1),X[P]!==N&&((n.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,N),X[P]=N)}function T(){const P=l.newAttributes,N=l.enabledAttributes;for(let G=0,Y=N.length;G<Y;G++)N[G]!==P[G]&&(r.disableVertexAttribArray(G),N[G]=0)}function A(P,N,G,Y,X,q,j){j===!0?r.vertexAttribIPointer(P,N,G,X,q):r.vertexAttribPointer(P,N,G,Y,X,q)}function k(P,N,G,Y){if(n.isWebGL2===!1&&(P.isInstancedMesh||Y.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const X=Y.attributes,q=G.getAttributes(),j=N.defaultAttributeValues;for(const ne in q){const ie=q[ne];if(ie.location>=0){let V=X[ne];if(V===void 0&&(ne==="instanceMatrix"&&P.instanceMatrix&&(V=P.instanceMatrix),ne==="instanceColor"&&P.instanceColor&&(V=P.instanceColor)),V!==void 0){const K=V.normalized,ce=V.itemSize,me=t.get(V);if(me===void 0)continue;const ge=me.buffer,Ce=me.type,Pe=me.bytesPerElement,he=n.isWebGL2===!0&&(Ce===r.INT||Ce===r.UNSIGNED_INT||V.gpuType===Hc);if(V.isInterleavedBufferAttribute){const Le=V.data,D=Le.stride,ut=V.offset;if(Le.isInstancedInterleavedBuffer){for(let Se=0;Se<ie.locationSize;Se++)C(ie.location+Se,Le.meshPerAttribute);P.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=Le.meshPerAttribute*Le.count)}else for(let Se=0;Se<ie.locationSize;Se++)b(ie.location+Se);r.bindBuffer(r.ARRAY_BUFFER,ge);for(let Se=0;Se<ie.locationSize;Se++)A(ie.location+Se,ce/ie.locationSize,Ce,K,D*Pe,(ut+ce/ie.locationSize*Se)*Pe,he)}else{if(V.isInstancedBufferAttribute){for(let Le=0;Le<ie.locationSize;Le++)C(ie.location+Le,V.meshPerAttribute);P.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let Le=0;Le<ie.locationSize;Le++)b(ie.location+Le);r.bindBuffer(r.ARRAY_BUFFER,ge);for(let Le=0;Le<ie.locationSize;Le++)A(ie.location+Le,ce/ie.locationSize,Ce,K,ce*Pe,ce/ie.locationSize*Le*Pe,he)}}else if(j!==void 0){const K=j[ne];if(K!==void 0)switch(K.length){case 2:r.vertexAttrib2fv(ie.location,K);break;case 3:r.vertexAttrib3fv(ie.location,K);break;case 4:r.vertexAttrib4fv(ie.location,K);break;default:r.vertexAttrib1fv(ie.location,K)}}}}T()}function v(){H();for(const P in a){const N=a[P];for(const G in N){const Y=N[G];for(const X in Y)g(Y[X].object),delete Y[X];delete N[G]}delete a[P]}}function E(P){if(a[P.id]===void 0)return;const N=a[P.id];for(const G in N){const Y=N[G];for(const X in Y)g(Y[X].object),delete Y[X];delete N[G]}delete a[P.id]}function z(P){for(const N in a){const G=a[N];if(G[P.id]===void 0)continue;const Y=G[P.id];for(const X in Y)g(Y[X].object),delete Y[X];delete G[P.id]}}function H(){J(),h=!0,l!==c&&(l=c,f(l.object))}function J(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:H,resetDefaultState:J,dispose:v,releaseStatesOfGeometry:E,releaseStatesOfProgram:z,initAttributes:x,enableAttribute:b,disableUnusedAttributes:T}}function sp(r,e,t,n){const i=n.isWebGL2;let s;function o(h){s=h}function a(h,u){r.drawArrays(s,h,u),t.update(u,s,1)}function c(h,u,d){if(d===0)return;let f,g;if(i)f=r,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](s,h,u,d),t.update(u,s,d)}function l(h,u,d){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{f.multiDrawArraysWEBGL(s,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_];t.update(g,s,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function rp(r,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const c=s(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const l=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),d=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),_=r.getParameter(r.MAX_VERTEX_ATTRIBS),m=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),p=r.getParameter(r.MAX_VARYING_VECTORS),M=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),x=d>0,b=o||e.has("OES_texture_float"),C=x&&b,T=o?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:M,vertexTextures:x,floatFragmentTextures:b,floatVertexTextures:C,maxSamples:T}}function op(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Zn,a=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=r.get(u);if(!i||g===null||g.length===0||s&&!m)s?h(null):l();else{const M=s?0:n,x=M*4;let b=p.clippingState||null;c.value=b,b=h(g,d,x,f);for(let C=0;C!==x;++C)b[C]=t[C];p.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,b=f;x!==_;++x,b+=4)o.copy(u[x]).applyMatrix4(M,a),o.normal.toArray(m,b),m[b+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function ap(r){let e=new WeakMap;function t(o,a){return a===$r?o.mapping=Pi:a===Zr&&(o.mapping=Ii),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===$r||a===Zr)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new xu(c.height/2);return l.fromEquirectangularTexture(r,o),e.set(o,l),o.addEventListener("dispose",i),t(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class _o extends al{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ti=4,Na=[.125,.215,.35,.446,.526,.582],ei=20,Pr=new _o,Ua=new Ee;let Ir=null,Dr=0,Nr=0;const Jn=(1+Math.sqrt(5))/2,wi=1/Jn,Oa=[new R(1,1,1),new R(-1,1,1),new R(1,1,-1),new R(-1,1,-1),new R(0,Jn,wi),new R(0,Jn,-wi),new R(wi,0,Jn),new R(-wi,0,Jn),new R(Jn,wi,0),new R(-Jn,wi,0)];class Fa{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Ir=this._renderer.getRenderTarget(),Dr=this._renderer.getActiveCubeFace(),Nr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ka(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=za(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ir,Dr,Nr),e.scissorTest=!1,Ds(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Pi||e.mapping===Ii?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ir=this._renderer.getRenderTarget(),Dr=this._renderer.getActiveCubeFace(),Nr=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ft,minFilter:Ft,generateMipmaps:!1,type:is,format:Zt,colorSpace:pt,depthBuffer:!1},i=Ba(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ba(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cp(s)),this._blurMaterial=lp(s,e,t)}return i}_compileMaterial(e){const t=new W(this._lodPlanes[0],e);this._renderer.compile(t,Pr)}_sceneToCubeUV(e,t,n,i){const a=new Dt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Ua),h.toneMapping=Bn,h.autoClear=!1;const f=new Bt({name:"PMREM.Background",side:Nt,depthWrite:!1,depthTest:!1}),g=new W(new te,f);let _=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,_=!0):(f.color.copy(Ua),_=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):M===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const x=this._cubeSize;Ds(i,M*x,p>2?x:0,x,x),h.setRenderTarget(i),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Pi||e.mapping===Ii;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=ka()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=za());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new W(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;Ds(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Pr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=Oa[(i-1)%Oa.length];this._blur(e,i-1,i,s,o)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new W(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*ei-1),_=s/g,m=isFinite(s)?1+Math.floor(h*_):ei;m>ei&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ei}`);const p=[];let M=0;for(let A=0;A<ei;++A){const k=A/_,v=Math.exp(-k*k/2);p.push(v),A===0?M+=v:A<m&&(M+=2*v)}for(let A=0;A<p.length;A++)p[A]=p[A]/M;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-n;const b=this._sizeLods[i],C=3*b*(i>x-Ti?i-x+Ti:0),T=4*(this._cubeSize-b);Ds(t,C,T,3*b,2*b),c.setRenderTarget(t),c.render(u,Pr)}}function cp(r){const e=[],t=[],n=[];let i=r;const s=r-Ti+1+Na.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let c=1/a;o>r-Ti?c=Na[o-r+Ti-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*f),x=new Float32Array(m*g*f),b=new Float32Array(p*g*f);for(let T=0;T<f;T++){const A=T%3*2/3-1,k=T>2?0:-1,v=[A,k,0,A+2/3,k,0,A+2/3,k+1,0,A,k,0,A+2/3,k+1,0,A,k+1,0];M.set(v,_*g*T),x.set(d,m*g*T);const E=[T,T,T,T,T,T];b.set(E,p*g*T)}const C=new kt;C.setAttribute("position",new Mt(M,_)),C.setAttribute("uv",new Mt(x,m)),C.setAttribute("faceIndex",new Mt(b,p)),e.push(C),i>Ti&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ba(r,e,t){const n=new ri(r,e,t);return n.texture.mapping=Qs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ds(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function lp(r,e,t){const n=new Float32Array(ei),i=new R(0,1,0);return new oi({name:"SphericalGaussianBlur",defines:{n:ei,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:xo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function za(){return new oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function ka(){return new oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function xo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function hp(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===$r||c===Zr,h=c===Pi||c===Ii;if(l||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new Fa(r)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{const u=a.image;if(l&&u&&u.height>0||h&&u&&i(u)){t===null&&(t=new Fa(r));const d=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",s),d.texture}else return null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function up(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function dp(r,e,t,n){const i={},s=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}d.removeEventListener("dispose",o),delete i[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const g in d)e.update(d[g],r.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],r.ARRAY_BUFFER)}}function l(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const M=f.array;_=f.version;for(let x=0,b=M.length;x<b;x+=3){const C=M[x+0],T=M[x+1],A=M[x+2];d.push(C,T,T,A,A,C)}}else if(g!==void 0){const M=g.array;_=g.version;for(let x=0,b=M.length/3-1;x<b;x+=3){const C=x+0,T=x+1,A=x+2;d.push(C,T,T,A,A,C)}}else return;const m=new(Qc(d)?rl:sl)(d,1);m.version=_;const p=s.get(u);p&&e.remove(p),s.set(u,m)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return s.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function fp(r,e,t,n){const i=n.isWebGL2;let s;function o(f){s=f}let a,c;function l(f){a=f.type,c=f.bytesPerElement}function h(f,g){r.drawElements(s,g,a,f*c),t.update(g,s,1)}function u(f,g,_){if(_===0)return;let m,p;if(i)m=r,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](s,g,a,f*c,_),t.update(g,s,_)}function d(f,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<_;p++)this.render(f[p]/c,g[p]);else{m.multiDrawElementsWEBGL(s,g,0,a,f,0,_);let p=0;for(let M=0;M<_;M++)p+=g[M];t.update(p,s,1)}}this.setMode=o,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function pp(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function mp(r,e){return r[0]-e[0]}function gp(r,e){return Math.abs(e[1])-Math.abs(r[1])}function _p(r,e,t){const n={},i=new Float32Array(8),s=new WeakMap,o=new Qe,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,h,u){const d=l.morphTargetInfluences;if(e.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let m=s.get(h);if(m===void 0||m.count!==_){let N=function(){J.dispose(),s.delete(h),h.removeEventListener("dispose",N)};var f=N;m!==void 0&&m.texture.dispose();const x=h.morphAttributes.position!==void 0,b=h.morphAttributes.normal!==void 0,C=h.morphAttributes.color!==void 0,T=h.morphAttributes.position||[],A=h.morphAttributes.normal||[],k=h.morphAttributes.color||[];let v=0;x===!0&&(v=1),b===!0&&(v=2),C===!0&&(v=3);let E=h.attributes.position.count*v,z=1;E>e.maxTextureSize&&(z=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const H=new Float32Array(E*z*4*_),J=new nl(H,E,z,_);J.type=bn,J.needsUpdate=!0;const P=v*4;for(let G=0;G<_;G++){const Y=T[G],X=A[G],q=k[G],j=E*z*4*G;for(let ne=0;ne<Y.count;ne++){const ie=ne*P;x===!0&&(o.fromBufferAttribute(Y,ne),H[j+ie+0]=o.x,H[j+ie+1]=o.y,H[j+ie+2]=o.z,H[j+ie+3]=0),b===!0&&(o.fromBufferAttribute(X,ne),H[j+ie+4]=o.x,H[j+ie+5]=o.y,H[j+ie+6]=o.z,H[j+ie+7]=0),C===!0&&(o.fromBufferAttribute(q,ne),H[j+ie+8]=o.x,H[j+ie+9]=o.y,H[j+ie+10]=o.z,H[j+ie+11]=q.itemSize===4?o.w:1)}}m={count:_,texture:J,size:new je(E,z)},s.set(h,m),h.addEventListener("dispose",N)}let p=0;for(let x=0;x<d.length;x++)p+=d[x];const M=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(r,"morphTargetBaseInfluence",M),u.getUniforms().setValue(r,"morphTargetInfluences",d),u.getUniforms().setValue(r,"morphTargetsTexture",m.texture,t),u.getUniforms().setValue(r,"morphTargetsTextureSize",m.size)}else{const g=d===void 0?0:d.length;let _=n[h.id];if(_===void 0||_.length!==g){_=[];for(let b=0;b<g;b++)_[b]=[b,0];n[h.id]=_}for(let b=0;b<g;b++){const C=_[b];C[0]=b,C[1]=d[b]}_.sort(gp);for(let b=0;b<8;b++)b<g&&_[b][1]?(a[b][0]=_[b][0],a[b][1]=_[b][1]):(a[b][0]=Number.MAX_SAFE_INTEGER,a[b][1]=0);a.sort(mp);const m=h.morphAttributes.position,p=h.morphAttributes.normal;let M=0;for(let b=0;b<8;b++){const C=a[b],T=C[0],A=C[1];T!==Number.MAX_SAFE_INTEGER&&A?(m&&h.getAttribute("morphTarget"+b)!==m[T]&&h.setAttribute("morphTarget"+b,m[T]),p&&h.getAttribute("morphNormal"+b)!==p[T]&&h.setAttribute("morphNormal"+b,p[T]),i[b]=A,M+=A):(m&&h.hasAttribute("morphTarget"+b)===!0&&h.deleteAttribute("morphTarget"+b),p&&h.hasAttribute("morphNormal"+b)===!0&&h.deleteAttribute("morphNormal"+b),i[b]=0)}const x=h.morphTargetsRelative?1:1-M;u.getUniforms().setValue(r,"morphTargetBaseInfluence",x),u.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:c}}function xp(r,e,t,n){let i=new WeakMap;function s(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}class hl extends wt{constructor(e,t,n,i,s,o,a,c,l,h){if(h=h!==void 0?h:ni,h!==ni&&h!==Ni)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ni&&(n=Un),n===void 0&&h===Ni&&(n=ti),super(null,i,s,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:vt,this.minFilter=c!==void 0?c:vt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const ul=new wt,dl=new hl(1,1);dl.compareFunction=Jc;const fl=new nl,pl=new tu,ml=new cl,Ga=[],Ha=[],Va=new Float32Array(16),Wa=new Float32Array(9),Xa=new Float32Array(4);function Gi(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Ga[i];if(s===void 0&&(s=new Float32Array(i),Ga[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function mt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function gt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function nr(r,e){let t=Ha[e];t===void 0&&(t=new Int32Array(e),Ha[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function yp(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function vp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;r.uniform2fv(this.addr,e),gt(t,e)}}function Mp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(mt(t,e))return;r.uniform3fv(this.addr,e),gt(t,e)}}function Sp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;r.uniform4fv(this.addr,e),gt(t,e)}}function bp(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;Xa.set(n),r.uniformMatrix2fv(this.addr,!1,Xa),gt(t,n)}}function wp(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;Wa.set(n),r.uniformMatrix3fv(this.addr,!1,Wa),gt(t,n)}}function Ep(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;Va.set(n),r.uniformMatrix4fv(this.addr,!1,Va),gt(t,n)}}function Tp(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Ap(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;r.uniform2iv(this.addr,e),gt(t,e)}}function Rp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;r.uniform3iv(this.addr,e),gt(t,e)}}function Cp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;r.uniform4iv(this.addr,e),gt(t,e)}}function Lp(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Pp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;r.uniform2uiv(this.addr,e),gt(t,e)}}function Ip(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;r.uniform3uiv(this.addr,e),gt(t,e)}}function Dp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;r.uniform4uiv(this.addr,e),gt(t,e)}}function Np(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);const s=this.type===r.SAMPLER_2D_SHADOW?dl:ul;t.setTexture2D(e||s,i)}function Up(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||pl,i)}function Op(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||ml,i)}function Fp(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||fl,i)}function Bp(r){switch(r){case 5126:return yp;case 35664:return vp;case 35665:return Mp;case 35666:return Sp;case 35674:return bp;case 35675:return wp;case 35676:return Ep;case 5124:case 35670:return Tp;case 35667:case 35671:return Ap;case 35668:case 35672:return Rp;case 35669:case 35673:return Cp;case 5125:return Lp;case 36294:return Pp;case 36295:return Ip;case 36296:return Dp;case 35678:case 36198:case 36298:case 36306:case 35682:return Np;case 35679:case 36299:case 36307:return Up;case 35680:case 36300:case 36308:case 36293:return Op;case 36289:case 36303:case 36311:case 36292:return Fp}}function zp(r,e){r.uniform1fv(this.addr,e)}function kp(r,e){const t=Gi(e,this.size,2);r.uniform2fv(this.addr,t)}function Gp(r,e){const t=Gi(e,this.size,3);r.uniform3fv(this.addr,t)}function Hp(r,e){const t=Gi(e,this.size,4);r.uniform4fv(this.addr,t)}function Vp(r,e){const t=Gi(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Wp(r,e){const t=Gi(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Xp(r,e){const t=Gi(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function qp(r,e){r.uniform1iv(this.addr,e)}function jp(r,e){r.uniform2iv(this.addr,e)}function Yp(r,e){r.uniform3iv(this.addr,e)}function Kp(r,e){r.uniform4iv(this.addr,e)}function $p(r,e){r.uniform1uiv(this.addr,e)}function Zp(r,e){r.uniform2uiv(this.addr,e)}function Jp(r,e){r.uniform3uiv(this.addr,e)}function Qp(r,e){r.uniform4uiv(this.addr,e)}function em(r,e,t){const n=this.cache,i=e.length,s=nr(t,i);mt(n,s)||(r.uniform1iv(this.addr,s),gt(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||ul,s[o])}function tm(r,e,t){const n=this.cache,i=e.length,s=nr(t,i);mt(n,s)||(r.uniform1iv(this.addr,s),gt(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||pl,s[o])}function nm(r,e,t){const n=this.cache,i=e.length,s=nr(t,i);mt(n,s)||(r.uniform1iv(this.addr,s),gt(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||ml,s[o])}function im(r,e,t){const n=this.cache,i=e.length,s=nr(t,i);mt(n,s)||(r.uniform1iv(this.addr,s),gt(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||fl,s[o])}function sm(r){switch(r){case 5126:return zp;case 35664:return kp;case 35665:return Gp;case 35666:return Hp;case 35674:return Vp;case 35675:return Wp;case 35676:return Xp;case 5124:case 35670:return qp;case 35667:case 35671:return jp;case 35668:case 35672:return Yp;case 35669:case 35673:return Kp;case 5125:return $p;case 36294:return Zp;case 36295:return Jp;case 36296:return Qp;case 35678:case 36198:case 36298:case 36306:case 35682:return em;case 35679:case 36299:case 36307:return tm;case 35680:case 36300:case 36308:case 36293:return nm;case 36289:case 36303:case 36311:case 36292:return im}}class rm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Bp(t.type)}}class om{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=sm(t.type)}}class am{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const Ur=/(\w+)(\])?(\[|\.)?/g;function qa(r,e){r.seq.push(e),r.map[e.id]=e}function cm(r,e,t){const n=r.name,i=n.length;for(Ur.lastIndex=0;;){const s=Ur.exec(n),o=Ur.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){qa(t,l===void 0?new rm(a,r,e):new om(a,r,e));break}else{let u=t.map[a];u===void 0&&(u=new am(a),qa(t,u)),t=u}}}class Ws{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);cm(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function ja(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const lm=37297;let hm=0;function um(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function dm(r){const e=Ye.getPrimaries(Ye.workingColorSpace),t=Ye.getPrimaries(r);let n;switch(e===t?n="":e===Ks&&t===Ys?n="LinearDisplayP3ToLinearSRGB":e===Ys&&t===Ks&&(n="LinearSRGBToLinearDisplayP3"),r){case pt:case er:return[n,"LinearTransferOETF"];case st:case fo:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Ya(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+um(r.getShaderSource(e),o)}else return i}function fm(r,e){const t=dm(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function pm(r,e){let t;switch(e){case lh:t="Linear";break;case hh:t="Reinhard";break;case uh:t="OptimizedCineon";break;case zc:t="ACESFilmic";break;case fh:t="AgX";break;case dh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function mm(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ai).join(`
`)}function gm(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ai).join(`
`)}function _m(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function xm(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function Ai(r){return r!==""}function Ka(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function $a(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ym=/^[ \t]*#include +<([\w\d./]+)>/gm;function io(r){return r.replace(ym,Mm)}const vm=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Mm(r,e){let t=Fe[e];if(t===void 0){const n=vm.get(e);if(n!==void 0)t=Fe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return io(t)}const Sm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Za(r){return r.replace(Sm,bm)}function bm(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Ja(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function wm(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Oc?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Fc?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Mn&&(e="SHADOWMAP_TYPE_VSM"),e}function Em(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Pi:case Ii:e="ENVMAP_TYPE_CUBE";break;case Qs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Tm(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Ii:e="ENVMAP_MODE_REFRACTION";break}return e}function Am(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Bc:e="ENVMAP_BLENDING_MULTIPLY";break;case ah:e="ENVMAP_BLENDING_MIX";break;case ch:e="ENVMAP_BLENDING_ADD";break}return e}function Rm(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Cm(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=wm(t),l=Em(t),h=Tm(t),u=Am(t),d=Rm(t),f=t.isWebGL2?"":mm(t),g=gm(t),_=_m(s),m=i.createProgram();let p,M,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ai).join(`
`),p.length>0&&(p+=`
`),M=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ai).join(`
`),M.length>0&&(M+=`
`)):(p=[Ja(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ai).join(`
`),M=[f,Ja(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Bn?"#define TONE_MAPPING":"",t.toneMapping!==Bn?Fe.tonemapping_pars_fragment:"",t.toneMapping!==Bn?pm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,fm("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ai).join(`
`)),o=io(o),o=Ka(o,t),o=$a(o,t),a=io(a),a=Ka(a,t),a=$a(a,t),o=Za(o),a=Za(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,M=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===ga?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ga?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);const b=x+p+o,C=x+M+a,T=ja(i,i.VERTEX_SHADER,b),A=ja(i,i.FRAGMENT_SHADER,C);i.attachShader(m,T),i.attachShader(m,A),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function k(H){if(r.debug.checkShaderErrors){const J=i.getProgramInfoLog(m).trim(),P=i.getShaderInfoLog(T).trim(),N=i.getShaderInfoLog(A).trim();let G=!0,Y=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(G=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,m,T,A);else{const X=Ya(i,T,"vertex"),q=Ya(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+J+`
`+X+`
`+q)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(P===""||N==="")&&(Y=!1);Y&&(H.diagnostics={runnable:G,programLog:J,vertexShader:{log:P,prefix:p},fragmentShader:{log:N,prefix:M}})}i.deleteShader(T),i.deleteShader(A),v=new Ws(i,m),E=xm(i,m)}let v;this.getUniforms=function(){return v===void 0&&k(this),v};let E;this.getAttributes=function(){return E===void 0&&k(this),E};let z=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=i.getProgramParameter(m,lm)),z},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=hm++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=T,this.fragmentShader=A,this}let Lm=0;class Pm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Im(e),t.set(e,n)),n}}class Im{constructor(e){this.id=Lm++,this.code=e,this.usedTimes=0}}function Dm(r,e,t,n,i,s,o){const a=new mo,c=new Pm,l=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return v===0?"uv":`uv${v}`}function m(v,E,z,H,J){const P=H.fog,N=J.geometry,G=v.isMeshStandardMaterial?H.environment:null,Y=(v.isMeshStandardMaterial?t:e).get(v.envMap||G),X=Y&&Y.mapping===Qs?Y.image.height:null,q=g[v.type];v.precision!==null&&(f=i.getMaxPrecision(v.precision),f!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const j=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,ne=j!==void 0?j.length:0;let ie=0;N.morphAttributes.position!==void 0&&(ie=1),N.morphAttributes.normal!==void 0&&(ie=2),N.morphAttributes.color!==void 0&&(ie=3);let V,K,ce,me;if(q){const Ct=on[q];V=Ct.vertexShader,K=Ct.fragmentShader}else V=v.vertexShader,K=v.fragmentShader,c.update(v),ce=c.getVertexShaderID(v),me=c.getFragmentShaderID(v);const ge=r.getRenderTarget(),Ce=J.isInstancedMesh===!0,Pe=J.isBatchedMesh===!0,he=!!v.map,Le=!!v.matcap,D=!!Y,ut=!!v.aoMap,Se=!!v.lightMap,De=!!v.bumpMap,_e=!!v.normalMap,ot=!!v.displacementMap,Be=!!v.emissiveMap,w=!!v.metalnessMap,y=!!v.roughnessMap,O=v.anisotropy>0,Q=v.clearcoat>0,Z=v.iridescence>0,ee=v.sheen>0,ye=v.transmission>0,le=O&&!!v.anisotropyMap,de=Q&&!!v.clearcoatMap,Te=Q&&!!v.clearcoatNormalMap,ze=Q&&!!v.clearcoatRoughnessMap,$=Z&&!!v.iridescenceMap,Ze=Z&&!!v.iridescenceThicknessMap,Xe=ee&&!!v.sheenColorMap,Ie=ee&&!!v.sheenRoughnessMap,Me=!!v.specularMap,fe=!!v.specularColorMap,Oe=!!v.specularIntensityMap,Ke=ye&&!!v.transmissionMap,ct=ye&&!!v.thicknessMap,Ge=!!v.gradientMap,se=!!v.alphaMap,L=v.alphaTest>0,oe=!!v.alphaHash,ae=!!v.extensions,Ae=!!N.attributes.uv1,be=!!N.attributes.uv2,et=!!N.attributes.uv3;let tt=Bn;return v.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(tt=r.toneMapping),{isWebGL2:h,shaderID:q,shaderType:v.type,shaderName:v.name,vertexShader:V,fragmentShader:K,defines:v.defines,customVertexShaderID:ce,customFragmentShaderID:me,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:Pe,instancing:Ce,instancingColor:Ce&&J.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:ge===null?r.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:pt,map:he,matcap:Le,envMap:D,envMapMode:D&&Y.mapping,envMapCubeUVHeight:X,aoMap:ut,lightMap:Se,bumpMap:De,normalMap:_e,displacementMap:d&&ot,emissiveMap:Be,normalMapObjectSpace:_e&&v.normalMapType===Ah,normalMapTangentSpace:_e&&v.normalMapType===Zc,metalnessMap:w,roughnessMap:y,anisotropy:O,anisotropyMap:le,clearcoat:Q,clearcoatMap:de,clearcoatNormalMap:Te,clearcoatRoughnessMap:ze,iridescence:Z,iridescenceMap:$,iridescenceThicknessMap:Ze,sheen:ee,sheenColorMap:Xe,sheenRoughnessMap:Ie,specularMap:Me,specularColorMap:fe,specularIntensityMap:Oe,transmission:ye,transmissionMap:Ke,thicknessMap:ct,gradientMap:Ge,opaque:v.transparent===!1&&v.blending===Ri,alphaMap:se,alphaTest:L,alphaHash:oe,combine:v.combine,mapUv:he&&_(v.map.channel),aoMapUv:ut&&_(v.aoMap.channel),lightMapUv:Se&&_(v.lightMap.channel),bumpMapUv:De&&_(v.bumpMap.channel),normalMapUv:_e&&_(v.normalMap.channel),displacementMapUv:ot&&_(v.displacementMap.channel),emissiveMapUv:Be&&_(v.emissiveMap.channel),metalnessMapUv:w&&_(v.metalnessMap.channel),roughnessMapUv:y&&_(v.roughnessMap.channel),anisotropyMapUv:le&&_(v.anisotropyMap.channel),clearcoatMapUv:de&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:Te&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ze&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:$&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:Ze&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:Xe&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:Ie&&_(v.sheenRoughnessMap.channel),specularMapUv:Me&&_(v.specularMap.channel),specularColorMapUv:fe&&_(v.specularColorMap.channel),specularIntensityMapUv:Oe&&_(v.specularIntensityMap.channel),transmissionMapUv:Ke&&_(v.transmissionMap.channel),thicknessMapUv:ct&&_(v.thicknessMap.channel),alphaMapUv:se&&_(v.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(_e||O),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,vertexUv1s:Ae,vertexUv2s:be,vertexUv3s:et,pointsUvs:J.isPoints===!0&&!!N.attributes.uv&&(he||se),fog:!!P,useFog:v.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:J.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:ie,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:r.shadowMap.enabled&&z.length>0,shadowMapType:r.shadowMap.type,toneMapping:tt,useLegacyLights:r._useLegacyLights,decodeVideoTexture:he&&v.map.isVideoTexture===!0&&Ye.getTransfer(v.map.colorSpace)===it,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===an,flipSided:v.side===Nt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionDerivatives:ae&&v.extensions.derivatives===!0,extensionFragDepth:ae&&v.extensions.fragDepth===!0,extensionDrawBuffers:ae&&v.extensions.drawBuffers===!0,extensionShaderTextureLOD:ae&&v.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ae&&v.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()}}function p(v){const E=[];if(v.shaderID?E.push(v.shaderID):(E.push(v.customVertexShaderID),E.push(v.customFragmentShaderID)),v.defines!==void 0)for(const z in v.defines)E.push(z),E.push(v.defines[z]);return v.isRawShaderMaterial===!1&&(M(E,v),x(E,v),E.push(r.outputColorSpace)),E.push(v.customProgramCacheKey),E.join()}function M(v,E){v.push(E.precision),v.push(E.outputColorSpace),v.push(E.envMapMode),v.push(E.envMapCubeUVHeight),v.push(E.mapUv),v.push(E.alphaMapUv),v.push(E.lightMapUv),v.push(E.aoMapUv),v.push(E.bumpMapUv),v.push(E.normalMapUv),v.push(E.displacementMapUv),v.push(E.emissiveMapUv),v.push(E.metalnessMapUv),v.push(E.roughnessMapUv),v.push(E.anisotropyMapUv),v.push(E.clearcoatMapUv),v.push(E.clearcoatNormalMapUv),v.push(E.clearcoatRoughnessMapUv),v.push(E.iridescenceMapUv),v.push(E.iridescenceThicknessMapUv),v.push(E.sheenColorMapUv),v.push(E.sheenRoughnessMapUv),v.push(E.specularMapUv),v.push(E.specularColorMapUv),v.push(E.specularIntensityMapUv),v.push(E.transmissionMapUv),v.push(E.thicknessMapUv),v.push(E.combine),v.push(E.fogExp2),v.push(E.sizeAttenuation),v.push(E.morphTargetsCount),v.push(E.morphAttributeCount),v.push(E.numDirLights),v.push(E.numPointLights),v.push(E.numSpotLights),v.push(E.numSpotLightMaps),v.push(E.numHemiLights),v.push(E.numRectAreaLights),v.push(E.numDirLightShadows),v.push(E.numPointLightShadows),v.push(E.numSpotLightShadows),v.push(E.numSpotLightShadowsWithMaps),v.push(E.numLightProbes),v.push(E.shadowMapType),v.push(E.toneMapping),v.push(E.numClippingPlanes),v.push(E.numClipIntersection),v.push(E.depthPacking)}function x(v,E){a.disableAll(),E.isWebGL2&&a.enable(0),E.supportsVertexTextures&&a.enable(1),E.instancing&&a.enable(2),E.instancingColor&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),v.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.skinning&&a.enable(4),E.morphTargets&&a.enable(5),E.morphNormals&&a.enable(6),E.morphColors&&a.enable(7),E.premultipliedAlpha&&a.enable(8),E.shadowMapEnabled&&a.enable(9),E.useLegacyLights&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),v.push(a.mask)}function b(v){const E=g[v.type];let z;if(E){const H=on[E];z=pu.clone(H.uniforms)}else z=v.uniforms;return z}function C(v,E){let z;for(let H=0,J=l.length;H<J;H++){const P=l[H];if(P.cacheKey===E){z=P,++z.usedTimes;break}}return z===void 0&&(z=new Cm(r,E,v,s),l.push(z)),z}function T(v){if(--v.usedTimes===0){const E=l.indexOf(v);l[E]=l[l.length-1],l.pop(),v.destroy()}}function A(v){c.remove(v)}function k(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:b,acquireProgram:C,releaseProgram:T,releaseShaderCache:A,programs:l,dispose:k}}function Nm(){let r=new WeakMap;function e(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function t(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function Um(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Qa(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function ec(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,f,g,_,m){let p=r[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},r[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function a(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function c(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function l(u,d){t.length>1&&t.sort(u||Um),n.length>1&&n.sort(d||Qa),i.length>1&&i.sort(d||Qa)}function h(){for(let u=e,d=r.length;u<d;u++){const f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:c,finish:h,sort:l}}function Om(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new ec,r.set(n,[o])):i>=s.length?(o=new ec,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function Fm(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new Ee};break;case"SpotLight":t={position:new R,direction:new R,color:new Ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new Ee,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new Ee,groundColor:new Ee};break;case"RectAreaLight":t={color:new Ee,position:new R,halfWidth:new R,halfHeight:new R};break}return r[e.id]=t,t}}}function Bm(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let zm=0;function km(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Gm(r,e){const t=new Fm,n=Bm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new R);const s=new R,o=new We,a=new We;function c(h,u){let d=0,f=0,g=0;for(let H=0;H<9;H++)i.probe[H].set(0,0,0);let _=0,m=0,p=0,M=0,x=0,b=0,C=0,T=0,A=0,k=0,v=0;h.sort(km);const E=u===!0?Math.PI:1;for(let H=0,J=h.length;H<J;H++){const P=h[H],N=P.color,G=P.intensity,Y=P.distance,X=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)d+=N.r*G*E,f+=N.g*G*E,g+=N.b*G*E;else if(P.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(P.sh.coefficients[q],G);v++}else if(P.isDirectionalLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity*E),P.castShadow){const j=P.shadow,ne=n.get(P);ne.shadowBias=j.bias,ne.shadowNormalBias=j.normalBias,ne.shadowRadius=j.radius,ne.shadowMapSize=j.mapSize,i.directionalShadow[_]=ne,i.directionalShadowMap[_]=X,i.directionalShadowMatrix[_]=P.shadow.matrix,b++}i.directional[_]=q,_++}else if(P.isSpotLight){const q=t.get(P);q.position.setFromMatrixPosition(P.matrixWorld),q.color.copy(N).multiplyScalar(G*E),q.distance=Y,q.coneCos=Math.cos(P.angle),q.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),q.decay=P.decay,i.spot[p]=q;const j=P.shadow;if(P.map&&(i.spotLightMap[A]=P.map,A++,j.updateMatrices(P),P.castShadow&&k++),i.spotLightMatrix[p]=j.matrix,P.castShadow){const ne=n.get(P);ne.shadowBias=j.bias,ne.shadowNormalBias=j.normalBias,ne.shadowRadius=j.radius,ne.shadowMapSize=j.mapSize,i.spotShadow[p]=ne,i.spotShadowMap[p]=X,T++}p++}else if(P.isRectAreaLight){const q=t.get(P);q.color.copy(N).multiplyScalar(G),q.halfWidth.set(P.width*.5,0,0),q.halfHeight.set(0,P.height*.5,0),i.rectArea[M]=q,M++}else if(P.isPointLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity*E),q.distance=P.distance,q.decay=P.decay,P.castShadow){const j=P.shadow,ne=n.get(P);ne.shadowBias=j.bias,ne.shadowNormalBias=j.normalBias,ne.shadowRadius=j.radius,ne.shadowMapSize=j.mapSize,ne.shadowCameraNear=j.camera.near,ne.shadowCameraFar=j.camera.far,i.pointShadow[m]=ne,i.pointShadowMap[m]=X,i.pointShadowMatrix[m]=P.shadow.matrix,C++}i.point[m]=q,m++}else if(P.isHemisphereLight){const q=t.get(P);q.skyColor.copy(P.color).multiplyScalar(G*E),q.groundColor.copy(P.groundColor).multiplyScalar(G*E),i.hemi[x]=q,x++}}M>0&&(e.isWebGL2?r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=re.LTC_FLOAT_1,i.rectAreaLTC2=re.LTC_FLOAT_2):(i.rectAreaLTC1=re.LTC_HALF_1,i.rectAreaLTC2=re.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=re.LTC_FLOAT_1,i.rectAreaLTC2=re.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=re.LTC_HALF_1,i.rectAreaLTC2=re.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=g;const z=i.hash;(z.directionalLength!==_||z.pointLength!==m||z.spotLength!==p||z.rectAreaLength!==M||z.hemiLength!==x||z.numDirectionalShadows!==b||z.numPointShadows!==C||z.numSpotShadows!==T||z.numSpotMaps!==A||z.numLightProbes!==v)&&(i.directional.length=_,i.spot.length=p,i.rectArea.length=M,i.point.length=m,i.hemi.length=x,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=C,i.pointShadowMap.length=C,i.spotShadow.length=T,i.spotShadowMap.length=T,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=C,i.spotLightMatrix.length=T+A-k,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=k,i.numLightProbes=v,z.directionalLength=_,z.pointLength=m,z.spotLength=p,z.rectAreaLength=M,z.hemiLength=x,z.numDirectionalShadows=b,z.numPointShadows=C,z.numSpotShadows=T,z.numSpotMaps=A,z.numLightProbes=v,i.version=zm++)}function l(h,u){let d=0,f=0,g=0,_=0,m=0;const p=u.matrixWorldInverse;for(let M=0,x=h.length;M<x;M++){const b=h[M];if(b.isDirectionalLight){const C=i.directional[d];C.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(p),d++}else if(b.isSpotLight){const C=i.spot[g];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(p),C.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(p),g++}else if(b.isRectAreaLight){const C=i.rectArea[_];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(p),a.identity(),o.copy(b.matrixWorld),o.premultiply(p),a.extractRotation(o),C.halfWidth.set(b.width*.5,0,0),C.halfHeight.set(0,b.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),_++}else if(b.isPointLight){const C=i.point[f];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(p),f++}else if(b.isHemisphereLight){const C=i.hemi[m];C.direction.setFromMatrixPosition(b.matrixWorld),C.direction.transformDirection(p),m++}}}return{setup:c,setupView:l,state:i}}function tc(r,e){const t=new Gm(r,e),n=[],i=[];function s(){n.length=0,i.length=0}function o(u){n.push(u)}function a(u){i.push(u)}function c(u){t.setup(n,u)}function l(u){t.setupView(n,u)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function Hm(r,e){let t=new WeakMap;function n(s,o=0){const a=t.get(s);let c;return a===void 0?(c=new tc(r,e),t.set(s,[c])):o>=a.length?(c=new tc(r,e),a.push(c)):c=a[o],c}function i(){t=new WeakMap}return{get:n,dispose:i}}class Vm extends ln{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Eh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Wm extends ln{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Xm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function jm(r,e,t){let n=new go;const i=new je,s=new je,o=new Qe,a=new Vm({depthPacking:Th}),c=new Wm,l={},h=t.maxTextureSize,u={[En]:Nt,[Nt]:En,[an]:an},d=new oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new je},radius:{value:4}},vertexShader:Xm,fragmentShader:qm}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new kt;g.setAttribute("position",new Mt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new W(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Oc;let p=this.type;this.render=function(T,A,k){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const v=r.getRenderTarget(),E=r.getActiveCubeFace(),z=r.getActiveMipmapLevel(),H=r.state;H.setBlending(Fn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const J=p!==Mn&&this.type===Mn,P=p===Mn&&this.type!==Mn;for(let N=0,G=T.length;N<G;N++){const Y=T[N],X=Y.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);const q=X.getFrameExtents();if(i.multiply(q),s.copy(X.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/q.x),i.x=s.x*q.x,X.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/q.y),i.y=s.y*q.y,X.mapSize.y=s.y)),X.map===null||J===!0||P===!0){const ne=this.type!==Mn?{minFilter:vt,magFilter:vt}:{};X.map!==null&&X.map.dispose(),X.map=new ri(i.x,i.y,ne),X.map.texture.name=Y.name+".shadowMap",X.camera.updateProjectionMatrix()}r.setRenderTarget(X.map),r.clear();const j=X.getViewportCount();for(let ne=0;ne<j;ne++){const ie=X.getViewport(ne);o.set(s.x*ie.x,s.y*ie.y,s.x*ie.z,s.y*ie.w),H.viewport(o),X.updateMatrices(Y,ne),n=X.getFrustum(),b(A,k,X.camera,Y,this.type)}X.isPointLightShadow!==!0&&this.type===Mn&&M(X,k),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(v,E,z)};function M(T,A){const k=e.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ri(i.x,i.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,r.setRenderTarget(T.mapPass),r.clear(),r.renderBufferDirect(A,null,k,d,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,r.setRenderTarget(T.map),r.clear(),r.renderBufferDirect(A,null,k,f,_,null)}function x(T,A,k,v){let E=null;const z=k.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(z!==void 0)E=z;else if(E=k.isPointLight===!0?c:a,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const H=E.uuid,J=A.uuid;let P=l[H];P===void 0&&(P={},l[H]=P);let N=P[J];N===void 0&&(N=E.clone(),P[J]=N,A.addEventListener("dispose",C)),E=N}if(E.visible=A.visible,E.wireframe=A.wireframe,v===Mn?E.side=A.shadowSide!==null?A.shadowSide:A.side:E.side=A.shadowSide!==null?A.shadowSide:u[A.side],E.alphaMap=A.alphaMap,E.alphaTest=A.alphaTest,E.map=A.map,E.clipShadows=A.clipShadows,E.clippingPlanes=A.clippingPlanes,E.clipIntersection=A.clipIntersection,E.displacementMap=A.displacementMap,E.displacementScale=A.displacementScale,E.displacementBias=A.displacementBias,E.wireframeLinewidth=A.wireframeLinewidth,E.linewidth=A.linewidth,k.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const H=r.properties.get(E);H.light=k}return E}function b(T,A,k,v,E){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&E===Mn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,T.matrixWorld);const J=e.update(T),P=T.material;if(Array.isArray(P)){const N=J.groups;for(let G=0,Y=N.length;G<Y;G++){const X=N[G],q=P[X.materialIndex];if(q&&q.visible){const j=x(T,q,v,E);T.onBeforeShadow(r,T,A,k,J,j,X),r.renderBufferDirect(k,null,J,j,T,X),T.onAfterShadow(r,T,A,k,J,j,X)}}}else if(P.visible){const N=x(T,P,v,E);T.onBeforeShadow(r,T,A,k,J,N,null),r.renderBufferDirect(k,null,J,N,T,null),T.onAfterShadow(r,T,A,k,J,N,null)}}const H=T.children;for(let J=0,P=H.length;J<P;J++)b(H[J],A,k,v,E)}function C(T){T.target.removeEventListener("dispose",C);for(const k in l){const v=l[k],E=T.target.uuid;E in v&&(v[E].dispose(),delete v[E])}}}function Ym(r,e,t){const n=t.isWebGL2;function i(){let L=!1;const oe=new Qe;let ae=null;const Ae=new Qe(0,0,0,0);return{setMask:function(be){ae!==be&&!L&&(r.colorMask(be,be,be,be),ae=be)},setLocked:function(be){L=be},setClear:function(be,et,tt,_t,Ct){Ct===!0&&(be*=_t,et*=_t,tt*=_t),oe.set(be,et,tt,_t),Ae.equals(oe)===!1&&(r.clearColor(be,et,tt,_t),Ae.copy(oe))},reset:function(){L=!1,ae=null,Ae.set(-1,0,0,0)}}}function s(){let L=!1,oe=null,ae=null,Ae=null;return{setTest:function(be){be?Pe(r.DEPTH_TEST):he(r.DEPTH_TEST)},setMask:function(be){oe!==be&&!L&&(r.depthMask(be),oe=be)},setFunc:function(be){if(ae!==be){switch(be){case eh:r.depthFunc(r.NEVER);break;case th:r.depthFunc(r.ALWAYS);break;case nh:r.depthFunc(r.LESS);break;case Xs:r.depthFunc(r.LEQUAL);break;case ih:r.depthFunc(r.EQUAL);break;case sh:r.depthFunc(r.GEQUAL);break;case rh:r.depthFunc(r.GREATER);break;case oh:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ae=be}},setLocked:function(be){L=be},setClear:function(be){Ae!==be&&(r.clearDepth(be),Ae=be)},reset:function(){L=!1,oe=null,ae=null,Ae=null}}}function o(){let L=!1,oe=null,ae=null,Ae=null,be=null,et=null,tt=null,_t=null,Ct=null;return{setTest:function(nt){L||(nt?Pe(r.STENCIL_TEST):he(r.STENCIL_TEST))},setMask:function(nt){oe!==nt&&!L&&(r.stencilMask(nt),oe=nt)},setFunc:function(nt,Lt,rn){(ae!==nt||Ae!==Lt||be!==rn)&&(r.stencilFunc(nt,Lt,rn),ae=nt,Ae=Lt,be=rn)},setOp:function(nt,Lt,rn){(et!==nt||tt!==Lt||_t!==rn)&&(r.stencilOp(nt,Lt,rn),et=nt,tt=Lt,_t=rn)},setLocked:function(nt){L=nt},setClear:function(nt){Ct!==nt&&(r.clearStencil(nt),Ct=nt)},reset:function(){L=!1,oe=null,ae=null,Ae=null,be=null,et=null,tt=null,_t=null,Ct=null}}}const a=new i,c=new s,l=new o,h=new WeakMap,u=new WeakMap;let d={},f={},g=new WeakMap,_=[],m=null,p=!1,M=null,x=null,b=null,C=null,T=null,A=null,k=null,v=new Ee(0,0,0),E=0,z=!1,H=null,J=null,P=null,N=null,G=null;const Y=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,q=0;const j=r.getParameter(r.VERSION);j.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(j)[1]),X=q>=1):j.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),X=q>=2);let ne=null,ie={};const V=r.getParameter(r.SCISSOR_BOX),K=r.getParameter(r.VIEWPORT),ce=new Qe().fromArray(V),me=new Qe().fromArray(K);function ge(L,oe,ae,Ae){const be=new Uint8Array(4),et=r.createTexture();r.bindTexture(L,et),r.texParameteri(L,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(L,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let tt=0;tt<ae;tt++)n&&(L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY)?r.texImage3D(oe,0,r.RGBA,1,1,Ae,0,r.RGBA,r.UNSIGNED_BYTE,be):r.texImage2D(oe+tt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,be);return et}const Ce={};Ce[r.TEXTURE_2D]=ge(r.TEXTURE_2D,r.TEXTURE_2D,1),Ce[r.TEXTURE_CUBE_MAP]=ge(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ce[r.TEXTURE_2D_ARRAY]=ge(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Ce[r.TEXTURE_3D]=ge(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Pe(r.DEPTH_TEST),c.setFunc(Xs),Be(!1),w(No),Pe(r.CULL_FACE),_e(Fn);function Pe(L){d[L]!==!0&&(r.enable(L),d[L]=!0)}function he(L){d[L]!==!1&&(r.disable(L),d[L]=!1)}function Le(L,oe){return f[L]!==oe?(r.bindFramebuffer(L,oe),f[L]=oe,n&&(L===r.DRAW_FRAMEBUFFER&&(f[r.FRAMEBUFFER]=oe),L===r.FRAMEBUFFER&&(f[r.DRAW_FRAMEBUFFER]=oe)),!0):!1}function D(L,oe){let ae=_,Ae=!1;if(L)if(ae=g.get(oe),ae===void 0&&(ae=[],g.set(oe,ae)),L.isWebGLMultipleRenderTargets){const be=L.texture;if(ae.length!==be.length||ae[0]!==r.COLOR_ATTACHMENT0){for(let et=0,tt=be.length;et<tt;et++)ae[et]=r.COLOR_ATTACHMENT0+et;ae.length=be.length,Ae=!0}}else ae[0]!==r.COLOR_ATTACHMENT0&&(ae[0]=r.COLOR_ATTACHMENT0,Ae=!0);else ae[0]!==r.BACK&&(ae[0]=r.BACK,Ae=!0);Ae&&(t.isWebGL2?r.drawBuffers(ae):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ae))}function ut(L){return m!==L?(r.useProgram(L),m=L,!0):!1}const Se={[Qn]:r.FUNC_ADD,[zl]:r.FUNC_SUBTRACT,[kl]:r.FUNC_REVERSE_SUBTRACT};if(n)Se[Bo]=r.MIN,Se[zo]=r.MAX;else{const L=e.get("EXT_blend_minmax");L!==null&&(Se[Bo]=L.MIN_EXT,Se[zo]=L.MAX_EXT)}const De={[Gl]:r.ZERO,[Hl]:r.ONE,[Vl]:r.SRC_COLOR,[Yr]:r.SRC_ALPHA,[Kl]:r.SRC_ALPHA_SATURATE,[jl]:r.DST_COLOR,[Xl]:r.DST_ALPHA,[Wl]:r.ONE_MINUS_SRC_COLOR,[Kr]:r.ONE_MINUS_SRC_ALPHA,[Yl]:r.ONE_MINUS_DST_COLOR,[ql]:r.ONE_MINUS_DST_ALPHA,[$l]:r.CONSTANT_COLOR,[Zl]:r.ONE_MINUS_CONSTANT_COLOR,[Jl]:r.CONSTANT_ALPHA,[Ql]:r.ONE_MINUS_CONSTANT_ALPHA};function _e(L,oe,ae,Ae,be,et,tt,_t,Ct,nt){if(L===Fn){p===!0&&(he(r.BLEND),p=!1);return}if(p===!1&&(Pe(r.BLEND),p=!0),L!==Bl){if(L!==M||nt!==z){if((x!==Qn||T!==Qn)&&(r.blendEquation(r.FUNC_ADD),x=Qn,T=Qn),nt)switch(L){case Ri:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Uo:r.blendFunc(r.ONE,r.ONE);break;case Oo:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Fo:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Ri:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Uo:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Oo:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Fo:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}b=null,C=null,A=null,k=null,v.set(0,0,0),E=0,M=L,z=nt}return}be=be||oe,et=et||ae,tt=tt||Ae,(oe!==x||be!==T)&&(r.blendEquationSeparate(Se[oe],Se[be]),x=oe,T=be),(ae!==b||Ae!==C||et!==A||tt!==k)&&(r.blendFuncSeparate(De[ae],De[Ae],De[et],De[tt]),b=ae,C=Ae,A=et,k=tt),(_t.equals(v)===!1||Ct!==E)&&(r.blendColor(_t.r,_t.g,_t.b,Ct),v.copy(_t),E=Ct),M=L,z=!1}function ot(L,oe){L.side===an?he(r.CULL_FACE):Pe(r.CULL_FACE);let ae=L.side===Nt;oe&&(ae=!ae),Be(ae),L.blending===Ri&&L.transparent===!1?_e(Fn):_e(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),c.setFunc(L.depthFunc),c.setTest(L.depthTest),c.setMask(L.depthWrite),a.setMask(L.colorWrite);const Ae=L.stencilWrite;l.setTest(Ae),Ae&&(l.setMask(L.stencilWriteMask),l.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),l.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),O(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Pe(r.SAMPLE_ALPHA_TO_COVERAGE):he(r.SAMPLE_ALPHA_TO_COVERAGE)}function Be(L){H!==L&&(L?r.frontFace(r.CW):r.frontFace(r.CCW),H=L)}function w(L){L!==Ol?(Pe(r.CULL_FACE),L!==J&&(L===No?r.cullFace(r.BACK):L===Fl?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):he(r.CULL_FACE),J=L}function y(L){L!==P&&(X&&r.lineWidth(L),P=L)}function O(L,oe,ae){L?(Pe(r.POLYGON_OFFSET_FILL),(N!==oe||G!==ae)&&(r.polygonOffset(oe,ae),N=oe,G=ae)):he(r.POLYGON_OFFSET_FILL)}function Q(L){L?Pe(r.SCISSOR_TEST):he(r.SCISSOR_TEST)}function Z(L){L===void 0&&(L=r.TEXTURE0+Y-1),ne!==L&&(r.activeTexture(L),ne=L)}function ee(L,oe,ae){ae===void 0&&(ne===null?ae=r.TEXTURE0+Y-1:ae=ne);let Ae=ie[ae];Ae===void 0&&(Ae={type:void 0,texture:void 0},ie[ae]=Ae),(Ae.type!==L||Ae.texture!==oe)&&(ne!==ae&&(r.activeTexture(ae),ne=ae),r.bindTexture(L,oe||Ce[L]),Ae.type=L,Ae.texture=oe)}function ye(){const L=ie[ne];L!==void 0&&L.type!==void 0&&(r.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function le(){try{r.compressedTexImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function de(){try{r.compressedTexImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Te(){try{r.texSubImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ze(){try{r.texSubImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function $(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ze(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Xe(){try{r.texStorage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ie(){try{r.texStorage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Me(){try{r.texImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function fe(){try{r.texImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Oe(L){ce.equals(L)===!1&&(r.scissor(L.x,L.y,L.z,L.w),ce.copy(L))}function Ke(L){me.equals(L)===!1&&(r.viewport(L.x,L.y,L.z,L.w),me.copy(L))}function ct(L,oe){let ae=u.get(oe);ae===void 0&&(ae=new WeakMap,u.set(oe,ae));let Ae=ae.get(L);Ae===void 0&&(Ae=r.getUniformBlockIndex(oe,L.name),ae.set(L,Ae))}function Ge(L,oe){const Ae=u.get(oe).get(L);h.get(oe)!==Ae&&(r.uniformBlockBinding(oe,Ae,L.__bindingPointIndex),h.set(oe,Ae))}function se(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),n===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),d={},ne=null,ie={},f={},g=new WeakMap,_=[],m=null,p=!1,M=null,x=null,b=null,C=null,T=null,A=null,k=null,v=new Ee(0,0,0),E=0,z=!1,H=null,J=null,P=null,N=null,G=null,ce.set(0,0,r.canvas.width,r.canvas.height),me.set(0,0,r.canvas.width,r.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:Pe,disable:he,bindFramebuffer:Le,drawBuffers:D,useProgram:ut,setBlending:_e,setMaterial:ot,setFlipSided:Be,setCullFace:w,setLineWidth:y,setPolygonOffset:O,setScissorTest:Q,activeTexture:Z,bindTexture:ee,unbindTexture:ye,compressedTexImage2D:le,compressedTexImage3D:de,texImage2D:Me,texImage3D:fe,updateUBOMapping:ct,uniformBlockBinding:Ge,texStorage2D:Xe,texStorage3D:Ie,texSubImage2D:Te,texSubImage3D:ze,compressedTexSubImage2D:$,compressedTexSubImage3D:Ze,scissor:Oe,viewport:Ke,reset:se}}function Km(r,e,t,n,i,s,o){const a=i.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,y){return f?new OffscreenCanvas(w,y):rs("canvas")}function _(w,y,O,Q){let Z=1;if((w.width>Q||w.height>Q)&&(Z=Q/Math.max(w.width,w.height)),Z<1||y===!0)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap){const ee=y?Zs:Math.floor,ye=ee(Z*w.width),le=ee(Z*w.height);u===void 0&&(u=g(ye,le));const de=O?g(ye,le):u;return de.width=ye,de.height=le,de.getContext("2d").drawImage(w,0,0,ye,le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+w.width+"x"+w.height+") to ("+ye+"x"+le+")."),de}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+w.width+"x"+w.height+")."),w;return w}function m(w){return no(w.width)&&no(w.height)}function p(w){return a?!1:w.wrapS!==$t||w.wrapT!==$t||w.minFilter!==vt&&w.minFilter!==Ft}function M(w,y){return w.generateMipmaps&&y&&w.minFilter!==vt&&w.minFilter!==Ft}function x(w){r.generateMipmap(w)}function b(w,y,O,Q,Z=!1){if(a===!1)return y;if(w!==null){if(r[w]!==void 0)return r[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let ee=y;if(y===r.RED&&(O===r.FLOAT&&(ee=r.R32F),O===r.HALF_FLOAT&&(ee=r.R16F),O===r.UNSIGNED_BYTE&&(ee=r.R8)),y===r.RED_INTEGER&&(O===r.UNSIGNED_BYTE&&(ee=r.R8UI),O===r.UNSIGNED_SHORT&&(ee=r.R16UI),O===r.UNSIGNED_INT&&(ee=r.R32UI),O===r.BYTE&&(ee=r.R8I),O===r.SHORT&&(ee=r.R16I),O===r.INT&&(ee=r.R32I)),y===r.RG&&(O===r.FLOAT&&(ee=r.RG32F),O===r.HALF_FLOAT&&(ee=r.RG16F),O===r.UNSIGNED_BYTE&&(ee=r.RG8)),y===r.RGBA){const ye=Z?js:Ye.getTransfer(Q);O===r.FLOAT&&(ee=r.RGBA32F),O===r.HALF_FLOAT&&(ee=r.RGBA16F),O===r.UNSIGNED_BYTE&&(ee=ye===it?r.SRGB8_ALPHA8:r.RGBA8),O===r.UNSIGNED_SHORT_4_4_4_4&&(ee=r.RGBA4),O===r.UNSIGNED_SHORT_5_5_5_1&&(ee=r.RGB5_A1)}return(ee===r.R16F||ee===r.R32F||ee===r.RG16F||ee===r.RG32F||ee===r.RGBA16F||ee===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function C(w,y,O){return M(w,O)===!0||w.isFramebufferTexture&&w.minFilter!==vt&&w.minFilter!==Ft?Math.log2(Math.max(y.width,y.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?y.mipmaps.length:1}function T(w){return w===vt||w===Jr||w===Vs?r.NEAREST:r.LINEAR}function A(w){const y=w.target;y.removeEventListener("dispose",A),v(y),y.isVideoTexture&&h.delete(y)}function k(w){const y=w.target;y.removeEventListener("dispose",k),z(y)}function v(w){const y=n.get(w);if(y.__webglInit===void 0)return;const O=w.source,Q=d.get(O);if(Q){const Z=Q[y.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&E(w),Object.keys(Q).length===0&&d.delete(O)}n.remove(w)}function E(w){const y=n.get(w);r.deleteTexture(y.__webglTexture);const O=w.source,Q=d.get(O);delete Q[y.__cacheKey],o.memory.textures--}function z(w){const y=w.texture,O=n.get(w),Q=n.get(y);if(Q.__webglTexture!==void 0&&(r.deleteTexture(Q.__webglTexture),o.memory.textures--),w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(O.__webglFramebuffer[Z]))for(let ee=0;ee<O.__webglFramebuffer[Z].length;ee++)r.deleteFramebuffer(O.__webglFramebuffer[Z][ee]);else r.deleteFramebuffer(O.__webglFramebuffer[Z]);O.__webglDepthbuffer&&r.deleteRenderbuffer(O.__webglDepthbuffer[Z])}else{if(Array.isArray(O.__webglFramebuffer))for(let Z=0;Z<O.__webglFramebuffer.length;Z++)r.deleteFramebuffer(O.__webglFramebuffer[Z]);else r.deleteFramebuffer(O.__webglFramebuffer);if(O.__webglDepthbuffer&&r.deleteRenderbuffer(O.__webglDepthbuffer),O.__webglMultisampledFramebuffer&&r.deleteFramebuffer(O.__webglMultisampledFramebuffer),O.__webglColorRenderbuffer)for(let Z=0;Z<O.__webglColorRenderbuffer.length;Z++)O.__webglColorRenderbuffer[Z]&&r.deleteRenderbuffer(O.__webglColorRenderbuffer[Z]);O.__webglDepthRenderbuffer&&r.deleteRenderbuffer(O.__webglDepthRenderbuffer)}if(w.isWebGLMultipleRenderTargets)for(let Z=0,ee=y.length;Z<ee;Z++){const ye=n.get(y[Z]);ye.__webglTexture&&(r.deleteTexture(ye.__webglTexture),o.memory.textures--),n.remove(y[Z])}n.remove(y),n.remove(w)}let H=0;function J(){H=0}function P(){const w=H;return w>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+i.maxTextures),H+=1,w}function N(w){const y=[];return y.push(w.wrapS),y.push(w.wrapT),y.push(w.wrapR||0),y.push(w.magFilter),y.push(w.minFilter),y.push(w.anisotropy),y.push(w.internalFormat),y.push(w.format),y.push(w.type),y.push(w.generateMipmaps),y.push(w.premultiplyAlpha),y.push(w.flipY),y.push(w.unpackAlignment),y.push(w.colorSpace),y.join()}function G(w,y){const O=n.get(w);if(w.isVideoTexture&&ot(w),w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){const Q=w.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ce(O,w,y);return}}t.bindTexture(r.TEXTURE_2D,O.__webglTexture,r.TEXTURE0+y)}function Y(w,y){const O=n.get(w);if(w.version>0&&O.__version!==w.version){ce(O,w,y);return}t.bindTexture(r.TEXTURE_2D_ARRAY,O.__webglTexture,r.TEXTURE0+y)}function X(w,y){const O=n.get(w);if(w.version>0&&O.__version!==w.version){ce(O,w,y);return}t.bindTexture(r.TEXTURE_3D,O.__webglTexture,r.TEXTURE0+y)}function q(w,y){const O=n.get(w);if(w.version>0&&O.__version!==w.version){me(O,w,y);return}t.bindTexture(r.TEXTURE_CUBE_MAP,O.__webglTexture,r.TEXTURE0+y)}const j={[Di]:r.REPEAT,[$t]:r.CLAMP_TO_EDGE,[qs]:r.MIRRORED_REPEAT},ne={[vt]:r.NEAREST,[Jr]:r.NEAREST_MIPMAP_NEAREST,[Vs]:r.NEAREST_MIPMAP_LINEAR,[Ft]:r.LINEAR,[Gc]:r.LINEAR_MIPMAP_NEAREST,[si]:r.LINEAR_MIPMAP_LINEAR},ie={[Rh]:r.NEVER,[Nh]:r.ALWAYS,[Ch]:r.LESS,[Jc]:r.LEQUAL,[Lh]:r.EQUAL,[Dh]:r.GEQUAL,[Ph]:r.GREATER,[Ih]:r.NOTEQUAL};function V(w,y,O){if(O?(r.texParameteri(w,r.TEXTURE_WRAP_S,j[y.wrapS]),r.texParameteri(w,r.TEXTURE_WRAP_T,j[y.wrapT]),(w===r.TEXTURE_3D||w===r.TEXTURE_2D_ARRAY)&&r.texParameteri(w,r.TEXTURE_WRAP_R,j[y.wrapR]),r.texParameteri(w,r.TEXTURE_MAG_FILTER,ne[y.magFilter]),r.texParameteri(w,r.TEXTURE_MIN_FILTER,ne[y.minFilter])):(r.texParameteri(w,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(w,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(w===r.TEXTURE_3D||w===r.TEXTURE_2D_ARRAY)&&r.texParameteri(w,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(y.wrapS!==$t||y.wrapT!==$t)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(w,r.TEXTURE_MAG_FILTER,T(y.magFilter)),r.texParameteri(w,r.TEXTURE_MIN_FILTER,T(y.minFilter)),y.minFilter!==vt&&y.minFilter!==Ft&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(r.texParameteri(w,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(w,r.TEXTURE_COMPARE_FUNC,ie[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const Q=e.get("EXT_texture_filter_anisotropic");if(y.magFilter===vt||y.minFilter!==Vs&&y.minFilter!==si||y.type===bn&&e.has("OES_texture_float_linear")===!1||a===!1&&y.type===is&&e.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||n.get(y).__currentAnisotropy)&&(r.texParameterf(w,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,i.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy)}}function K(w,y){let O=!1;w.__webglInit===void 0&&(w.__webglInit=!0,y.addEventListener("dispose",A));const Q=y.source;let Z=d.get(Q);Z===void 0&&(Z={},d.set(Q,Z));const ee=N(y);if(ee!==w.__cacheKey){Z[ee]===void 0&&(Z[ee]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,O=!0),Z[ee].usedTimes++;const ye=Z[w.__cacheKey];ye!==void 0&&(Z[w.__cacheKey].usedTimes--,ye.usedTimes===0&&E(y)),w.__cacheKey=ee,w.__webglTexture=Z[ee].texture}return O}function ce(w,y,O){let Q=r.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(Q=r.TEXTURE_2D_ARRAY),y.isData3DTexture&&(Q=r.TEXTURE_3D);const Z=K(w,y),ee=y.source;t.bindTexture(Q,w.__webglTexture,r.TEXTURE0+O);const ye=n.get(ee);if(ee.version!==ye.__version||Z===!0){t.activeTexture(r.TEXTURE0+O);const le=Ye.getPrimaries(Ye.workingColorSpace),de=y.colorSpace===Jt?null:Ye.getPrimaries(y.colorSpace),Te=y.colorSpace===Jt||le===de?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const ze=p(y)&&m(y.image)===!1;let $=_(y.image,ze,!1,i.maxTextureSize);$=Be(y,$);const Ze=m($)||a,Xe=s.convert(y.format,y.colorSpace);let Ie=s.convert(y.type),Me=b(y.internalFormat,Xe,Ie,y.colorSpace,y.isVideoTexture);V(Q,y,Ze);let fe;const Oe=y.mipmaps,Ke=a&&y.isVideoTexture!==!0&&Me!==Yc,ct=ye.__version===void 0||Z===!0,Ge=C(y,$,Ze);if(y.isDepthTexture)Me=r.DEPTH_COMPONENT,a?y.type===bn?Me=r.DEPTH_COMPONENT32F:y.type===Un?Me=r.DEPTH_COMPONENT24:y.type===ti?Me=r.DEPTH24_STENCIL8:Me=r.DEPTH_COMPONENT16:y.type===bn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===ni&&Me===r.DEPTH_COMPONENT&&y.type!==uo&&y.type!==Un&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=Un,Ie=s.convert(y.type)),y.format===Ni&&Me===r.DEPTH_COMPONENT&&(Me=r.DEPTH_STENCIL,y.type!==ti&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=ti,Ie=s.convert(y.type))),ct&&(Ke?t.texStorage2D(r.TEXTURE_2D,1,Me,$.width,$.height):t.texImage2D(r.TEXTURE_2D,0,Me,$.width,$.height,0,Xe,Ie,null));else if(y.isDataTexture)if(Oe.length>0&&Ze){Ke&&ct&&t.texStorage2D(r.TEXTURE_2D,Ge,Me,Oe[0].width,Oe[0].height);for(let se=0,L=Oe.length;se<L;se++)fe=Oe[se],Ke?t.texSubImage2D(r.TEXTURE_2D,se,0,0,fe.width,fe.height,Xe,Ie,fe.data):t.texImage2D(r.TEXTURE_2D,se,Me,fe.width,fe.height,0,Xe,Ie,fe.data);y.generateMipmaps=!1}else Ke?(ct&&t.texStorage2D(r.TEXTURE_2D,Ge,Me,$.width,$.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,$.width,$.height,Xe,Ie,$.data)):t.texImage2D(r.TEXTURE_2D,0,Me,$.width,$.height,0,Xe,Ie,$.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ke&&ct&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ge,Me,Oe[0].width,Oe[0].height,$.depth);for(let se=0,L=Oe.length;se<L;se++)fe=Oe[se],y.format!==Zt?Xe!==null?Ke?t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,se,0,0,0,fe.width,fe.height,$.depth,Xe,fe.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,se,Me,fe.width,fe.height,$.depth,0,fe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ke?t.texSubImage3D(r.TEXTURE_2D_ARRAY,se,0,0,0,fe.width,fe.height,$.depth,Xe,Ie,fe.data):t.texImage3D(r.TEXTURE_2D_ARRAY,se,Me,fe.width,fe.height,$.depth,0,Xe,Ie,fe.data)}else{Ke&&ct&&t.texStorage2D(r.TEXTURE_2D,Ge,Me,Oe[0].width,Oe[0].height);for(let se=0,L=Oe.length;se<L;se++)fe=Oe[se],y.format!==Zt?Xe!==null?Ke?t.compressedTexSubImage2D(r.TEXTURE_2D,se,0,0,fe.width,fe.height,Xe,fe.data):t.compressedTexImage2D(r.TEXTURE_2D,se,Me,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ke?t.texSubImage2D(r.TEXTURE_2D,se,0,0,fe.width,fe.height,Xe,Ie,fe.data):t.texImage2D(r.TEXTURE_2D,se,Me,fe.width,fe.height,0,Xe,Ie,fe.data)}else if(y.isDataArrayTexture)Ke?(ct&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ge,Me,$.width,$.height,$.depth),t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,Xe,Ie,$.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,Me,$.width,$.height,$.depth,0,Xe,Ie,$.data);else if(y.isData3DTexture)Ke?(ct&&t.texStorage3D(r.TEXTURE_3D,Ge,Me,$.width,$.height,$.depth),t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,Xe,Ie,$.data)):t.texImage3D(r.TEXTURE_3D,0,Me,$.width,$.height,$.depth,0,Xe,Ie,$.data);else if(y.isFramebufferTexture){if(ct)if(Ke)t.texStorage2D(r.TEXTURE_2D,Ge,Me,$.width,$.height);else{let se=$.width,L=$.height;for(let oe=0;oe<Ge;oe++)t.texImage2D(r.TEXTURE_2D,oe,Me,se,L,0,Xe,Ie,null),se>>=1,L>>=1}}else if(Oe.length>0&&Ze){Ke&&ct&&t.texStorage2D(r.TEXTURE_2D,Ge,Me,Oe[0].width,Oe[0].height);for(let se=0,L=Oe.length;se<L;se++)fe=Oe[se],Ke?t.texSubImage2D(r.TEXTURE_2D,se,0,0,Xe,Ie,fe):t.texImage2D(r.TEXTURE_2D,se,Me,Xe,Ie,fe);y.generateMipmaps=!1}else Ke?(ct&&t.texStorage2D(r.TEXTURE_2D,Ge,Me,$.width,$.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,Xe,Ie,$)):t.texImage2D(r.TEXTURE_2D,0,Me,Xe,Ie,$);M(y,Ze)&&x(Q),ye.__version=ee.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function me(w,y,O){if(y.image.length!==6)return;const Q=K(w,y),Z=y.source;t.bindTexture(r.TEXTURE_CUBE_MAP,w.__webglTexture,r.TEXTURE0+O);const ee=n.get(Z);if(Z.version!==ee.__version||Q===!0){t.activeTexture(r.TEXTURE0+O);const ye=Ye.getPrimaries(Ye.workingColorSpace),le=y.colorSpace===Jt?null:Ye.getPrimaries(y.colorSpace),de=y.colorSpace===Jt||ye===le?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const Te=y.isCompressedTexture||y.image[0].isCompressedTexture,ze=y.image[0]&&y.image[0].isDataTexture,$=[];for(let se=0;se<6;se++)!Te&&!ze?$[se]=_(y.image[se],!1,!0,i.maxCubemapSize):$[se]=ze?y.image[se].image:y.image[se],$[se]=Be(y,$[se]);const Ze=$[0],Xe=m(Ze)||a,Ie=s.convert(y.format,y.colorSpace),Me=s.convert(y.type),fe=b(y.internalFormat,Ie,Me,y.colorSpace),Oe=a&&y.isVideoTexture!==!0,Ke=ee.__version===void 0||Q===!0;let ct=C(y,Ze,Xe);V(r.TEXTURE_CUBE_MAP,y,Xe);let Ge;if(Te){Oe&&Ke&&t.texStorage2D(r.TEXTURE_CUBE_MAP,ct,fe,Ze.width,Ze.height);for(let se=0;se<6;se++){Ge=$[se].mipmaps;for(let L=0;L<Ge.length;L++){const oe=Ge[L];y.format!==Zt?Ie!==null?Oe?t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,L,0,0,oe.width,oe.height,Ie,oe.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,L,fe,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Oe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,L,0,0,oe.width,oe.height,Ie,Me,oe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,L,fe,oe.width,oe.height,0,Ie,Me,oe.data)}}}else{Ge=y.mipmaps,Oe&&Ke&&(Ge.length>0&&ct++,t.texStorage2D(r.TEXTURE_CUBE_MAP,ct,fe,$[0].width,$[0].height));for(let se=0;se<6;se++)if(ze){Oe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,$[se].width,$[se].height,Ie,Me,$[se].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,fe,$[se].width,$[se].height,0,Ie,Me,$[se].data);for(let L=0;L<Ge.length;L++){const ae=Ge[L].image[se].image;Oe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,L+1,0,0,ae.width,ae.height,Ie,Me,ae.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,L+1,fe,ae.width,ae.height,0,Ie,Me,ae.data)}}else{Oe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Ie,Me,$[se]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,fe,Ie,Me,$[se]);for(let L=0;L<Ge.length;L++){const oe=Ge[L];Oe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,L+1,0,0,Ie,Me,oe.image[se]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,L+1,fe,Ie,Me,oe.image[se])}}}M(y,Xe)&&x(r.TEXTURE_CUBE_MAP),ee.__version=Z.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function ge(w,y,O,Q,Z,ee){const ye=s.convert(O.format,O.colorSpace),le=s.convert(O.type),de=b(O.internalFormat,ye,le,O.colorSpace);if(!n.get(y).__hasExternalTextures){const ze=Math.max(1,y.width>>ee),$=Math.max(1,y.height>>ee);Z===r.TEXTURE_3D||Z===r.TEXTURE_2D_ARRAY?t.texImage3D(Z,ee,de,ze,$,y.depth,0,ye,le,null):t.texImage2D(Z,ee,de,ze,$,0,ye,le,null)}t.bindFramebuffer(r.FRAMEBUFFER,w),_e(y)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Q,Z,n.get(O).__webglTexture,0,De(y)):(Z===r.TEXTURE_2D||Z>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Q,Z,n.get(O).__webglTexture,ee),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ce(w,y,O){if(r.bindRenderbuffer(r.RENDERBUFFER,w),y.depthBuffer&&!y.stencilBuffer){let Q=a===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(O||_e(y)){const Z=y.depthTexture;Z&&Z.isDepthTexture&&(Z.type===bn?Q=r.DEPTH_COMPONENT32F:Z.type===Un&&(Q=r.DEPTH_COMPONENT24));const ee=De(y);_e(y)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ee,Q,y.width,y.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,ee,Q,y.width,y.height)}else r.renderbufferStorage(r.RENDERBUFFER,Q,y.width,y.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,w)}else if(y.depthBuffer&&y.stencilBuffer){const Q=De(y);O&&_e(y)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Q,r.DEPTH24_STENCIL8,y.width,y.height):_e(y)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Q,r.DEPTH24_STENCIL8,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,y.width,y.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,w)}else{const Q=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let Z=0;Z<Q.length;Z++){const ee=Q[Z],ye=s.convert(ee.format,ee.colorSpace),le=s.convert(ee.type),de=b(ee.internalFormat,ye,le,ee.colorSpace),Te=De(y);O&&_e(y)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Te,de,y.width,y.height):_e(y)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Te,de,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,de,y.width,y.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Pe(w,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,w),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),G(y.depthTexture,0);const Q=n.get(y.depthTexture).__webglTexture,Z=De(y);if(y.depthTexture.format===ni)_e(y)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0,Z):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0);else if(y.depthTexture.format===Ni)_e(y)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0,Z):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function he(w){const y=n.get(w),O=w.isWebGLCubeRenderTarget===!0;if(w.depthTexture&&!y.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Pe(y.__webglFramebuffer,w)}else if(O){y.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer[Q]),y.__webglDepthbuffer[Q]=r.createRenderbuffer(),Ce(y.__webglDepthbuffer[Q],w,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=r.createRenderbuffer(),Ce(y.__webglDepthbuffer,w,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function Le(w,y,O){const Q=n.get(w);y!==void 0&&ge(Q.__webglFramebuffer,w,w.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),O!==void 0&&he(w)}function D(w){const y=w.texture,O=n.get(w),Q=n.get(y);w.addEventListener("dispose",k),w.isWebGLMultipleRenderTargets!==!0&&(Q.__webglTexture===void 0&&(Q.__webglTexture=r.createTexture()),Q.__version=y.version,o.memory.textures++);const Z=w.isWebGLCubeRenderTarget===!0,ee=w.isWebGLMultipleRenderTargets===!0,ye=m(w)||a;if(Z){O.__webglFramebuffer=[];for(let le=0;le<6;le++)if(a&&y.mipmaps&&y.mipmaps.length>0){O.__webglFramebuffer[le]=[];for(let de=0;de<y.mipmaps.length;de++)O.__webglFramebuffer[le][de]=r.createFramebuffer()}else O.__webglFramebuffer[le]=r.createFramebuffer()}else{if(a&&y.mipmaps&&y.mipmaps.length>0){O.__webglFramebuffer=[];for(let le=0;le<y.mipmaps.length;le++)O.__webglFramebuffer[le]=r.createFramebuffer()}else O.__webglFramebuffer=r.createFramebuffer();if(ee)if(i.drawBuffers){const le=w.texture;for(let de=0,Te=le.length;de<Te;de++){const ze=n.get(le[de]);ze.__webglTexture===void 0&&(ze.__webglTexture=r.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&w.samples>0&&_e(w)===!1){const le=ee?y:[y];O.__webglMultisampledFramebuffer=r.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let de=0;de<le.length;de++){const Te=le[de];O.__webglColorRenderbuffer[de]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,O.__webglColorRenderbuffer[de]);const ze=s.convert(Te.format,Te.colorSpace),$=s.convert(Te.type),Ze=b(Te.internalFormat,ze,$,Te.colorSpace,w.isXRRenderTarget===!0),Xe=De(w);r.renderbufferStorageMultisample(r.RENDERBUFFER,Xe,Ze,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+de,r.RENDERBUFFER,O.__webglColorRenderbuffer[de])}r.bindRenderbuffer(r.RENDERBUFFER,null),w.depthBuffer&&(O.__webglDepthRenderbuffer=r.createRenderbuffer(),Ce(O.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Z){t.bindTexture(r.TEXTURE_CUBE_MAP,Q.__webglTexture),V(r.TEXTURE_CUBE_MAP,y,ye);for(let le=0;le<6;le++)if(a&&y.mipmaps&&y.mipmaps.length>0)for(let de=0;de<y.mipmaps.length;de++)ge(O.__webglFramebuffer[le][de],w,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+le,de);else ge(O.__webglFramebuffer[le],w,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);M(y,ye)&&x(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ee){const le=w.texture;for(let de=0,Te=le.length;de<Te;de++){const ze=le[de],$=n.get(ze);t.bindTexture(r.TEXTURE_2D,$.__webglTexture),V(r.TEXTURE_2D,ze,ye),ge(O.__webglFramebuffer,w,ze,r.COLOR_ATTACHMENT0+de,r.TEXTURE_2D,0),M(ze,ye)&&x(r.TEXTURE_2D)}t.unbindTexture()}else{let le=r.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(a?le=w.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(le,Q.__webglTexture),V(le,y,ye),a&&y.mipmaps&&y.mipmaps.length>0)for(let de=0;de<y.mipmaps.length;de++)ge(O.__webglFramebuffer[de],w,y,r.COLOR_ATTACHMENT0,le,de);else ge(O.__webglFramebuffer,w,y,r.COLOR_ATTACHMENT0,le,0);M(y,ye)&&x(le),t.unbindTexture()}w.depthBuffer&&he(w)}function ut(w){const y=m(w)||a,O=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let Q=0,Z=O.length;Q<Z;Q++){const ee=O[Q];if(M(ee,y)){const ye=w.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,le=n.get(ee).__webglTexture;t.bindTexture(ye,le),x(ye),t.unbindTexture()}}}function Se(w){if(a&&w.samples>0&&_e(w)===!1){const y=w.isWebGLMultipleRenderTargets?w.texture:[w.texture],O=w.width,Q=w.height;let Z=r.COLOR_BUFFER_BIT;const ee=[],ye=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,le=n.get(w),de=w.isWebGLMultipleRenderTargets===!0;if(de)for(let Te=0;Te<y.length;Te++)t.bindFramebuffer(r.FRAMEBUFFER,le.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Te,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,le.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Te,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let Te=0;Te<y.length;Te++){ee.push(r.COLOR_ATTACHMENT0+Te),w.depthBuffer&&ee.push(ye);const ze=le.__ignoreDepthValues!==void 0?le.__ignoreDepthValues:!1;if(ze===!1&&(w.depthBuffer&&(Z|=r.DEPTH_BUFFER_BIT),w.stencilBuffer&&(Z|=r.STENCIL_BUFFER_BIT)),de&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,le.__webglColorRenderbuffer[Te]),ze===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[ye]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[ye])),de){const $=n.get(y[Te]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,$,0)}r.blitFramebuffer(0,0,O,Q,0,0,O,Q,Z,r.NEAREST),l&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ee)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),de)for(let Te=0;Te<y.length;Te++){t.bindFramebuffer(r.FRAMEBUFFER,le.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Te,r.RENDERBUFFER,le.__webglColorRenderbuffer[Te]);const ze=n.get(y[Te]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,le.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Te,r.TEXTURE_2D,ze,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}}function De(w){return Math.min(i.maxSamples,w.samples)}function _e(w){const y=n.get(w);return a&&w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function ot(w){const y=o.render.frame;h.get(w)!==y&&(h.set(w,y),w.update())}function Be(w,y){const O=w.colorSpace,Q=w.format,Z=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||w.format===to||O!==pt&&O!==Jt&&(Ye.getTransfer(O)===it?a===!1?e.has("EXT_sRGB")===!0&&Q===Zt?(w.format=to,w.minFilter=Ft,w.generateMipmaps=!1):y=el.sRGBToLinear(y):(Q!==Zt||Z!==zn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),y}this.allocateTextureUnit=P,this.resetTextureUnits=J,this.setTexture2D=G,this.setTexture2DArray=Y,this.setTexture3D=X,this.setTextureCube=q,this.rebindTextures=Le,this.setupRenderTarget=D,this.updateRenderTargetMipmap=ut,this.updateMultisampleRenderTarget=Se,this.setupDepthRenderbuffer=he,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=_e}function $m(r,e,t){const n=t.isWebGL2;function i(s,o=Jt){let a;const c=Ye.getTransfer(o);if(s===zn)return r.UNSIGNED_BYTE;if(s===Vc)return r.UNSIGNED_SHORT_4_4_4_4;if(s===Wc)return r.UNSIGNED_SHORT_5_5_5_1;if(s===mh)return r.BYTE;if(s===gh)return r.SHORT;if(s===uo)return r.UNSIGNED_SHORT;if(s===Hc)return r.INT;if(s===Un)return r.UNSIGNED_INT;if(s===bn)return r.FLOAT;if(s===is)return n?r.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===_h)return r.ALPHA;if(s===Zt)return r.RGBA;if(s===xh)return r.LUMINANCE;if(s===yh)return r.LUMINANCE_ALPHA;if(s===ni)return r.DEPTH_COMPONENT;if(s===Ni)return r.DEPTH_STENCIL;if(s===to)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===vh)return r.RED;if(s===Xc)return r.RED_INTEGER;if(s===Mh)return r.RG;if(s===qc)return r.RG_INTEGER;if(s===jc)return r.RGBA_INTEGER;if(s===cr||s===lr||s===hr||s===ur)if(c===it)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===cr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===lr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===hr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===ur)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===cr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===lr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===hr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===ur)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Go||s===Ho||s===Vo||s===Wo)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Go)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Ho)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Vo)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Wo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Yc)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Xo||s===qo)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===Xo)return c===it?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===qo)return c===it?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===jo||s===Yo||s===Ko||s===$o||s===Zo||s===Jo||s===Qo||s===ea||s===ta||s===na||s===ia||s===sa||s===ra||s===oa)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===jo)return c===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Yo)return c===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Ko)return c===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===$o)return c===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Zo)return c===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Jo)return c===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Qo)return c===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===ea)return c===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===ta)return c===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===na)return c===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===ia)return c===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===sa)return c===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===ra)return c===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===oa)return c===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===dr||s===aa||s===ca)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===dr)return c===it?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===aa)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===ca)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Sh||s===la||s===ha||s===ua)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===dr)return a.COMPRESSED_RED_RGTC1_EXT;if(s===la)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===ha)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===ua)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===ti?n?r.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class Zm extends Dt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class bt extends rt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Jm={type:"move"};class Or{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Jm)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new bt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Qm extends ki{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null;const _=t.getContextAttributes();let m=null,p=null;const M=[],x=[],b=new je;let C=null;const T=new Dt;T.layers.enable(1),T.viewport=new Qe;const A=new Dt;A.layers.enable(2),A.viewport=new Qe;const k=[T,A],v=new Zm;v.layers.enable(1),v.layers.enable(2);let E=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let K=M[V];return K===void 0&&(K=new Or,M[V]=K),K.getTargetRaySpace()},this.getControllerGrip=function(V){let K=M[V];return K===void 0&&(K=new Or,M[V]=K),K.getGripSpace()},this.getHand=function(V){let K=M[V];return K===void 0&&(K=new Or,M[V]=K),K.getHandSpace()};function H(V){const K=x.indexOf(V.inputSource);if(K===-1)return;const ce=M[K];ce!==void 0&&(ce.update(V.inputSource,V.frame,l||o),ce.dispatchEvent({type:V.type,data:V.inputSource}))}function J(){i.removeEventListener("select",H),i.removeEventListener("selectstart",H),i.removeEventListener("selectend",H),i.removeEventListener("squeeze",H),i.removeEventListener("squeezestart",H),i.removeEventListener("squeezeend",H),i.removeEventListener("end",J),i.removeEventListener("inputsourceschange",P);for(let V=0;V<M.length;V++){const K=x[V];K!==null&&(x[V]=null,M[V].disconnect(K))}E=null,z=null,e.setRenderTarget(m),f=null,d=null,u=null,i=null,p=null,ie.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){s=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){a=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(V){l=V},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(V){if(i=V,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",H),i.addEventListener("selectstart",H),i.addEventListener("selectend",H),i.addEventListener("squeeze",H),i.addEventListener("squeezestart",H),i.addEventListener("squeezeend",H),i.addEventListener("end",J),i.addEventListener("inputsourceschange",P),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(b),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const K={antialias:i.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,K),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new ri(f.framebufferWidth,f.framebufferHeight,{format:Zt,type:zn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let K=null,ce=null,me=null;_.depth&&(me=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,K=_.stencil?Ni:ni,ce=_.stencil?ti:Un);const ge={colorFormat:t.RGBA8,depthFormat:me,scaleFactor:s};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(ge),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),p=new ri(d.textureWidth,d.textureHeight,{format:Zt,type:zn,depthTexture:new hl(d.textureWidth,d.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Ce=e.properties.get(p);Ce.__ignoreDepthValues=d.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),ie.setContext(i),ie.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function P(V){for(let K=0;K<V.removed.length;K++){const ce=V.removed[K],me=x.indexOf(ce);me>=0&&(x[me]=null,M[me].disconnect(ce))}for(let K=0;K<V.added.length;K++){const ce=V.added[K];let me=x.indexOf(ce);if(me===-1){for(let Ce=0;Ce<M.length;Ce++)if(Ce>=x.length){x.push(ce),me=Ce;break}else if(x[Ce]===null){x[Ce]=ce,me=Ce;break}if(me===-1)break}const ge=M[me];ge&&ge.connect(ce)}}const N=new R,G=new R;function Y(V,K,ce){N.setFromMatrixPosition(K.matrixWorld),G.setFromMatrixPosition(ce.matrixWorld);const me=N.distanceTo(G),ge=K.projectionMatrix.elements,Ce=ce.projectionMatrix.elements,Pe=ge[14]/(ge[10]-1),he=ge[14]/(ge[10]+1),Le=(ge[9]+1)/ge[5],D=(ge[9]-1)/ge[5],ut=(ge[8]-1)/ge[0],Se=(Ce[8]+1)/Ce[0],De=Pe*ut,_e=Pe*Se,ot=me/(-ut+Se),Be=ot*-ut;K.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(Be),V.translateZ(ot),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert();const w=Pe+ot,y=he+ot,O=De-Be,Q=_e+(me-Be),Z=Le*he/y*w,ee=D*he/y*w;V.projectionMatrix.makePerspective(O,Q,Z,ee,w,y),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}function X(V,K){K===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(K.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(i===null)return;v.near=A.near=T.near=V.near,v.far=A.far=T.far=V.far,(E!==v.near||z!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),E=v.near,z=v.far);const K=V.parent,ce=v.cameras;X(v,K);for(let me=0;me<ce.length;me++)X(ce[me],K);ce.length===2?Y(v,T,A):v.projectionMatrix.copy(T.projectionMatrix),q(V,v,K)};function q(V,K,ce){ce===null?V.matrix.copy(K.matrixWorld):(V.matrix.copy(ce.matrixWorld),V.matrix.invert(),V.matrix.multiply(K.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(K.projectionMatrix),V.projectionMatrixInverse.copy(K.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=Oi*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(V){c=V,d!==null&&(d.fixedFoveation=V),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=V)};let j=null;function ne(V,K){if(h=K.getViewerPose(l||o),g=K,h!==null){const ce=h.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let me=!1;ce.length!==v.cameras.length&&(v.cameras.length=0,me=!0);for(let ge=0;ge<ce.length;ge++){const Ce=ce[ge];let Pe=null;if(f!==null)Pe=f.getViewport(Ce);else{const Le=u.getViewSubImage(d,Ce);Pe=Le.viewport,ge===0&&(e.setRenderTargetTextures(p,Le.colorTexture,d.ignoreDepthValues?void 0:Le.depthStencilTexture),e.setRenderTarget(p))}let he=k[ge];he===void 0&&(he=new Dt,he.layers.enable(ge),he.viewport=new Qe,k[ge]=he),he.matrix.fromArray(Ce.transform.matrix),he.matrix.decompose(he.position,he.quaternion,he.scale),he.projectionMatrix.fromArray(Ce.projectionMatrix),he.projectionMatrixInverse.copy(he.projectionMatrix).invert(),he.viewport.set(Pe.x,Pe.y,Pe.width,Pe.height),ge===0&&(v.matrix.copy(he.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),me===!0&&v.cameras.push(he)}}for(let ce=0;ce<M.length;ce++){const me=x[ce],ge=M[ce];me!==null&&ge!==void 0&&ge.update(me,K,l||o)}j&&j(V,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),g=null}const ie=new ll;ie.setAnimationLoop(ne),this.setAnimationLoop=function(V){j=V},this.dispose=function(){}}}function eg(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,ol(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,M,x,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,b)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,M,x):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Nt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Nt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=e.get(p).envMap;if(M&&(m.envMap.value=M,m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const x=r._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*x,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,M,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Nt&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function tg(r,e,t,n){let i={},s={},o=[];const a=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(M,x){const b=x.program;n.uniformBlockBinding(M,b)}function l(M,x){let b=i[M.id];b===void 0&&(g(M),b=h(M),i[M.id]=b,M.addEventListener("dispose",m));const C=x.program;n.updateUBOMapping(M,C);const T=e.render.frame;s[M.id]!==T&&(d(M),s[M.id]=T)}function h(M){const x=u();M.__bindingPointIndex=x;const b=r.createBuffer(),C=M.__size,T=M.usage;return r.bindBuffer(r.UNIFORM_BUFFER,b),r.bufferData(r.UNIFORM_BUFFER,C,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,b),b}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const x=i[M.id],b=M.uniforms,C=M.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let T=0,A=b.length;T<A;T++){const k=Array.isArray(b[T])?b[T]:[b[T]];for(let v=0,E=k.length;v<E;v++){const z=k[v];if(f(z,T,v,C)===!0){const H=z.__offset,J=Array.isArray(z.value)?z.value:[z.value];let P=0;for(let N=0;N<J.length;N++){const G=J[N],Y=_(G);typeof G=="number"||typeof G=="boolean"?(z.__data[0]=G,r.bufferSubData(r.UNIFORM_BUFFER,H+P,z.__data)):G.isMatrix3?(z.__data[0]=G.elements[0],z.__data[1]=G.elements[1],z.__data[2]=G.elements[2],z.__data[3]=0,z.__data[4]=G.elements[3],z.__data[5]=G.elements[4],z.__data[6]=G.elements[5],z.__data[7]=0,z.__data[8]=G.elements[6],z.__data[9]=G.elements[7],z.__data[10]=G.elements[8],z.__data[11]=0):(G.toArray(z.__data,P),P+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,H,z.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(M,x,b,C){const T=M.value,A=x+"_"+b;if(C[A]===void 0)return typeof T=="number"||typeof T=="boolean"?C[A]=T:C[A]=T.clone(),!0;{const k=C[A];if(typeof T=="number"||typeof T=="boolean"){if(k!==T)return C[A]=T,!0}else if(k.equals(T)===!1)return k.copy(T),!0}return!1}function g(M){const x=M.uniforms;let b=0;const C=16;for(let A=0,k=x.length;A<k;A++){const v=Array.isArray(x[A])?x[A]:[x[A]];for(let E=0,z=v.length;E<z;E++){const H=v[E],J=Array.isArray(H.value)?H.value:[H.value];for(let P=0,N=J.length;P<N;P++){const G=J[P],Y=_(G),X=b%C;X!==0&&C-X<Y.boundary&&(b+=C-X),H.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=b,b+=Y.storage}}}const T=b%C;return T>0&&(b+=C-T),M.__size=b,M.__cache={},this}function _(M){const x={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(x.boundary=4,x.storage=4):M.isVector2?(x.boundary=8,x.storage=8):M.isVector3||M.isColor?(x.boundary=16,x.storage=12):M.isVector4?(x.boundary=16,x.storage=16):M.isMatrix3?(x.boundary=48,x.storage=48):M.isMatrix4?(x.boundary=64,x.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),x}function m(M){const x=M.target;x.removeEventListener("dispose",m);const b=o.indexOf(x.__bindingPointIndex);o.splice(b,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function p(){for(const M in i)r.deleteBuffer(i[M]);o=[],i={},s={}}return{bind:c,update:l,dispose:p}}class gl{constructor(e={}){const{canvas:t=$h(),context:n=null,depth:i=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=st,this._useLegacyLights=!1,this.toneMapping=Bn,this.toneMappingExposure=1;const x=this;let b=!1,C=0,T=0,A=null,k=-1,v=null;const E=new Qe,z=new Qe;let H=null;const J=new Ee(0);let P=0,N=t.width,G=t.height,Y=1,X=null,q=null;const j=new Qe(0,0,N,G),ne=new Qe(0,0,N,G);let ie=!1;const V=new go;let K=!1,ce=!1,me=null;const ge=new We,Ce=new je,Pe=new R,he={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Le(){return A===null?Y:1}let D=n;function ut(S,I){for(let F=0;F<S.length;F++){const B=S[F],U=t.getContext(B,I);if(U!==null)return U}return null}try{const S={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ho}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",L,!1),t.addEventListener("webglcontextcreationerror",oe,!1),D===null){const I=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&I.shift(),D=ut(I,S),D===null)throw ut(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&D instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),D.getShaderPrecisionFormat===void 0&&(D.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Se,De,_e,ot,Be,w,y,O,Q,Z,ee,ye,le,de,Te,ze,$,Ze,Xe,Ie,Me,fe,Oe,Ke;function ct(){Se=new up(D),De=new rp(D,Se,e),Se.init(De),fe=new $m(D,Se,De),_e=new Ym(D,Se,De),ot=new pp(D),Be=new Nm,w=new Km(D,Se,_e,Be,De,fe,ot),y=new ap(x),O=new hp(x),Q=new Mu(D,De),Oe=new ip(D,Se,Q,De),Z=new dp(D,Q,ot,Oe),ee=new xp(D,Z,Q,ot),Xe=new _p(D,De,w),ze=new op(Be),ye=new Dm(x,y,O,Se,De,Oe,ze),le=new eg(x,Be),de=new Om,Te=new Hm(Se,De),Ze=new np(x,y,O,_e,ee,d,c),$=new jm(x,ee,De),Ke=new tg(D,ot,De,_e),Ie=new sp(D,Se,ot,De),Me=new fp(D,Se,ot,De),ot.programs=ye.programs,x.capabilities=De,x.extensions=Se,x.properties=Be,x.renderLists=de,x.shadowMap=$,x.state=_e,x.info=ot}ct();const Ge=new Qm(x,D);this.xr=Ge,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const S=Se.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Se.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(S){S!==void 0&&(Y=S,this.setSize(N,G,!1))},this.getSize=function(S){return S.set(N,G)},this.setSize=function(S,I,F=!0){if(Ge.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=S,G=I,t.width=Math.floor(S*Y),t.height=Math.floor(I*Y),F===!0&&(t.style.width=S+"px",t.style.height=I+"px"),this.setViewport(0,0,S,I)},this.getDrawingBufferSize=function(S){return S.set(N*Y,G*Y).floor()},this.setDrawingBufferSize=function(S,I,F){N=S,G=I,Y=F,t.width=Math.floor(S*F),t.height=Math.floor(I*F),this.setViewport(0,0,S,I)},this.getCurrentViewport=function(S){return S.copy(E)},this.getViewport=function(S){return S.copy(j)},this.setViewport=function(S,I,F,B){S.isVector4?j.set(S.x,S.y,S.z,S.w):j.set(S,I,F,B),_e.viewport(E.copy(j).multiplyScalar(Y).floor())},this.getScissor=function(S){return S.copy(ne)},this.setScissor=function(S,I,F,B){S.isVector4?ne.set(S.x,S.y,S.z,S.w):ne.set(S,I,F,B),_e.scissor(z.copy(ne).multiplyScalar(Y).floor())},this.getScissorTest=function(){return ie},this.setScissorTest=function(S){_e.setScissorTest(ie=S)},this.setOpaqueSort=function(S){X=S},this.setTransparentSort=function(S){q=S},this.getClearColor=function(S){return S.copy(Ze.getClearColor())},this.setClearColor=function(){Ze.setClearColor.apply(Ze,arguments)},this.getClearAlpha=function(){return Ze.getClearAlpha()},this.setClearAlpha=function(){Ze.setClearAlpha.apply(Ze,arguments)},this.clear=function(S=!0,I=!0,F=!0){let B=0;if(S){let U=!1;if(A!==null){const ue=A.texture.format;U=ue===jc||ue===qc||ue===Xc}if(U){const ue=A.texture.type,ve=ue===zn||ue===Un||ue===uo||ue===ti||ue===Vc||ue===Wc,we=Ze.getClearColor(),Re=Ze.getClearAlpha(),ke=we.r,Ne=we.g,Ue=we.b;ve?(f[0]=ke,f[1]=Ne,f[2]=Ue,f[3]=Re,D.clearBufferuiv(D.COLOR,0,f)):(g[0]=ke,g[1]=Ne,g[2]=Ue,g[3]=Re,D.clearBufferiv(D.COLOR,0,g))}else B|=D.COLOR_BUFFER_BIT}I&&(B|=D.DEPTH_BUFFER_BIT),F&&(B|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",L,!1),t.removeEventListener("webglcontextcreationerror",oe,!1),de.dispose(),Te.dispose(),Be.dispose(),y.dispose(),O.dispose(),ee.dispose(),Oe.dispose(),Ke.dispose(),ye.dispose(),Ge.dispose(),Ge.removeEventListener("sessionstart",Ct),Ge.removeEventListener("sessionend",nt),me&&(me.dispose(),me=null),Lt.stop()};function se(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function L(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const S=ot.autoReset,I=$.enabled,F=$.autoUpdate,B=$.needsUpdate,U=$.type;ct(),ot.autoReset=S,$.enabled=I,$.autoUpdate=F,$.needsUpdate=B,$.type=U}function oe(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function ae(S){const I=S.target;I.removeEventListener("dispose",ae),Ae(I)}function Ae(S){be(S),Be.remove(S)}function be(S){const I=Be.get(S).programs;I!==void 0&&(I.forEach(function(F){ye.releaseProgram(F)}),S.isShaderMaterial&&ye.releaseShaderCache(S))}this.renderBufferDirect=function(S,I,F,B,U,ue){I===null&&(I=he);const ve=U.isMesh&&U.matrixWorld.determinant()<0,we=Ll(S,I,F,B,U);_e.setMaterial(B,ve);let Re=F.index,ke=1;if(B.wireframe===!0){if(Re=Z.getWireframeAttribute(F),Re===void 0)return;ke=2}const Ne=F.drawRange,Ue=F.attributes.position;let dt=Ne.start*ke,Gt=(Ne.start+Ne.count)*ke;ue!==null&&(dt=Math.max(dt,ue.start*ke),Gt=Math.min(Gt,(ue.start+ue.count)*ke)),Re!==null?(dt=Math.max(dt,0),Gt=Math.min(Gt,Re.count)):Ue!=null&&(dt=Math.max(dt,0),Gt=Math.min(Gt,Ue.count));const xt=Gt-dt;if(xt<0||xt===1/0)return;Oe.setup(U,B,we,F,Re);let fn,at=Ie;if(Re!==null&&(fn=Q.get(Re),at=Me,at.setIndex(fn)),U.isMesh)B.wireframe===!0?(_e.setLineWidth(B.wireframeLinewidth*Le()),at.setMode(D.LINES)):at.setMode(D.TRIANGLES);else if(U.isLine){let He=B.linewidth;He===void 0&&(He=1),_e.setLineWidth(He*Le()),U.isLineSegments?at.setMode(D.LINES):U.isLineLoop?at.setMode(D.LINE_LOOP):at.setMode(D.LINE_STRIP)}else U.isPoints?at.setMode(D.POINTS):U.isSprite&&at.setMode(D.TRIANGLES);if(U.isBatchedMesh)at.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else if(U.isInstancedMesh)at.renderInstances(dt,xt,U.count);else if(F.isInstancedBufferGeometry){const He=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,sr=Math.min(F.instanceCount,He);at.renderInstances(dt,xt,sr)}else at.render(dt,xt)};function et(S,I,F){S.transparent===!0&&S.side===an&&S.forceSinglePass===!1?(S.side=Nt,S.needsUpdate=!0,us(S,I,F),S.side=En,S.needsUpdate=!0,us(S,I,F),S.side=an):us(S,I,F)}this.compile=function(S,I,F=null){F===null&&(F=S),m=Te.get(F),m.init(),M.push(m),F.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(m.pushLight(U),U.castShadow&&m.pushShadow(U))}),S!==F&&S.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(m.pushLight(U),U.castShadow&&m.pushShadow(U))}),m.setupLights(x._useLegacyLights);const B=new Set;return S.traverse(function(U){const ue=U.material;if(ue)if(Array.isArray(ue))for(let ve=0;ve<ue.length;ve++){const we=ue[ve];et(we,F,U),B.add(we)}else et(ue,F,U),B.add(ue)}),M.pop(),m=null,B},this.compileAsync=function(S,I,F=null){const B=this.compile(S,I,F);return new Promise(U=>{function ue(){if(B.forEach(function(ve){Be.get(ve).currentProgram.isReady()&&B.delete(ve)}),B.size===0){U(S);return}setTimeout(ue,10)}Se.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let tt=null;function _t(S){tt&&tt(S)}function Ct(){Lt.stop()}function nt(){Lt.start()}const Lt=new ll;Lt.setAnimationLoop(_t),typeof self<"u"&&Lt.setContext(self),this.setAnimationLoop=function(S){tt=S,Ge.setAnimationLoop(S),S===null?Lt.stop():Lt.start()},Ge.addEventListener("sessionstart",Ct),Ge.addEventListener("sessionend",nt),this.render=function(S,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Ge.enabled===!0&&Ge.isPresenting===!0&&(Ge.cameraAutoUpdate===!0&&Ge.updateCamera(I),I=Ge.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,I,A),m=Te.get(S,M.length),m.init(),M.push(m),ge.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),V.setFromProjectionMatrix(ge),ce=this.localClippingEnabled,K=ze.init(this.clippingPlanes,ce),_=de.get(S,p.length),_.init(),p.push(_),rn(S,I,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(X,q),this.info.render.frame++,K===!0&&ze.beginShadows();const F=m.state.shadowsArray;if($.render(F,S,I),K===!0&&ze.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ze.render(_,S),m.setupLights(x._useLegacyLights),I.isArrayCamera){const B=I.cameras;for(let U=0,ue=B.length;U<ue;U++){const ve=B[U];Ao(_,S,ve,ve.viewport)}}else Ao(_,S,I);A!==null&&(w.updateMultisampleRenderTarget(A),w.updateRenderTargetMipmap(A)),S.isScene===!0&&S.onAfterRender(x,S,I),Oe.resetDefaultState(),k=-1,v=null,M.pop(),M.length>0?m=M[M.length-1]:m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function rn(S,I,F,B){if(S.visible===!1)return;if(S.layers.test(I.layers)){if(S.isGroup)F=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(I);else if(S.isLight)m.pushLight(S),S.castShadow&&m.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||V.intersectsSprite(S)){B&&Pe.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ge);const ve=ee.update(S),we=S.material;we.visible&&_.push(S,ve,we,F,Pe.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||V.intersectsObject(S))){const ve=ee.update(S),we=S.material;if(B&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Pe.copy(S.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Pe.copy(ve.boundingSphere.center)),Pe.applyMatrix4(S.matrixWorld).applyMatrix4(ge)),Array.isArray(we)){const Re=ve.groups;for(let ke=0,Ne=Re.length;ke<Ne;ke++){const Ue=Re[ke],dt=we[Ue.materialIndex];dt&&dt.visible&&_.push(S,ve,dt,F,Pe.z,Ue)}}else we.visible&&_.push(S,ve,we,F,Pe.z,null)}}const ue=S.children;for(let ve=0,we=ue.length;ve<we;ve++)rn(ue[ve],I,F,B)}function Ao(S,I,F,B){const U=S.opaque,ue=S.transmissive,ve=S.transparent;m.setupLightsView(F),K===!0&&ze.setGlobalState(x.clippingPlanes,F),ue.length>0&&Cl(U,ue,I,F),B&&_e.viewport(E.copy(B)),U.length>0&&hs(U,I,F),ue.length>0&&hs(ue,I,F),ve.length>0&&hs(ve,I,F),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function Cl(S,I,F,B){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;const ue=De.isWebGL2;me===null&&(me=new ri(1,1,{generateMipmaps:!0,type:Se.has("EXT_color_buffer_half_float")?is:zn,minFilter:si,samples:ue?4:0})),x.getDrawingBufferSize(Ce),ue?me.setSize(Ce.x,Ce.y):me.setSize(Zs(Ce.x),Zs(Ce.y));const ve=x.getRenderTarget();x.setRenderTarget(me),x.getClearColor(J),P=x.getClearAlpha(),P<1&&x.setClearColor(16777215,.5),x.clear();const we=x.toneMapping;x.toneMapping=Bn,hs(S,F,B),w.updateMultisampleRenderTarget(me),w.updateRenderTargetMipmap(me);let Re=!1;for(let ke=0,Ne=I.length;ke<Ne;ke++){const Ue=I[ke],dt=Ue.object,Gt=Ue.geometry,xt=Ue.material,fn=Ue.group;if(xt.side===an&&dt.layers.test(B.layers)){const at=xt.side;xt.side=Nt,xt.needsUpdate=!0,Ro(dt,F,B,Gt,xt,fn),xt.side=at,xt.needsUpdate=!0,Re=!0}}Re===!0&&(w.updateMultisampleRenderTarget(me),w.updateRenderTargetMipmap(me)),x.setRenderTarget(ve),x.setClearColor(J,P),x.toneMapping=we}function hs(S,I,F){const B=I.isScene===!0?I.overrideMaterial:null;for(let U=0,ue=S.length;U<ue;U++){const ve=S[U],we=ve.object,Re=ve.geometry,ke=B===null?ve.material:B,Ne=ve.group;we.layers.test(F.layers)&&Ro(we,I,F,Re,ke,Ne)}}function Ro(S,I,F,B,U,ue){S.onBeforeRender(x,I,F,B,U,ue),S.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),U.onBeforeRender(x,I,F,B,S,ue),U.transparent===!0&&U.side===an&&U.forceSinglePass===!1?(U.side=Nt,U.needsUpdate=!0,x.renderBufferDirect(F,I,B,U,S,ue),U.side=En,U.needsUpdate=!0,x.renderBufferDirect(F,I,B,U,S,ue),U.side=an):x.renderBufferDirect(F,I,B,U,S,ue),S.onAfterRender(x,I,F,B,U,ue)}function us(S,I,F){I.isScene!==!0&&(I=he);const B=Be.get(S),U=m.state.lights,ue=m.state.shadowsArray,ve=U.state.version,we=ye.getParameters(S,U.state,ue,I,F),Re=ye.getProgramCacheKey(we);let ke=B.programs;B.environment=S.isMeshStandardMaterial?I.environment:null,B.fog=I.fog,B.envMap=(S.isMeshStandardMaterial?O:y).get(S.envMap||B.environment),ke===void 0&&(S.addEventListener("dispose",ae),ke=new Map,B.programs=ke);let Ne=ke.get(Re);if(Ne!==void 0){if(B.currentProgram===Ne&&B.lightsStateVersion===ve)return Lo(S,we),Ne}else we.uniforms=ye.getUniforms(S),S.onBuild(F,we,x),S.onBeforeCompile(we,x),Ne=ye.acquireProgram(we,Re),ke.set(Re,Ne),B.uniforms=we.uniforms;const Ue=B.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ue.clippingPlanes=ze.uniform),Lo(S,we),B.needsLights=Il(S),B.lightsStateVersion=ve,B.needsLights&&(Ue.ambientLightColor.value=U.state.ambient,Ue.lightProbe.value=U.state.probe,Ue.directionalLights.value=U.state.directional,Ue.directionalLightShadows.value=U.state.directionalShadow,Ue.spotLights.value=U.state.spot,Ue.spotLightShadows.value=U.state.spotShadow,Ue.rectAreaLights.value=U.state.rectArea,Ue.ltc_1.value=U.state.rectAreaLTC1,Ue.ltc_2.value=U.state.rectAreaLTC2,Ue.pointLights.value=U.state.point,Ue.pointLightShadows.value=U.state.pointShadow,Ue.hemisphereLights.value=U.state.hemi,Ue.directionalShadowMap.value=U.state.directionalShadowMap,Ue.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Ue.spotShadowMap.value=U.state.spotShadowMap,Ue.spotLightMatrix.value=U.state.spotLightMatrix,Ue.spotLightMap.value=U.state.spotLightMap,Ue.pointShadowMap.value=U.state.pointShadowMap,Ue.pointShadowMatrix.value=U.state.pointShadowMatrix),B.currentProgram=Ne,B.uniformsList=null,Ne}function Co(S){if(S.uniformsList===null){const I=S.currentProgram.getUniforms();S.uniformsList=Ws.seqWithValue(I.seq,S.uniforms)}return S.uniformsList}function Lo(S,I){const F=Be.get(S);F.outputColorSpace=I.outputColorSpace,F.batching=I.batching,F.instancing=I.instancing,F.instancingColor=I.instancingColor,F.skinning=I.skinning,F.morphTargets=I.morphTargets,F.morphNormals=I.morphNormals,F.morphColors=I.morphColors,F.morphTargetsCount=I.morphTargetsCount,F.numClippingPlanes=I.numClippingPlanes,F.numIntersection=I.numClipIntersection,F.vertexAlphas=I.vertexAlphas,F.vertexTangents=I.vertexTangents,F.toneMapping=I.toneMapping}function Ll(S,I,F,B,U){I.isScene!==!0&&(I=he),w.resetTextureUnits();const ue=I.fog,ve=B.isMeshStandardMaterial?I.environment:null,we=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:pt,Re=(B.isMeshStandardMaterial?O:y).get(B.envMap||ve),ke=B.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Ne=!!F.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Ue=!!F.morphAttributes.position,dt=!!F.morphAttributes.normal,Gt=!!F.morphAttributes.color;let xt=Bn;B.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(xt=x.toneMapping);const fn=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,at=fn!==void 0?fn.length:0,He=Be.get(B),sr=m.state.lights;if(K===!0&&(ce===!0||S!==v)){const Xt=S===v&&B.id===k;ze.setState(B,S,Xt)}let lt=!1;B.version===He.__version?(He.needsLights&&He.lightsStateVersion!==sr.state.version||He.outputColorSpace!==we||U.isBatchedMesh&&He.batching===!1||!U.isBatchedMesh&&He.batching===!0||U.isInstancedMesh&&He.instancing===!1||!U.isInstancedMesh&&He.instancing===!0||U.isSkinnedMesh&&He.skinning===!1||!U.isSkinnedMesh&&He.skinning===!0||U.isInstancedMesh&&He.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&He.instancingColor===!1&&U.instanceColor!==null||He.envMap!==Re||B.fog===!0&&He.fog!==ue||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==ze.numPlanes||He.numIntersection!==ze.numIntersection)||He.vertexAlphas!==ke||He.vertexTangents!==Ne||He.morphTargets!==Ue||He.morphNormals!==dt||He.morphColors!==Gt||He.toneMapping!==xt||De.isWebGL2===!0&&He.morphTargetsCount!==at)&&(lt=!0):(lt=!0,He.__version=B.version);let Hn=He.currentProgram;lt===!0&&(Hn=us(B,I,U));let Po=!1,Wi=!1,rr=!1;const Et=Hn.getUniforms(),Vn=He.uniforms;if(_e.useProgram(Hn.program)&&(Po=!0,Wi=!0,rr=!0),B.id!==k&&(k=B.id,Wi=!0),Po||v!==S){Et.setValue(D,"projectionMatrix",S.projectionMatrix),Et.setValue(D,"viewMatrix",S.matrixWorldInverse);const Xt=Et.map.cameraPosition;Xt!==void 0&&Xt.setValue(D,Pe.setFromMatrixPosition(S.matrixWorld)),De.logarithmicDepthBuffer&&Et.setValue(D,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&Et.setValue(D,"isOrthographic",S.isOrthographicCamera===!0),v!==S&&(v=S,Wi=!0,rr=!0)}if(U.isSkinnedMesh){Et.setOptional(D,U,"bindMatrix"),Et.setOptional(D,U,"bindMatrixInverse");const Xt=U.skeleton;Xt&&(De.floatVertexTextures?(Xt.boneTexture===null&&Xt.computeBoneTexture(),Et.setValue(D,"boneTexture",Xt.boneTexture,w)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}U.isBatchedMesh&&(Et.setOptional(D,U,"batchingTexture"),Et.setValue(D,"batchingTexture",U._matricesTexture,w));const or=F.morphAttributes;if((or.position!==void 0||or.normal!==void 0||or.color!==void 0&&De.isWebGL2===!0)&&Xe.update(U,F,Hn),(Wi||He.receiveShadow!==U.receiveShadow)&&(He.receiveShadow=U.receiveShadow,Et.setValue(D,"receiveShadow",U.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(Vn.envMap.value=Re,Vn.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1),Wi&&(Et.setValue(D,"toneMappingExposure",x.toneMappingExposure),He.needsLights&&Pl(Vn,rr),ue&&B.fog===!0&&le.refreshFogUniforms(Vn,ue),le.refreshMaterialUniforms(Vn,B,Y,G,me),Ws.upload(D,Co(He),Vn,w)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Ws.upload(D,Co(He),Vn,w),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&Et.setValue(D,"center",U.center),Et.setValue(D,"modelViewMatrix",U.modelViewMatrix),Et.setValue(D,"normalMatrix",U.normalMatrix),Et.setValue(D,"modelMatrix",U.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const Xt=B.uniformsGroups;for(let ar=0,Dl=Xt.length;ar<Dl;ar++)if(De.isWebGL2){const Io=Xt[ar];Ke.update(Io,Hn),Ke.bind(Io,Hn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Hn}function Pl(S,I){S.ambientLightColor.needsUpdate=I,S.lightProbe.needsUpdate=I,S.directionalLights.needsUpdate=I,S.directionalLightShadows.needsUpdate=I,S.pointLights.needsUpdate=I,S.pointLightShadows.needsUpdate=I,S.spotLights.needsUpdate=I,S.spotLightShadows.needsUpdate=I,S.rectAreaLights.needsUpdate=I,S.hemisphereLights.needsUpdate=I}function Il(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(S,I,F){Be.get(S.texture).__webglTexture=I,Be.get(S.depthTexture).__webglTexture=F;const B=Be.get(S);B.__hasExternalTextures=!0,B.__hasExternalTextures&&(B.__autoAllocateDepthBuffer=F===void 0,B.__autoAllocateDepthBuffer||Se.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(S,I){const F=Be.get(S);F.__webglFramebuffer=I,F.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(S,I=0,F=0){A=S,C=I,T=F;let B=!0,U=null,ue=!1,ve=!1;if(S){const Re=Be.get(S);Re.__useDefaultFramebuffer!==void 0?(_e.bindFramebuffer(D.FRAMEBUFFER,null),B=!1):Re.__webglFramebuffer===void 0?w.setupRenderTarget(S):Re.__hasExternalTextures&&w.rebindTextures(S,Be.get(S.texture).__webglTexture,Be.get(S.depthTexture).__webglTexture);const ke=S.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(ve=!0);const Ne=Be.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ne[I])?U=Ne[I][F]:U=Ne[I],ue=!0):De.isWebGL2&&S.samples>0&&w.useMultisampledRTT(S)===!1?U=Be.get(S).__webglMultisampledFramebuffer:Array.isArray(Ne)?U=Ne[F]:U=Ne,E.copy(S.viewport),z.copy(S.scissor),H=S.scissorTest}else E.copy(j).multiplyScalar(Y).floor(),z.copy(ne).multiplyScalar(Y).floor(),H=ie;if(_e.bindFramebuffer(D.FRAMEBUFFER,U)&&De.drawBuffers&&B&&_e.drawBuffers(S,U),_e.viewport(E),_e.scissor(z),_e.setScissorTest(H),ue){const Re=Be.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+I,Re.__webglTexture,F)}else if(ve){const Re=Be.get(S.texture),ke=I||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Re.__webglTexture,F||0,ke)}k=-1},this.readRenderTargetPixels=function(S,I,F,B,U,ue,ve){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=Be.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(we=we[ve]),we){_e.bindFramebuffer(D.FRAMEBUFFER,we);try{const Re=S.texture,ke=Re.format,Ne=Re.type;if(ke!==Zt&&fe.convert(ke)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ue=Ne===is&&(Se.has("EXT_color_buffer_half_float")||De.isWebGL2&&Se.has("EXT_color_buffer_float"));if(Ne!==zn&&fe.convert(Ne)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ne===bn&&(De.isWebGL2||Se.has("OES_texture_float")||Se.has("WEBGL_color_buffer_float")))&&!Ue){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=S.width-B&&F>=0&&F<=S.height-U&&D.readPixels(I,F,B,U,fe.convert(ke),fe.convert(Ne),ue)}finally{const Re=A!==null?Be.get(A).__webglFramebuffer:null;_e.bindFramebuffer(D.FRAMEBUFFER,Re)}}},this.copyFramebufferToTexture=function(S,I,F=0){const B=Math.pow(2,-F),U=Math.floor(I.image.width*B),ue=Math.floor(I.image.height*B);w.setTexture2D(I,0),D.copyTexSubImage2D(D.TEXTURE_2D,F,0,0,S.x,S.y,U,ue),_e.unbindTexture()},this.copyTextureToTexture=function(S,I,F,B=0){const U=I.image.width,ue=I.image.height,ve=fe.convert(F.format),we=fe.convert(F.type);w.setTexture2D(F,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,F.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,F.unpackAlignment),I.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,B,S.x,S.y,U,ue,ve,we,I.image.data):I.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,B,S.x,S.y,I.mipmaps[0].width,I.mipmaps[0].height,ve,I.mipmaps[0].data):D.texSubImage2D(D.TEXTURE_2D,B,S.x,S.y,ve,we,I.image),B===0&&F.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),_e.unbindTexture()},this.copyTextureToTexture3D=function(S,I,F,B,U=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ue=S.max.x-S.min.x+1,ve=S.max.y-S.min.y+1,we=S.max.z-S.min.z+1,Re=fe.convert(B.format),ke=fe.convert(B.type);let Ne;if(B.isData3DTexture)w.setTexture3D(B,0),Ne=D.TEXTURE_3D;else if(B.isDataArrayTexture||B.isCompressedArrayTexture)w.setTexture2DArray(B,0),Ne=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,B.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,B.unpackAlignment);const Ue=D.getParameter(D.UNPACK_ROW_LENGTH),dt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Gt=D.getParameter(D.UNPACK_SKIP_PIXELS),xt=D.getParameter(D.UNPACK_SKIP_ROWS),fn=D.getParameter(D.UNPACK_SKIP_IMAGES),at=F.isCompressedTexture?F.mipmaps[U]:F.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,at.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,at.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,S.min.x),D.pixelStorei(D.UNPACK_SKIP_ROWS,S.min.y),D.pixelStorei(D.UNPACK_SKIP_IMAGES,S.min.z),F.isDataTexture||F.isData3DTexture?D.texSubImage3D(Ne,U,I.x,I.y,I.z,ue,ve,we,Re,ke,at.data):F.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),D.compressedTexSubImage3D(Ne,U,I.x,I.y,I.z,ue,ve,we,Re,at.data)):D.texSubImage3D(Ne,U,I.x,I.y,I.z,ue,ve,we,Re,ke,at),D.pixelStorei(D.UNPACK_ROW_LENGTH,Ue),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,dt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Gt),D.pixelStorei(D.UNPACK_SKIP_ROWS,xt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,fn),U===0&&B.generateMipmaps&&D.generateMipmap(Ne),_e.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?w.setTextureCube(S,0):S.isData3DTexture?w.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?w.setTexture2DArray(S,0):w.setTexture2D(S,0),_e.unbindTexture()},this.resetState=function(){C=0,T=0,A=null,_e.reset(),Oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===fo?"display-p3":"srgb",t.unpackColorSpace=Ye.workingColorSpace===er?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===st?ii:$c}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ii?st:pt}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class ng extends gl{}ng.prototype.isWebGL1Renderer=!0;class yo{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ee(e),this.near=t,this.far=n}clone(){return new yo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ig extends rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class sg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=eo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=sn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=sn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=sn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Pt=new R;class vo{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=cn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=cn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=cn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=cn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),i=Je(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),i=Je(i,this.array),s=Je(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Mt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new vo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const nc=new R,ic=new Qe,sc=new Qe,rg=new R,rc=new We,Ns=new R,Fr=new un,oc=new We,Br=new as;class og extends W{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ko,this.bindMatrix=new We,this.bindMatrixInverse=new We,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Tn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ns),this.boundingBox.expandByPoint(Ns)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new un),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ns),this.boundingSphere.expandByPoint(Ns)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fr.copy(this.boundingSphere),Fr.applyMatrix4(i),e.ray.intersectsSphere(Fr)!==!1&&(oc.copy(i).invert(),Br.copy(e.ray).applyMatrix4(oc),!(this.boundingBox!==null&&Br.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Br)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Qe,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===ko?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ph?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;ic.fromBufferAttribute(i.attributes.skinIndex,e),sc.fromBufferAttribute(i.attributes.skinWeight,e),nc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=sc.getComponent(s);if(o!==0){const a=ic.getComponent(s);rc.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(rg.copy(nc).applyMatrix4(rc),o)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class _l extends rt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class ag extends wt{constructor(e=null,t=1,n=1,i,s,o,a,c,l=vt,h=vt,u,d){super(null,o,a,c,l,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ac=new We,cg=new We;class Mo{constructor(e=[],t=[]){this.uuid=sn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new We)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new We;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:cg;ac.multiplyMatrices(a,t[s]),ac.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Mo(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new ag(t,e,e,Zt,bn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new _l),this.bones.push(o),this.boneInverses.push(new We().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class so extends Mt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ei=new We,cc=new We,Us=[],lc=new Tn,lg=new We,Ki=new W,$i=new un;class hg extends W{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new so(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,lg)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Tn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ei),lc.copy(e.boundingBox).applyMatrix4(Ei),this.boundingBox.union(lc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new un),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ei),$i.copy(e.boundingSphere).applyMatrix4(Ei),this.boundingSphere.union($i)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Ki.geometry=this.geometry,Ki.material=this.material,Ki.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$i.copy(this.boundingSphere),$i.applyMatrix4(n),e.ray.intersectsSphere($i)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Ei),cc.multiplyMatrices(n,Ei),Ki.matrixWorld=cc,Ki.raycast(e,Us);for(let o=0,a=Us.length;o<a;o++){const c=Us[o];c.instanceId=s,c.object=this,t.push(c)}Us.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new so(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class So extends ln{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const hc=new R,uc=new R,dc=new We,zr=new as,Os=new un;class ir extends rt{constructor(e=new kt,t=new So){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)hc.fromBufferAttribute(t,i-1),uc.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=hc.distanceTo(uc);e.setAttribute("lineDistance",new Ut(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Os.copy(n.boundingSphere),Os.applyMatrix4(i),Os.radius+=s,e.ray.intersectsSphere(Os)===!1)return;dc.copy(i).invert(),zr.copy(e.ray).applyMatrix4(dc);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new R,h=new R,u=new R,d=new R,f=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){const p=Math.max(0,o.start),M=Math.min(g.count,o.start+o.count);for(let x=p,b=M-1;x<b;x+=f){const C=g.getX(x),T=g.getX(x+1);if(l.fromBufferAttribute(m,C),h.fromBufferAttribute(m,T),zr.distanceSqToSegment(l,h,d,u)>c)continue;d.applyMatrix4(this.matrixWorld);const k=e.ray.origin.distanceTo(d);k<e.near||k>e.far||t.push({distance:k,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,o.start),M=Math.min(m.count,o.start+o.count);for(let x=p,b=M-1;x<b;x+=f){if(l.fromBufferAttribute(m,x),h.fromBufferAttribute(m,x+1),zr.distanceSqToSegment(l,h,d,u)>c)continue;d.applyMatrix4(this.matrixWorld);const T=e.ray.origin.distanceTo(d);T<e.near||T>e.far||t.push({distance:T,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const fc=new R,pc=new R;class ug extends ir{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)fc.fromBufferAttribute(t,i),pc.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+fc.distanceTo(pc);e.setAttribute("lineDistance",new Ut(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class dg extends ir{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class xl extends ln{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const mc=new We,ro=new as,Fs=new un,Bs=new R;class fg extends rt{constructor(e=new kt,t=new xl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Fs.copy(n.boundingSphere),Fs.applyMatrix4(i),Fs.radius+=s,e.ray.intersectsSphere(Fs)===!1)return;mc.copy(i).invert(),ro.copy(e.ray).applyMatrix4(mc);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let g=d,_=f;g<_;g++){const m=l.getX(g);Bs.fromBufferAttribute(u,m),gc(Bs,m,c,i,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,_=f;g<_;g++)Bs.fromBufferAttribute(u,g),gc(Bs,g,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function gc(r,e,t,n,i,s,o){const a=ro.distanceSqToPoint(r);if(a<t){const c=new R;ro.closestPointToPoint(r,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,object:o})}}class Ot extends kt{constructor(e=1,t=1,n=1,i=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;M(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new Ut(u,3)),this.setAttribute("normal",new Ut(d,3)),this.setAttribute("uv",new Ut(f,2));function M(){const b=new R,C=new R;let T=0;const A=(t-e)/n;for(let k=0;k<=s;k++){const v=[],E=k/s,z=E*(t-e)+e;for(let H=0;H<=i;H++){const J=H/i,P=J*c+a,N=Math.sin(P),G=Math.cos(P);C.x=z*N,C.y=-E*n+m,C.z=z*G,u.push(C.x,C.y,C.z),b.set(N,A,G).normalize(),d.push(b.x,b.y,b.z),f.push(J,1-E),v.push(g++)}_.push(v)}for(let k=0;k<i;k++)for(let v=0;v<s;v++){const E=_[v][k],z=_[v+1][k],H=_[v+1][k+1],J=_[v][k+1];h.push(E,z,J),h.push(z,H,J),T+=6}l.addGroup(p,T,0),p+=T}function x(b){const C=g,T=new je,A=new R;let k=0;const v=b===!0?e:t,E=b===!0?1:-1;for(let H=1;H<=i;H++)u.push(0,m*E,0),d.push(0,E,0),f.push(.5,.5),g++;const z=g;for(let H=0;H<=i;H++){const P=H/i*c+a,N=Math.cos(P),G=Math.sin(P);A.x=v*G,A.y=m*E,A.z=v*N,u.push(A.x,A.y,A.z),d.push(0,E,0),T.x=N*.5+.5,T.y=G*.5*E+.5,f.push(T.x,T.y),g++}for(let H=0;H<i;H++){const J=C+H,P=z+H;b===!0?h.push(P,P+1,J):h.push(P+1,P,J),k+=3}l.addGroup(p,k,b===!0?1:2),p+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ot(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ai extends Ot{constructor(e=1,t=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new ai(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class zt extends kt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new R,d=new R,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const M=[],x=p/n;let b=0;p===0&&o===0?b=.5/t:p===n&&c===Math.PI&&(b=-.5/t);for(let C=0;C<=t;C++){const T=C/t;u.x=-e*Math.cos(i+T*s)*Math.sin(o+x*a),u.y=e*Math.cos(o+x*a),u.z=e*Math.sin(i+T*s)*Math.sin(o+x*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(T+b,1-x),M.push(l++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<t;M++){const x=h[p][M+1],b=h[p][M],C=h[p+1][M],T=h[p+1][M+1];(p!==0||o>0)&&f.push(x,b,T),(p!==n-1||c<Math.PI)&&f.push(b,C,T)}this.setIndex(f),this.setAttribute("position",new Ut(g,3)),this.setAttribute("normal",new Ut(_,3)),this.setAttribute("uv",new Ut(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class pe extends ln{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zc,this.normalScale=new je(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class An extends pe{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new je(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Rt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ee(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ee(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ee(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function zs(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function pg(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function mg(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function _c(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let c=0;c!==e;++c)i[o++]=r[a+c]}return i}function yl(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push.apply(t,o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class cs{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class gg extends cs{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:da,endingEnd:da}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case fa:s=e,a=2*t-n;break;case pa:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case fa:o=e,c=2*n-t;break;case pa:o=1,c=n+i[1]-i[0];break;default:o=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,M=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,x=(-1-f)*m+(1.5+f)*_+.5*g,b=f*m-f*_;for(let C=0;C!==a;++C)s[C]=p*o[h+C]+M*o[l+C]+x*o[c+C]+b*o[u+C];return s}}class _g extends cs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)s[d]=o[l+d]*u+o[c+d]*h;return s}}class xg extends cs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class dn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=zs(t,this.TimeBufferType),this.values=zs(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:zs(e.times,Array),values:zs(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new xg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new _g(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new gg(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ss:t=this.InterpolantFactoryMethodDiscrete;break;case Ui:t=this.InterpolantFactoryMethodLinear;break;case fr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ss;case this.InterpolantFactoryMethodLinear:return Ui;case this.InterpolantFactoryMethodSmooth:return fr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(i!==void 0&&pg(i))for(let a=0,c=i.length;a!==c;++a){const l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===fr,s=e.length-1;let o=1;for(let a=1;a<s;++a){let c=!1;const l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(i)c=!0;else{const u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}dn.prototype.TimeBufferType=Float32Array;dn.prototype.ValueBufferType=Float32Array;dn.prototype.DefaultInterpolation=Ui;class Hi extends dn{}Hi.prototype.ValueTypeName="bool";Hi.prototype.ValueBufferType=Array;Hi.prototype.DefaultInterpolation=ss;Hi.prototype.InterpolantFactoryMethodLinear=void 0;Hi.prototype.InterpolantFactoryMethodSmooth=void 0;class vl extends dn{}vl.prototype.ValueTypeName="color";class Bi extends dn{}Bi.prototype.ValueTypeName="number";class yg extends cs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(i-t);let l=e*a;for(let h=l+a;l!==h;l+=4)hn.slerpFlat(s,0,o,l-a,o,l,c);return s}}class ci extends dn{InterpolantFactoryMethodLinear(e){return new yg(this.times,this.values,this.getValueSize(),e)}}ci.prototype.ValueTypeName="quaternion";ci.prototype.DefaultInterpolation=Ui;ci.prototype.InterpolantFactoryMethodSmooth=void 0;class Vi extends dn{}Vi.prototype.ValueTypeName="string";Vi.prototype.ValueBufferType=Array;Vi.prototype.DefaultInterpolation=ss;Vi.prototype.InterpolantFactoryMethodLinear=void 0;Vi.prototype.InterpolantFactoryMethodSmooth=void 0;class zi extends dn{}zi.prototype.ValueTypeName="vector";let vg=class{constructor(e,t=-1,n,i=bh){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=sn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Sg(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(dn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let c=[],l=[];c.push((a+s-1)%s,a,(a+1)%s),l.push(0,1,0);const h=mg(c);c=_c(c,1,h),l=_c(l,1,h),!i&&c[0]===0&&(c.push(s),l.push(l[0])),o.push(new Bi(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],h=l.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(l)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,_){if(f.length!==0){const m=[],p=[];yl(f,m,p,g),m.length!==0&&_.push(new u(d,m,p))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let u=0;u<l.length;u++){const d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const m=[],p=[];for(let M=0;M!==d[g].morphTargets.length;++M){const x=d[g];m.push(x.time),p.push(x.morphTarget===_?1:0)}i.push(new Bi(".morphTargetInfluence["+_+"]",m,p))}c=f.length*o}else{const f=".bones["+t[u].name+"]";n(zi,f+".position",d,"pos",i),n(ci,f+".quaternion",d,"rot",i),n(zi,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,c,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function Mg(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Bi;case"vector":case"vector2":case"vector3":case"vector4":return zi;case"color":return vl;case"quaternion":return ci;case"bool":case"boolean":return Hi;case"string":return Vi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function Sg(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Mg(r.type);if(r.times===void 0){const t=[],n=[];yl(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const On={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class bg{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const wg=new bg;class Gn{constructor(e){this.manager=e!==void 0?e:wg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Gn.DEFAULT_MATERIAL_NAME="__DEFAULT";const yn={};class Eg extends Error{constructor(e,t){super(e),this.response=t}}class os extends Gn{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=On.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(yn[e]!==void 0){yn[e].push({onLoad:t,onProgress:n,onError:i});return}yn[e]=[],yn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=yn[e],u=l.body.getReader(),d=l.headers.get("Content-Length")||l.headers.get("X-File-Size"),f=d?parseInt(d):0,g=f!==0;let _=0;const m=new ReadableStream({start(p){M();function M(){u.read().then(({done:x,value:b})=>{if(x)p.close();else{_+=b.byteLength;const C=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let T=0,A=h.length;T<A;T++){const k=h[T];k.onProgress&&k.onProgress(C)}p.enqueue(b),M()}})}}});return new Response(m)}else throw new Eg(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{On.add(e,l);const h=yn[e];delete yn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=yn[e];if(h===void 0)throw this.manager.itemError(e),l;delete yn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Tg extends Gn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=On.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=rs("img");function c(){h(),On.add(e,this),t&&t(this),s.manager.itemEnd(e)}function l(u){h(),i&&i(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class Ml extends Gn{constructor(e){super(e)}load(e,t,n,i){const s=new wt,o=new Tg(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class ls extends rt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ee(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class Sl extends ls{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(rt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ee(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const kr=new We,xc=new R,yc=new R;class bo{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new je(512,512),this.map=null,this.mapPass=null,this.matrix=new We,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new go,this._frameExtents=new je(1,1),this._viewportCount=1,this._viewports=[new Qe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;xc.setFromMatrixPosition(e.matrixWorld),t.position.copy(xc),yc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yc),t.updateMatrixWorld(),kr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(kr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(kr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Ag extends bo{constructor(){super(new Dt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Oi*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Rg extends ls{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(rt.DEFAULT_UP),this.updateMatrix(),this.target=new rt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new Ag}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const vc=new We,Zi=new R,Gr=new R;class Cg extends bo{constructor(){super(new Dt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new je(4,2),this._viewportCount=6,this._viewports=[new Qe(2,1,1,1),new Qe(0,1,1,1),new Qe(3,1,1,1),new Qe(1,1,1,1),new Qe(3,0,1,1),new Qe(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Zi.setFromMatrixPosition(e.matrixWorld),n.position.copy(Zi),Gr.copy(n.position),Gr.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Gr),n.updateMatrixWorld(),i.makeTranslation(-Zi.x,-Zi.y,-Zi.z),vc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vc)}}class oo extends ls{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Cg}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Lg extends bo{constructor(){super(new _o(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class bl extends ls{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(rt.DEFAULT_UP),this.updateMatrix(),this.target=new rt,this.shadow=new Lg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class wl extends ls{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class ns{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Pg extends Gn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=On.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),s.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){return On.add(e,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){i&&i(l),On.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});On.add(e,c),s.manager.itemStart(e)}}let ks;class Ig{static getContext(){return ks===void 0&&(ks=new(window.AudioContext||window.webkitAudioContext)),ks}static setContext(e){ks=e}}class Dg extends Gn{constructor(e){super(e)}load(e,t,n,i){const s=this,o=new os(this.manager);o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(c){try{const l=c.slice(0);Ig.getContext().decodeAudioData(l,function(u){t(u)}).catch(a)}catch(l){a(l)}},n,i);function a(c){i?i(c):console.error(c),s.manager.itemError(e)}}}class Ng{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Mc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Mc();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Mc(){return(typeof performance>"u"?Date:performance).now()}const wo="\\[\\]\\.:\\/",Ug=new RegExp("["+wo+"]","g"),Eo="[^"+wo+"]",Og="[^"+wo.replace("\\.","")+"]",Fg=/((?:WC+[\/:])*)/.source.replace("WC",Eo),Bg=/(WCOD+)?/.source.replace("WCOD",Og),zg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Eo),kg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Eo),Gg=new RegExp("^"+Fg+Bg+zg+kg+"$"),Hg=["material","materials","bones","map"];class Vg{constructor(e,t,n){const i=n||$e.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class $e{constructor(e,t,n){this.path=t,this.parsedPath=n||$e.parseTrackName(t),this.node=$e.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new $e.Composite(e,t,n):new $e(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Ug,"")}static parseTrackName(e){const t=Gg.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Hg.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=$e.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[i];if(o===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}$e.Composite=Vg;$e.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};$e.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};$e.prototype.GetterByBindingType=[$e.prototype._getValue_direct,$e.prototype._getValue_array,$e.prototype._getValue_arrayElement,$e.prototype._getValue_toArray];$e.prototype.SetterByBindingTypeAndVersioning=[[$e.prototype._setValue_direct,$e.prototype._setValue_direct_setNeedsUpdate,$e.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_array,$e.prototype._setValue_array_setNeedsUpdate,$e.prototype._setValue_array_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_arrayElement,$e.prototype._setValue_arrayElement_setNeedsUpdate,$e.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_fromArray,$e.prototype._setValue_fromArray_setNeedsUpdate,$e.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Js{constructor(e,t,n=0,i=1/0){this.ray=new as(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new mo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return ao(e,this,n,t),n.sort(Sc),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)ao(e[i],this,n,t);return n.sort(Sc),n}}function Sc(r,e){return r.distance-e.distance}function ao(r,e,t,n){if(r.layers.test(e.layers)&&r.raycast(e,t),n===!0){const i=r.children;for(let s=0,o=i.length;s<o;s++)ao(i[s],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ho}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ho);const xe=Object.freeze({LOADING:"Loading",MAIN_MENU:"MainMenu",SOLO_SETUP:"SoloSetup",MULTI_LOBBY:"MultiLobby",PLAYING:"Playing",SPECTATING:"Spectating",MATCH_END:"MatchEnd"}),Wg=Object.freeze({[xe.LOADING]:[xe.MAIN_MENU],[xe.MAIN_MENU]:[xe.SOLO_SETUP,xe.MULTI_LOBBY,xe.SPECTATING],[xe.SOLO_SETUP]:[xe.PLAYING,xe.MAIN_MENU],[xe.MULTI_LOBBY]:[xe.PLAYING,xe.MAIN_MENU],[xe.PLAYING]:[xe.SPECTATING,xe.MATCH_END,xe.MAIN_MENU],[xe.SPECTATING]:[xe.MULTI_LOBBY,xe.MATCH_END],[xe.MATCH_END]:[xe.SOLO_SETUP,xe.MULTI_LOBBY,xe.MAIN_MENU]});class Xg{constructor(){this.current=xe.LOADING,this.previous=null,this.listeners=new Map,this.transitioning=!1}on(e,t){return this.listeners.has(e)||this.listeners.set(e,[]),this.listeners.get(e).push(t),()=>{const n=this.listeners.get(e);if(n){const i=n.indexOf(t);i!==-1&&n.splice(i,1)}}}onChange(e){return this.on("*",e)}get current(){return this._current}set current(e){this._current=e}get previous(){return this._previous}set previous(e){this._previous=e}is(e){return this.current===e}canTransitionTo(e){const t=Wg[this.current];return t&&t.includes(e)}transitionTo(e,t=null){if(this.transitioning)return console.warn(`[GameStateManager] Already transitioning, ignoring ${e}`),!1;if(!this.canTransitionTo(e))return console.warn(`[GameStateManager] Invalid transition: ${this.current} -> ${e}`),!1;this.transitioning=!0,this.previous=this.current,this.current=e,console.log(`[GameStateManager] ${this.previous} -> ${this.current}`);const n=this.listeners.get(e);if(n)for(const s of n)s({from:this.previous,to:e,data:t});const i=this.listeners.get("*");if(i)for(const s of i)s({from:this.previous,to:e,data:t});return this.transitioning=!1,!0}reset(){this.current=xe.LOADING,this.previous=null,this.transitioning=!1}}const bc="shooting_game_";class qg{constructor(){this.available=typeof localStorage<"u",this.cache=new Map}_key(e){return bc+e}save(e,t){if(!this.available)return!1;try{const n=JSON.stringify(t);return localStorage.setItem(this._key(e),n),this.cache.set(e,t),!0}catch(n){return console.warn(`[SaveManager] Failed to save ${e}:`,n),!1}}load(e,t=null){if(this.cache.has(e))return this.cache.get(e);if(!this.available)return t;try{const n=localStorage.getItem(this._key(e));if(n===null)return t;const i=JSON.parse(n);return this.cache.set(e,i),i}catch(n){return console.warn(`[SaveManager] Failed to load ${e}:`,n),t}}delete(e){this.cache.delete(e),this.available&&localStorage.removeItem(this._key(e))}clear(){if(this.cache.clear(),!this.available)return;Object.keys(localStorage).filter(t=>t.startsWith(bc)).forEach(t=>localStorage.removeItem(t))}}const Gs={graphics:{quality:"medium",shadows:!0,resolutionScale:1,fov:75,vsync:!0},controls:{sensitivity:5,invertY:!1,keybinds:{forward:"KeyW",backward:"KeyS",left:"KeyA",right:"KeyD",jump:"Space",crouch:"ControlLeft",sprint:"ShiftLeft",reload:"KeyR",shoot:"Mouse0",aim:"Mouse2",interact:"KeyE",switchWeapon1:"Digit1",switchWeapon2:"Digit2",switchWeapon3:"Digit3",debug:"F3",scoreboard:"Tab"}},audio:{masterVolume:1,effectsVolume:.8,musicVolume:.5,voiceVolume:.7}};class jg{constructor(e){this.saveManager=e,this.settings=this._load()}_load(){const e=this.saveManager.load("settings",null);return e?this._mergeDefaults(e):this._deepClone(Gs)}_mergeDefaults(e){const t=this._deepClone(Gs);for(const n of Object.keys(Gs))e[n]&&Object.assign(t[n],e[n]);return t}_deepClone(e){return JSON.parse(JSON.stringify(e))}get(e,t){var n;return t===void 0?this.settings[e]:(n=this.settings[e])==null?void 0:n[t]}set(e,t,n){this.settings[e]||(this.settings[e]={}),this.settings[e][t]=n,this._persist()}getKeybind(e){return this.settings.controls.keybinds[e]||null}setKeybind(e,t){this.settings.controls.keybinds[e]=t,this._persist()}reset(){this.settings=this._deepClone(Gs),this._persist()}_persist(){this.saveManager.save("settings",this.settings)}}class Yg{constructor(){this.enabled=!1,this.metrics={fps:0,ping:0,position:{x:0,y:0,z:0},state:"Loading",weapon:"none",latency:0,players:0,bullets:0},this._frameCount=0,this._lastFpsUpdate=performance.now(),this._fps=0}toggle(){this.enabled=!this.enabled;const e=document.getElementById("debug-overlay");return e&&e.classList.toggle("hidden",!this.enabled),this.enabled}update(e){if(!this.enabled)return;this._frameCount++;const t=performance.now();t-this._lastFpsUpdate>=1e3&&(this._fps=this._frameCount,this._frameCount=0,this._lastFpsUpdate=t),this.metrics.fps=this._fps,this._render()}setPosition(e,t,n){this.metrics.position={x:e.toFixed(1),y:t.toFixed(1),z:n.toFixed(1)}}setState(e){this.metrics.state=e}setWeapon(e){this.metrics.weapon=e}setPing(e){this.metrics.ping=e}setLatency(e){this.metrics.latency=e}setPlayers(e){this.metrics.players=e}setBullets(e){this.metrics.bullets=e}_render(){const e=(t,n)=>{const i=document.getElementById(t);i&&(i.textContent=n)};e("debug-fps",`FPS: ${this.metrics.fps}`),e("debug-ping",`Ping: ${this.metrics.ping}ms`),e("debug-position",`Pos: ${this.metrics.position.x}, ${this.metrics.position.y}, ${this.metrics.position.z}`),e("debug-state",`State: ${this.metrics.state}`),e("debug-weapon",`Weapon: ${this.metrics.weapon}`),e("debug-latency",`Latency: ${this.metrics.latency}ms`)}}class Kg{constructor(){this._listeners=new Map}on(e,t){return this._listeners.has(e)||this._listeners.set(e,[]),this._listeners.get(e).push(t),()=>this.off(e,t)}off(e,t){const n=this._listeners.get(e);if(!n)return;const i=n.indexOf(t);i!==-1&&n.splice(i,1)}emit(e,t=null){const n=this._listeners.get(e);if(n)for(const i of n)i(t)}once(e,t){const n=i=>{this.off(e,n),t(i)};this.on(e,n)}clear(){this._listeners.clear()}}const ht={walkSpeed:4.5,sprintSpeed:7.2,crouchSpeed:2.2,jumpForce:8,acceleration:12,deceleration:10,airAcceleration:4,airDeceleration:2,airControl:.3,crouchHeight:.8,normalHeight:1.8,crouchTransitionSpeed:8,gravity:-20,maxFallSpeed:-30,groundFriction:6},jt={normalHeight:1.6,crouchHeight:.6,bobFrequency:10,bobAmplitude:.04,sprintBobMultiplier:1.6,crouchBobMultiplier:.4,landImpact:.1,fov:75,sprintFovAdd:5};class $g{constructor(e,t){this.camera=e,this.settings=t,this.position=new R(0,0,0),this.velocity=new R(0,0,0),this.euler=new kn(0,0,0,"YXZ"),this.quaternion=new hn,this.height=ht.normalHeight,this.targetHeight=ht.normalHeight,this.camHeight=jt.normalHeight,this.targetCamHeight=jt.normalHeight,this.grounded=!1,this.wasGrounded=!1,this.fallingVelocity=0,this.wishDirection=new R,this.moveDir=new R,this.inputs={forward:!1,backward:!1,left:!1,right:!1,jump:!1,crouch:!1,sprint:!1,shoot:!1,aim:!1,reload:!1},this.mouseDelta={x:0,y:0},this.isPointerLocked=!1,this.bobPhase=0,this.bobIntensity=0,this.landBobbing=0,this.currentSpeed=0,this.isMoving=!1,this.isSprinting=!1,this.isCrouching=!1,this.isInAir=!1,this.cameraActive=!0,this.flinchTarget=new R,this.flinchCurrent=new R,this.flinchDecay=8,this.flinchStrength={head:.15,body:.04},this.slowTimer=0,this.slowDuration=2,this.slowMultiplier=.5,this.isSlowed=!1,this._lastGroundPos=new R,this._airTime=0,this.onFallDamage=null,this._collidables=[],this._playerRadius=.4}get forward(){const e=this.euler;return new R(-Math.sin(e.y),0,-Math.cos(e.y))}get right(){const e=this.euler;return new R(Math.cos(e.y),0,-Math.sin(e.y))}handleMouseMove(e){if(!this.isPointerLocked)return;const t=this.settings.get("controls","sensitivity")/10,n=this.settings.get("controls","invertY")?-1:1;this.mouseDelta.x+=e.movementX*t*.002,this.mouseDelta.y+=e.movementY*t*.002*n}handleKeyDown(e){const t={KeyW:"forward",KeyS:"backward",KeyA:"left",KeyD:"right",Space:"jump",ShiftLeft:"sprint",ShiftRight:"sprint",ControlLeft:"crouch",ControlRight:"crouch",KeyR:"reload"};t[e]&&t[e]in this.inputs&&(this.inputs[t[e]]=!0);const n=this.settings.get("controls","keybinds");if(n)for(const[i,s]of Object.entries(n))s===e&&i in this.inputs&&(this.inputs[i]=!0)}handleKeyUp(e){const t={KeyW:"forward",KeyS:"backward",KeyA:"left",KeyD:"right",Space:"jump",ShiftLeft:"sprint",ShiftRight:"sprint",ControlLeft:"crouch",ControlRight:"crouch",KeyR:"reload"};t[e]&&t[e]in this.inputs&&(this.inputs[t[e]]=!1);const n=this.settings.get("controls","keybinds");if(n)for(const[i,s]of Object.entries(n))s===e&&i in this.inputs&&(this.inputs[i]=!1)}handleMouseDown(e){const t=this.settings.get("controls","keybinds"),n=`Mouse${e}`;for(const[i,s]of Object.entries(t))s===n&&i in this.inputs&&(this.inputs[i]=!0)}handleMouseUp(e){const t=this.settings.get("controls","keybinds"),n=`Mouse${e}`;for(const[i,s]of Object.entries(t))s===n&&i in this.inputs&&(this.inputs[i]=!1)}update(e,t=[],n=null){const i=Math.min(e,.05);this._collidables=t,this._updatePitch(i),this._updateYaw(i),this._updateStance(i),this._computeWishDirection(),this._applyMovement(i),n&&n(this),this._applyGravity(i),this._integratePosition(i),this._resolveCollision(),this._checkGroundState(i),this._updateBob(i),this._updateCamera(i)}_updatePitch(e){this.euler.x-=this.mouseDelta.y*2,this.euler.x=Math.max(-Math.PI/2.2,Math.min(Math.PI/2.2,this.euler.x)),this.mouseDelta.y=0}_updateYaw(e){this.euler.y-=this.mouseDelta.x*2,this.mouseDelta.x=0}_updateStance(e){const t=this.inputs.crouch;this.isCrouching=t,t?(this.targetHeight=ht.crouchHeight,this.targetCamHeight=jt.crouchHeight):(this.targetHeight=ht.normalHeight,this.targetCamHeight=jt.normalHeight),this.height+=(this.targetHeight-this.height)*ht.crouchTransitionSpeed*e,this.camHeight+=(this.targetCamHeight-this.camHeight)*ht.crouchTransitionSpeed*e}_computeWishDirection(){this.wishDirection.set(0,0,0);const e=this.forward,t=this.right;this.inputs.forward&&this.wishDirection.add(e),this.inputs.backward&&this.wishDirection.sub(e),this.inputs.left&&this.wishDirection.sub(t),this.inputs.right&&this.wishDirection.add(t),this.wishDirection.lengthSq()>0&&this.wishDirection.normalize()}_applyMovement(e){const t=this.isCrouching,n=this.inputs.sprint&&!t&&this.inputs.forward&&!this.inputs.backward&&!this.inputs.left&&!this.inputs.right;this.isSprinting=n;let i=ht.walkSpeed;n&&(i=ht.sprintSpeed),t&&(i=ht.crouchSpeed),this.isSlowed&&(i*=this.slowMultiplier);const s=this.grounded,o=s?ht.acceleration:ht.airAcceleration,a=s?ht.deceleration:ht.airDeceleration,c=s?ht.groundFriction:0,l=this.wishDirection.length();if(this.isMoving=l>0,l>0){this.wishDirection.multiplyScalar(Math.min(l,1));const h=this.wishDirection.clone().multiplyScalar(i),u=this.velocity.clone();u.y=0;let d=h.clone().sub(u);const f=d.length(),g=o*i*e;f>g&&d.multiplyScalar(g/f),this.velocity.x+=d.x,this.velocity.z+=d.z,s||(this.velocity.x*=1-ht.airControl*e,this.velocity.z*=1-ht.airControl*e)}else if(s){const h=Math.sqrt(this.velocity.x*this.velocity.x+this.velocity.z*this.velocity.z);if(h>0){const u=c*e,f=Math.max(0,h-u)/h;this.velocity.x*=f,this.velocity.z*=f}}else this.velocity.x*=1-a*e*.1,this.velocity.z*=1-a*e*.1;this.currentSpeed=Math.sqrt(this.velocity.x*this.velocity.x+this.velocity.z*this.velocity.z)}_applyGravity(e){this.grounded||(this.velocity.y+=ht.gravity*e,this.velocity.y<ht.maxFallSpeed&&(this.velocity.y=ht.maxFallSpeed))}_integratePosition(e){this.position.x+=this.velocity.x*e,this.position.z+=this.velocity.z*e,this.position.y+=this.velocity.y*e}_resolveCollision(){const e=this._playerRadius;for(const t of this._collidables){if(!t.geometry)continue;const n=t.geometry;n.boundingBox||n.computeBoundingBox(),t.updateWorldMatrix(!0,!1);const i=n.boundingBox.clone().applyMatrix4(t.matrixWorld),s=this.position.x,o=this.position.z,a=Math.max(i.min.x,Math.min(s,i.max.x)),c=Math.max(i.min.z,Math.min(o,i.max.z)),l=s-a,h=o-c,u=l*l+h*h;if(u<e*e&&u>1e-4){const d=Math.sqrt(u),f=e-d,g=l/d,_=h/d;this.position.x+=g*f,this.position.z+=_*f,this.velocity.x*=.1,this.velocity.z*=.1}}}_checkGroundState(e){if(this.wasGrounded=this.grounded,this.velocity.y<=0&&this.position.y<=this.height*.5+.01){if(!this.grounded){const t=this._lastGroundPos.y-this.position.y;if(t>.5&&(this.landBobbing=jt.landImpact*Math.min(t/5,1)),t>3){const n=Math.round((t-3)*5);this.onFallDamage&&this.onFallDamage(n)}}this.grounded=!0,this.position.y=this.height*.5,this.velocity.y<0&&(this.velocity.y=0)}else this.grounded=!1;this.inputs.jump&&this.grounded&&(this.velocity.y=ht.jumpForce,this.grounded=!1),this.isInAir=!this.grounded,this.grounded?(this._lastGroundPos.copy(this.position),this._airTime=0):this._airTime+=e}_updateBob(e){const t=this.currentSpeed;if(this.grounded&&t>.1){let n=jt.bobFrequency,i=jt.bobAmplitude;this.isSprinting?(n*=1.3,i*=jt.sprintBobMultiplier):this.isCrouching&&(n*=.7,i*=jt.crouchBobMultiplier),this.bobPhase+=n*e*Math.min(t/ht.walkSpeed,1.5),this.bobIntensity=i*Math.min(t/ht.walkSpeed,1.2)}else this.bobIntensity*=1-10*e,this.bobIntensity<.001&&(this.bobIntensity=0)}_updateCamera(e){if(this.quaternion.setFromEuler(this.euler),!this.cameraActive)return;this.flinchTarget.lengthSq()>1e-4?(this.flinchCurrent.lerp(this.flinchTarget,1-Math.exp(-12*e)),this.flinchTarget.lerp(new R,1-Math.exp(-this.flinchDecay*e))):this.flinchCurrent.lerp(new R,1-Math.exp(-this.flinchDecay*e)),this.slowTimer>0&&(this.slowTimer-=e,this.slowTimer<=0&&(this.slowTimer=0,this.isSlowed=!1));const t=Math.sin(this.bobPhase)*this.bobIntensity,n=Math.abs(Math.cos(this.bobPhase))*this.bobIntensity;this.camera.position.x=this.position.x+t+this.flinchCurrent.x,this.camera.position.y=this.position.y+this.camHeight+n+this.landBobbing+this.flinchCurrent.y,this.camera.position.z=this.position.z+this.flinchCurrent.z,this.camera.quaternion.copy(this.quaternion),this.isSprinting?this.camera.fov+=(jt.fov+jt.sprintFovAdd-this.camera.fov)*.1:this.camera.fov+=(jt.fov-this.camera.fov)*.1,this.camera.updateProjectionMatrix(),this.landBobbing*=1-8*e,Math.abs(this.landBobbing)<.001&&(this.landBobbing=0)}applyFlinch(e){const t=this.flinchStrength[e]||this.flinchStrength.body,n=(Math.random()-.5)*Math.PI*.5;this.flinchTarget.set(Math.cos(n)*t*.5,t,Math.sin(n)*t*.3)}applyLegSlow(){this.slowTimer=this.slowDuration,this.isSlowed=!0}teleport(e,t,n){this.position.set(e,t,n),this.velocity.set(0,0,0)}getState(){return{position:this.position.clone(),velocity:this.velocity.clone(),euler:{x:this.euler.x,y:this.euler.y},grounded:this.grounded,isSprinting:this.isSprinting,isCrouching:this.isCrouching,currentSpeed:this.currentSpeed}}setState(e){this.position.copy(e.position),this.velocity.copy(e.velocity),this.euler.x=e.euler.x,this.euler.y=e.euler.y,this.grounded=e.grounded}}class Zg{constructor(e){this.camera=e,this.holder=new bt,this.camera.add(this.holder),this.recoil=0,this.maxRecoil=.15,this.recoverySpeed=6,this.recoilSide=0,this.bobPhase=0,this.bobTarget=new R,this.restPos=new R(.25,-.2,-.4),this.restRot=new kn(-.03,.06,-.05),this.shootKick=0,this.reloadProgress=0,this.isReloading=!1,this.weaponGroup=new bt,this.weaponGroup.scale.set(1.5,1.5,1.5),this.holder.add(this.weaponGroup),this._buildM4A1(),this.muzzleFlash=new oo(16755268,0,4),this.muzzleFlash.position.set(0,.02,.48),this.weaponGroup.add(this.muzzleFlash),this.flashTimer=0,this.reloadDuration=2,this._resetPose()}_buildM4A1(){const e=new te(.06,.06,.5),t=new pe({color:11184810,metalness:.6,roughness:.3,emissive:4473924,emissiveIntensity:.15});this.body=new W(e,t),this.body.position.set(0,0,0),this.weaponGroup.add(this.body);const n=new Ot(.015,.02,.3,8),i=new pe({color:8947848,metalness:.8,roughness:.2,emissive:3355443,emissiveIntensity:.15});this.barrel=new W(n,i),this.barrel.rotation.x=Math.PI/2,this.barrel.position.set(0,.02,.28),this.weaponGroup.add(this.barrel),this.muzzle=new R,this.barrel.getWorldPosition(this.muzzle);const s=new te(.03,.07,.08),o=new pe({color:10066329,metalness:.4,roughness:.5,emissive:4473924,emissiveIntensity:.15});this.magazine=new W(s,o),this.magazine.position.set(0,-.06,-.05),this.weaponGroup.add(this.magazine);const a=new te(.04,.04,.15),c=new pe({color:12303291,roughness:.7,emissive:5592405,emissiveIntensity:.15});this.stock=new W(a,c),this.stock.position.set(0,-.01,-.28),this.weaponGroup.add(this.stock);const l=new te(.01,.03,.02),h=new pe({color:6710886,metalness:.5,emissive:3355443,emissiveIntensity:.15});this.sight=new W(l,h),this.sight.position.set(0,.05,.1),this.weaponGroup.add(this.sight);const u=new te(.03,.03,.12),d=new pe({color:8947848,roughness:.6,emissive:4473924,emissiveIntensity:.15});this.handguard=new W(u,d),this.handguard.position.set(0,0,.18),this.weaponGroup.add(this.handguard);const f=new te(.025,.04,.035),g=new pe({color:8947848,roughness:.6,emissive:4473924,emissiveIntensity:.15});this.grip=new W(f,g),this.grip.position.set(.01,-.04,0),this.grip.rotation.x=.1,this.weaponGroup.add(this.grip)}_resetPose(){this.weaponGroup.position.copy(this.restPos),this.weaponGroup.rotation.set(this.restRot.x,this.restRot.y,this.restRot.z)}getMuzzleWorldPosition(){const e=new R(0,.02,.48);return e.applyMatrix4(this.weaponGroup.matrixWorld),e}playShoot(){this.shootKick=.04,this.recoil=Math.min(this.recoil+.025,this.maxRecoil),this.recoilSide+=(Math.random()-.5)*.02,this.flashTimer=.05,this.muzzleFlash.intensity=2}playReload(e=2){this.isReloading=!0,this.reloadProgress=0,this.reloadDuration=e}update(e,t,n,i,s){const o=Math.min(e,.05);this.isReloading&&(this.reloadProgress+=o,this.reloadProgress>=this.reloadDuration&&(this.isReloading=!1,this.reloadProgress=0)),this.shootKick>0&&(this.shootKick*=1-12*o,this.shootKick<.001&&(this.shootKick=0)),this.recoil>0&&(this.recoil*=1-this.recoverySpeed*o,this.recoil<.001&&(this.recoil=0)),this.recoilSide*=1-this.recoverySpeed*.5*o,Math.abs(this.recoilSide)<1e-4&&(this.recoilSide=0),this._updateBob(o,t,n);const a=this.restPos.clone();if(a.y+=this.shootKick*.5,a.x+=this.recoilSide*1.5,this.isReloading){const l=this.reloadProgress/this.reloadDuration;l<.3?(a.y+=l/.3*-.12,a.x+=l/.3*-.1):l<.7&&(a.y+=-.12+(l-.3)/.4*.12,a.x+=-.1+(l-.3)/.4*.1)}a.x+=this.bobTarget.x,a.y+=this.bobTarget.y,this.weaponGroup.position.lerp(a,10*o);const c=new kn(this.restRot.x+this.recoil*2,this.restRot.y+this.recoilSide,this.restRot.z+this.recoil*3);this.weaponGroup.rotation.x+=(c.x-this.weaponGroup.rotation.x)*10*o,this.weaponGroup.rotation.y+=(c.y-this.weaponGroup.rotation.y)*10*o,this.weaponGroup.rotation.z+=(c.z-this.weaponGroup.rotation.z)*10*o,this.flashTimer>0&&(this.flashTimer-=o,this.flashTimer<=0&&(this.muzzleFlash.intensity=0))}_updateBob(e,t,n){if(t){const i=n?1.4:1;this.bobPhase+=8*e*i,this.bobTarget.x=Math.sin(this.bobPhase)*.006,this.bobTarget.y=Math.abs(Math.cos(this.bobPhase))*.006}else this.bobTarget.x*=1-8*e,this.bobTarget.y*=1-8*e,Math.abs(this.bobTarget.x)<1e-4&&(this.bobTarget.x=0),Math.abs(this.bobTarget.y)<1e-4&&(this.bobTarget.y=0)}_clearWeapon(){for(;this.weaponGroup.children.length>0;){const e=this.weaponGroup.children[0];e.isMesh&&(e.geometry.dispose(),e.material.dispose()),this.weaponGroup.remove(e)}}switchModel(e){switch(this._clearWeapon(),e){case"Pistol":this._buildPistol();break;case"SMG":this._buildSMG();break;case"Shotgun":this._buildShotgun();break;case"Sniper":this._buildSniper();break;default:this._buildM4A1();break}this.muzzleFlash=new oo(16755268,0,4),this.muzzleFlash.position.set(0,.02,.48),this.weaponGroup.add(this.muzzleFlash),this.flashTimer=0,this._resetPose()}_buildPistol(){const e=new te(.04,.04,.16),t=new pe({color:8947848,metalness:.5,roughness:.4,emissive:2236962,emissiveIntensity:.1}),n=new W(e,t);n.position.set(0,.01,0),this.weaponGroup.add(n);const i=new Ot(.012,.015,.1,8),s=new pe({color:4473924,metalness:.8,roughness:.2,emissive:1118481,emissiveIntensity:.1}),o=new W(i,s);o.rotation.x=Math.PI/2,o.position.set(0,.02,.12),this.weaponGroup.add(o);const a=new Ot(.016,.018,.07,8),c=new pe({color:2236962,metalness:.9,roughness:.1}),l=new W(a,c);l.rotation.x=Math.PI/2,l.position.set(0,.02,.18),this.weaponGroup.add(l);const h=new te(.025,.06,.045),u=new pe({color:10066329,roughness:.7,emissive:3355443,emissiveIntensity:.1}),d=new W(h,u);d.position.set(0,-.045,-.04),d.rotation.x=.15,this.weaponGroup.add(d);const f=new te(.02,.04,.03),g=new pe({color:7829367,metalness:.3,roughness:.5,emissive:2236962,emissiveIntensity:.1}),_=new W(f,g);_.position.set(0,-.07,-.04),this.weaponGroup.add(_)}_buildSMG(){const e=new te(.04,.05,.3),t=new pe({color:8947848,metalness:.5,roughness:.4,emissive:2236962,emissiveIntensity:.1}),n=new W(e,t);n.position.set(0,0,0),this.weaponGroup.add(n);const i=new Ot(.01,.012,.15,8),s=new pe({color:6710886,metalness:.7,roughness:.2,emissive:1118481,emissiveIntensity:.1}),o=new W(i,s);o.rotation.x=Math.PI/2,o.position.set(0,.02,.2),this.weaponGroup.add(o);const a=new te(.025,.08,.05),c=new pe({color:7829367,metalness:.3,roughness:.5,emissive:2236962,emissiveIntensity:.1}),l=new W(a,c);l.position.set(0,-.06,0),this.weaponGroup.add(l);const h=new te(.03,.03,.12),u=new pe({color:10066329,roughness:.6,emissive:3355443,emissiveIntensity:.1}),d=new W(h,u);d.position.set(0,-.01,-.18),this.weaponGroup.add(d)}_buildShotgun(){const e=new te(.06,.05,.25),t=new pe({color:8947848,metalness:.4,roughness:.5,emissive:2236962,emissiveIntensity:.1}),n=new W(e,t);n.position.set(0,0,0),this.weaponGroup.add(n);const i=new Ot(.025,.03,.35,8),s=new pe({color:6710886,metalness:.7,roughness:.2,emissive:1118481,emissiveIntensity:.1}),o=new W(i,s);o.rotation.x=Math.PI/2,o.position.set(0,.02,.28),this.weaponGroup.add(o);const a=new te(.04,.03,.08),c=new pe({color:10066329,roughness:.7,emissive:3355443,emissiveIntensity:.1}),l=new W(a,c);l.position.set(0,0,.18),this.weaponGroup.add(l);const h=new te(.05,.04,.15),u=new pe({color:10066329,roughness:.7,emissive:3355443,emissiveIntensity:.1}),d=new W(h,u);d.position.set(0,-.01,-.18),this.weaponGroup.add(d)}_buildSniper(){const e=new te(.04,.04,.5),t=new pe({color:8947848,metalness:.5,roughness:.3,emissive:2236962,emissiveIntensity:.1}),n=new W(e,t);n.position.set(0,0,0),this.weaponGroup.add(n);const i=new Ot(.012,.015,.45,8),s=new pe({color:6710886,metalness:.8,roughness:.1,emissive:1118481,emissiveIntensity:.1}),o=new W(i,s);o.rotation.x=Math.PI/2,o.position.set(0,.02,.4),this.weaponGroup.add(o);const a=new Ot(.015,.02,.1,8),c=new pe({color:4473924,metalness:.5,emissive:1118481,emissiveIntensity:.1}),l=new W(a,c);l.rotation.x=Math.PI/2,l.position.set(0,.06,.1),this.weaponGroup.add(l);const h=new te(.035,.035,.15),u=new pe({color:10066329,roughness:.7,emissive:3355443,emissiveIntensity:.1}),d=new W(h,u);d.position.set(0,-.01,-.3),this.weaponGroup.add(d);const f=new te(.02,.04,.06),g=new pe({color:7829367,metalness:.3,roughness:.5,emissive:2236962,emissiveIntensity:.1}),_=new W(f,g);_.position.set(0,-.04,-.05),this.weaponGroup.add(_)}getMuzzlePosition(){const e=new R(0,.02,.48);return e.applyMatrix4(this.weaponGroup.matrixWorld),e}dispose(){this.camera.remove(this.holder),this.weaponGroup.traverse(e=>{e.isMesh&&(e.geometry.dispose(),e.material.dispose())})}}const Wt=Object.freeze({FIRST_PERSON:"first",THIRD_PERSON:"third"});class Jg{constructor(e,t){this.camera=e,this.player=t,this.currentView=Wt.FIRST_PERSON,this.thirdPersonOffset=new R(0,2,4),this.thirdPersonLookAhead=.5,this.smoothSpeed=5,this._thirdPersonPosition=new R,this._thirdPersonLookTarget=new R,this.firstPersonFov=75,this.thirdPersonFov=65}toggleView(){return this.currentView===Wt.FIRST_PERSON?this.currentView=Wt.THIRD_PERSON:this.currentView=Wt.FIRST_PERSON,this.currentView}setView(e){this.currentView=e}isFirstPerson(){return this.currentView===Wt.FIRST_PERSON}isThirdPerson(){return this.currentView===Wt.THIRD_PERSON}update(e,t,n,i){const s=Math.min(e,.05);this.currentView===Wt.FIRST_PERSON?this._updateFirstPerson(t,n,i):(this._updateThirdPerson(s,i),t&&(t.holder.visible=!1),n&&n.hide())}_updateFirstPerson(e,t,n){e&&(e.holder.visible=!0),t&&t.show(),n&&n.hide(),this.camera.fov+=(this.firstPersonFov-this.camera.fov)*.1,this.camera.updateProjectionMatrix()}_updateThirdPerson(e,t){t&&(t.show(),t.update(this.player.position,this.player.euler,this.player.isMoving,this.player.isSprinting,this.player.isInAir));const n=new R(0,0,1);n.applyQuaternion(this.player.quaternion),n.multiplyScalar(this.thirdPersonOffset.z),n.y+=this.thirdPersonOffset.y;const i=this.player.position.clone().add(n);this._thirdPersonPosition.lerp(i,this.smoothSpeed*e),this.camera.position.copy(this._thirdPersonPosition);const s=this.player.position.clone();s.y+=1,this.camera.lookAt(s),this.camera.fov+=(this.thirdPersonFov-this.camera.fov)*.1,this.camera.updateProjectionMatrix()}getMuzzleWorldPosition(e){if(this.currentView===Wt.FIRST_PERSON&&e)return e.getMuzzleWorldPosition();const t=this.player.position.clone();return t.y+=1,t}}class Qg{constructor(e){this.scene=e,this.group=new bt,this.scene.add(this.group),this.visible=!1,this.group.visible=!1,this._buildModel()}_buildModel(){const e=new pe({color:3368618,roughness:.6}),t=new pe({color:13413e3,roughness:.5}),n=new pe({color:4478310,roughness:.7}),i=new pe({color:3355443,roughness:.8}),s=new pe({color:13413e3,roughness:.5}),o=new W(new zt(.2,8,8),t);o.position.y=1.65,o.castShadow=!0,this.group.add(o);const a=new W(new te(.5,.5,.3),e);a.position.y=1.15,a.castShadow=!0,this.group.add(a);const c=new W(new te(.35,.2,.25),n);c.position.y=.8,this.group.add(c);const l=new W(new te(.12,.4,.12),n);l.position.set(-.1,.5,0),l.castShadow=!0,this.group.add(l);const h=new W(new te(.12,.4,.12),n);h.position.set(.1,.5,0),h.castShadow=!0,this.group.add(h);const u=new W(new te(.1,.08,.18),i);u.position.set(-.1,.3,.04),this.group.add(u);const d=new W(new te(.1,.08,.18),i);d.position.set(.1,.3,.04),this.group.add(d);const f=new W(new te(.08,.4,.08),s);f.position.set(-.34,1.2,0),f.castShadow=!0,this.group.add(f);const g=new W(new te(.08,.4,.08),s);g.position.set(.34,1.2,0),g.castShadow=!0,this.group.add(g),this.sleeveMat=new pe({color:3368618,roughness:.6});const _=new W(new te(.09,.15,.09),this.sleeveMat);_.position.set(-.34,1.38,0),this.group.add(_);const m=new W(new te(.09,.15,.09),this.sleeveMat);m.position.set(.34,1.38,0),this.group.add(m);const p=new te(.05,.05,.35),M=new pe({color:2236962,metalness:.6});this.weaponMesh=new W(p,M),this.weaponMesh.position.set(.25,1.05,-.15),this.weaponMesh.rotation.x=-.3,this.group.add(this.weaponMesh)}show(){this.visible=!0,this.group.visible=!0}hide(){this.visible=!1,this.group.visible=!1}update(e,t,n,i,s){this.visible&&(this.group.position.copy(e),this.group.position.y-=.9,this.group.rotation.y=t.y)}dispose(){this.scene.remove(this.group),this.group.traverse(e=>{e.isMesh&&(e.geometry.dispose(),e.material.dispose())})}}const St=Object.freeze({HEAD:"head",BODY:"body",LEG:"leg"}),wc=Object.freeze({[St.HEAD]:2.5,[St.BODY]:1,[St.LEG]:.75}),Hs=Object.freeze({[St.HEAD]:16729156,[St.BODY]:4500223,[St.LEG]:4521796});class El{constructor(e,t={}){this.owner=e,this.regions=new Map,this.group=new bt,this.visible=!1,this.debugMode=!1,this._createDefaultHitboxes(t)}_createDefaultHitboxes(e){const t=e.scale||1,n=(e.headRadius||.2)*t,i=(e.bodyWidth||.5)*t,s=(e.bodyHeight||.6)*t,o=(e.bodyDepth||.3)*t,a=(e.legWidth||.25)*t,c=(e.legHeight||.4)*t,l=(e.legDepth||.25)*t,h=new W(new zt(n,8,8),new Bt({color:Hs[St.HEAD],transparent:!0,opacity:.3,depthWrite:!1,wireframe:!0}));h.position.y=s+n*1.5;const u=new W(new te(i,s,o),new Bt({color:Hs[St.BODY],transparent:!0,opacity:.3,depthWrite:!1,wireframe:!0}));u.position.y=s*.5+c;const d=new W(new te(a*.8,c,l),new Bt({color:Hs[St.LEG],transparent:!0,opacity:.3,depthWrite:!1,wireframe:!0}));d.position.set(-a*.4,c*.5,0);const f=new W(new te(a*.8,c,l),new Bt({color:Hs[St.LEG],transparent:!0,opacity:.3,depthWrite:!1,wireframe:!0}));f.position.set(a*.4,c*.5,0),this.regions.set(St.HEAD,{mesh:h,type:"sphere",radius:n,offset:h.position.clone()}),this.regions.set(St.BODY,{mesh:u,type:"box",halfExtents:new R(i/2,s/2,o/2),offset:u.position.clone()});const g={meshes:[d,f],type:"box",halfExtents:new R(a*.8/2,c/2,l/2),offsets:[d.position.clone(),f.position.clone()],multiplier:wc[St.LEG]};this.regions.set(St.LEG,g),this.group.add(h),this.group.add(u),this.group.add(d),this.group.add(f)}update(e,t){this.group.position.copy(e),this.group.rotation.copy(t),this.group.visible=this.visible||this.debugMode}setVisible(e){this.visible=e}setDebugMode(e){this.debugMode=e,this.group.visible=this.visible||e}testRay(e){const t=[];for(const[n,i]of this.regions){const s=this._getWorldPosition(i),o=this._testRegion(e,i,s);o&&t.push({region:n,distance:o.distance,point:o.point,multiplier:wc[n]})}return t.sort((n,i)=>n.distance-i.distance),t.length>0?t[0]:null}_getWorldPosition(e){var i;const t=e.offset||((i=e.offsets)==null?void 0:i[0]);if(!t)return this.group.position.clone();const n=this.group.position.clone();return n.y+=t.y,n}_testRegion(e,t,n){if(t.type==="sphere")return this._testSphere(e,n,t.radius);if(t.type==="box"){if(t.offsets){for(const i of t.offsets){const s=this.group.position.clone();s.y+=i.y;const o=this._testBox(e,s,t.halfExtents);if(o)return o}return null}return this._testBox(e,n,t.halfExtents)}return null}_testSphere(e,t,n){const i=e.ray,o=t.clone().sub(i.origin).dot(i.direction);if(i.origin.clone().add(i.direction.clone().multiplyScalar(o)).distanceToSquared(t)<=n*n){const l=o>0?o:0,h=i.origin.clone().add(i.direction.clone().multiplyScalar(l));return{distance:l,point:h}}return null}_testBox(e,t,n){const i=e.ray,s=new R(1/i.direction.x,1/i.direction.y,1/i.direction.z),o=t.clone().sub(n),a=t.clone().add(n);let c=-1/0,l=1/0;for(let d=0;d<3;d++){const f=["x","y","z"][d],g=i.origin[f],_=s[f];let m=(o[f]-g)*_,p=(a[f]-g)*_;if(m>p&&([m,p]=[p,m]),c=Math.max(c,m),l=Math.min(l,p),c>l)return null}if(l<0)return null;const h=c>0?c:l,u=i.origin.clone().add(i.direction.clone().multiplyScalar(h));return{distance:h,point:u}}getCenter(){return this.group.position.clone()}dispose(){for(const[,e]of this.regions)if(e.mesh&&(e.mesh.geometry.dispose(),e.mesh.material.dispose()),e.meshes)for(const t of e.meshes)t.geometry.dispose(),t.material.dispose();this.regions.clear()}}function Ec(r,e){if(e===wh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Qr||e===Kc){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===Qr)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class e0 extends Gn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new r0(t)}),this.register(function(t){return new p0(t)}),this.register(function(t){return new m0(t)}),this.register(function(t){return new g0(t)}),this.register(function(t){return new a0(t)}),this.register(function(t){return new c0(t)}),this.register(function(t){return new l0(t)}),this.register(function(t){return new h0(t)}),this.register(function(t){return new s0(t)}),this.register(function(t){return new u0(t)}),this.register(function(t){return new o0(t)}),this.register(function(t){return new f0(t)}),this.register(function(t){return new d0(t)}),this.register(function(t){return new n0(t)}),this.register(function(t){return new _0(t)}),this.register(function(t){return new x0(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=ns.extractUrlBase(e);o=ns.resolveURL(l,this.path)}else o=ns.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){i?i(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new os(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,o,function(h){t(h),s.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Tl){try{o[qe.KHR_BINARY_GLTF]=new y0(e)}catch(u){i&&i(u);return}s=JSON.parse(o[qe.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new I0(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case qe.KHR_MATERIALS_UNLIT:o[u]=new i0;break;case qe.KHR_DRACO_MESH_COMPRESSION:o[u]=new v0(s,this.dracoLoader);break;case qe.KHR_TEXTURE_TRANSFORM:o[u]=new M0;break;case qe.KHR_MESH_QUANTIZATION:o[u]=new S0;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function t0(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class n0{constructor(e){this.parser=e,this.name=qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let l;const h=new Ee(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],pt);const u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new bl(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new oo(h),l.distance=u;break;case"spot":l=new Rg(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Nn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class i0{constructor(){this.name=qe.KHR_MATERIALS_UNLIT}getMaterialType(){return Bt}extendParams(e,t,n){const i=[];e.color=new Ee(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],pt),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,st))}return Promise.all(i)}}class s0{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class r0{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new je(a,a)}return Promise.all(s)}}class o0{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class a0{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Ee(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],pt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,st)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class c0{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class l0{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Ee().setRGB(a[0],a[1],a[2],pt),Promise.all(s)}}class h0{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class u0{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Ee().setRGB(a[0],a[1],a[2],pt),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,st)),Promise.all(s)}}class d0{constructor(e){this.parser=e,this.name=qe.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class f0{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class p0{constructor(e){this.parser=e,this.name=qe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class m0{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class g0{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class _0{constructor(e){this.name=qe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class x0{constructor(e){this.name=qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==Kt.TRIANGLES&&l.mode!==Kt.TRIANGLE_STRIP&&l.mode!==Kt.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(const g of u){const _=new We,m=new R,p=new hn,M=new R(1,1,1),x=new hg(g.geometry,g.material,d);for(let b=0;b<d;b++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,b),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,b),c.SCALE&&M.fromBufferAttribute(c.SCALE,b),x.setMatrixAt(b,_.compose(m,p,M));for(const b in c)if(b==="_COLOR_0"){const C=c[b];x.instanceColor=new so(C.array,C.itemSize,C.normalized)}else b!=="TRANSLATION"&&b!=="ROTATION"&&b!=="SCALE"&&g.geometry.setAttribute(b,c[b]);rt.prototype.copy.call(x,g),this.parser.assignFinalMaterial(x),f.push(x)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Tl="glTF",Ji=12,Tc={JSON:1313821514,BIN:5130562};class y0{constructor(e){this.name=qe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Ji),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Tl)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Ji,s=new DataView(e,Ji);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const c=s.getUint32(o,!0);if(o+=4,c===Tc.JSON){const l=new Uint8Array(e,Ji+o,a);this.content=n.decode(l)}else if(c===Tc.BIN){const l=Ji+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class v0{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const h in o){const u=co[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=co[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],f=Li[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const g in f.attributes){const _=f.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}u(f)},a,l,pt,d)})})}}class M0{constructor(){this.name=qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class S0{constructor(){this.name=qe.KHR_MESH_QUANTIZATION}}class Al extends cs{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,g=e*l,_=g-l,m=-2*f+3*d,p=f-d,M=1-m,x=p-d+u;for(let b=0;b!==a;b++){const C=o[_+b+a],T=o[_+b+c]*h,A=o[g+b+a],k=o[g+b]*h;s[b]=M*C+x*T+m*A+p*k}return s}}const b0=new hn;class w0 extends Al{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return b0.fromArray(s).normalize().toArray(s),s}}const Kt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Li={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ac={9728:vt,9729:Ft,9984:Jr,9985:Gc,9986:Vs,9987:si},Rc={33071:$t,33648:qs,10497:Di},Hr={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},co={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Dn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},E0={CUBICSPLINE:void 0,LINEAR:Ui,STEP:ss},Vr={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function T0(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new pe({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:En})),r.DefaultMaterial}function Yn(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Nn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function A0(r,e,t){let n=!1,i=!1,s=!1;for(let l=0,h=e.length;l<h;l++){const u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){const u=e[l];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;o.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;a.push(d)}if(s){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const h=l[0],u=l[1],d=l[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function R0(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function C0(r){let e;const t=r.extensions&&r.extensions[qe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Wr(t.attributes):e=r.indices+":"+Wr(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+Wr(r.targets[n]);return e}function Wr(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function lo(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function L0(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const P0=new We;class I0{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new t0,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,s=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,s=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&s<98?this.textureLoader=new Ml(this.options.manager):this.textureLoader=new Pg(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new os(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Yn(s,a,i),Nn(a,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,h]of o.children.entries())s(h,a.children[l])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[qe.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(ns.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=Hr[i.type],a=Li[i.componentType],c=i.normalized===!0,l=new a(i.count*o);return Promise.resolve(new Mt(l,o,c))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],c=Hr[i.type],l=Li[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,m;if(f&&f!==u){const p=Math.floor(d/f),M="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let x=t.cache.get(M);x||(_=new l(a,p*f,i.count*f/h),x=new sg(_,f/h),t.cache.add(M,x)),m=new vo(x,c,d%f/h,g)}else a===null?_=new l(i.count*c):_=new l(a,d,i.count*c),m=new Mt(_,c,g);if(i.sparse!==void 0){const p=Hr.SCALAR,M=Li[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,b=i.sparse.values.byteOffset||0,C=new M(o[1],x,i.sparse.count*p),T=new l(o[2],b,i.sparse.count*c);a!==null&&(m=new Mt(m.array.slice(),m.itemSize,m.normalized));for(let A=0,k=C.length;A<k;A++){const v=C[A];if(m.setX(v,T[A*c]),c>=2&&m.setY(v,T[A*c+1]),c>=3&&m.setZ(v,T[A*c+2]),c>=4&&m.setW(v,T[A*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(s.samplers||{})[o.sampler]||{};return h.magFilter=Ac[d.magFilter]||Ft,h.minFilter=Ac[d.minFilter]||si,h.wrapS=Rc[d.wrapS]||Di,h.wrapT=Rc[d.wrapT]||Di,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=i.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;const d=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new wt(_);m.needsUpdate=!0,d(m)}),t.load(ns.resolveURL(u,s.path),g,void 0,f)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),u.userData.mimeType=o.mimeType||L0(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[qe.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[qe.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=s.associations.get(o);o=s.extensions[qe.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,c)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new xl,ln.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new So,ln.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),s&&(c.vertexColors=!0),o&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return pe}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},c=s.extensions||{},l=[];if(c[qe.KHR_MATERIALS_UNLIT]){const u=i[qe.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,s,t))}else{const u=s.pbrMetallicRoughness||{};if(a.color=new Ee(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],pt),a.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,st)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=an);const h=s.alphaMode||Vr.OPAQUE;if(h===Vr.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Vr.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==Bt&&(l.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new je(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;a.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&o!==Bt&&(l.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==Bt){const u=s.emissiveFactor;a.emissive=new Ee().setRGB(u[0],u[1],u[2],pt)}return s.emissiveTexture!==void 0&&o!==Bt&&l.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,st)),Promise.all(l).then(function(){const u=new o(a);return s.name&&(u.name=s.name),Nn(u,s),t.associations.set(u,{materials:e}),s.extensions&&Yn(i,u,s),u})}createUniqueName(e){const t=$e.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Cc(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],h=C0(l),u=i[h];if(u)o.push(u.promise);else{let d;l.extensions&&l.extensions[qe.KHR_DRACO_MESH_COMPRESSION]?d=s(l):d=Cc(new kt,l,t),i[h]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const h=o[c].material===void 0?T0(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const _=h[f],m=o[f];let p;const M=l[f];if(m.mode===Kt.TRIANGLES||m.mode===Kt.TRIANGLE_STRIP||m.mode===Kt.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new og(_,M):new W(_,M),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Kt.TRIANGLE_STRIP?p.geometry=Ec(p.geometry,Kc):m.mode===Kt.TRIANGLE_FAN&&(p.geometry=Ec(p.geometry,Qr));else if(m.mode===Kt.LINES)p=new ug(_,M);else if(m.mode===Kt.LINE_STRIP)p=new ir(_,M);else if(m.mode===Kt.LINE_LOOP)p=new dg(_,M);else if(m.mode===Kt.POINTS)p=new fg(_,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&R0(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),Nn(p,s),m.extensions&&Yn(i,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return s.extensions&&Yn(i,u[0],s),u[0];const d=new bt;s.extensions&&Yn(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Dt(Kh.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new _o(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Nn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],c=[];for(let l=0,h=o.length;l<h;l++){const u=o[l];if(u){a.push(u);const d=new We;s!==null&&d.fromArray(s.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Mo(a,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],g=i.samplers[f.sampler],_=f.target,m=_.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,M=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",M)),l.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let M=0,x=d.length;M<x;M++){const b=d[M],C=f[M],T=g[M],A=_[M],k=m[M];if(b===void 0)continue;b.updateMatrix&&b.updateMatrix();const v=n._createAnimationTracks(b,C,T,A,k);if(v)for(let E=0;E<v.length;E++)p.push(v[E])}return new vg(s,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=i.weights.length;c<l;c++)a.morphTargetInfluences[c]=i.weights[c]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),c]).then(function(l){const h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,P0)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(l){return i._getNodeRef(i.cameraCache,s.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(s.isBone===!0?h=new _l:l.length>1?h=new bt:l.length===1?h=l[0]:h=new rt,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(s.name&&(h.userData.name=s.name,h.name=o),Nn(h,s),s.extensions&&Yn(n,h,s),s.matrix!==void 0){const u=new We;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new bt;n.name&&(s.name=i.createUniqueName(n.name)),Nn(s,n),n.extensions&&Yn(t,s,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(i.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)s.add(c[h]);const l=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof ln||d instanceof wt)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=l(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,c=[];Dn[s.path]===Dn.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(a);let l;switch(Dn[s.path]){case Dn.weights:l=Bi;break;case Dn.rotation:l=ci;break;case Dn.position:case Dn.scale:l=zi;break;default:switch(n.itemSize){case 1:l=Bi;break;case 2:case 3:default:l=zi;break}break}const h=i.interpolation!==void 0?E0[i.interpolation]:Ui,u=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const g=new l(c[d]+"."+Dn[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=lo(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ci?w0:Al;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function D0(r,e,t){const n=e.attributes,i=new Tn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(i.set(new R(c[0],c[1],c[2]),new R(l[0],l[1],l[2])),a.normalized){const h=lo(Li[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new R,c=new R;for(let l=0,h=s.length;l<h;l++){const u=s[l];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=lo(Li[d.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new un;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function Cc(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(c){r.setAttribute(a,c)})}for(const o in n){const a=co[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return Ye.workingColorSpace!==pt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ye.workingColorSpace}" not supported.`),Nn(r,e),D0(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?A0(r,e.targets,t):r})}const Xr=new WeakMap;class N0 extends Gn{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,i){const s=new os(this.manager);s.setPath(this.path),s.setResponseType("arraybuffer"),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,o=>{this.parse(o,t,i)},n,i)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,st).catch(n)}decodeDracoFile(e,t,n,i,s=pt,o=()=>{}){const a={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:i||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:s};return this.decodeGeometry(e,a).then(t).catch(o)}decodeGeometry(e,t){const n=JSON.stringify(t);if(Xr.has(e)){const c=Xr.get(e);if(c.key===n)return c.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let i;const s=this.workerNextTaskID++,o=e.byteLength,a=this._getWorker(s,o).then(c=>(i=c,new Promise((l,h)=>{i._callbacks[s]={resolve:l,reject:h},i.postMessage({type:"decode",id:s,taskConfig:t,buffer:e},[e])}))).then(c=>this._createGeometry(c.geometry));return a.catch(()=>!0).then(()=>{i&&s&&this._releaseTask(i,s)}),Xr.set(e,{key:n,promise:a}),a}_createGeometry(e){const t=new kt;e.index&&t.setIndex(new Mt(e.index.array,1));for(let n=0;n<e.attributes.length;n++){const i=e.attributes[n],s=i.name,o=i.array,a=i.itemSize,c=new Mt(o,a);s==="color"&&(this._assignVertexColorSpace(c,i.vertexColorSpace),c.normalized=!(o instanceof Float32Array)),t.setAttribute(s,c)}return t}_assignVertexColorSpace(e,t){if(t!==st)return;const n=new Ee;for(let i=0,s=e.count;i<s;i++)n.fromBufferAttribute(e,i).convertSRGBToLinear(),e.setXYZ(i,n.r,n.g,n.b)}_loadLibrary(e,t){const n=new os(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((i,s)=>{n.load(e,i,void 0,s)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{const i=n[0];e||(this.decoderConfig.wasmBinary=n[1]);const s=U0.toString(),o=["/* draco decoder */",i,"","/* worker */",s.substring(s.indexOf("{")+1,s.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([o]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const i=new Worker(this.workerSourceURL);i._callbacks={},i._taskCosts={},i._taskLoad=0,i.postMessage({type:"init",decoderConfig:this.decoderConfig}),i.onmessage=function(s){const o=s.data;switch(o.type){case"decode":i._callbacks[o.id].resolve(o);break;case"error":i._callbacks[o.id].reject(o);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+o.type+'"')}},this.workerPool.push(i)}else this.workerPool.sort(function(i,s){return i._taskLoad>s._taskLoad?-1:1});const n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function U0(){let r,e;onmessage=function(o){const a=o.data;switch(a.type){case"init":r=a.decoderConfig,e=new Promise(function(h){r.onModuleLoaded=function(u){h({draco:u})},DracoDecoderModule(r)});break;case"decode":const c=a.buffer,l=a.taskConfig;e.then(h=>{const u=h.draco,d=new u.Decoder;try{const f=t(u,d,new Int8Array(c),l),g=f.attributes.map(_=>_.array.buffer);f.index&&g.push(f.index.array.buffer),self.postMessage({type:"decode",id:a.id,geometry:f},g)}catch(f){console.error(f),self.postMessage({type:"error",id:a.id,error:f.message})}finally{u.destroy(d)}});break}};function t(o,a,c,l){const h=l.attributeIDs,u=l.attributeTypes;let d,f;const g=a.GetEncodedGeometryType(c);if(g===o.TRIANGULAR_MESH)d=new o.Mesh,f=a.DecodeArrayToMesh(c,c.byteLength,d);else if(g===o.POINT_CLOUD)d=new o.PointCloud,f=a.DecodeArrayToPointCloud(c,c.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!f.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+f.error_msg());const _={index:null,attributes:[]};for(const m in h){const p=self[u[m]];let M,x;if(l.useUniqueIDs)x=h[m],M=a.GetAttributeByUniqueId(d,x);else{if(x=a.GetAttributeId(d,o[h[m]]),x===-1)continue;M=a.GetAttribute(d,x)}const b=i(o,a,d,m,p,M);m==="color"&&(b.vertexColorSpace=l.vertexColorSpace),_.attributes.push(b)}return g===o.TRIANGULAR_MESH&&(_.index=n(o,a,d)),o.destroy(d),_}function n(o,a,c){const h=c.num_faces()*3,u=h*4,d=o._malloc(u);a.GetTrianglesUInt32Array(c,u,d);const f=new Uint32Array(o.HEAPF32.buffer,d,h).slice();return o._free(d),{array:f,itemSize:1}}function i(o,a,c,l,h,u){const d=u.num_components(),g=c.num_points()*d,_=g*h.BYTES_PER_ELEMENT,m=s(o,h),p=o._malloc(_);a.GetAttributeDataArrayForAllPoints(c,u,m,_,p);const M=new h(o.HEAPF32.buffer,p,g).slice();return o._free(p),{name:l,array:M,itemSize:d}}function s(o,a){switch(a){case Float32Array:return o.DT_FLOAT32;case Int8Array:return o.DT_INT8;case Int16Array:return o.DT_INT16;case Int32Array:return o.DT_INT32;case Uint8Array:return o.DT_UINT8;case Uint16Array:return o.DT_UINT16;case Uint32Array:return o.DT_UINT32}}}class O0{constructor(e){this.scene=e,this._setupLoaders(),this.models=new Map,this.sounds=new Map,this.textures=new Map,this.loadingPromises=[],this.totalAssets=0,this.loadedAssets=0,this.onProgress=null,this.onComplete=null}_setupLoaders(){this.gltfLoader=new e0;const e=new N0;e.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/"),this.gltfLoader.setDRACOLoader(e),this.textureLoader=new Ml,this.audioLoader=new Dg}loadModel(e,t){const n=new Promise((i,s)=>{this.totalAssets++,this.gltfLoader.load(t,o=>{this.models.set(e,o),this.loadedAssets++,this._reportProgress(),i(o)},void 0,o=>{console.warn(`[AssetManager] Failed to load model '${e}':`,o),this.loadedAssets++,this._reportProgress(),s(o)})});return this.loadingPromises.push(n),n}loadTexture(e,t){const n=new Promise((i,s)=>{this.totalAssets++,this.textureLoader.load(t,o=>{this.textures.set(e,o),this.loadedAssets++,this._reportProgress(),i(o)},void 0,o=>{console.warn(`[AssetManager] Failed to load texture '${e}':`,o),this.loadedAssets++,this._reportProgress(),s(o)})});return this.loadingPromises.push(n),n}loadSound(e,t){const n=new Promise((i,s)=>{this.totalAssets++,this.audioLoader.load(t,o=>{this.sounds.set(e,o),this.loadedAssets++,this._reportProgress(),i(o)},void 0,o=>{console.warn(`[AssetManager] Failed to load sound '${e}':`,o),this.loadedAssets++,this._reportProgress(),s(o)})});return this.loadingPromises.push(n),n}getModel(e){return this.models.get(e)||null}getSound(e){return this.sounds.get(e)||null}getTexture(e){return this.textures.get(e)||null}async loadAll(){this.loadingPromises.length!==0&&(await Promise.allSettled(this.loadingPromises),this.loadingPromises=[],this.onComplete&&this.onComplete())}_reportProgress(){this.onProgress&&this.onProgress(this.loadedAssets,this.totalAssets)}get progress(){return this.totalAssets===0?1:this.loadedAssets/this.totalAssets}}class Lc{constructor(e,t,n,i="player",s=null){this.position={x:e,y:t,z:n},this.type=i,this.team=s,this.occupied=!1,this.cooldown=0}isAvailable(e,t=3){if(this.occupied||this.cooldown>0)return!1;for(const n of e){const i=this.position.x-n.x,s=this.position.z-n.z;if(Math.sqrt(i*i+s*s)<t)return!1}return!0}}class F0{constructor(){this.spawnPoints=[],this.respawnDelays=new Map,this.defaultRespawnDelay=3e3,this.minSpawnDistance=3,this.checkRadius=2}loadFromMap(e){if(this.spawnPoints=[],e.spawns)for(const t of e.spawns){const n=new Lc(t.x,t.y,t.z,t.type||"player",t.team||null);this.spawnPoints.push(n)}console.log(`[SpawnManager] Loaded ${this.spawnPoints.length} spawn points`)}addSpawnPoint(e,t,n,i="player",s=null){const o=new Lc(e,t,n,i,s);return this.spawnPoints.push(o),o}getSpawn(e="player",t=null,n=[]){let i=this.spawnPoints.filter(a=>a.type===e&&(t===null||a.team===null||a.team===t)&&a.isAvailable(n,this.minSpawnDistance));if(i.length===0&&(i=this.spawnPoints.filter(a=>a.type===e&&(t===null||a.team===null||a.team===t))),i.length===0)return null;const s=Math.floor(Math.random()*i.length),o=i[s];return o.occupied=!0,o}requestRespawn(e,t=null){const n=t!==null?t:this.defaultRespawnDelay;this.respawnDelays.set(e,{remaining:n,total:n})}update(e){for(const[t,n]of this.respawnDelays)n.remaining-=e*1e3,n.remaining<=0&&(this.respawnDelays.delete(t),this._onRespawnComplete(t))}_onRespawnComplete(e){console.log(`[SpawnManager] Respawn ready for ${e}`)}onRespawnReady(e){this._onRespawnReady=e}freeSpawn(e){e.occupied=!1,e.cooldown=0}getAvailableSpawnCount(e="player",t=null){return this.spawnPoints.filter(n=>n.type===e&&(t===null||n.team===null||n.team===t)&&!n.occupied).length}}class To{static createTree(e={}){const t=new bt,n=e.trunkHeight||2.5+Math.random()*1.5,i=e.trunkRadius||.15+Math.random()*.1,s=e.canopyRadius||1+Math.random()*.8,o=e.canopyY||n+.3,a=new pe({color:e.trunkColor||4863272,roughness:.9}),c=new W(new Ot(i*.7,i,n,6),a);c.position.y=n/2,c.castShadow=!0,t.add(c);const l=new pe({color:e.canopyColor||2976557,roughness:.8}),h=new pe({color:e.canopyColorLight||3836474,roughness:.8}),u=new pe({color:e.canopyColorDark||2051871,roughness:.8});if((e.style||"roblox")==="roblox"){const f=new W(new zt(s,7,7),l);f.position.y=o,f.scale.y=.8,f.castShadow=!0,t.add(f);const g=new W(new zt(s*.7,7,7),h);g.position.set(s*.4,o+s*.3,s*.3),g.scale.y=.7,g.castShadow=!0,t.add(g);const _=new W(new zt(s*.6,7,7),u);_.position.set(-s*.35,o+s*.1,-s*.25),_.scale.y=.7,_.castShadow=!0,t.add(_);const m=new W(new zt(s*.5,7,7),h);m.position.set(s*.1,o+s*.5,-s*.4),m.scale.y=.7,m.castShadow=!0,t.add(m)}else{const f=new W(new ai(s*1.2,s*1.5,7),l);f.position.y=o+s*.3,f.castShadow=!0,t.add(f);const g=new W(new ai(s*1.5,s,7),h);g.position.y=o-s*.2,g.castShadow=!0,t.add(g)}return t}static createForest(e=[],t){const n=[];for(const i of e){const s=To.createTree(i.config||{});s.position.set(i.x||0,0,i.z||0),i.scale&&s.scale.setScalar(i.scale),i.rotation&&(s.rotation.y=i.rotation),t.add(s),s.userData.isTree=!0,n.push(s)}return n}}class qr{static house1(e={}){const t=new bt,n=e.width||12,i=e.depth||10,s=e.wallHeight||3.5,o=e.wallColor||12892568,a=e.roofColor||9127187,c=e.trimColor||15654348,l=new pe({color:o,roughness:.8}),h=new pe({color:a,roughness:.7}),u=new pe({color:c,roughness:.6}),d=new W(new te(n,.15,i),l);d.position.y=.075,d.userData.isMapObject=!0,t.add(d);const f=.15,g=s,_=new W(new te(n,g,f),l);_.position.set(0,g/2,-i/2),_.castShadow=!0,_.receiveShadow=!0,_.userData.isMapObject=!0,t.add(_);const m=new W(new te(n*.35,g,f),l);m.position.set(-n*.33,g/2,i/2),m.castShadow=!0,m.receiveShadow=!0,m.userData.isMapObject=!0,t.add(m);const p=new W(new te(n*.35,g,f),l);p.position.set(n*.33,g/2,i/2),p.castShadow=!0,p.receiveShadow=!0,p.userData.isMapObject=!0,t.add(p);const M=new W(new te(.9,g-2.1,f),l);M.position.set(0,g-(g-2.1)/2,i/2),M.castShadow=!0,M.receiveShadow=!0,M.userData.isMapObject=!0,t.add(M);const x=new W(new te(f,g,i),l);x.position.set(-n/2,g/2,0),x.castShadow=!0,x.receiveShadow=!0,x.userData.isMapObject=!0,t.add(x);const b=new W(new te(f,g,i),l);b.position.set(n/2,g/2,0),b.castShadow=!0,b.receiveShadow=!0,b.userData.isMapObject=!0,t.add(b);const C=2,T=new W(new ai(Math.sqrt(n*n+i*i)*.35,C,4),h);T.position.set(0,g+C/2,0),T.rotation.y=Math.PI/4,T.castShadow=!0,T.receiveShadow=!0,T.userData.isMapObject=!0,t.add(T);const A=u,k=new W(new te(.08,2.1,.08),A);k.position.set(-.45,1.05,i/2+.01),t.add(k);const v=new W(new te(.08,2.1,.08),A);v.position.set(.45,1.05,i/2+.01),t.add(v);const E=new W(new te(.9,.08,.08),A);return E.position.set(0,2.1,i/2+.01),t.add(E),t}static house2(e={}){const t=new bt,n=e.width||12,i=e.depth||10,s=e.floorHeight||3.5,o=e.wallColor||12101778,a=e.roofColor||6710886,c=e.trimColor||14540253,l=new pe({color:o,roughness:.8});new pe({color:a,roughness:.6});const h=new pe({color:c,roughness:.5}),u=.15,d=new W(new te(n,.15,i),l);d.position.y=.075,d.userData.isMapObject=!0,t.add(d);const f=s,g=new W(new te(n,f,u),l);g.position.set(0,f/2,-i/2),g.castShadow=!0,g.receiveShadow=!0,g.userData.isMapObject=!0,t.add(g);const _=new W(new te(n*.35,f,u),l);_.position.set(-n*.33,f/2,i/2),_.castShadow=!0,_.receiveShadow=!0,_.userData.isMapObject=!0,t.add(_);const m=new W(new te(n*.35,f,u),l);m.position.set(n*.33,f/2,i/2),m.castShadow=!0,m.receiveShadow=!0,m.userData.isMapObject=!0,t.add(m);const p=new W(new te(.9,f-2.1,u),l);p.position.set(0,f-(f-2.1)/2,i/2),p.castShadow=!0,p.receiveShadow=!0,p.userData.isMapObject=!0,t.add(p);const M=new W(new te(u,f,i),l);M.position.set(-n/2,f/2,0),M.castShadow=!0,M.receiveShadow=!0,M.userData.isMapObject=!0,t.add(M);const x=new W(new te(u,f,i),l);x.position.set(n/2,f/2,0),x.castShadow=!0,x.receiveShadow=!0,x.userData.isMapObject=!0,t.add(x);const b=new W(new te(n,.15,i),l);b.position.set(0,f,0),b.userData.isMapObject=!0,t.add(b);const C=s,T=f+C/2,A=new W(new te(n,C,u),l);A.position.set(0,T,-i/2),A.castShadow=!0,A.receiveShadow=!0,A.userData.isMapObject=!0,t.add(A);const k=new W(new te(n*.3,C,u),l);k.position.set(-n*.35,T,i/2),k.castShadow=!0,k.receiveShadow=!0,k.userData.isMapObject=!0,t.add(k);const v=new W(new te(n*.3,C,u),l);v.position.set(n*.35,T,i/2),v.castShadow=!0,v.receiveShadow=!0,v.userData.isMapObject=!0,t.add(v);const E=new W(new te(1.6,C-2.1,u),l);E.position.set(0,T-(C-2.1)/2+f,i/2),E.castShadow=!0,E.receiveShadow=!0,E.userData.isMapObject=!0,t.add(E);const z=new W(new te(u,C,i),l);z.position.set(-n/2,T,0),z.castShadow=!0,z.receiveShadow=!0,z.userData.isMapObject=!0,t.add(z);const H=new W(new te(u,C,i),l);H.position.set(n/2,T,0),H.castShadow=!0,H.receiveShadow=!0,H.userData.isMapObject=!0,t.add(H);const J=new W(new te(n,.15,i),l);J.position.set(0,f+C,0),J.userData.isMapObject=!0,t.add(J);const P=new pe({color:8947848,metalness:.3,roughness:.6}),N=f+C+.1,G=6,Y=n/(G-1);for(let he=0;he<G;he++){const Le=-n/2+he*Y,D=new W(new te(.06,.6,.06),P);D.position.set(Le,N+.3,i/2),t.add(D);const ut=new W(new te(.06,.6,.06),P);ut.position.set(Le,N+.3,-i/2),t.add(ut)}for(let he=0;he<G;he++){const Le=-i/2+he*(i/(G-1)),D=new W(new te(.06,.6,.06),P);D.position.set(-n/2,N+.3,Le),t.add(D);const ut=new W(new te(.06,.6,.06),P);ut.position.set(n/2,N+.3,Le),t.add(ut)}const X=new pe({color:10066329,metalness:.3,roughness:.5});for(const he of[{x:0,z:i/2+.05,sx:n+.1,sz:.04},{x:0,z:-i/2-.05,sx:n+.1,sz:.04},{x:-n/2-.05,z:0,sx:.04,sz:i+.1},{x:n/2+.05,z:0,sx:.04,sz:i+.1}]){const Le=new W(new te(he.sx,.04,he.sz),X);Le.position.set(he.x,N+.15,he.z),t.add(Le);const D=new W(new te(he.sx,.04,he.sz),X);D.position.set(he.x,N+.45,he.z),t.add(D)}const q=new pe({color:9075306,roughness:.8}),j=f+C,ne=.5,ie=new W(new te(.04,j,.04),q);ie.position.set(-ne/2,f/2,-i/2-.3),t.add(ie);const V=new W(new te(.04,j,.04),q);V.position.set(ne/2,f/2,-i/2-.3),t.add(V);const K=q,ce=10;for(let he=0;he<ce;he++){const Le=(he+.5)*(j/ce),D=new W(new te(ne-.05,.04,.04),K);D.position.set(0,Le,-i/2-.3),t.add(D)}const me=h,ge=new W(new te(.08,2.1,.08),me);ge.position.set(-.45,1.05,i/2+.01),t.add(ge);const Ce=new W(new te(.08,2.1,.08),me);Ce.position.set(.45,1.05,i/2+.01),t.add(Ce);const Pe=new W(new te(.9,.08,.08),me);return Pe.position.set(0,2.1,i/2+.01),t.add(Pe),t}static house3(e={}){const t=new bt,n=e.width||10,i=e.depth||9,s=e.floorHeight||3.5,o=e.wallColor||11182240,a=e.roofColor||5592405,c=new pe({color:o,roughness:.8}),l=new pe({color:a,roughness:.6}),h=.15,u=3;for(let f=0;f<u;f++){const g=f*s,_=new W(new te(n,.15,i),c);_.position.set(0,g+.075,0),_.userData.isMapObject=!0,t.add(_);const m=s,p=g+m/2,M=new W(new te(n,m,h),c);if(M.position.set(0,p,-i/2),M.castShadow=!0,M.receiveShadow=!0,M.userData.isMapObject=!0,t.add(M),f===0){const C=new W(new te(n*.35,m,h),c);C.position.set(-n*.33,p,i/2),C.castShadow=!0,C.receiveShadow=!0,C.userData.isMapObject=!0,t.add(C);const T=new W(new te(n*.35,m,h),c);T.position.set(n*.33,p,i/2),T.castShadow=!0,T.receiveShadow=!0,T.userData.isMapObject=!0,t.add(T);const A=new W(new te(.9,m-2.1,h),c);A.position.set(0,p-(m-2.1)/2,i/2),A.castShadow=!0,A.receiveShadow=!0,A.userData.isMapObject=!0,t.add(A)}else{const C=new W(new te(n,m,h),c);C.position.set(0,p,i/2),C.castShadow=!0,C.receiveShadow=!0,C.userData.isMapObject=!0,t.add(C)}const x=new W(new te(h,m,i),c);x.position.set(-n/2,p,0),x.castShadow=!0,x.receiveShadow=!0,x.userData.isMapObject=!0,t.add(x);const b=new W(new te(h,m,i),c);b.position.set(n/2,p,0),b.castShadow=!0,b.receiveShadow=!0,b.userData.isMapObject=!0,t.add(b)}const d=new W(new te(n,.15,i),l);return d.position.set(0,u*s,0),d.userData.isMapObject=!0,t.add(d),t}}class B0{constructor(e){this.scene=e,this.currentMap=null,this.maps=new Map,this.objects=[],this.loadingProgress=0}registerMap(e,t){this.maps.set(e,t)}async loadMap(e){this.currentMap&&this.unloadMap();const t=this.maps.get(e);return t?(console.log(`[MapManager] Loading map: ${e}`),this.currentMap=e,this.loadingProgress=0,await this._buildEnvironment(t),this.loadingProgress=1,console.log(`[MapManager] Map '${e}' loaded`),!0):(console.error(`[MapManager] Map '${e}' not found`),!1)}async _buildEnvironment(e){if(this.objects=[],e.ground&&this._createGround(e.ground),e.walls)for(const t of e.walls)this._createWall(t);if(e.objects)for(const t of e.objects)t.type==="tree"?this._createTree(t):this._createObject(t);if(e.trees)for(const t of e.trees)this._createTree(t);if(e.buildings)for(const t of e.buildings)this._createBuilding(t);e.lighting&&this._setupLighting(e.lighting),e.skybox&&this._createSkybox(e.skybox),e.bounds&&this._createBounds(e.bounds),e.mountains!==!1&&this._createMountains(e.bounds||{}),e.spawns&&(this.spawns=e.spawns)}_createGround(e){const t=e.size||200,n=e.color||3815994,i=e.y||0,s=new tr(t,t),o=new pe({color:n,roughness:.8,metalness:.1}),a=new W(s,o);a.rotation.x=-Math.PI/2,a.position.y=i,a.receiveShadow=!0,this.scene.add(a),this.objects.push(a)}_createWall(e){const t=new te(e.width,e.height,e.depth),n=new pe({color:e.color||5592405,roughness:.7,metalness:.2}),i=new W(t,n);i.position.set(e.x||0,(e.height||4)/2,e.z||0),e.rotation&&(i.rotation.y=e.rotation),i.castShadow=!0,i.receiveShadow=!0,i.userData.isWall=!0,this.scene.add(i),this.objects.push(i)}_createObject(e){const t=this._createGeometry(e);if(!t)return;const n=new pe({color:e.color||8947848,roughness:e.roughness||.6,metalness:e.metalness||.3}),i=new W(t,n);i.position.set(e.x||0,e.y||0,e.z||0),e.scale&&i.scale.set(e.scale,e.scale,e.scale),e.rotation&&i.rotation.set(e.rotation.x||0,e.rotation.y||0,e.rotation.z||0),i.castShadow=!0,i.receiveShadow=!0,i.userData.isMapObject=!0,this.scene.add(i),this.objects.push(i)}_createTree(e){const t=To.createTree(e);t.position.set(e.x||0,0,e.z||0),e.scale&&t.scale.setScalar(e.scale),e.rotation&&(t.rotation.y=e.rotation),t.userData.isTree=!0,this.scene.add(t),this.objects.push(t)}_createBuilding(e){const n={house1:qr.house1,house2:qr.house2,house3:qr.house3}[e.type];if(!n){console.warn(`[MapManager] Unknown building type: ${e.type}`);return}const i=n(e.options||{});i.position.set(e.x||0,0,e.z||0),e.rotation&&(i.rotation.y=e.rotation),i.userData.isBuilding=!0,this.scene.add(i),this.objects.push(i)}_createGeometry(e){switch(e.type){case"box":return new te(e.width||1,e.height||1,e.depth||1);case"sphere":return new zt(e.radius||.5,16,16);case"cylinder":return new Ot(e.radius||.5,e.radius||.5,e.height||1,16);case"ramp":return new Ot(0,e.radius||.5,e.height||1,4);default:return null}}_setupLighting(e){if(e.ambient){const t=new wl(e.ambient.color||4210784,e.ambient.intensity||.4);this.scene.add(t),this.objects.push(t)}if(e.directional){const t=new bl(e.directional.color||16777215,e.directional.intensity||.8);t.position.set(e.directional.x||50,e.directional.y||100,e.directional.z||50),t.castShadow=!0,t.shadow.mapSize.width=2048,t.shadow.mapSize.height=2048,t.shadow.camera.near=.5,t.shadow.camera.far=200,t.shadow.camera.left=-100,t.shadow.camera.right=100,t.shadow.camera.top=100,t.shadow.camera.bottom=-100,this.scene.add(t),this.objects.push(t)}if(e.hemisphere){const t=new Sl(e.hemisphere.skyColor||8900331,e.hemisphere.groundColor||3550498,e.hemisphere.intensity||.3);this.scene.add(t),this.objects.push(t)}}_createSkybox(e){const t=e.color||8900331;this.scene.background=new Ee(t),this.scene.fog=new yo(t,e.fogNear||50,e.fogFar||200);const n=new Bt({color:16772744}),i=new W(new zt(6,12,12),n);i.position.set(80,120,-100),i.userData.isSkyObject=!0,this.scene.add(i),this.objects.push(i);const s=new Bt({color:16775372,transparent:!0,opacity:.15,side:Nt}),o=new W(new zt(18,16,16),s);o.position.copy(i.position),o.userData.isSkyObject=!0,this.scene.add(o),this.objects.push(o);const a=new pe({color:16777215,transparent:!0,opacity:.6,roughness:1,metalness:0}),c=[{x:-60,y:45,z:-70,s:1.2},{x:-30,y:50,z:-85,s:1},{x:20,y:42,z:-90,s:1.4},{x:70,y:48,z:-75,s:.9},{x:-80,y:44,z:-40,s:1.1},{x:90,y:46,z:-30,s:1},{x:-70,y:50,z:60,s:1.3},{x:60,y:43,z:80,s:1.1},{x:-20,y:47,z:90,s:.8},{x:40,y:52,z:85,s:1}];for(const l of c){const h=new bt,u=3+Math.floor(Math.random()*3);for(let d=0;d<u;d++){const f=new W(new zt(3+Math.random()*5,6,6),a);f.scale.y=.4,f.position.set((Math.random()-.5)*10*l.s,(Math.random()-.5)*2,(Math.random()-.5)*6*l.s),h.add(f)}h.position.set(l.x,l.y,l.z),h.scale.setScalar(l.s),h.userData.isSkyObject=!0,this.scene.add(h),this.objects.push(h)}}_createBounds(e){const t=e.size||200,n=e.height||12,i=2,s=[{x:0,z:-t/2,w:t+i*2,d:i},{x:0,z:t/2,w:t+i*2,d:i},{x:-t/2,z:0,w:i,d:t},{x:t/2,z:0,w:i,d:t}];for(const a of s){const c=new te(a.w,n,a.d),l=new pe({color:4473924,transparent:!0,opacity:.25,roughness:.9,metalness:.1}),h=new W(c,l);h.position.set(a.x,n/2,a.z),h.userData.isBoundary=!0,h.userData.isWall=!0,this.scene.add(h),this.objects.push(h)}const o=new pe({color:4473924,transparent:!0,opacity:.15,roughness:.9,visible:!1});for(const a of s){const c=new W(new te(a.w,.5,a.d),o);c.position.set(a.x,n+.25,a.z),c.userData.isBoundary=!0,c.userData.isWall=!0,c.userData.isBoundaryCap=!0,this.scene.add(c),this.objects.push(c)}}_createMountains(e){const t=e.size||240,n=new pe({color:3817552,roughness:.9,metalness:0,flatShading:!0}),i=new pe({color:13158608,roughness:.8,metalness:0,flatShading:!0}),s=t/2+8,o=[{x:-40,z:-s-15,h:35,r:50},{x:0,z:-s-20,h:55,r:60},{x:40,z:-s-15,h:30,r:45},{x:80,z:-s-10,h:25,r:40},{x:-80,z:-s-10,h:25,r:40},{x:-40,z:s+15,h:30,r:50},{x:0,z:s+20,h:50,r:55},{x:40,z:s+15,h:35,r:45},{x:80,z:s+10,h:22,r:40},{x:-80,z:s+10,h:22,r:40},{x:-s-15,z:-40,h:35,r:50},{x:-s-20,z:0,h:55,r:60},{x:-s-15,z:40,h:30,r:45},{x:-s-10,z:80,h:22,r:40},{x:-s-10,z:-80,h:22,r:40},{x:s+15,z:-40,h:30,r:50},{x:s+20,z:0,h:50,r:55},{x:s+15,z:40,h:35,r:45},{x:s+10,z:80,h:22,r:40},{x:s+10,z:-80,h:22,r:40}];for(const a of o){const c=4+Math.floor(Math.random()*3),l=new ai(a.r,a.h,c),h=new W(l,n);if(h.position.set(a.x,0,a.z),h.rotation.y=Math.random()*Math.PI*2,h.scale.x=.7+Math.random()*.6,h.scale.z=.7+Math.random()*.6,h.castShadow=!1,h.receiveShadow=!1,h.userData.isMountain=!0,this.scene.add(h),this.objects.push(h),a.h>35){const u=new ai(a.r*.25,a.h*.3,c),d=new W(u,i);d.position.set(a.x,a.h*.6,a.z),d.scale.x=h.scale.x,d.scale.z=h.scale.z,d.userData.isMountain=!0,this.scene.add(d),this.objects.push(d)}}}unloadMap(){for(const e of this.objects)this.scene.remove(e),e.isGroup?e.traverse(t=>{t.isMesh&&(t.geometry.dispose(),t.material.dispose())}):(e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose());this.objects=[],this.scene.background=null,this.scene.fog=null,this.currentMap=null,this.spawns=[],console.log("[MapManager] Map unloaded")}getMapData(){return this.maps.get(this.currentMap)}getSpawnData(){return this.spawns||[]}getCurrentMapId(){return this.currentMap}}const z0=Object.freeze({WEAPON:"effectsVolume",HIT:"effectsVolume",FOOTSTEP:"effectsVolume",RELOAD:"effectsVolume",UI:"effectsVolume",ENVIRONMENT:"effectsVolume",MUSIC:"musicVolume",VOICE:"voiceVolume"});class Pc{constructor(e,t=1,n=1){this.buffer=e,this.volume=t,this.pitch=n}}class k0{constructor(e){this.settings=e,this.context=null,this.masterGain=null,this.categoryGains=new Map,this.clips=new Map,this.activeSources=new Set,this.listener=null,this.initialized=!1,this.muted=!1}async init(){if(!this.initialized)try{this.context=new(window.AudioContext||window.webkitAudioContext),this.masterGain=this.context.createGain(),this.masterGain.connect(this.context.destination),this.masterGain.gain.value=this.settings.get("audio","masterVolume");for(const[e,t]of Object.entries(z0)){const n=this.context.createGain();n.connect(this.masterGain),n.gain.value=this.settings.get("audio",t),this.categoryGains.set(e,n)}this.listener=this.context.listener,this.generateDefaultSounds(),this.initialized=!0,console.log("[AudioManager] Initialized")}catch(e){console.warn("[AudioManager] Failed to initialize:",e)}}async loadClip(e,t,n=1,i=1){if(this.initialized)try{const o=await(await fetch(t)).arrayBuffer(),a=await this.context.decodeAudioData(o),c=new Pc(a,n,i);this.clips.set(e,c)}catch(s){console.warn(`[AudioManager] Failed to load clip '${e}':`,s)}}registerClip(e,t,n=1,i=1){const s=new Pc(t,n,i);this.clips.set(e,s)}play(e,t="WEAPON",n={}){if(!this.initialized||this.muted)return null;const i=this.clips.get(e);if(!i)return console.warn(`[AudioManager] Clip '${e}' not found`),null;try{const s=this.context.createBufferSource();s.buffer=i.buffer;const o=this.context.createGain();o.gain.value=n.volume??i.volume;const a=this.context.createPanner();a.panningModel="HRTF",a.distanceModel="inverse",a.refDistance=10,a.maxDistance=100,a.rolloffFactor=1,n.position?(a.positionX.value=n.position.x,a.positionY.value=n.position.y,a.positionZ.value=n.position.z,s.connect(a),a.connect(o)):s.connect(o);const c=this.categoryGains.get(t);return c?o.connect(c):o.connect(this.masterGain),s.playbackRate.value=n.pitch??i.pitch,s.loop=n.loop??!1,s.start(0),this.activeSources.add(s),s.onended=()=>{this.activeSources.delete(s)},s}catch(s){return console.warn(`[AudioManager] Playback failed for '${e}':`,s),null}}playAtPosition(e,t,n="WEAPON",i={}){return this.play(e,n,{...i,position:t})}stop(e){try{e.stop(),this.activeSources.delete(e)}catch{}}stopAll(){for(const e of this.activeSources)try{e.stop()}catch{}this.activeSources.clear()}setMasterVolume(e){this.masterGain&&(this.masterGain.gain.value=e)}setCategoryVolume(e,t){const n=this.categoryGains.get(e);n&&(n.gain.value=t)}updateListenerPosition(e,t){this.listener&&e&&(this.listener.positionX.value=e.x,this.listener.positionY.value=e.y,this.listener.positionZ.value=e.z)}mute(){this.muted=!0}unmute(){this.muted=!1}toggleMute(){this.muted=!this.muted}resume(){this.context&&this.context.state==="suspended"&&this.context.resume()}_generateNoise(e,t=10){const n=this.context.sampleRate,i=Math.floor(n*e),s=this.context.createBuffer(1,i,n),o=s.getChannelData(0);for(let a=0;a<i;a++){const c=a/n,l=Math.exp(-c*t);o[a]=(Math.random()*2-1)*l}return s}_generateTone(e,t,n="sine"){const i=this.context.sampleRate,s=Math.floor(i*t),o=this.context.createBuffer(1,s,i),a=o.getChannelData(0);for(let c=0;c<s;c++){const l=c/i,h=Math.exp(-l*5);let u=0;n==="sine"?u=Math.sin(2*Math.PI*e*l):n==="square"?u=Math.sin(2*Math.PI*e*l)>0?1:-1:n==="sawtooth"&&(u=2*(e*l%1)-1),a[c]=u*h}return o}generateDefaultSounds(){if(!this.initialized)return;const e=this._generateNoise(.1,30);this.registerClip("gunshot_rifle",e,.4,1),this.registerClip("gunshot_pistol",e,.3,1.5),this.registerClip("gunshot_smg",e,.25,1.2),this.registerClip("gunshot_shotgun",e,.6,.8);const t=this._generateTone(80,.08,"square");this.registerClip("footstep",t,.2,1);const n=this._generateNoise(.05,40);this.registerClip("hit",n,.5,1),this.registerClip("hit_leg",n,.3,.7);const i=this._generateNoise(.3,8);this.registerClip("reload",i,.25,1)}dispose(){this.stopAll(),this.context&&this.context.close(),this.clips.clear(),this.initialized=!1}}const Kn=Object.freeze({IDLE:"idle",SHOOT:"shoot",RELOAD:"reload",SWITCH:"switch",AIM:"aim"}),$n=Object.freeze({IDLE:"idle",WALK:"walk",RUN:"run",JUMP:"jump",CROUCH:"crouch",CROUCH_WALK:"crouch_walk",DEATH:"death"});class Yt{constructor(e,t,n=[]){this.name=e,this.duration=t,this.keyframes=n,this.loop=!1}}class G0{constructor(){this.weaponClips=new Map,this.playerClips=new Map,this.activeWeaponAnim=null,this.activePlayerAnim=null,this.animTime=0,this.blendFactor=0,this.transitioning=!1,this.transitionTime=0,this.transitionDuration=.15,this.callbacks=new Map,this._initDefaultClips()}_initDefaultClips(){const e=[new Yt(Kn.IDLE,0),new Yt(Kn.SHOOT,.1),new Yt(Kn.RELOAD,2),new Yt(Kn.SWITCH,.4),new Yt(Kn.AIM,.2)];for(const n of e)this.weaponClips.set(n.name,n);const t=[new Yt($n.IDLE,0),new Yt($n.WALK,.5),new Yt($n.RUN,.35),new Yt($n.JUMP,.6),new Yt($n.CROUCH,.3),new Yt($n.CROUCH_WALK,.6),new Yt($n.DEATH,1.5)];for(const n of t)this.playerClips.set(n.name,n)}playWeapon(e,t=null){this.weaponClips.get(e)&&(this.activeWeaponAnim&&(this.transitioning=!0,this.transitionTime=0,this.transitionDuration=.1),this.activeWeaponAnim=e,this.animTime=0,t&&this.callbacks.set(`weapon_${e}`,t),console.log(`[AnimationManager] Weapon: ${e}`))}playPlayer(e,t=null){this.playerClips.get(e)&&(this.activePlayerAnim&&(this.transitioning=!0,this.transitionTime=0,this.transitionDuration=.15),this.activePlayerAnim=e,this.animTime=0,t&&this.callbacks.set(`player_${e}`,t))}update(e){const t=this.weaponClips.get(this.activeWeaponAnim);this.playerClips.get(this.activePlayerAnim),t&&t.duration>0&&(this.animTime+=e,this.animTime>=t.duration&&(t.loop?this.animTime=this.animTime%t.duration:(this.animTime=t.duration,this._triggerCallback(`weapon_${this.activeWeaponAnim}`),this.activeWeaponAnim!==Kn.IDLE&&this.playWeapon(Kn.IDLE)))),this.transitioning?(this.transitionTime+=e,this.blendFactor=Math.min(1,this.transitionTime/this.transitionDuration),this.blendFactor>=1&&(this.transitioning=!1,this.blendFactor=1)):this.blendFactor=1}_triggerCallback(e){const t=this.callbacks.get(e);t&&(t(),this.callbacks.delete(e))}getWeaponState(){return this.activeWeaponAnim}getPlayerState(){return this.activePlayerAnim}getWeaponAnimationData(){const e=this.weaponClips.get(this.activeWeaponAnim);return e?{state:this.activeWeaponAnim,progress:e.duration>0?this.animTime/e.duration:1,blendFactor:this.blendFactor}:null}reset(){this.activeWeaponAnim=null,this.activePlayerAnim=null,this.animTime=0,this.blendFactor=0,this.transitioning=!1,this.callbacks.clear()}}class H0{constructor(e,t,n=0){this.factory=e,this.reset=t,this.pool=[],this.active=new Set;for(let i=0;i<n;i++){const s=this.factory();this.pool.push(s)}}acquire(){let e;return this.pool.length>0?e=this.pool.pop():e=this.factory(),this.active.add(e),e}release(e){this.active.delete(e)&&(this.reset(e),this.pool.push(e))}releaseAll(){for(const e of this.active)this.reset(e),this.pool.push(e);this.active.clear()}get activeCount(){return this.active.size}get pooledCount(){return this.pool.length}get totalCount(){return this.active.size+this.pool.length}forEachActive(e){for(const t of this.active)e(t)}disposeAll(e){this.releaseAll();for(const t of this.pool)e(t);this.pool=[]}}const V0=500,W0=2,Rl=300;class X0{constructor(){this.velocity=new R,this.position=new R,this.lifetime=0,this.alive=!1,this.owner=null,this.damage=0,this.tracer=null,this._trailDir=new R}init(e,t,n=Rl,i=20,s=null){this.position.copy(e),this.velocity.copy(t).multiplyScalar(n),this.lifetime=W0,this.alive=!0,this.owner=s,this.damage=i,this.tracer&&(this.tracer.position.copy(e),this._trailDir.copy(t),this.tracer.quaternion.setFromUnitVectors(new R(0,0,1),t),this.tracer.visible=!0)}update(e){if(!this.alive)return!1;const t=Math.min(e,.05);return this.position.x+=this.velocity.x*t,this.position.y+=this.velocity.y*t,this.position.z+=this.velocity.z*t,this.lifetime-=t,this.lifetime<=0?(this.alive=!1,this.tracer&&(this.tracer.visible=!1),!1):(this.tracer&&this.tracer.position.copy(this.position),!0)}reset(){this.alive=!1,this.lifetime=0,this.owner=null,this.damage=0,this.tracer&&(this.tracer.visible=!1)}dispose(){this.tracer&&(this.tracer.geometry.dispose(),this.tracer.material.dispose())}}class q0{constructor(e){this.scene=e,this.pool=new H0(()=>this._createBullet(),t=>t.reset(),100),this.raycaster=new Js,this.hitCallback=null}_createBullet(){const e=new X0,t=new kt,n=new Float32Array([0,0,0,0,0,-1.2]);t.setAttribute("position",new Mt(n,3));const i=new So({color:4521932,transparent:!0,opacity:.9});return e.tracer=new ir(t,i),e.tracer.visible=!1,this.scene.add(e.tracer),e}fire(e,t,n=20,i=Rl,s=null){if(this.pool.activeCount>=V0)return null;const o=this.pool.acquire();return o.init(e,t,i,n,s),o}update(e,t=[]){const n=[];this.pool.forEachActive(i=>{var c;const s=i.position.clone();if(!i.update(e)){n.push(i);return}const o=i.position.clone().sub(s),a=o.length();if(a>.001&&t.length>0){this.raycaster.set(s,o.normalize()),this.raycaster.far=a;const l=this.raycaster.intersectObjects(t,!0);if(l.length>0){const h=l[0];i.alive=!1,i.tracer.visible=!1,n.push(i),this.hitCallback&&this.hitCallback({point:h.point,normal:((c=h.face)==null?void 0:c.normal)||new R(0,1,0),object:h.object,bullet:i,distance:h.distance})}}});for(const i of n)this.pool.release(i)}forEachActive(e){this.pool.forEachActive(e)}testBulletHitboxes(e,t,n){const i=e.position.clone(),s=e.velocity.clone().normalize(),o=e.velocity.length()*.05;this.raycaster.set(i,s),this.raycaster.far=Math.max(o,1);for(const a of t){const c=a.testRay(this.raycaster);if(c)return n({hitbox:a,region:c.region,multiplier:c.multiplier,distance:c.distance,point:c.point,bullet:e}),!0}return!1}onHit(e){this.hitCallback=e}clear(){this.pool.releaseAll()}get activeCount(){return this.pool.activeCount}dispose(){this.pool.disposeAll(e=>e.dispose())}}const vn=Object.freeze({WAITING:"waiting",COUNTDOWN:"countdown",IN_PROGRESS:"in_progress",PAUSED:"paused",ENDED:"ended"}),jr=Object.freeze({SCORE_LIMIT:"score_limit",TIME_LIMIT:"time_limit",LAST_MAN_STANDING:"last_man_standing",CAPTURE_FLAG:"capture_flag"});class j0{constructor(){this.state=vn.WAITING,this.config={type:"deathmatch",winCondition:jr.SCORE_LIMIT,scoreLimit:50,timeLimit:600,teamMode:!1,teams:["red","blue"],maxPlayers:16,respawnTime:3,countdownTime:5},this.teamScores=new Map,this.playerStats=new Map,this.matchTime=0,this.countdown=0,this.started=!1,this.listeners=new Map}configure(e){Object.assign(this.config,e)}start(){if(this.state===vn.WAITING){if(this.countdown=this.config.countdownTime,this.state=vn.COUNTDOWN,this.matchTime=0,this.teamScores.clear(),this.config.teamMode)for(const e of this.config.teams)this.teamScores.set(e,0);console.log(`[MatchManager] Countdown started: ${this.countdown}s`),this._emit("countdown",{time:this.countdown})}}update(e){const t=Math.min(e,.05);switch(this.state){case vn.COUNTDOWN:this.countdown-=t,this.countdown<=0&&(this.countdown=0,this.state=vn.IN_PROGRESS,this.started=!0,console.log("[MatchManager] Match started!"),this._emit("start"));break;case vn.IN_PROGRESS:this.matchTime+=t,this._checkWinCondition();break}}_checkWinCondition(){const{winCondition:e,scoreLimit:t,timeLimit:n}=this.config;if(e===jr.SCORE_LIMIT){if(this.config.teamMode){for(const[i,s]of this.teamScores)if(s>=t){this.end({winner:i,reason:"Score limit reached"});return}}else for(const[,i]of this.playerStats)if(i.score>=t){this.end({winner:i.id,reason:"Score limit reached"});return}}e===jr.TIME_LIMIT&&this.matchTime>=n&&this.end({winner:this._getHighestScorer(),reason:"Time limit reached"})}_getHighestScorer(){let e=null,t=-1;for(const[n,i]of this.playerStats)i.score>t&&(t=i.score,e=n);return e}registerPlayer(e,t,n=null){this.playerStats.set(e,{id:e,name:t,team:n,score:0,kills:0,deaths:0,assists:0,damage:0,streak:0})}removePlayer(e){this.playerStats.delete(e)}registerKill(e,t,n="unknown"){const i=this.playerStats.get(e),s=this.playerStats.get(t);if(!(!i||!s)){if(i.kills++,i.score+=100,i.streak++,s.deaths++,s.streak=0,this.config.teamMode&&i.team){const o=this.teamScores.get(i.team)||0;this.teamScores.set(i.team,o+1)}console.log(`[MatchManager] ${i.name} killed ${s.name}`),this._emit("kill",{killer:e,killerName:i.name,victim:t,victimName:s.name,weapon:n})}}registerDamage(e,t,n){const i=this.playerStats.get(e);i&&(i.damage+=n)}end(e={}){this.state=vn.ENDED,this.started=!1,console.log(`[MatchManager] Match ended. Winner: ${e.winner}`),this._emit("end",{winner:e.winner,reason:e.reason,stats:this.getMatchStats(),teamScores:this.config.teamMode?Object.fromEntries(this.teamScores):null,duration:this.matchTime})}getMatchStats(){const e=Array.from(this.playerStats.values());return e.sort((t,n)=>n.score-t.score),{players:e,teamScores:this.config.teamMode?Object.fromEntries(this.teamScores):null,duration:this.matchTime}}getTeamScore(e){return this.teamScores.get(e)||0}getPlayerStats(e){return this.playerStats.get(e)||null}getTimeRemaining(){return this.state!==vn.IN_PROGRESS?0:Math.max(0,this.config.timeLimit-this.matchTime)}getFormattedTime(){const e=Math.ceil(this.getTimeRemaining()),t=Math.floor(e/60),n=e%60;return`${t}:${n.toString().padStart(2,"0")}`}on(e,t){return this.listeners.has(e)||this.listeners.set(e,[]),this.listeners.get(e).push(t),()=>{const n=this.listeners.get(e);if(n){const i=n.indexOf(t);i!==-1&&n.splice(i,1)}}}_emit(e,t=null){const n=this.listeners.get(e);if(n)for(const i of n)i(t)}reset(){this.state=vn.WAITING,this.matchTime=0,this.countdown=0,this.started=!1,this.playerStats.clear(),this.teamScores.clear()}}const Sn=Object.freeze({PISTOL:"Pistol",RIFLE:"Rifle",SMG:"SMG",SHOTGUN:"Shotgun",SNIPER:"Sniper"}),Y0={[Sn.PISTOL]:{name:"Pistol",damage:15,fireRate:.25,magSize:12,reserve:48,reloadTime:1.2,spread:.05,recoil:.02,range:50,automatic:!1},[Sn.RIFLE]:{name:"Rifle",damage:25,fireRate:.1,magSize:30,reserve:90,reloadTime:2,spread:.02,recoil:.04,range:100,automatic:!0},[Sn.SMG]:{name:"SMG",damage:12,fireRate:.07,magSize:35,reserve:105,reloadTime:1.8,spread:.06,recoil:.03,range:60,automatic:!0},[Sn.SHOTGUN]:{name:"Shotgun",damage:10,pellets:8,fireRate:.8,magSize:8,reserve:32,reloadTime:2.5,spread:.15,recoil:.1,range:30,automatic:!1},[Sn.SNIPER]:{name:"Sniper",damage:80,fireRate:1.2,magSize:5,reserve:20,reloadTime:3,spread:.001,recoil:.15,range:200,automatic:!1}};class K0{constructor(e){const t=Y0[e];if(!t)throw new Error(`Unknown weapon type: ${e}`);this.type=e,this.name=t.name,this.damage=t.damage,this.fireRate=t.fireRate,this.magSize=t.magSize,this.maxReserve=t.reserve,this.reloadTime=t.reloadTime,this.spread=t.spread,this.recoil=t.recoil,this.range=t.range,this.automatic=t.automatic,this.pellets=t.pellets||1,this.currentAmmo=t.magSize,this.reserveAmmo=t.reserve,this.lastFireTime=0,this.reloading=!1,this.reloadProgress=0}canFire(e){return this.reloading||this.currentAmmo<=0?!1:e-this.lastFireTime>=this.fireRate}fire(e){if(!this.canFire(e))return null;this.lastFireTime=e,this.currentAmmo--;const t=[];for(let n=0;n<this.pellets;n++)t.push({spreadX:(Math.random()-.5)*this.spread,spreadY:(Math.random()-.5)*this.spread,damage:this.damage});return this.currentAmmo<=0&&this.reserveAmmo>0&&this.startReload(),{shots:t,recoil:this.recoil}}startReload(){this.reloading||this.currentAmmo>=this.magSize||this.reserveAmmo<=0||(this.reloading=!0,this.reloadProgress=0)}updateReload(e){if(this.reloading){if(this.reloadProgress+=e,this.reloadProgress>=this.reloadTime){const t=this.magSize-this.currentAmmo,n=Math.min(t,this.reserveAmmo);return this.currentAmmo+=n,this.reserveAmmo-=n,this.reloading=!1,this.reloadProgress=0,!0}return!1}}addAmmo(e){this.reserveAmmo=Math.min(this.maxReserve,this.reserveAmmo+e)}getState(){return{type:this.type,name:this.name,currentAmmo:this.currentAmmo,reserveAmmo:this.reserveAmmo,reloading:this.reloading,reloadProgress:this.reloadProgress}}}class $0{constructor(){this.weapons=[],this.currentIndex=0,this.lastFireTime=0,this.onWeaponSwitch=null}addWeapon(e){const t=new K0(e);return this.weapons.push(t),t}removeWeapon(e){const t=this.weapons.findIndex(n=>n.type===e);t!==-1&&(this.currentIndex>=t&&this.currentIndex>0&&this.currentIndex--,this.weapons.splice(t,1))}switchTo(e){return e<0||e>=this.weapons.length||e===this.currentIndex?!1:(this.currentIndex=e,this.onWeaponSwitch&&this.onWeaponSwitch(this.getCurrentWeapon()),!0)}switchToNext(){const e=(this.currentIndex+1)%this.weapons.length;return this.switchTo(e)}switchToPrev(){const e=(this.currentIndex-1+this.weapons.length)%this.weapons.length;return this.switchTo(e)}getCurrentWeapon(){return this.weapons[this.currentIndex]||null}fire(e){const t=this.getCurrentWeapon();return t?t.fire(e):null}reload(){const e=this.getCurrentWeapon();e&&e.startReload()}update(e){for(const t of this.weapons)t.updateReload(e)}getState(){return{weapons:this.weapons.map(e=>e.getState()),currentIndex:this.currentIndex}}}const Ic=["Viper","Shadow","Phantom","Blitz","Raven","Frost","Storm","Blade","Ghost","Wraith"],Dc={easy:{reactionTime:1,accuracy:.1,fireRate:.8,patrolSpeed:2,combatSpeed:3,damageMultiplier:.7,health:80,detectionRange:30,strafeChance:.2,takeCoverChance:.3},medium:{reactionTime:.5,accuracy:.25,fireRate:.5,patrolSpeed:2.8,combatSpeed:4,damageMultiplier:1,health:100,detectionRange:50,strafeChance:.5,takeCoverChance:.5},hard:{reactionTime:.2,accuracy:.45,fireRate:.3,patrolSpeed:3.5,combatSpeed:5,damageMultiplier:1.3,health:120,detectionRange:70,strafeChance:.8,takeCoverChance:.7}};class Z0{constructor(e,t="medium",n=null){this.scene=e,this.id=n||`bot_${Math.random().toString(36).slice(2,8)}`,this.difficulty=t,this.config=Dc[t]||Dc.medium,this.position=new R(0,0,0),this.velocity=new R(0,0,0),this.euler=new kn(0,0,0,"YXZ"),this.quaternion=new hn,this.health=this.config.health,this.maxHealth=this.config.health,this.alive=!0,this.kills=0,this.deaths=0,this.name=Ic[Math.floor(Math.random()*Ic.length)],this.hearRadius=40,this.detectionRange=this.config.detectionRange,this.fieldOfView=Math.PI/2.5,this.lastKnownPlayerPos=null,this.lastSeenTime=0,this.memoryDuration=5,this.state="patrol",this.patrolTarget=null,this.patrolPoints=[],this.patrolIndex=0,this.reactionTimer=0,this.fireTimer=0,this.strafeDir=1,this.strafeTimer=0,this.targetPlayer=null,this.aimTarget=new R,this.grounded=!0,this.height=1.8,this.camHeight=1.6,this.hitbox=new El(this,{scale:.9}),this.scene.add(this.hitbox.group),this.flinchTimer=0,this.flinchOffset=new R,this.flankTarget=null,this.flankTimer=0,this._createVisual()}_createVisual(){const e=this.difficulty==="easy"?4500036:this.difficulty==="medium"?11184708:11158596,t=new Ot(.3,.3,1.2,8),n=new pe({color:e,roughness:.6});this.bodyMesh=new W(t,n),this.bodyMesh.position.y=.9,this.bodyMesh.castShadow=!0;const i=new zt(.18,8,8),s=new pe({color:13413e3,roughness:.5});this.headMesh=new W(i,s),this.headMesh.position.y=1.6;const o=new te(.05,.05,.5),a=new pe({color:3355443,metalness:.5});this.weaponMesh=new W(o,a),this.weaponMesh.position.set(0,.8,-.4),this.group=new bt,this.group.add(this.bodyMesh),this.group.add(this.headMesh),this.group.add(this.weaponMesh),this.scene.add(this.group)}setPatrolPoints(e){this.patrolPoints=e,this.patrolIndex=0,e.length>0&&(this.patrolTarget=e[0])}spawnAt(e,t,n){this.position.set(e,t,n),this.velocity.set(0,0,0),this.health=this.config.health,this.alive=!0,this.state="patrol",this.lastKnownPlayerPos=null,this.updateVisual()}takeDamage(e,t=null){if(!this.alive)return!1;const n=e*this.config.damageMultiplier;return this.health-=n,this.flinchTimer=.2,this.flinchOffset.set((Math.random()-.5)*.2,Math.random()*.15,(Math.random()-.5)*.1),t&&(this.lastKnownPlayerPos=null),this.health<=0?(this.health=0,this.die(),!0):!1}getHitDamageMultiplier(e){switch(e){case St.HEAD:return 2.5;case St.BODY:return 1;case St.LEG:return .75;default:return 1}}die(){this.alive=!1,this.state="dead",this.group.visible=!1,this.hitbox.group.visible=!1,this.deaths++}respawn(e,t,n){this.position.set(e,t,n),this.velocity.set(0,0,0),this.health=this.config.health,this.alive=!0,this.state="patrol",this.group.visible=!0,this.hitbox.group.visible=!0,this.lastKnownPlayerPos=null,this.fireTimer=0,this.reactionTimer=0,this.updateVisual()}update(e,t,n,i=[]){if(!this.alive)return null;this.fireTimer+=e,this.strafeTimer+=e;const s=this._detectPlayer(t,n,i);this._updateState(s,t,e),this._executeState(e,t),this._applyMovement(e),this._applyGravity(e),this._avoidObstacles(i,e),this._collisionResolve(i),this.flinchTimer>0&&(this.flinchTimer-=e),this.updateVisual(),this.hitbox.update(this.position,this.euler);const o=this.state==="combat"&&this.fireTimer>=this.config.fireRate;let a=null;if(o&&n){this.fireTimer=0;const c=this.position.clone().add(new R(0,1,0)),l=new R().subVectors(t,c).normalize(),h=(1-this.config.accuracy)*.35,u=Math.random()*Math.PI*2,d=Math.sqrt(Math.random())*h,f=Math.abs(l.y)<.99?new R(0,1,0):new R(1,0,0),g=new R().crossVectors(l,f).normalize(),_=new R().crossVectors(g,l).normalize(),m=new R().addScaledVector(g,Math.cos(u)*d).addScaledVector(_,Math.sin(u)*d);a={origin:c,direction:l.clone().add(m).normalize(),damage:10,botPosition:this.position.clone()}}return a}_detectPlayer(e,t,n){if(!t||!e)return!1;const i=e.x-this.position.x,s=e.z-this.position.z,o=Math.sqrt(i*i+s*s);if(o>this.detectionRange)return!1;let c=Math.atan2(i,s)-this.euler.y;for(;c>Math.PI;)c-=Math.PI*2;for(;c<-Math.PI;)c+=Math.PI*2;if(Math.abs(c)>this.fieldOfView)return!1;const l=new R(e.x-this.position.x,0,e.z-this.position.z).normalize(),h=new Js(this.position.clone().add(new R(0,1,0)),l);h.far=o;const u=h.intersectObjects(n,!0);return u.length>0&&u[0].distance<o?!1:(this.lastKnownPlayerPos=e.clone(),this.lastSeenTime=performance.now(),!0)}_updateState(e,t,n){const i=performance.now();this.state!=="dead"&&(e?(this.reactionTimer+=n,this.reactionTimer>=this.config.reactionTime&&(this.state="combat",this.targetPlayer=t)):(this.reactionTimer=0,this.state==="combat"&&(this.lastKnownPlayerPos&&i-this.lastSeenTime<this.memoryDuration*1e3?this.targetPlayer=this.lastKnownPlayerPos:(this.state="patrol",this.targetPlayer=null))))}_executeState(e,t){switch(this.state){case"patrol":this._patrol(e);break;case"combat":this._combat(e,t);break}}_patrol(e){if(this.patrolPoints.length===0)return;this.patrolTarget||(this.patrolTarget=this.patrolPoints[0]);const t=this.patrolTarget.x-this.position.x,n=this.patrolTarget.z-this.position.z;if(Math.sqrt(t*t+n*n)<1.5)this.patrolIndex=(this.patrolIndex+1)%this.patrolPoints.length,this.patrolTarget=this.patrolPoints[this.patrolIndex];else{const s=Math.atan2(t,n);this.euler.y+=this._angleDiff(this.euler.y,s)*3*e,this.velocity.x=Math.sin(s)*this.config.patrolSpeed,this.velocity.z=Math.cos(s)*this.config.patrolSpeed}}_combat(e,t){if(!this.targetPlayer)return;const n=t||this.targetPlayer,i=n.x-this.position.x,s=n.z-this.position.z,o=Math.sqrt(i*i+s*s),a=Math.atan2(i,s);this.euler.y+=this._angleDiff(this.euler.y,a)*5*e,this.strafeTimer>1.5&&(this.strafeDir=Math.random()<.5?1:-1,this.strafeTimer=0);const c=a+Math.PI/2*this.strafeDir,l=this.config.combatSpeed,h=15+Math.random()*10,u=o>h?1:o<h-5?-1:0;if(this.flankTimer>3){this.flankTimer=0;const f=new R(n.x-this.position.x,0,n.z-this.position.z).normalize(),g=new R(-f.z,0,f.x);Math.random()<.5&&g.negate(),this.flankTarget=new R(n.x+g.x*(8+Math.random()*6),0,n.z+g.z*(8+Math.random()*6))}if(this.flankTarget&&o>6&&o<25&&Math.random()<.4){const f=this.flankTarget.x-this.position.x,g=this.flankTarget.z-this.position.z;if(Math.sqrt(f*f+g*g)<2)this.flankTarget=null;else{const m=Math.atan2(f,g);this.velocity.x=Math.sin(m)*l*.6,this.velocity.z=Math.cos(m)*l*.6}}else Math.random()<this.config.strafeChance?(this.velocity.x=Math.sin(c)*l*.7,this.velocity.z=Math.cos(c)*l*.7):(this.velocity.x=Math.sin(a)*l*u,this.velocity.z=Math.cos(a)*l*u);o<5&&(this.velocity.x-=Math.sin(a)*l*.5,this.velocity.z-=Math.cos(a)*l*.5)}_applyMovement(e){const n=Math.sqrt(this.velocity.x*this.velocity.x+this.velocity.z*this.velocity.z);if(n>0){const i=8*e,o=Math.max(0,n-i)/n;this.velocity.x*=o,this.velocity.z*=o}this.position.x+=this.velocity.x*e,this.position.z+=this.velocity.z*e}_applyGravity(e){this.grounded||(this.velocity.y+=-20*e),this.position.y<=0?(this.position.y=0,this.velocity.y=0,this.grounded=!0):this.grounded=!1}_avoidObstacles(e,t){if(!this.alive||e.length===0)return;const n=Math.sqrt(this.velocity.x*this.velocity.x+this.velocity.z*this.velocity.z);if(n<.5)return;const i=new R(this.velocity.x/n,0,this.velocity.z/n),s=new Js(this.position.clone().add(new R(0,.5,0)),i);s.far=3;const o=s.intersectObjects(e,!0);if(o.length>0&&o[0].distance<3){const a=o[0].face.normal.clone();if(a.y=0,a.lengthSq()>.01){a.normalize();const c=new R;c.copy(i).add(a.multiplyScalar(2)),c.y=0,c.normalize(),this.velocity.x=c.x*n*.5,this.velocity.z=c.z*n*.5}}}_collisionResolve(e){if(e.length===0)return;const t=.4;for(const n of e){if(!n.geometry)continue;const i=n.geometry;i.boundingBox||i.computeBoundingBox(),n.updateWorldMatrix(!0,!1);const s=i.boundingBox.clone().applyMatrix4(n.matrixWorld),o=this.position.x,a=this.position.z,c=Math.max(s.min.x,Math.min(o,s.max.x)),l=Math.max(s.min.z,Math.min(a,s.max.z)),h=o-c,u=a-l,d=Math.sqrt(h*h+u*u);if(d<t&&d>.001){const f=t-d,g=h/d,_=u/d;this.position.x+=g*f,this.position.z+=_*f,this.velocity.x*=.5,this.velocity.z*=.5}}}_angleDiff(e,t){let n=t-e;for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;return n}updateVisual(){const e=this.flinchTimer>0?1+this.flinchTimer*2:1;this.group.position.copy(this.position),this.group.position.y+=this.height*.5,this.group.position.x+=this.flinchOffset.x*e,this.group.position.z+=this.flinchOffset.z*e,this.group.rotation.y=this.euler.y,this.weaponMesh.rotation.x=this.euler.x*.5+this.flinchOffset.y*e,this.bodyMesh&&(this.bodyMesh.position.y=this.height*.5),this.headMesh&&(this.headMesh.position.y=this.height*.9,this.headMesh.position.z=-.05)}setVisible(e){this.group.visible=e,this.hitbox.group.visible=e}dispose(){this.scene.remove(this.group),this.scene.remove(this.hitbox.group),this.hitbox.dispose(),this.bodyMesh&&(this.bodyMesh.geometry.dispose(),this.bodyMesh.material.dispose()),this.headMesh&&(this.headMesh.geometry.dispose(),this.headMesh.material.dispose()),this.weaponMesh&&(this.weaponMesh.geometry.dispose(),this.weaponMesh.material.dispose())}}const J0=20,Nc=1e3/J0;class Q0{constructor(){this.ws=null,this.url=null,this.connected=!1,this.latency=0,this.clockSync={offset:0,rtt:0},this._updateTimer=0,this._pendingInputs=[],this._serverStates=[],this._interpolationBuffer=[],this._interpolationDelay=100,this._sequenceNumber=0,this.listeners=new Map,this.inputHandler=null,this.stateHandler=null,this._pingInterval=null,this._pingStart=0}connect(e){this.ws&&this.disconnect(),this.url=e,this.ws=new WebSocket(e),this.ws.binaryType="arraybuffer",this.ws.onopen=()=>{this.connected=!0,console.log(`[Network] Connected to ${e}`),this._startPing(),this._emit("connected")},this.ws.onclose=()=>{this.connected=!1,console.log("[Network] Disconnected"),this._stopPing(),this._emit("disconnected")},this.ws.onerror=t=>{console.error("[Network] Error:",t),this._emit("error",t)},this.ws.onmessage=t=>{this._handleMessage(t.data)}}disconnect(){this.ws&&(this.ws.close(),this.ws=null),this.connected=!1,this._pendingInputs=[],this._serverStates=[],this._interpolationBuffer=[],this._stopPing()}send(e,t={}){if(!this.connected||!this.ws)return;const n=JSON.stringify({type:e,seq:this._sequenceNumber++,time:performance.now(),data:t});this.ws.send(n)}sendInput(e){const t=this._sequenceNumber++;if(this._pendingInputs.push({seq:t,time:performance.now(),input:e}),!this.connected)return;const n=JSON.stringify({type:"input",seq:t,time:performance.now(),data:e});this.ws.send(n)}on(e,t){return this.listeners.has(e)||this.listeners.set(e,[]),this.listeners.get(e).push(t),()=>{const n=this.listeners.get(e);if(n){const i=n.indexOf(t);i!==-1&&n.splice(i,1)}}}_emit(e,t=null){const n=this.listeners.get(e);if(n)for(const i of n)i(t)}_handleMessage(e){let t;try{t=JSON.parse(e)}catch{return}switch(t.type){case"pong":this._handlePong(t);break;case"state":this._handleServerState(t);break;case"spawn":this._emit("spawn",t.data);break;case"despawn":this._emit("despawn",t.data);break;case"hit":this._emit("hit",t.data);break;case"kill":this._emit("kill",t.data);break;case"match_state":this._emit("match_state",t.data);break;default:this._emit(t.type,t.data)}}_handlePong(e){const t=performance.now();this.latency=t-this._pingStart,this.clockSync.rtt=this.latency,this.clockSync.offset=e.serverTime-t+this.latency/2}_handleServerState(e){const t={sequence:e.seq,time:e.time,timestamp:performance.now(),entities:e.data.entities||[],worldTime:e.data.worldTime};for(this._serverStates.push(t);this._serverStates.length>60;)this._serverStates.shift();for(this._interpolationBuffer.push(t);this._interpolationBuffer.length>120;)this._interpolationBuffer.shift();this._reconcile(t),this.stateHandler&&this.stateHandler(t)}_reconcile(e){const{entities:t}=e;if(!t||!t.local)return;const n=t.local,i=this._pendingInputs.findIndex(s=>s.seq===e.sequence);i!==-1&&this._pendingInputs.splice(0,i+1),this.reconciliationHandler&&this.reconciliationHandler(n,this._pendingInputs)}getInterpolatedState(e){const t=this._interpolationBuffer;if(t.length===0)return null;const n=e-this._interpolationDelay;let i=t[0],s=t[t.length-1];for(let c=0;c<t.length-1;c++)if(t[c].time<=n&&t[c+1].time>=n){i=t[c],s=t[c+1];break}const o=s.time-i.time,a=o>0?(n-i.time)/o:1;return{before:i,after:s,t:Math.max(0,Math.min(1,a))}}update(e,t=null){this.connected&&(this._updateTimer+=e*1e3,this._updateTimer>=Nc&&(this._updateTimer-=Nc,t?this.sendInput(t):this.send("heartbeat")))}_startPing(){this._pingInterval=setInterval(()=>{this._pingStart=performance.now(),this.send("ping",{clientTime:this._pingStart})},2e3)}_stopPing(){this._pingInterval&&(clearInterval(this._pingInterval),this._pingInterval=null)}getServerTime(){return performance.now()+this.clockSync.offset}isConnected(){return this.connected}getRTT(){return this.clockSync.rtt}}class e_{constructor(){this.trackedEntities=new Map,this.smoothingFactor=.1,this.maxSnapDistance=5}addEntity(e,t){this.trackedEntities.set(e,{positions:[],rotations:[],currentPosition:t.position?{...t.position}:null,currentRotation:t.rotation?{...t.rotation}:null,renderPosition:t.position?{...t.position}:null,renderRotation:t.rotation?{...t.rotation}:null,lastUpdate:performance.now(),teleported:!1})}removeEntity(e){this.trackedEntities.delete(e)}updateEntity(e,t){const n=this.trackedEntities.get(e);if(!n)return;const i=performance.now();if(n.positions.length>0){const s=n.positions[n.positions.length-1];if(s.position){const o=t.position.x-s.position.x,a=t.position.y-s.position.y,c=t.position.z-s.position.z;if(Math.sqrt(o*o+a*a+c*c)>this.maxSnapDistance){n.positions=[],n.rotations=[],n.teleported=!0,n.renderPosition&&(n.renderPosition.x=t.position.x,n.renderPosition.y=t.position.y,n.renderPosition.z=t.position.z),n.currentPosition&&(n.currentPosition.x=t.position.x,n.currentPosition.y=t.position.y,n.currentPosition.z=t.position.z),n.lastUpdate=i;return}}}for(n.positions.push({position:{...t.position},time:i}),t.rotation&&n.rotations.push({rotation:{...t.rotation},time:i}),n.currentPosition&&(n.currentPosition.x=t.position.x,n.currentPosition.y=t.position.y,n.currentPosition.z=t.position.z),n.currentRotation&&t.rotation&&(n.currentRotation.x=t.rotation.x,n.currentRotation.y=t.rotation.y);n.positions.length>10;)n.positions.shift();for(;n.rotations.length>10;)n.rotations.shift();n.lastUpdate=i}update(e){const t=performance.now(),n=.1;for(const[i,s]of this.trackedEntities){if(!s.renderPosition||s.positions.length===0)continue;if(s.teleported){s.teleported=!1;continue}const o=t/1e3-n;let a=s.positions[0],c=s.positions[s.positions.length-1];for(let g=0;g<s.positions.length-1;g++){const _=s.positions[g].time/1e3,m=s.positions[g+1].time/1e3;if(_<=o&&m>=o){a=s.positions[g],c=s.positions[g+1];break}}const l=a.time/1e3,u=c.time/1e3-l,d=u>0?(o-l)/u:1,f=Math.max(0,Math.min(1,d));if(s.renderPosition.x=a.position.x+(c.position.x-a.position.x)*f,s.renderPosition.y=a.position.y+(c.position.y-a.position.y)*f,s.renderPosition.z=a.position.z+(c.position.z-a.position.z)*f,s.renderRotation&&s.rotations.length>=2){let g=s.rotations[0],_=s.rotations[s.rotations.length-1];for(let m=0;m<s.rotations.length-1;m++){const p=s.rotations[m].time/1e3,M=s.rotations[m+1].time/1e3;if(p<=o&&M>=o){g=s.rotations[m],_=s.rotations[m+1];break}}s.renderRotation.x=g.rotation.x+(_.rotation.x-g.rotation.x)*f,s.renderRotation.y=g.rotation.y+(_.rotation.y-g.rotation.y)*f}}}getRenderState(e){const t=this.trackedEntities.get(e);return t?{position:t.renderPosition,rotation:t.renderRotation,lastUpdate:t.lastUpdate}:null}clear(){this.trackedEntities.clear()}}const t_=[{id:"training_map",name:"Training",desc:"Open practice area"},{id:"forest_map",name:"Forest",desc:"Dense forest ruins"},{id:"city_map",name:"City",desc:"Urban combat zone"}];class n_{constructor(e,t,n){this.gsm=e,this.settings=t,this.eventBus=n,this.screens={loading:document.getElementById("loading-screen"),mainMenu:document.getElementById("main-menu"),soloSetup:document.getElementById("solo-setup-screen"),multiLobby:document.getElementById("multi-lobby-screen"),matchEnd:document.getElementById("match-end-screen")},this.soloConfig={map:"training_map",difficulty:"medium",botCount:3},this.multiLobby={code:null,players:[{name:"You",ready:!0}],isHost:!1},this._setupMainMenu(),this._setupSoloSetup(),this._setupMultiLobby(),this._setupMatchEnd(),this.gsm.onChange(({to:i})=>{this._onStateChange(i)})}_setupMainMenu(){var e,t,n,i;(e=document.getElementById("btn-solo"))==null||e.addEventListener("click",()=>{this.gsm.transitionTo(xe.SOLO_SETUP)}),(t=document.getElementById("btn-multi"))==null||t.addEventListener("click",()=>{this.gsm.transitionTo(xe.MULTI_LOBBY)}),(n=document.getElementById("btn-settings"))==null||n.addEventListener("click",()=>{this.eventBus.emit("ui:openSettings")}),(i=document.getElementById("btn-quit"))==null||i.addEventListener("click",()=>{confirm("Quit game?")&&window.close()})}_setupSoloSetup(){var e,t;this._renderMapSelection(),this._setupDifficultyButtons(),this._setupBotCountSlider(),(e=document.getElementById("btn-start-solo"))==null||e.addEventListener("click",()=>{var n,i,s;this.soloConfig.map=((n=document.querySelector(".map-card.selected"))==null?void 0:n.dataset.map)||"training_map",this.soloConfig.difficulty=((i=document.querySelector(".diff-btn.active"))==null?void 0:i.dataset.diff)||"medium",this.soloConfig.botCount=parseInt(((s=document.getElementById("bot-count-slider"))==null?void 0:s.value)||3),this.gsm.transitionTo(xe.PLAYING,{mode:"solo",...this.soloConfig})}),(t=document.getElementById("btn-back-solo"))==null||t.addEventListener("click",()=>{this.gsm.transitionTo(xe.MAIN_MENU)})}_renderMapSelection(){const e=document.getElementById("map-selection");e&&(e.innerHTML=t_.map((t,n)=>`
      <div class="map-card ${n===0?"selected":""}" data-map="${t.id}">
        <span class="map-name">${t.name}</span>
        <span class="map-desc">${t.desc}</span>
      </div>
    `).join(""),e.querySelectorAll(".map-card").forEach(t=>{t.addEventListener("click",()=>{e.querySelectorAll(".map-card").forEach(n=>n.classList.remove("selected")),t.classList.add("selected")})}))}_setupDifficultyButtons(){document.querySelectorAll(".diff-btn").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".diff-btn").forEach(t=>t.classList.remove("active")),e.classList.add("active")})})}_setupBotCountSlider(){const e=document.getElementById("bot-count-slider"),t=document.getElementById("bot-count-display");e&&t&&e.addEventListener("input",()=>{t.textContent=e.value})}_setupMultiLobby(){var e,t,n,i,s;(e=document.getElementById("btn-create-lobby"))==null||e.addEventListener("click",()=>{this.multiLobby.isHost=!0,this.multiLobby.code=this._generateLobbyCode(),this._showLobbySection("create"),document.getElementById("lobby-code").textContent=this.multiLobby.code,this.eventBus.emit("lobby:created",{code:this.multiLobby.code})}),(t=document.getElementById("btn-join-lobby"))==null||t.addEventListener("click",()=>{this.multiLobby.isHost=!1,this._showLobbySection("join")}),(n=document.getElementById("btn-join-confirm"))==null||n.addEventListener("click",()=>{var a,c;const o=(c=(a=document.getElementById("lobby-code-input"))==null?void 0:a.value)==null?void 0:c.toUpperCase().trim();o&&o.length===6&&(this.multiLobby.code=o,this.eventBus.emit("lobby:join",{code:o}))}),(i=document.getElementById("btn-ready"))==null||i.addEventListener("click",()=>{const o=document.getElementById("btn-ready"),a=o.textContent==="Ready";o.textContent=a?"Unready":"Ready",o.classList.toggle("primary",a),this.eventBus.emit("lobby:ready",a)}),(s=document.getElementById("btn-leave-lobby"))==null||s.addEventListener("click",()=>{this.gsm.transitionTo(xe.MAIN_MENU)})}_generateLobbyCode(){const e="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let t="";for(let n=0;n<6;n++)t+=e[Math.floor(Math.random()*e.length)];return t}_showLobbySection(e){var t,n;(t=document.getElementById("lobby-create-display"))==null||t.classList.toggle("hidden",e!=="create"),(n=document.getElementById("lobby-join-input"))==null||n.classList.toggle("hidden",e!=="join")}_setupMatchEnd(){var e,t;(e=document.getElementById("btn-play-again"))==null||e.addEventListener("click",()=>{(this._lastMatchMode||"solo")==="solo"?this.gsm.transitionTo(xe.SOLO_SETUP):this.gsm.transitionTo(xe.MULTI_LOBBY)}),(t=document.getElementById("btn-leave-match"))==null||t.addEventListener("click",()=>{this.gsm.transitionTo(xe.MAIN_MENU)})}_onStateChange(e){switch(this._hideAllScreens(),e){case xe.LOADING:this.screens.loading.classList.remove("hidden");break;case xe.MAIN_MENU:this.screens.mainMenu.classList.remove("hidden");break;case xe.SOLO_SETUP:this.screens.soloSetup.classList.remove("hidden"),this._renderMapSelection();break;case xe.MULTI_LOBBY:this.screens.multiLobby.classList.remove("hidden"),this._showLobbySection("create"),this.multiLobby.code=this._generateLobbyCode(),document.getElementById("lobby-code").textContent=this.multiLobby.code;break;case xe.PLAYING:case xe.SPECTATING:break;case xe.MATCH_END:this.screens.matchEnd.classList.remove("hidden"),this._updateMatchEndScreen();break}}_hideAllScreens(){Object.values(this.screens).forEach(e=>{e&&e.classList.add("hidden")})}_updateMatchEndScreen(){const e=document.getElementById("match-result");e&&(e.textContent="Match Over")}updateLoadingProgress(e){const t=document.getElementById("loading-bar"),n=document.getElementById("loading-text");t&&(t.style.width=`${Math.min(100,e*100)}%`),n&&(n.textContent=`Loading... ${Math.floor(e*100)}%`)}setMultiLobbyPlayers(e){const t=document.getElementById("player-list");t&&(t.innerHTML=e.map(n=>`
      <div class="player-entry">
        <span class="player-name">${n.name}</span>
        <span class="player-ready">${n.ready?"Ready":"Not Ready"}</span>
      </div>
    `).join(""))}showMatchEnd(e,t="solo"){this._lastMatchMode=t;const n=this.screens.matchEnd;if(!n)return;n.classList.remove("hidden");const i=document.getElementById("match-result");i&&(t==="solo"?i.textContent=e.winner?`${e.winner} Wins!`:"Practice Complete":i.textContent=e.winner?`${e.winner} Wins!`:"Match Over");const s=document.getElementById("match-stats");s&&e.players&&(s.innerHTML=e.players.slice(0,10).map(o=>`
        <div class="stat-row">
          <span>${o.name} ${o.isBot?"(Bot)":""}</span>
          <span>${o.kills} / ${o.deaths}</span>
          <span>${o.score}</span>
        </div>
      `).join(""))}getSoloConfig(){return{...this.soloConfig}}dispose(){this._hideAllScreens()}}class i_{constructor(e){this.eventBus=e,this.elements=this._cacheElements(),this.vignetteTimer=null,this.hitMarkerTimer=null,this.killFeedEntries=[],this.damageIndicatorTimeout=null,this.slowIndicatorTimeout=null,this.damageTrack=null,this.crosshairBase=4,this.crosshairSpread=0,this._setupListeners()}_cacheElements(){return{container:document.getElementById("game-hud"),crosshair:document.getElementById("crosshair"),healthFill:document.getElementById("health-fill"),healthText:document.getElementById("health-text"),ammoCurrent:document.getElementById("ammo-current"),ammoReserve:document.getElementById("ammo-reserve"),weaponName:document.getElementById("weapon-name"),matchTimer:document.getElementById("match-timer"),scoreDisplay:document.getElementById("score-display"),vignette:document.getElementById("damage-vignette"),killFeed:document.getElementById("kill-feed"),damageIndicator:document.getElementById("damage-indicator"),damageArrow:document.querySelector("#damage-indicator .damage-arrow"),slowIndicator:document.getElementById("slow-indicator"),viewToggle:document.getElementById("view-toggle"),hitMarker:document.getElementById("hit-marker"),crosshairTop:document.querySelector("#crosshair .crosshair-line.top"),crosshairBottom:document.querySelector("#crosshair .crosshair-line.bottom"),crosshairLeft:document.querySelector("#crosshair .crosshair-line.left"),crosshairRight:document.querySelector("#crosshair .crosshair-line.right")}}_setupListeners(){this.eventBus&&(this.eventBus.on("player:damage",e=>{this.showDamageVignette(),e.attackerPos&&this.showDamageDirection(e.attackerPos),e.region==="leg"&&this.showSlowIndicator()}),this.eventBus.on("player:kill",e=>{this.addKillFeedEntry(e)}),this.eventBus.on("match:score",e=>{this.updateScore(e)}),this.eventBus.on("match:timer",e=>{this.updateTimer(e.time)}))}show(){this.elements.container&&this.elements.container.classList.remove("hidden")}hide(){this.elements.container&&this.elements.container.classList.add("hidden")}updateHealth(e,t=100){if(!this.elements.healthFill)return;const n=Math.max(0,Math.min(100,e/t*100));this.elements.healthFill.style.width=`${n}%`,this.elements.healthText&&(this.elements.healthText.textContent=Math.ceil(e)),n<=25?this.elements.healthFill.style.background="linear-gradient(90deg, #e74c3c, #c0392b)":n<=50?this.elements.healthFill.style.background="linear-gradient(90deg, #e74c3c, #f39c12)":this.elements.healthFill.style.background="linear-gradient(90deg, #e74c3c, #2ecc71)"}updateAmmo(e,t){this.elements.ammoCurrent&&(this.elements.ammoCurrent.textContent=e),this.elements.ammoReserve&&(this.elements.ammoReserve.textContent=t)}updateWeapon(e){this.elements.weaponName&&(this.elements.weaponName.textContent=e)}updateTimer(e){this.elements.matchTimer&&(this.elements.matchTimer.textContent=e)}updateScore(e){this.elements.scoreDisplay&&(typeof e=="object"?this.elements.scoreDisplay.textContent=`${e.team1||0} - ${e.team2||0}`:this.elements.scoreDisplay.textContent=e)}showDamageVignette(){this.elements.vignette&&(this.elements.vignette.classList.remove("hidden"),this.vignetteTimer&&clearTimeout(this.vignetteTimer),this.vignetteTimer=setTimeout(()=>{this.elements.vignette&&this.elements.vignette.classList.add("hidden")},400))}showHitMarker(e){this.elements.hitMarker&&(this.elements.hitMarker.classList.remove("hidden"),this.hitMarkerTimer&&clearTimeout(this.hitMarkerTimer),this.hitMarkerTimer=setTimeout(()=>{this.elements.hitMarker&&this.elements.hitMarker.classList.add("hidden")},150))}addKillFeedEntry(e){if(!this.elements.killFeed)return;const t=document.createElement("div");for(t.className="kill-entry",t.innerHTML=`
      <span class="killer">${e.killerName||"Player"}</span>
      <span class="weapon">[${e.weapon||"?"}]</span>
      <span class="victim">${e.victimName||"Enemy"}</span>
    `,this.elements.killFeed.appendChild(t),this.killFeedEntries.push(t);this.killFeedEntries.length>5;){const n=this.killFeedEntries.shift();n.parentNode&&n.parentNode.removeChild(n)}setTimeout(()=>{if(t.parentNode){t.parentNode.removeChild(t);const n=this.killFeedEntries.indexOf(t);n!==-1&&this.killFeedEntries.splice(n,1)}},5e3)}showDamageDirection(e){!this.elements.damageIndicator||!this.elements.damageArrow||(this.damageTrack={attackerPos:e.clone?e.clone():{x:e.x,y:e.y,z:e.z},hitTime:performance.now()},this.elements.damageIndicator.classList.add("visible"))}updateDamageDirection(e,t){if(!this.damageTrack||!this.elements.damageArrow){this.elements.damageIndicator&&this.elements.damageIndicator.classList.remove("visible");return}const n=(performance.now()-this.damageTrack.hitTime)/1e3,i=3;if(n>=i){this.damageTrack=null,this.elements.damageIndicator.classList.remove("visible");return}const s=this.damageTrack.attackerPos.x-e.x,o=this.damageTrack.attackerPos.z-e.z,a=Math.sqrt(s*s+o*o);if(a<.001)return;const c={x:s/a,z:o/a},l=t.x*c.x+t.z*c.z,h=t.x*c.z-t.z*c.x,u=Math.atan2(h,l)*(180/Math.PI);this.elements.damageArrow.style.transform=`rotate(${u}deg)`;const d=Math.max(0,1-n/i);this.elements.damageIndicator.style.opacity=d}updateCrosshair(e){if(this.crosshairSpread=e,!this.elements.crosshairTop)return;const t=this.crosshairBase+e*16;this.elements.crosshair.style.setProperty("--gap",`${t}px`)}showSlowIndicator(){this.elements.slowIndicator&&(this.elements.slowIndicator.classList.add("active"),this.slowIndicatorTimeout&&clearTimeout(this.slowIndicatorTimeout),this.slowIndicatorTimeout=setTimeout(()=>{this.elements.slowIndicator&&this.elements.slowIndicator.classList.remove("active")},2500))}setViewToggleCallback(e){this.elements.viewToggle&&this.elements.viewToggle.addEventListener("click",e)}updateViewToggleLabel(e){this.elements.viewToggle&&(this.elements.viewToggle.textContent=e?"1P":"3P")}dispose(){this.hide(),this.vignetteTimer&&clearTimeout(this.vignetteTimer),this.hitMarkerTimer&&clearTimeout(this.hitMarkerTimer),this.damageIndicatorTimeout&&clearTimeout(this.damageIndicatorTimeout),this.slowIndicatorTimeout&&clearTimeout(this.slowIndicatorTimeout)}}class s_{constructor(e){this.settings=e,this.visible=!1,this.currentTab="graphics",this.screen=document.getElementById("settings-screen"),this.panel=document.getElementById("settings-panel"),this._setupTabButtons(),this._setupBackButton(),this._setupSaveButton(),this._setupResetButton()}show(){this.visible=!0,this.screen.classList.remove("hidden"),this._renderTab("graphics")}hide(){this.visible=!1,this.screen.classList.add("hidden")}isVisible(){return this.visible}_setupTabButtons(){const e=document.querySelectorAll(".tab-btn");e.forEach(t=>{t.addEventListener("click",()=>{e.forEach(n=>n.classList.remove("active")),t.classList.add("active"),this._renderTab(t.dataset.tab)})})}_setupBackButton(){var e;(e=document.getElementById("btn-back-settings"))==null||e.addEventListener("click",()=>{this.hide()})}_setupSaveButton(){var e;(e=document.getElementById("btn-save-settings"))==null||e.addEventListener("click",()=>{this._saveCurrentSettings()})}_setupResetButton(){var e;(e=document.getElementById("btn-reset-settings"))==null||e.addEventListener("click",()=>{this.settings.reset(),this._renderTab(this.currentTab)})}_renderTab(e){if(this.currentTab=e,!!this.panel)switch(e){case"graphics":this._renderGraphics();break;case"controls":this._renderControls();break;case"audio":this._renderAudio();break}}_renderGraphics(){this.panel.innerHTML=`
      <div class="settings-group">
        <label>Quality</label>
        <select id="setting-quality">
          <option value="low" ${this.settings.get("graphics","quality")==="low"?"selected":""}>Low</option>
          <option value="medium" ${this.settings.get("graphics","quality")==="medium"?"selected":""}>Medium</option>
          <option value="high" ${this.settings.get("graphics","quality")==="high"?"selected":""}>High</option>
          <option value="ultra" ${this.settings.get("graphics","quality")==="ultra"?"selected":""}>Ultra</option>
        </select>
      </div>
      <div class="settings-group">
        <label>Shadows</label>
        <select id="setting-shadows">
          <option value="true" ${this.settings.get("graphics","shadows")?"selected":""}>Enabled</option>
          <option value="false" ${this.settings.get("graphics","shadows")?"":"selected"}>Disabled</option>
        </select>
      </div>
      <div class="settings-group">
        <label>Resolution Scale: <span class="range-value" id="res-scale-value">${Math.round(this.settings.get("graphics","resolutionScale")*100)}%</span></label>
        <input type="range" id="setting-res-scale" min="50" max="200" value="${Math.round(this.settings.get("graphics","resolutionScale")*100)}">
      </div>
      <div class="settings-group">
        <label>Field of View: <span class="range-value" id="fov-value">${this.settings.get("graphics","fov")}</span></label>
        <input type="range" id="setting-fov" min="60" max="120" value="${this.settings.get("graphics","fov")}">
      </div>
    `,this._bindRange("res-scale-value","setting-res-scale"),this._bindRange("fov-value","setting-fov")}_renderControls(){const e=this.settings.get("controls","keybinds");this.panel.innerHTML=`
      <div class="settings-group">
        <label>Mouse Sensitivity: <span class="range-value" id="sens-value">${this.settings.get("controls","sensitivity")}</span></label>
        <input type="range" id="setting-sensitivity" min="1" max="20" step="0.5" value="${this.settings.get("controls","sensitivity")}">
      </div>
      <div class="settings-group">
        <label>Invert Y</label>
        <select id="setting-invert-y">
          <option value="false" ${this.settings.get("controls","invertY")?"":"selected"}>Disabled</option>
          <option value="true" ${this.settings.get("controls","invertY")?"selected":""}>Enabled</option>
        </select>
      </div>
      <div class="settings-group">
        <label>Keybinds (click to rebind)</label>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 8px;">
          ${Object.entries(e).map(([t,n])=>`
            <div style="display: flex; justify-content: space-between; background: #1a1a1a; padding: 4px 8px; border-radius: 4px; cursor: pointer;" class="keybind-row" data-action="${t}">
              <span style="color: #aaa; font-size: 0.8rem;">${t}</span>
              <span style="color: #4a9eff; font-size: 0.8rem;" class="keybind-key">${n}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `,this._bindRange("sens-value","setting-sensitivity"),this._setupKeybindListeners()}_setupKeybindListeners(){const e=this.panel.querySelectorAll(".keybind-row");let t=null;e.forEach(n=>{n.addEventListener("click",()=>{t&&(t.style.borderColor="#333"),t=n,n.style.borderColor="#4a9eff",n.querySelector(".keybind-key").textContent="...";const i=s=>{s.preventDefault();let o=s.code;s.button!==void 0&&(o=`Mouse${s.button}`),n.querySelector(".keybind-key").textContent=o,n.style.borderColor="#333";const a=n.dataset.action;this.settings.setKeybind(a,o),this.settings.saveManager.save("settings",this.settings.settings),this.settings._persist(),document.removeEventListener("keydown",i),document.removeEventListener("mousedown",i),t=null};document.addEventListener("keydown",i),document.addEventListener("mousedown",i)})})}_renderAudio(){this.panel.innerHTML=`
      <div class="settings-group">
        <label>Master Volume: <span class="range-value" id="master-vol-value">${Math.round(this.settings.get("audio","masterVolume")*100)}%</span></label>
        <input type="range" id="setting-master-vol" min="0" max="100" value="${Math.round(this.settings.get("audio","masterVolume")*100)}">
      </div>
      <div class="settings-group">
        <label>Effects Volume: <span class="range-value" id="effects-vol-value">${Math.round(this.settings.get("audio","effectsVolume")*100)}%</span></label>
        <input type="range" id="setting-effects-vol" min="0" max="100" value="${Math.round(this.settings.get("audio","effectsVolume")*100)}">
      </div>
      <div class="settings-group">
        <label>Music Volume: <span class="range-value" id="music-vol-value">${Math.round(this.settings.get("audio","musicVolume")*100)}%</span></label>
        <input type="range" id="setting-music-vol" min="0" max="100" value="${Math.round(this.settings.get("audio","musicVolume")*100)}">
      </div>
    `,this._bindRange("master-vol-value","setting-master-vol"),this._bindRange("effects-vol-value","setting-effects-vol"),this._bindRange("music-vol-value","setting-music-vol")}_bindRange(e,t){const n=document.getElementById(t),i=document.getElementById(e);n&&i&&n.addEventListener("input",()=>{i.textContent=n.id.includes("scale")?`${n.value}%`:n.value})}_saveCurrentSettings(){const e=u=>{var d;return(d=document.getElementById(u))==null?void 0:d.value},t=e("setting-quality");t&&this.settings.set("graphics","quality",t);const n=e("setting-shadows");n&&this.settings.set("graphics","shadows",n==="true");const i=e("setting-res-scale");i&&this.settings.set("graphics","resolutionScale",parseInt(i)/100);const s=e("setting-fov");s&&this.settings.set("graphics","fov",parseInt(s));const o=e("setting-sensitivity");o&&this.settings.set("controls","sensitivity",parseFloat(o));const a=e("setting-invert-y");a&&this.settings.set("controls","invertY",a==="true");const c=e("setting-master-vol");c&&this.settings.set("audio","masterVolume",parseInt(c)/100);const l=e("setting-effects-vol");l&&this.settings.set("audio","effectsVolume",parseInt(l)/100);const h=e("setting-music-vol");h&&this.settings.set("audio","musicVolume",parseInt(h)/100),this.hide(),console.log("[Settings] Saved")}}const r_={id:"forest_map",name:"Forest",description:"A dense forest with scattered ruins.",ground:{size:200,color:2972199,y:0},lighting:{ambient:{color:4210784,intensity:.35},directional:{color:16772829,intensity:.7,x:60,y:80,z:40},hemisphere:{skyColor:8900331,groundColor:3550498,intensity:.25}},skybox:{color:7048811,fogNear:40,fogFar:150},bounds:{size:200,height:8},trees:[{x:-15,z:-12,scale:.9},{x:12,z:-18,scale:.8},{x:-8,z:20,scale:1.1},{x:22,z:15,scale:.85},{x:-20,z:-5,scale:1},{x:5,z:25,scale:.75},{x:-25,z:10,scale:1.2},{x:18,z:-8,scale:.7},{x:-30,z:-18,scale:1},{x:28,z:-22,scale:.9},{x:-35,z:15,scale:.8},{x:30,z:22,scale:1},{x:-22,z:-28,scale:.85},{x:15,z:-30,scale:1.1},{x:-28,z:28,scale:.75},{x:25,z:30,scale:.9},{x:-12,z:-32,scale:1},{x:32,z:-12,scale:.8},{x:-32,z:-30,scale:1.05},{x:35,z:28,scale:.9},{x:-5,z:-25,scale:.7},{x:8,z:30,scale:.95},{x:-18,z:25,scale:1},{x:20,z:-25,scale:.85},{x:-25,z:-15,scale:.9},{x:0,z:28,scale:.8}],objects:[{type:"box",width:3,height:2.5,depth:3,x:-5,z:-8,color:6710886,roughness:.7},{type:"box",width:2,height:1.5,depth:2,x:10,z:12,color:7829367,roughness:.7},{type:"box",width:4,height:3,depth:4,x:-15,z:18,color:5592405,roughness:.7},{type:"box",width:1.5,height:1,depth:1.5,x:8,z:-15,color:8947848,roughness:.7}],spawns:[{x:-10,y:0,z:-10,type:"player",team:"red"},{x:-15,y:0,z:-15,type:"player",team:"red"},{x:10,y:0,z:10,type:"player",team:"blue"},{x:15,y:0,z:15,type:"player",team:"blue"},{x:-5,y:0,z:-5,type:"player"},{x:5,y:0,z:5,type:"player"},{x:0,y:0,z:-20,type:"enemy"},{x:0,y:0,z:20,type:"enemy"}],walls:[{width:8,height:3,depth:1,x:-10,z:-3,color:5592405},{width:1,height:3,depth:8,x:10,z:5,color:5592405},{width:6,height:2.5,depth:1,x:-3,z:12,color:6710886}]},o_={id:"city_map",name:"City",description:"Urban combat zone with streets and buildings.",ground:{size:200,color:5592405,y:0},lighting:{ambient:{color:6316160,intensity:.4},directional:{color:16777215,intensity:.8,x:30,y:100,z:50},hemisphere:{skyColor:8956620,groundColor:4469538,intensity:.3}},skybox:{color:8956620,fogNear:60,fogFar:180},bounds:{size:200,height:20},trees:[{x:-28,z:-28,scale:.7},{x:28,z:-28,scale:.8},{x:-28,z:28,scale:.75},{x:28,z:28,scale:.7},{x:-25,z:0,scale:.6},{x:25,z:0,scale:.65},{x:0,z:-28,scale:.7},{x:0,z:28,scale:.75},{x:-30,z:-10,scale:.8},{x:30,z:12,scale:.7},{x:-10,z:-30,scale:.65},{x:12,z:30,scale:.7}],objects:[{type:"box",width:8,height:12,depth:8,x:-20,z:-20,color:8947848,roughness:.5,metalness:.3},{type:"box",width:6,height:8,depth:6,x:20,z:-15,color:7829367,roughness:.5,metalness:.3},{type:"box",width:10,height:16,depth:10,x:-15,z:20,color:10066329,roughness:.5,metalness:.3},{type:"box",width:7,height:10,depth:7,x:18,z:18,color:6710886,roughness:.5,metalness:.3},{type:"box",width:2,height:.5,depth:2,x:-8,z:-5,color:11184810,roughness:.4},{type:"box",width:1.5,height:.4,depth:1.5,x:5,z:8,color:12303291,roughness:.4},{type:"box",width:2.5,height:.6,depth:2.5,x:-5,z:10,color:10066329,roughness:.4},{type:"cylinder",radius:.3,height:3,x:-12,z:-8,color:6710886,roughness:.3}],spawns:[{x:-25,y:0,z:-25,type:"player",team:"red"},{x:-22,y:0,z:-22,type:"player",team:"red"},{x:25,y:0,z:25,type:"player",team:"blue"},{x:22,y:0,z:22,type:"player",team:"blue"},{x:-10,y:0,z:-10,type:"player"},{x:10,y:0,z:10,type:"player"},{x:0,y:0,z:-30,type:"enemy"},{x:0,y:0,z:30,type:"enemy"}],walls:[{width:30,height:4,depth:1,x:-15,z:0,color:7829367},{width:1,height:4,depth:30,x:15,z:0,color:7829367},{width:20,height:3,depth:1,x:5,z:-12,color:6710886},{width:1,height:3,depth:20,x:-5,z:12,color:6710886}]},a_={id:"training_map",name:"Training Grounds",description:"A town training area with roads, houses, and open fields.",ground:{size:240,color:8034938,y:0},lighting:{ambient:{color:8421504,intensity:.5},directional:{color:16777215,intensity:1,x:30,y:60,z:30},hemisphere:{skyColor:11193599,groundColor:5596757,intensity:.3}},skybox:{color:11193599,fogNear:120,fogFar:250},bounds:{size:240,height:8},buildings:[{type:"house1",x:-50,z:-40,rotation:.3},{type:"house1",x:-55,z:10,rotation:-.8},{type:"house1",x:-40,z:60,rotation:.5},{type:"house2",x:30,z:-35,rotation:0},{type:"house2",x:35,z:55,rotation:Math.PI},{type:"house3",x:75,z:0,rotation:.2}],trees:[{x:-70,z:-60,scale:1.8},{x:-60,z:-70,scale:2},{x:-80,z:-30,scale:1.6},{x:-80,z:30,scale:1.7},{x:-70,z:70,scale:1.9},{x:-60,z:80,scale:1.5},{x:70,z:-60,scale:1.8},{x:80,z:-30,scale:1.6},{x:80,z:30,scale:1.7},{x:70,z:70,scale:2},{x:-20,z:-70,scale:1.5},{x:20,z:-70,scale:1.4},{x:0,z:-75,scale:1.6},{x:-20,z:75,scale:1.5},{x:20,z:75,scale:1.4}],objects:[{type:"box",width:8,height:.1,depth:200,x:0,z:0,color:5592405,roughness:.9},{type:"box",width:200,height:.1,depth:8,x:0,z:0,color:5592405,roughness:.9},{type:"box",width:2,height:4,depth:2,x:-10,z:-5,color:13386820,roughness:.5},{type:"box",width:2,height:4,depth:2,x:0,z:-8,color:4508740,roughness:.5},{type:"box",width:2,height:4,depth:2,x:10,z:-5,color:4474060,roughness:.5},{type:"box",width:2,height:4,depth:2,x:-5,z:5,color:13421636,roughness:.5},{type:"box",width:2,height:4,depth:2,x:5,z:5,color:13386956,roughness:.5},{type:"box",width:1,height:.5,depth:1,x:-10,z:-15,color:11184810},{type:"box",width:1,height:.5,depth:1,x:0,z:-18,color:11184810},{type:"box",width:1,height:.5,depth:1,x:10,z:-15,color:11184810},{type:"box",width:1,height:.5,depth:1,x:-15,z:-10,color:11184810},{type:"box",width:1,height:.5,depth:1,x:15,z:-10,color:11184810},{type:"box",width:4,height:2,depth:4,x:0,z:15,color:8947848,roughness:.7},{type:"box",width:3,height:1.5,depth:.5,x:-14,z:0,color:6710886,roughness:.8},{type:"box",width:3,height:1.5,depth:.5,x:14,z:0,color:6710886,roughness:.8}],spawns:[{x:-15,y:0,z:-15,type:"player"},{x:15,y:0,z:-15,type:"player"},{x:-10,y:0,z:-10,type:"player"},{x:10,y:0,z:-10,type:"player"},{x:0,y:0,z:-12,type:"player"},{x:-30,y:0,z:0,type:"enemy"},{x:30,y:0,z:0,type:"enemy"},{x:0,y:0,z:-35,type:"enemy"},{x:-45,y:0,z:-30,type:"enemy"},{x:50,y:0,z:30,type:"enemy"}],walls:[{width:20,height:4,depth:1,x:0,z:-30,color:6710886},{width:1,height:4,depth:20,x:-25,z:-10,color:6710886},{width:20,height:4,depth:1,x:10,z:25,color:6710886},{width:1,height:4,depth:20,x:25,z:10,color:6710886}]};class c_{constructor(){Do(this,"_gameLoop",e=>{if(this.initialized){try{const t=this.clock.getDelta(),n=Math.min(t,.05);if(this.paused&&this.gameMode==="solo"){this._render(),requestAnimationFrame(this._gameLoop);return}this._syncInputs(),this._handleInput(),this._updatePlayer(n),this._updateBots(n),this._updateCoreSystems(n),this._updateNetwork(n),this._render(),this.core.debugTools.setBullets(this.systems.bulletPool.activeCount),this.running=!0}catch(t){const n=document.getElementById("error-overlay");n&&(n.textContent+=`[${new Date().toLocaleTimeString()}] LOOP ERROR: ${t.message}
${t.stack||""}

`,n.style.display="block"),console.error("[Game Loop Error]",t)}requestAnimationFrame(this._gameLoop)}});this.initialized=!1,this.running=!1,this.lastTime=0,this.accumulator=0,this.fixedDT=1/60,this.core={},this.systems={},this.player={},this.ui={},this.network={},this.bots=[],this.gameMode="solo",this.playerHealth=100,this.playerMaxHealth=100,this.playerAlive=!0,this.cameraView=Wt.FIRST_PERSON,this.impactParticles=[],this.footstepTimer=0,this._respawnTimer=null,this._botRespawnTimers=[],this._errorCount=0,this.paused=!1,this._setupGlobalErrorHandler(),this._setupPauseMenu()}_setupGlobalErrorHandler(){const e=document.createElement("div");e.id="error-overlay",e.style.cssText="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);color:#ff4444;font-family:monospace;font-size:14px;padding:20px;z-index:9999;overflow:auto;white-space:pre-wrap;pointer-events:none",document.body.appendChild(e);const t=(n,i,s,o,a)=>{this._errorCount++,!(this._errorCount>20)&&(e.textContent+=`[${new Date().toLocaleTimeString()}] ${n}
  at ${i||"?"}:${s||"?"}:${o||"?"}
${(a==null?void 0:a.stack)||""}

`,e.style.display="block",console.error("[Game Crashed]",n,i,s,o,a))};window.addEventListener("error",n=>{n.preventDefault(),t(n.message,n.filename,n.lineno,n.colno,n.error)}),window.addEventListener("unhandledrejection",n=>{n.preventDefault();const i=n.reason;t((i==null?void 0:i.message)||String(i),"","","",i instanceof Error?i:null)})}_setupPauseMenu(){this._pauseOverlay=document.createElement("div"),this._pauseOverlay.id="pause-menu",this._pauseOverlay.style.cssText="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:9997;flex-direction:column;align-items:center;justify-content:center;font-family:sans-serif",this._pauseOverlay.innerHTML=`
      <h2 style="color:#fff;font-size:48px;margin-bottom:50px;text-shadow:0 2px 10px rgba(0,0,0,0.5)">PAUSED</h2>
      <button id="pause-continue" style="display:block;width:260px;padding:14px 0;margin:8px;font-size:20px;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.3);border-radius:6px;cursor:pointer">Continue</button>
      <button id="pause-settings" style="display:block;width:260px;padding:14px 0;margin:8px;font-size:20px;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.3);border-radius:6px;cursor:pointer">Settings</button>
      <button id="pause-quit" style="display:block;width:260px;padding:14px 0;margin:8px;font-size:20px;background:rgba(255,255,255,0.15);color:#ff6666;border:1px solid rgba(255,100,100,0.3);border-radius:6px;cursor:pointer">Quit Game</button>
    `,document.body.appendChild(this._pauseOverlay),document.getElementById("pause-continue").addEventListener("click",()=>this._resumeGame()),document.getElementById("pause-settings").addEventListener("click",()=>{var e;(e=this.ui.settingsMenu)==null||e.show()}),document.getElementById("pause-quit").addEventListener("click",()=>{this._resumeGame(),this.core.gameStateManager.transitionTo(xe.MAIN_MENU)})}_requestPointerLock(){try{this.renderer.domElement.requestPointerLock()}catch{}}_resumeGame(){this._pauseOverlay.style.display="none",this.paused=!1,this.core.gameStateManager.is(xe.PLAYING)&&this._requestPointerLock()}_pauseGame(){var e;this.paused=!0,document.exitPointerLock(),(e=document.getElementById("pause-continue"))==null||e.focus(),this._pauseOverlay.style.display="flex"}async init(){console.log("[Game] Initializing..."),this.core.eventBus=new Kg,this.core.saveManager=new qg,this.core.settingsManager=new jg(this.core.saveManager),this.core.gameStateManager=new Xg,this.core.debugTools=new Yg,this._setupPointerLock(),this._setupKeyboard(),this._setupMouse(),this._setupRenderer(),this.ui.uiManager=new n_(this.core.gameStateManager,this.core.settingsManager,this.core.eventBus),this.systems.assetManager=new O0(this.scene),this.systems.assetManager.onProgress=(e,t)=>{const n=t>0?e/t:0;this.ui.uiManager.updateLoadingProgress(n)},this.systems.audioManager=new k0(this.core.settingsManager),await this.systems.audioManager.init(),this.systems.assetManager.loadModel("shotgun","/models/Shotgun18F.glb"),await this.systems.assetManager.loadAll(),this.systems.mapManager=new B0(this.scene),this.systems.mapManager.registerMap("forest_map",r_),this.systems.mapManager.registerMap("city_map",o_),this.systems.mapManager.registerMap("training_map",a_),this.systems.spawnManager=new F0,this.systems.animationManager=new G0,this.systems.bulletPool=new q0(this.scene),this.systems.bulletPool.onHit(e=>{this.core.eventBus.emit("bullet:hit",e),this._showImpactEffect(e.point,e.normal,!1),this.systems.audioManager.playAtPosition("hit",e.point,"HIT")}),this.systems.matchManager=new j0,this.systems.weaponManager=new $0,this.systems.weaponManager.addWeapon(Sn.RIFLE),this.systems.weaponManager.addWeapon(Sn.PISTOL),this.systems.weaponManager.addWeapon(Sn.SMG),this.player.camera=new Dt(this.core.settingsManager.get("graphics","fov"),window.innerWidth/window.innerHeight,.1,1e3),this.player.camera.position.set(0,1.6,0),this.scene.add(this.player.camera),this.player.controller=new $g(this.player.camera,this.core.settingsManager),this.player.firstPersonWeapon=new Zg(this.player.camera),this.player.thirdPersonCharacter=new Qg(this.scene),this.player.cameraSystem=new Jg(this.player.camera,this.player.controller),this.player.hitbox=new El(this.player.controller,{scale:1}),this.scene.add(this.player.hitbox.group),this.network.networkManager=new Q0,this.network.interpolation=new e_,this.ui.hud=new i_(this.core.eventBus),this.ui.hud.hide(),this.ui.settingsMenu=new s_(this.core.settingsManager),this._setupStateListeners(),this._setupDebugToggle(),this._setupSettingsOpen(),this._setupResize(),this.clock=new Ng,this.initialized=!0,console.log("[Game] Initialization complete")}_setupRenderer(){this.renderer=new gl({antialias:!0,powerPreference:"high-performance"}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=this.core.settingsManager.get("graphics","shadows"),this.renderer.shadowMap.type=Fc,this.renderer.toneMapping=zc,this.renderer.toneMappingExposure=1,document.getElementById("game-canvas-container").appendChild(this.renderer.domElement),this.scene=new ig,this.scene.background=new Ee(8900331);const t=new wl(16777215,.6);this.scene.add(t);const n=new Sl(8900331,3550498,.4);this.scene.add(n)}_setupPointerLock(){document.addEventListener("click",e=>{this.core.gameStateManager.is(xe.PLAYING)&&e.target===this.renderer.domElement&&this._requestPointerLock()}),document.addEventListener("pointerlockchange",()=>{const e=document.pointerLockElement===this.renderer.domElement;this.player.controller&&(this.player.controller.isPointerLocked=e)})}_setupKeyboard(){this._keys=new Set,document.addEventListener("keydown",e=>{var i;if((e.code==="AltLeft"||e.code==="AltRight")&&e.preventDefault(),this._keys.add(e.code),e.code===this.core.settingsManager.getKeybind("debug")&&(this.core.debugTools.toggle(),this.player.hitbox.setDebugMode(this.core.debugTools.enabled),this.bots.forEach(s=>s.hitbox.setDebugMode(this.core.debugTools.enabled))),e.code==="Escape"&&(this.paused?this._resumeGame():this.core.gameStateManager.is(xe.PLAYING)?this._pauseGame():document.exitPointerLock()),(e.code==="AltLeft"||e.code==="AltRight")&&(e.preventDefault(),document.pointerLockElement===this.renderer.domElement?document.exitPointerLock():this.core.gameStateManager.is(xe.PLAYING)&&this._requestPointerLock()),e.code===this.core.settingsManager.getKeybind("reload")&&this.systems.weaponManager){this.systems.weaponManager.reload();const s=this.systems.weaponManager.getCurrentWeapon();this.player.firstPersonWeapon.playReload(s?s.reloadTime:2),this.systems.audioManager.play("reload","WEAPON")}if(e.code==="KeyV"&&this.core.gameStateManager.is(xe.PLAYING)){const s=this.player.cameraSystem.toggleView();this.cameraView=s,(i=this.ui.hud)==null||i.updateViewToggleLabel(s===Wt.FIRST_PERSON),s===Wt.THIRD_PERSON?this.player.controller.cameraActive=!1:this.player.controller.cameraActive=!0}const n=[this.core.settingsManager.getKeybind("switchWeapon1"),this.core.settingsManager.getKeybind("switchWeapon2"),this.core.settingsManager.getKeybind("switchWeapon3")].indexOf(e.code);n!==-1&&this.systems.weaponManager&&this.systems.weaponManager.switchTo(n)}),document.addEventListener("keyup",e=>{this._keys.delete(e.code)}),document.addEventListener("blur",()=>{this._keys.clear()})}_syncInputs(){if(!this.player.controller)return;const e=this.player.controller,t=this._keys;e.inputs.forward=t.has("KeyW"),e.inputs.backward=t.has("KeyS"),e.inputs.left=t.has("KeyA"),e.inputs.right=t.has("KeyD"),e.inputs.jump=t.has("Space"),e.inputs.sprint=t.has("ShiftLeft")||t.has("ShiftRight"),e.inputs.crouch=t.has("ControlLeft")||t.has("ControlRight"),e.inputs.reload=t.has("KeyR"),e.inputs.shoot=t.has("Mouse0"),e.inputs.aim=t.has("Mouse2")}_setupMouse(){document.addEventListener("mousemove",e=>{this.player.controller&&this.player.controller.handleMouseMove(e)}),document.addEventListener("mousedown",e=>{var t;this._keys.add(`Mouse${e.button}`),e.button===0&&this.core.gameStateManager.is(xe.PLAYING)&&this.playerAlive&&((t=this.systems.weaponManager)!=null&&t.getCurrentWeapon())&&this._fireWeapon()}),document.addEventListener("mouseup",e=>{this._keys.delete(`Mouse${e.button}`)})}_fireWeapon(){const e=this.systems.weaponManager.getCurrentWeapon();if(!e)return;const t=performance.now()/1e3,n=this.systems.weaponManager.fire(t);if(!n)return;const i=this.player.camera,s=new R(0,0,-1);s.applyQuaternion(i.quaternion);const o=this.player.cameraSystem.getMuzzleWorldPosition(this.player.firstPersonWeapon),a=this.bots.filter(l=>l.alive).map(l=>l.hitbox);for(const l of n.shots){const h=s.clone();h.x+=l.spreadX,h.y+=l.spreadY,h.normalize();const u=this.systems.bulletPool.fire(o,h,l.damage,300,"local");u&&a.length>0&&this.systems.bulletPool.testBulletHitboxes(u,a,d=>{const f=d.hitbox.owner;if(f&&f.alive){const g=l.damage*d.multiplier;f.takeDamage(g,"local"),this.systems.matchManager.registerDamage("local",f.id,g),f.alive||(this.systems.matchManager.registerKill("local",f.id,e.name),this._respawnBot(f)),this.ui.hud.showHitMarker(g),this.core.eventBus.emit("player:damage",{damage:g,region:d.region}),this._showImpactEffect(d.point,new R(0,1,0),!0),this.systems.audioManager.playAtPosition("hit",f.position,"HIT")}u.alive=!1,u.tracer.visible=!1})}this.player.firstPersonWeapon.playShoot(),this.systems.animationManager.playWeapon("shoot");const c=e.type==="Rifle"?"gunshot_rifle":e.type==="Pistol"?"gunshot_pistol":e.type==="SMG"?"gunshot_smg":e.type==="Shotgun"?"gunshot_shotgun":"gunshot_rifle";this.systems.audioManager.play(c,"WEAPON"),this.core.eventBus.emit("weapon:fired",{weapon:e.type,ammo:e.currentAmmo,reserve:e.reserveAmmo})}_fireBotWeapon(e){const t=new R().subVectors(this.player.controller.position,e.position).normalize();this.systems.bulletPool.fire(e.position.clone().add(new R(0,1,0)),t,10,250,e.id),this.systems.animationManager.playWeapon("shoot"),this.systems.audioManager.playAtPosition("gunshot_pistol",e.position,"WEAPON")}_respawnBot(e){const t=this.bots.filter(i=>i.alive).map(i=>i.position),n=this.systems.spawnManager.getSpawn("player",null,t);if(n){const i=setTimeout(()=>{const s=this._botRespawnTimers.indexOf(i);s!==-1&&this._botRespawnTimers.splice(s,1),!e.alive&&e.respawn(n.position.x,n.position.y,n.position.z)},2e3);this._botRespawnTimers.push(i)}}_startSoloGame(e){this.gameMode="solo",this.playerHealth=this.playerMaxHealth,this.playerAlive=!0,this.systems.mapManager.loadMap(e.map),this.systems.spawnManager.loadFromMap(this.systems.mapManager.getMapData());const t=this.systems.assetManager.getModel("shotgun");if(t){const s=t.scene.clone();s.position.set(2,1.2,0),s.scale.set(.5,.5,.5),s.rotation.x=-.2,s.rotation.y=.5,this.scene.add(s)}const n=this.systems.spawnManager.getSpawn("player",null,[]);n&&this.player.controller.teleport(n.position.x,n.position.y,n.position.z),this.systems.matchManager.configure({type:"deathmatch",scoreLimit:50,timeLimit:600,teamMode:!1,respawnTime:2}),this._matchEndUnsub&&this._matchEndUnsub(),this._matchEndUnsub=this.systems.matchManager.on("end",()=>{this.core.gameStateManager.transitionTo(xe.MATCH_END)}),this.systems.matchManager.registerPlayer("local","Player"),this.systems.matchManager.start();const i=this.systems.weaponManager.getCurrentWeapon();i&&this.player.firstPersonWeapon.switchModel(i.type),this.systems.weaponManager.onWeaponSwitch=s=>{this.player.firstPersonWeapon.switchModel(s.type)},this._clearBots(),this._spawnBots(e.difficulty,e.botCount),this.ui.hud.setViewToggleCallback(()=>{const s=this.player.cameraSystem.toggleView();this.cameraView=s,this.ui.hud.updateViewToggleLabel(s===Wt.FIRST_PERSON),s===Wt.THIRD_PERSON?this.player.controller.cameraActive=!1:this.player.controller.cameraActive=!0}),this.ui.hud.updateViewToggleLabel(!0),this.ui.hud.show(),this.core.debugTools.setState("Playing")}_spawnBots(e,t){for(let n=0;n<t;n++){const i=new Z0(this.scene,e),s=this.bots.map(c=>c.position).concat([this.player.controller.position]),o=this.systems.spawnManager.getSpawn("player",null,s);o&&i.spawnAt(o.position.x,o.position.y,o.position.z);const a=this._generatePatrolPoints();i.setPatrolPoints(a),this.bots.push(i),this.systems.matchManager.registerPlayer(i.id,i.name)}}_generatePatrolPoints(){const e=[],t=this.player.controller.position;for(let n=0;n<5;n++)e.push({x:t.x+(Math.random()-.5)*40,z:t.z+(Math.random()-.5)*40});return e}_clearBots(){for(const e of this.bots)this.scene.remove(e.group),e.dispose();this.bots=[]}_setupStateListeners(){this.core.gameStateManager.on(xe.MAIN_MENU,()=>{var e,t;this._resumeGame(),(e=this.systems.audioManager)==null||e.stopAll(),(t=this.ui.hud)==null||t.hide(),this._respawnTimer&&(clearTimeout(this._respawnTimer),this._respawnTimer=null);for(const n of this._botRespawnTimers)clearTimeout(n);this._botRespawnTimers=[],this.systems.mapManager.currentMap&&this.systems.mapManager.unloadMap(),this._clearBots(),this.playerHealth=this.playerMaxHealth,this.playerAlive=!0}),this.core.gameStateManager.on(xe.PLAYING,e=>{var t;this.paused=!1,this._pauseOverlay.style.display="none",((t=e==null?void 0:e.data)==null?void 0:t.mode)==="solo"&&this._startSoloGame(e.data),this._requestPointerLock()}),this.core.gameStateManager.on(xe.SPECTATING,()=>{var e;(e=this.ui.hud)==null||e.show()}),this.core.gameStateManager.on(xe.MATCH_END,e=>{var n;this._resumeGame(),document.exitPointerLock(),(n=this.ui.hud)==null||n.hide();const t=this.systems.matchManager.getMatchStats();this.ui.uiManager.showMatchEnd(t,this.gameMode),this.core.debugTools.setState("MatchEnd")}),this.core.gameStateManager.onChange(({from:e,to:t})=>{this.core.debugTools.setState(t)})}_setupDebugToggle(){this.core.debugTools.setState("Loading")}_setupSettingsOpen(){this.core.eventBus.on("ui:openSettings",()=>{this.ui.settingsMenu.show()})}_setupResize(){window.addEventListener("resize",()=>{const e=window.innerWidth,t=window.innerHeight;this.player.camera.aspect=e/t,this.player.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)})}_handleInput(){if(!(!this.core.gameStateManager.is(xe.PLAYING)||!this.playerAlive)&&this.player.controller.inputs.shoot){const e=performance.now()/1e3,t=this.systems.weaponManager.getCurrentWeapon();t&&t.automatic&&t.canFire(e)&&this._fireWeapon()}}_updateCoreSystems(e){this.systems.spawnManager.update(e),this.systems.matchManager.update(e),this.systems.weaponManager.update(e);const t=this.systems.mapManager.objects.filter(n=>{var i,s,o;return((i=n.userData)==null?void 0:i.isWall)||((s=n.userData)==null?void 0:s.isMapObject)||((o=n.userData)==null?void 0:o.isBoundary)});this.systems.bulletPool.update(e,t),this.systems.animationManager.update(e);for(let n=this.impactParticles.length-1;n>=0;n--){const i=this.impactParticles[n];i.life-=e,i.mesh.position.add(i.velocity.clone().multiplyScalar(e)),i.mesh.material.opacity=Math.max(0,i.life/.8),i.life<=0&&(this.scene.remove(i.mesh),i.mesh.geometry.dispose(),i.mesh.material.dispose(),this.impactParticles.splice(n,1))}this.core.debugTools.update(e)}_updatePlayer(e){if(!this.core.gameStateManager.is(xe.PLAYING)||!this.playerAlive)return;const t=Math.min(e,.05),n=this.systems.mapManager.objects.filter(u=>{var d,f,g;return((d=u.userData)==null?void 0:d.isWall)||((f=u.userData)==null?void 0:f.isMapObject)||((g=u.userData)==null?void 0:g.isBoundary)});this.player.controller.update(t,n,u=>{u.position.y<-20&&u.teleport(0,5,0)}),this.player.controller.onFallDamage=u=>{this.playerHealth-=u,this.ui.hud.updateHealth(this.playerHealth,this.playerMaxHealth),this.core.eventBus.emit("player:damage",{damage:u,region:"body"}),this.playerHealth<=0&&(this.playerHealth=0,this._playerDied())},this.player.cameraSystem.update(t,this.player.firstPersonWeapon,this.player.playerArms,this.player.thirdPersonCharacter);const i=this.systems.weaponManager.getCurrentWeapon();this.player.firstPersonWeapon.update(t,this.player.controller.isMoving,this.player.controller.isSprinting,i||null,null),this.player.hitbox.update(this.player.controller.position,this.player.controller.euler),this.core.debugTools.setPosition(this.player.controller.position.x,this.player.controller.position.y,this.player.controller.position.z),i&&(this.core.debugTools.setWeapon(i.name),this.ui.hud.updateAmmo(i.currentAmmo,i.reserveAmmo),this.ui.hud.updateWeapon(i.name)),this.ui.hud.updateHealth(this.playerHealth,this.playerMaxHealth),this.ui.hud.updateTimer(this.systems.matchManager.getFormattedTime());const s=new R(0,0,-1).applyQuaternion(this.player.camera.quaternion);s.y=0,s.normalize(),this.ui.hud.updateDamageDirection(this.player.controller.position,s);const o=this.systems.matchManager.getMatchStats();if(o&&o.players){const u=o.players.find(g=>g.id==="local"),f=o.players.filter(g=>g.id!=="local").reduce((g,_)=>g+_.score,0);this.ui.hud.updateScore({team1:(u==null?void 0:u.score)||0,team2:f})}const a=this.player.controller.isMoving,c=this.player.controller.grounded,l=this.player.controller.currentSpeed,h=Math.min(1,(a?l/7:0)*.6+(this.player.controller.isSprinting?.3:0)+(this.player.firstPersonWeapon.flashTimer>0?.4:0));this.ui.hud.updateCrosshair(h),this.footstepTimer-=t,a&&c&&l>1&&this.footstepTimer<=0&&(this.systems.audioManager.play("footstep","FOOTSTEP",{pitch:.9+Math.random()*.2}),this.footstepTimer=.4/Math.max(l/4,.5)),this.systems.audioManager.updateListenerPosition(this.player.controller.position,this.player.camera.quaternion),this.player.controller.isPointerLocked=document.pointerLockElement===this.renderer.domElement}_updateBots(e){if(!this.core.gameStateManager.is(xe.PLAYING)||this.gameMode!=="solo")return;const t=this.systems.mapManager.objects.filter(n=>{var i,s,o;return((i=n.userData)==null?void 0:i.isWall)||((s=n.userData)==null?void 0:s.isMapObject)||((o=n.userData)==null?void 0:o.isBoundary)});for(const n of this.bots){if(!n.alive)continue;const i=n.update(e,this.player.controller.position,this.playerAlive,t);i&&this.playerAlive&&this._checkBotBulletHitPlayer(i)}}_checkBotBulletHitPlayer(e){const{origin:t,direction:n,damage:i,botPosition:s}=e,o=s||t;this.systems.bulletPool.fire(t,n,i,250,"bot");const a=new Js(t,n);a.far=60;const c=this.player.hitbox.testRay(a);if(c&&this.playerAlive){const l=i*c.multiplier;this.playerHealth-=l,this.systems.matchManager.registerDamage("bot","local",l);const h=this.player.controller.position,u=new R(o.x-h.x,0,o.z-h.z).normalize(),d=new R(0,0,-1);d.applyQuaternion(this.player.camera.quaternion),d.y=0,d.normalize();const f=new R().crossVectors(d,u),g=d.dot(u),_=Math.atan2(f.y,g)*(180/Math.PI);this.ui.hud.showHitMarker(l),this.core.eventBus.emit("player:damage",{damage:l,region:c.region,angle:_,attackerPos:o}),this.player.controller.applyFlinch(c.region),this.systems.audioManager.play(c.region==="leg"?"hit_leg":"hit","HIT"),c.region==="leg"&&this.player.controller.applyLegSlow(),this.playerHealth<=0&&(this.playerHealth=0,this._playerDied())}}_playerDied(){this.playerAlive=!1,this.player.controller.velocity.set(0,0,0),this.ui.hud.updateHealth(0);const e=this.bots.find(t=>t.alive);e&&this.systems.matchManager.registerKill(e.id,"local","rifle"),this._respawnTimer=setTimeout(()=>{this._respawnPlayer()},3e3)}_respawnPlayer(){this.playerHealth=this.playerMaxHealth,this.playerAlive=!0;const e=this.bots.filter(i=>i.alive).map(i=>i.position),t=this.systems.spawnManager.getSpawn("player",null,e);t&&this.player.controller.teleport(t.position.x,t.position.y,t.position.z);const n=this.systems.weaponManager.weapons.find(i=>i.type===Sn.RIFLE);n&&(n.currentAmmo=n.magSize,n.reserveAmmo=Math.max(n.reserveAmmo,n.magSize*3))}_showImpactEffect(e,t,n){const i=n?13378082:16755268,s=n?3:5;for(let o=0;o<s;o++){const a=new zt(.025,4,4),c=new Bt({color:i,transparent:!0,opacity:1}),l=new W(a,c);l.position.copy(e);const h=new R((Math.random()-.5)*2,Math.random()*2,(Math.random()-.5)*2).normalize().multiplyScalar(1.5+Math.random()*2);this.scene.add(l),this.impactParticles.push({mesh:l,velocity:h,life:.4+Math.random()*.3})}}_updateNetwork(e){var n;if(!this.network.networkManager.isConnected())return;const t=((n=this.player.controller)==null?void 0:n.getState())||null;this.network.networkManager.update(e,t),this.network.interpolation.update(e),this.core.debugTools.setPing(Math.round(this.network.networkManager.latency)),this.core.debugTools.setBullets(this.systems.bulletPool.activeCount)}_render(){this.renderer.render(this.scene,this.player.camera)}start(){if(this.running){console.warn("[Game] Already running");return}console.log("[Game] Starting..."),this.lastTime=performance.now(),this.running=!0,this.core.gameStateManager.transitionTo(xe.MAIN_MENU),requestAnimationFrame(this._gameLoop)}}const Uc=new c_;Uc.init().then(()=>{Uc.start()});
//# sourceMappingURL=index-YFeAc-sM.js.map
