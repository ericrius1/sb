/**
 * @author mrdoob / http://www.mrdoob.com
 */

GPGPU.SimulationShader = function () {

  var material = new THREE.ShaderMaterial( {
    uniforms: {
      tOrigins: { type: "t", value: null },
    },
    vertexShader: shaders.vertexShaders.simulation,
    fragmentShader: shaders.fragmentShaders.simulation
  } );

  return {

    material: material,

    setOriginsTexture: function ( origins ) {

      material.uniforms.tOrigins.value = origins;

      return this;

    }
  }

};