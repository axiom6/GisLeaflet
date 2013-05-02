
var Gis = {}; // Create one global to attach Gis variables to

// Read in a GeoJSON with Ajax. If successful then create overlay layer
Gis.readGeoJSON = function( url, layer, style ) {
  $.ajax( {
    url:url, type:'GET', dataType:'json',
    success:function( json, textStatus, jqXHR ) {
      Gis.overlayGeoJSON( json, layer, style ); },
    error:function( jqXHR, textStatus, errorThrown ) {
      console.log('Gis.readGeoJSON() Error ' + url); }
  });
};

Gis.overlayGeoJSON = function( json, layer, style ) {
  L.setOptions( layer, { style:style, onEachFeature:Gis.onFeatureLayer } ); // setOptions before addData
  layer.addData( json );
};

// Callback for processing each feature in GeoJSON
Gis.onFeatureLayer = function( feature, layer ) {
  //Util.dbg( 'Gis.onFeatureLayer()', feature.properties.Field );
  var callZoom = function(e) { Gis.zoomFeatureLayer( e, feature, layer ); };
  layer.on( 'click', callZoom  );
};

// Zoom bounds and center it
Gis.zoomFeatureLayer = function( e, feature, layer ) {
  //Util.dbg( 'Gis.zoomFeatureLayer', feature.properties.Farm,  feature.properties.Field )
  var bounds = layer.getBounds();
  Gis.map.fitBounds( bounds );
  Gis.map.panTo( bounds.getCenter() );
  Util.consume( e,feature );
};

Gis.logLatLng = function( leafletEvent ) {
  var latlng = leafletEvent.latlng;
  console.log('['+latlng.lng+','+latlng.lat+'], '); // For GeoJSON lng,lat for x,y
};