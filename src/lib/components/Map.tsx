import 'leaflet/dist/leaflet.css';
import L, { PointTuple } from 'leaflet';
import { useEffect, useState } from 'react';
import _ from 'lodash';
export interface MapProps {
    center: LatLng,
    zoom?: number,
    maxZoom?: number,
    tileLayer?: string,
    markers?: marker[],
    geoJson?: any,
    mapUpdate?: number
}

export interface IconSize extends PointTuple { };
export interface LatLng {
    lat: number,
    lng: number
}

export interface Icon {
    iconUrl: string,
    iconSize: IconSize,
}

export interface marker {
    latLng: LatLng,
    text?: string,
    icon?: Icon,
}

export const Map = (props: MapProps) => {
    const [map, setMap] = useState<L.Map>({} as L.Map);
    const { markers, tileLayer, center, geoJson, mapUpdate, zoom, maxZoom } = props;
    const initLatLng = L.latLng(center?.lat, center?.lng);
    let FG = new L.FeatureGroup();
    let geoJsonPolygon = new L.FeatureGroup();

    const rcl = () => {
        return Math.floor(Math.random() * 16777215).toString(16);
    }

    useEffect(() => {
        const container = L.DomUtil.get("map") as any;
        if (container != null) {
            container._leaflet_id = null;
        }
        const appMap = L.map('leafletmap', {

        }).setView(initLatLng, zoom || 10);

        setMap(appMap);
        L.tileLayer(tileLayer || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: maxZoom || 15,
            attribution: '© OpenStreetMap'
        }).addTo(appMap);
    }, []);


    useEffect(() => {
        const renderMarker = () => {
            if (markers && markers?.length > 0) {
                if (typeof map.removeLayer === 'function') {
                    map.removeLayer(FG);
                }
                for (let i = 0; i < markers.length; i++) {
                    let markerOptions = {};
                    let iconSize: PointTuple = [32, 32];
                    if (markers[i].icon) {
                        const myIcon = L.icon({
                            iconUrl: markers[i]?.icon?.iconUrl || '',
                            iconSize: markers[i].icon?.iconSize || iconSize
                        });
                        markerOptions = { icon: myIcon }

                    }
                    FG.addLayer(L.marker(markers[i].latLng, markerOptions).bindPopup(markers[i].text || '', { closeButton: false }));
                }
                if (map && typeof map.addLayer === 'function') {
                    map.addLayer(FG);
                    console.log('addLayer marker');
                    if (markers?.length >= 2) {
                        map.fitBounds(FG.getBounds(), { padding: [20, 20] });
                    } else {
                        map.panTo(markers[0].latLng);
                    }
                }

            }
        }
        renderMarker();
    }, [FG, map, markers])

    useEffect(() => {
        const renderPolygon = () => {
            console.log('add polygon');
            if (map && typeof map.addLayer === 'function') {
                geoJsonPolygon.eachLayer(le => le.remove());
                map.removeLayer(geoJsonPolygon);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                geoJsonPolygon = L.geoJSON(geoJson, {
                    style: function (feature) {
                        return { color: `#${rcl()}`, weight: 1 };
                    },
                    onEachFeature(feature, layer) {
                        console.log(feature.properties)
                        const popName: any[] = [];
                        const VARNAME_3 = feature.properties.VARNAME_3;
                        if (!_.isEmpty(feature.properties.NL_NAME_2)) {
                            if (_.indexOf(VARNAME_3, feature.properties.NL_NAME_2) === -1) {
                                popName.push(`${VARNAME_3} ${feature.properties.NL_NAME_2}`);
                            } else {
                                popName.push(feature.properties.NL_NAME_2);
                            }
                        }
                        if (!_.isEmpty(feature.properties.NAME_1)) {
                            popName.push(feature.properties.NAME_1)
                        }
                        if (!_.isEmpty(feature.properties.ID_0)) {
                            popName.push(feature.properties.ID_0)
                        }
                        layer.bindPopup(popName.join(', '), { closeButton: false });
                        layer.on('click', (e) => {
                            map.fitBounds(e.target.getBounds());
                            geoJsonPolygon.setStyle({
                                weight: 1,
                            })
                            e.target.setStyle({
                                weight: 4,
                                opacity: 0.9
                            })
                            e.target.bringToFront();
                        })
                    },
                });
                map.addLayer(geoJsonPolygon);
            }
        }
        renderPolygon();
    }, [geoJson, map])
    return (
        <div className='map' id='leafletmap'></div>
    )
}