import React from 'react';
import '../styles/pages/Radar.css';

import RadarCanvas from '../components/Radar/RadarCanvas';
import RadarToolbar from '../components/Radar/RadarToolbar';
import SignalBox from '../components/Radar/SignalBox';
import LayersPanel from '../components/Radar/LayersPanel';
import ControlsPanel from '../components/Radar/ControlsPanel';
import TimelineBar from '../components/Radar/TimelineBar';
import AlertStrip from '../components/Radar/AlertStrip';
import LegendPanel from '../components/Radar/LegendPanel';

const Radar = () => {
    return (
        <div className="radar-page">
            {/* The background canvas map */}
            <RadarCanvas />

            {/* The floating UI overlays */}
            <div className="radar-ui-layer">
                <RadarToolbar />
                <SignalBox />
                <LayersPanel />
                <ControlsPanel />
                <TimelineBar />
                <AlertStrip />
                <LegendPanel />
            </div>
        </div>
    );
};

export default Radar;