/* Global THREE, console */
THREE.OrbitControls=function(a,b){function c(){return 2*Math.PI/60/60*i.autoRotateSpeed}function d(){return Math.pow(.95,i.zoomSpeed)}function e(a){if(!1!==i.enabled){a.preventDefault();var b=i.domElement===document?i.domElement.body:i.domElement;if(z===y.ROTATE){if(!0===i.noRotate)return;l.set(a.clientX,a.clientY),m.subVectors(l,k),i.rotateLeft(2*Math.PI*m.x/b.clientWidth*i.rotateSpeed),i.rotateUp(2*Math.PI*m.y/b.clientHeight*i.rotateSpeed),k.copy(l)}else if(z===y.DOLLY){if(!0===i.noZoom)return;r.set(a.clientX,a.clientY),s.subVectors(r,q),0<s.y?i.dollyIn():i.dollyOut(),q.copy(r)}else if(z===y.PAN){if(!0===i.noPan)return;o.set(a.clientX,a.clientY),p.subVectors(o,n),i.pan(p),n.copy(o)}i.update()}}function f(){!1===i.enabled||(i.domElement.removeEventListener("mousemove",e,!1),i.domElement.removeEventListener("mouseup",f,!1),z=y.NONE)}function g(a){if(!1!==i.enabled&&!0!==i.noZoom){var b=0;a.wheelDelta?b=a.wheelDelta:a.detail&&(b=-a.detail),0<b?i.dollyOut():i.dollyIn()}}function h(a){if(!1!==i.enabled){a.preventDefault(),a.stopPropagation();var b=i.domElement===document?i.domElement.body:i.domElement;switch(a.touches.length){case 1:if(!0===i.noRotate)return;if(z!==y.TOUCH_ROTATE)return;l.set(a.touches[0].pageX,a.touches[0].pageY),m.subVectors(l,k),i.rotateLeft(2*Math.PI*m.x/b.clientWidth*i.rotateSpeed),i.rotateUp(2*Math.PI*m.y/b.clientHeight*i.rotateSpeed),k.copy(l);break;case 2:if(!0===i.noZoom)return;if(z!==y.TOUCH_DOLLY)return;var c=a.touches[0].pageX-a.touches[1].pageX,d=a.touches[0].pageY-a.touches[1].pageY,e=Math.sqrt(c*c+d*d);r.set(0,e),s.subVectors(r,q),0<s.y?i.dollyOut():i.dollyIn(),q.copy(r);break;case 3:if(!0===i.noPan)return;if(z!==y.TOUCH_PAN)return;o.set(a.touches[0].pageX,a.touches[0].pageY),p.subVectors(o,n),i.pan(p),n.copy(o);break;default:z=y.NONE;}}}this.object=a,this.domElement=b===void 0?document:b,this.enabled=!0,this.target=new THREE.Vector3,this.center=this.target,this.noZoom=!1,this.zoomSpeed=1,this.minDistance=0,this.maxDistance=1/0,this.noRotate=!1,this.rotateSpeed=1,this.noPan=!1,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.noKeys=!1,this.keys={LEFT:37,UP:38,RIGHT:39,BOTTOM:40};var i=this,j=1e-6,k=new THREE.Vector2,l=new THREE.Vector2,m=new THREE.Vector2,n=new THREE.Vector2,o=new THREE.Vector2,p=new THREE.Vector2,q=new THREE.Vector2,r=new THREE.Vector2,s=new THREE.Vector2,t=0,u=0,v=1,w=new THREE.Vector3,x=new THREE.Vector3,y={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_DOLLY:4,TOUCH_PAN:5},z=y.NONE,A={type:"change"};this.rotateLeft=function(a){a===void 0&&(a=c()),u-=a},this.rotateUp=function(a){a===void 0&&(a=c()),t-=a},this.panLeft=function(a){var b=new THREE.Vector3,c=this.object.matrix.elements;b.set(c[0],c[1],c[2]),b.multiplyScalar(-a),w.add(b)},this.panUp=function(a){var b=new THREE.Vector3,c=this.object.matrix.elements;b.set(c[4],c[5],c[6]),b.multiplyScalar(a),w.add(b)},this.pan=function(a){var b=i.domElement===document?i.domElement.body:i.domElement;if(i.object.fov!==void 0){var c=i.object.position,d=c.clone().sub(i.target),e=d.length();e*=Math.tan(i.object.fov/2*Math.PI/180),i.panLeft(2*a.x*e/b.clientHeight),i.panUp(2*a.y*e/b.clientHeight)}else void 0===i.object.top?console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."):(i.panLeft(a.x*(i.object.right-i.object.left)/b.clientWidth),i.panUp(a.y*(i.object.top-i.object.bottom)/b.clientHeight))},this.dollyIn=function(a){a===void 0&&(a=d()),v/=a},this.dollyOut=function(a){a===void 0&&(a=d()),v*=a},this.update=function(){var a=this.object.position,b=a.clone().sub(this.target),d=Math.atan2(b.x,b.z),e=Math.atan2(Math.sqrt(b.x*b.x+b.z*b.z),b.y);this.autoRotate&&this.rotateLeft(c()),d+=u,e+=t,e=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,e)),e=Math.max(j,Math.min(Math.PI-j,e));var f=b.length()*v;f=Math.max(this.minDistance,Math.min(this.maxDistance,f)),this.target.add(w),b.x=f*Math.sin(e)*Math.sin(d),b.y=f*Math.cos(e),b.z=f*Math.sin(e)*Math.cos(d),a.copy(this.target).add(b),this.object.lookAt(this.target),u=0,t=0,v=1,w.set(0,0,0),0<x.distanceTo(this.object.position)&&(this.dispatchEvent(A),x.copy(this.object.position))},this.domElement.addEventListener("contextmenu",function(a){a.preventDefault()},!1),this.domElement.addEventListener("mousedown",function(a){if(!1!==i.enabled){if(a.preventDefault(),0===a.button){if(!0===i.noRotate)return;z=y.ROTATE,k.set(a.clientX,a.clientY)}else if(1===a.button){if(!0===i.noZoom)return;z=y.DOLLY,q.set(a.clientX,a.clientY)}else if(2===a.button){if(!0===i.noPan)return;z=y.PAN,n.set(a.clientX,a.clientY)}i.domElement.addEventListener("mousemove",e,!1),i.domElement.addEventListener("mouseup",f,!1)}},!1),this.domElement.addEventListener("mousewheel",g,!1),this.domElement.addEventListener("DOMMouseScroll",g,!1),this.domElement.addEventListener("keydown",function(a){if(!1!==i.enabled&&!0!==i.noKeys&&!0!==i.noPan){var b=!1;switch(a.keyCode){case i.keys.UP:i.pan(new THREE.Vector2(0,i.keyPanSpeed)),b=!0;break;case i.keys.BOTTOM:i.pan(new THREE.Vector2(0,-i.keyPanSpeed)),b=!0;break;case i.keys.LEFT:i.pan(new THREE.Vector2(i.keyPanSpeed,0)),b=!0;break;case i.keys.RIGHT:i.pan(new THREE.Vector2(-i.keyPanSpeed,0)),b=!0;}b&&i.update()}},!1),this.domElement.addEventListener("touchstart",function(a){if(!1!==i.enabled)switch(a.touches.length){case 1:if(!0===i.noRotate)return;z=y.TOUCH_ROTATE,k.set(a.touches[0].pageX,a.touches[0].pageY);break;case 2:if(!0===i.noZoom)return;z=y.TOUCH_DOLLY;var b=a.touches[0].pageX-a.touches[1].pageX,c=a.touches[0].pageY-a.touches[1].pageY,d=Math.sqrt(b*b+c*c);q.set(0,d);break;case 3:if(!0===i.noPan)return;z=y.TOUCH_PAN,n.set(a.touches[0].pageX,a.touches[0].pageY);break;default:z=y.NONE;}},!1),this.domElement.addEventListener("touchend",function(){!1===i.enabled||(z=y.NONE)},!1),this.domElement.addEventListener("touchmove",h,!1)},THREE.OrbitControls.prototype=Object.create(THREE.EventDispatcher.prototype);


