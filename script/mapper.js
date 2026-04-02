
	function highlightFeature(e) {
	//When the users hover over the polygons, they are highlighted
    var layer = e.target;
    layer.setStyle({weight: 5,color: '#666',dashArray: '',fillOpacity: 0.7});
	info.update(layer.feature.properties);
	}

	function resetHighlight(e) {
	//When the users hover out of the polygon,the highlight is removed
		VillageBase_M.resetStyle(e.target);
		info.update();
	}

	function onEachVillage(feature,layer) {
	//Within the map for every feature showing labels
	
	
	//What to do when user hovers over
    layer.on({
		
        mouseover: highlightFeature,
        mouseout: resetHighlight
		
    });
	
	}
	
	
	
	function style_Village_Transparent(feature) {
	
	return {
	    fillColor: 'white',
		weight: 0,
        opacity: 0,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0
	
		};
	
	}

	function style_Scenario(feature) {
	
	return {
	    fillColor: 'white',
		weight: 3,
        opacity: 0,
        color: 'red',
        dashArray: '1',
        fillOpacity: 0
		};
	
	}
	
	function style_Boundary(feature) {
	
	return {
	    fillColor: 'white',
		weight: 3,
        opacity: 1,
        color: 'orange',
        dashArray: '1',
        fillOpacity: 0
		};
	
	}
	
	
	function style_Boundary_CBUA(feature) {
	
	return {
	    fillColor: 'red',
		weight: 3,
        opacity: 1,
        color: 'red',
        dashArray: '1',
        fillOpacity: 0.2
		};
	
	}
	
	
	function style_Boundary_S(feature) {
	
	return {
	    fillColor: 'white',
		weight: 3,
        opacity: 1,
        color: 'black',
        dashArray: '1',
        fillOpacity: 0
		};
	
	}
	
	
	function style_Boundary_M(feature) {
	
	return {
	    fillColor: 'white',
		weight: 3,
        opacity: 1,
        color: 'blue',
        dashArray: '1',
        fillOpacity: 0
		};
	
	}
	
	function style_Boundary_M_GP(feature) {
	
	return {
	    fillColor: 'white',
		weight: 3,
        opacity: 1,
        color: 'blue',
        dashArray: '5,7',
        fillOpacity: 0
		};
	
	}

	
	
	function style_Boundary_L(feature) {
	
	return {
	    fillColor: 'white',
		weight: 3,
        opacity: 1,
        color: 'red',
        dashArray: '1',
        fillOpacity: 0
		};
	
	}
	
	function style_Boundary_XL(feature) {
	
	return {
	    fillColor: 'white',
		weight: 4,
        opacity: 1,
        color: 'maroon',
        dashArray: '1',
        fillOpacity: 0
		};
	
	}
	
	function style_Boundary_XL_GP(feature) {
	
	return {
	    fillColor: 'white',
		weight: 4,
        opacity: 1,
        color: 'maroon',
        dashArray: '5,7',
        fillOpacity: 0
		};
	
	}
	
	function style_Boundary_Towns(feature) {
	
	return {
	    fillColor: 'black',
		weight: 2,
        opacity: 1,
        color: 'black',
        dashArray: '1',
        fillOpacity: 0.2
		};
	
	}
	
	function style_Boundary_BDA(feature) {
	
	return {
	    fillColor: 'green',
		weight: 2,
        opacity: 1,
        color: 'green',
        dashArray: '1',
        fillOpacity: 0
		};
	
	}
	
	function style_Vill(feature) {
	
	return {
	    fillColor: 'white',
		weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0
		};
	
	}
	
	
	
	
	
	//Do classification based on the merged data
	
	var zoom=10;
	
	
	
	latstart=13;
	longstart=77.5;	
	
	var map = L.map('map', {zoomControl: false}).setView([latstart, longstart], zoom);
	var zoomControl = L.control.zoom({ position: 'bottomleft' }).addTo(map);

	var BRD_M=L.geoJson(BRD, {style: style_Boundary});
	var BUD_M=L.geoJson(BUD, {style: style_Boundary});
	var CBUA_M=L.geoJson(CBUA, {style: style_Boundary});
	var SSRV_M=L.geoJson(SSRV, {style: style_Boundary});
	var SMRV_M=L.geoJson(SMRV, {style: style_Boundary});
	var SLRV_M=L.geoJson(SLRV, {style: style_Boundary});
	var SXLRV_M=L.geoJson(SXLRV, {style: style_Boundary});
	var SMGP_M=L.geoJson(SMGP, {style: style_Boundary});
	var SXLGP_M=L.geoJson(SXLGP, {style: style_Boundary});
	var BDA_M=L.geoJson(BDA, {style: style_Boundary_BDA});
	var Towns_M=L.geoJson(town, {style: style_Boundary_Towns});
	var Vill_M=L.geoJson(Village, {style: style_Vill});
	var VillageBase_M=L.geoJson(Village, {style: style_Village_Transparent,onEachFeature: onEachVillage})

	googlebg = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{    maxZoom: 20,    subdomains:['mt0','mt1','mt2','mt3']}).addTo(map);

	info = L.control({position: "topright"});

	info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'hover'); // create a div with a class "info"
    this.update();
    return this._div;
	};

	// method that we will use to update the control based on feature properties passed
	info.update = function (props) { 	
    this._div.innerHTML =  (props ? ' Village Name: <b>' + props['KGISVill_2'] + '</b><br />Gram Panchayat: <b>'+ props['GramPanchayat']+ '</b>'
        : '');
	};
	
	info.addTo(map);
	
	function bgswitch() {
		map.removeLayer(googlebg);
		if (document.getElementById('bgbox').value=="roadmap") 
	{
      googlebg = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);
  } 
  else if (document.getElementById('bgbox').value=="hybrid") 
  {
	googlebg = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);

  }
		
		else if (document.getElementById('bgbox').value=="satellite") 
		{
			googlebg = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);
		}
		
		else if (document.getElementById('bgbox').value=="terrain") 
		{
			googlebg = L.tileLayer('http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);
		}
		
	}



	function drawbasic() {
	map.removeLayer(VillageBase_M);
	
	
	
	VillageBase_M=L.geoJson(Village, {style: style_Village_Transparent,onEachFeature: onEachVillage}).addTo(map);
	}


	function funcswitch() {
    // check if checkbox is checked
	map.eachLayer(function (layer) {
		if (layer!=googlebg)
		{
        map.removeLayer(layer);
		}
    });
    
  
  if ($('#BUDbox').is(":checked"))
  {
	  map.removeLayer(BUD_M);
      BUD_M=L.geoJson(BUD, {style: style_Boundary}).addTo(map);
	  
  } 

if ($('#BRDbox').is(":checked"))
  {
	  map.removeLayer(BRD_M);
      BRD_M=L.geoJson(BRD, {style: style_Boundary}).addTo(map);
	  
  } 
  
  if ($('#CBUAbox').is(":checked"))
  {
	  map.removeLayer(CBUA_M);
      CBUA_M=L.geoJson(CBUA, {style: style_Boundary_CBUA}).addTo(map);
	  
  } 

if ($('#SSRVbox').is(":checked"))
  {
	  map.removeLayer(SSRV_M);
      SSRV_M=L.geoJson(SSRV, {style: style_Boundary_S}).addTo(map);
	  
  } 
  
  
if ($('#SMRVbox').is(":checked"))
  {
	  map.removeLayer(SMRV_M);
      SMRV_M=L.geoJson(SMRV, {style: style_Boundary_M}).addTo(map);
	  
  } 
  
  
if ($('#SLRVbox').is(":checked"))
  {
	  map.removeLayer(SLRV_M);
      SLRV_M=L.geoJson(SLRV, {style: style_Boundary_L}).addTo(map);
	  
  } 

if ($('#SXLRVbox').is(":checked"))
  {
	  map.removeLayer(SXLRV_M);
      SXLRV_M=L.geoJson(SXLRV, {style: style_Boundary_XL}).addTo(map);
	  
  } 
  
if ($('#SMGPbox').is(":checked"))
  {
	  map.removeLayer(SMGP_M);
      SMGP_M=L.geoJson(SMGP, {style: style_Boundary_M_GP}).addTo(map);
	  
  } 
  
  if ($('#SXLGPbox').is(":checked"))
  {
	  map.removeLayer(SXLGP_M);
      SXLGP_M=L.geoJson(SXLGP, {style: style_Boundary_XL_GP}).addTo(map);
	  
  } 
  
  if ($('#Villbox').is(":checked"))
  {
	  map.removeLayer(Vill_M);
      Vill_M=L.geoJson(Village, {style: style_Vill}).addTo(map);
	  
  } 

if ($('#Townbox').is(":checked"))
  {
	  map.removeLayer(Towns_M);
      Towns_M=L.geoJson(town, {style: style_Boundary_Towns}).addTo(map);
	  
  } 
  
  if ($('#BDAbox').is(":checked"))
  {
	  map.removeLayer(BDA_M);
      BDA_M=L.geoJson(BDA, {style: style_Boundary_BDA}).addTo(map);
	  
  } 
 
  
  drawbasic();
  
  
  
  
  }
	
	
	
	
	
	
	
	funcswitch();
	drawbasic();
	
